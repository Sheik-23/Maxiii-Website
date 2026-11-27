import React, { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../../motion/tokens';

const VS_SOURCE = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FS_SOURCE = `
  precision mediump float;
  varying vec2 v_uv;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform float u_buildProgress;

  float rand(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 st = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    vec2 mouse = (u_mouse - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

    float distMouse = length(st - mouse);
    vec2 displacedSt = st + normalize(st - mouse + 0.001) * exp(-distMouse * 4.0) * 0.02;

    float r = length(displacedSt);
    float radius = 0.44;

    float breathe = sin(u_time * 4.48) * 0.04;

    if (r > radius) {
      float glow = exp(-(r - radius) * 16.0) * (0.16 + breathe);
      vec3 glowCol = vec3(1.0, 0.54, 0.12) * glow;
      float alpha = glow * clamp(u_buildProgress * 2.0, 0.0, 1.0);
      gl_FragColor = vec4(glowCol, alpha);
      return;
    }

    float z = sqrt(max(0.0, radius * radius - r * r));
    vec3 N = normalize(vec3(displacedSt.x, displacedSt.y, z));
    vec3 L = normalize(vec3(mouse.x * 1.8 - 0.3, -mouse.y * 1.8 + 0.5, 0.85));
    float diff = max(0.0, dot(N, L));

    vec2 screenGrid = gl_FragCoord.xy / 9.0;
    vec2 cell = fract(screenGrid) - 0.5;
    float cellDist = length(cell);

    float normDist = r / radius;
    float radialGrowth = clamp((u_buildProgress * 1.25 - normDist * 0.95) * 3.5, 0.0, 1.0);

    float dotRadius = clamp(diff * 0.55 * radialGrowth * (1.0 + breathe * 0.6), 0.0, 0.48);
    float dotVal = smoothstep(dotRadius + 0.06, dotRadius - 0.06, cellDist);

    vec3 lightCol = vec3(0.98, 0.94, 0.86);
    vec3 shadowCol = vec3(0.08, 0.15, 0.82);
    vec3 finalColor = mix(shadowCol, lightCol, dotVal * diff * radialGrowth);

    float grain = (rand(gl_FragCoord.xy + u_time * 0.05) - 0.5) * 0.05;
    finalColor += grain;

    gl_FragColor = vec4(finalColor, radialGrowth);
  }
`;

export const WebGLHeroMoon: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const mouseRef = useRef({ x: 300, y: 300 });

  useEffect(() => {
    if (prefersReducedMotion()) {
      setWebglSupported(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });

    if (!gl) {
      setWebglSupported(false);
      return;
    }

    const compileShader = (src: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(VS_SOURCE, gl.VERTEX_SHADER);
    const fs = compileShader(FS_SOURCE, gl.FRAGMENT_SHADER);
    if (!vs || !fs) {
      setWebglSupported(false);
      return;
    }

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setWebglSupported(false);
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0
      ]),
      gl.STATIC_DRAW
    );

    const posAttr = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uBuild = gl.getUniformLocation(program, 'u_buildProgress');

    let animId: number;
    let isVisible = true;
    const startTime = performance.now();
    const smoothMouse = { x: 300, y: 300 };

    const isCoarsePointer = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, isCoarsePointer ? 1.5 : 2);

    const handleResize = () => {
      if (!canvas) return;
      const width = canvas.clientWidth * dpr;
      const height = canvas.clientHeight * dpr;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    handleResize();
    smoothMouse.x = canvas.width * 0.5;
    smoothMouse.y = canvas.height * 0.5;
    mouseRef.current = { x: smoothMouse.x, y: smoothMouse.y };
    window.addEventListener('resize', handleResize);

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * dpr;
      const y = (rect.bottom - e.clientY) * dpr;
      mouseRef.current = { x, y };
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasVisible = isVisible;
          isVisible = entry.isIntersecting;
          if (!wasVisible && isVisible) {
            animId = requestAnimationFrame(render);
          }
        });
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const render = (time: number) => {
      if (!isVisible) return;

      smoothMouse.x += (mouseRef.current.x - smoothMouse.x) * 0.08;
      smoothMouse.y += (mouseRef.current.y - smoothMouse.y) * 0.08;

      const elapsed = (time - startTime) * 0.001;
      const progress = Math.min(1.0, elapsed / 1.4);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, smoothMouse.x, smoothMouse.y);
      gl.uniform1f(uTime, elapsed);
      gl.uniform1f(uBuild, easeOut);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[400px] flex items-center justify-center overflow-hidden select-none"
      aria-label="Interactive Halftone Moon"
    >
      {webglSupported ? (
        <canvas
          ref={canvasRef}
          className="w-full h-full max-w-[540px] max-h-[540px] aspect-square block pointer-events-auto rounded-full"
        />
      ) : (
        <div
          className="w-full max-w-[480px] aspect-square rounded-full shadow-[0_0_60px_rgba(255,138,31,0.25)] flex items-center justify-center border-2 border-dashed border-[rgba(251,241,220,0.3)]"
          style={{
            background:
              'radial-gradient(circle at 35% 35%, var(--color-cream) 0%, rgba(251, 241, 220, 0.4) 50%, rgba(20, 40, 208, 0.8) 85%, transparent 100%)'
          }}
        >
          <span className="font-sans text-[11px] font-bold tracking-[0.12em] uppercase text-saffron bg-black/50 py-1.5 px-3.5 rounded-[16px] backdrop-blur-[8px]">
            ILLUSTRATION
          </span>
        </div>
      )}
    </div>
  );
};
