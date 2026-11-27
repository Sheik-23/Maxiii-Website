/**
 * MAXIII Automated Smoke & Compliance Checker
 * Verifies all hard constraints, zero pricing, and brand rules.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

let failures = 0;
let passed = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passed++;
  } else {
    console.error(`[FAIL] ${testName} ${details ? '- ' + details : ''}`);
    failures++;
  }
}

console.log('=== RUNNING REVISED MAXIII QA COMPLIANCE SUITE ===\n');

// 1. Check critical files exist
const requiredFiles = [
  'index.html',
  'package.json',
  'tsconfig.json',
  'vite.config.ts',
  'vercel.json',
  'public/robots.txt',
  'public/sitemap.xml',
  'public/manifest.json',
  'public/og-image.svg',
  'public/favicon.svg',
  'public/logo.png',
  'src/App.tsx',
  'src/main.tsx',
  'src/index.css',
  'src/scenes/HeroScene/HeroScene.tsx',
  'src/scenes/MacrosScene/MacrosScene.tsx',
  'src/scenes/HomeFoodScene/HomeFoodScene.tsx',
  'src/scenes/AdaptiveTargetScene/AdaptiveTargetScene.tsx',
  'src/scenes/TrainingFloorScene/TrainingFloorScene.tsx',
  'src/scenes/BarcodeScannerScene/BarcodeScannerScene.tsx',
  'src/scenes/GymwearScannerScene/GymwearScannerScene.tsx',
  'src/scenes/JoinScene/JoinScene.tsx',
  'src/pages/TrainingPage.tsx',
  'src/pages/ScannerPage.tsx',
  'src/components/HalftoneMoon/HalftoneMoon.tsx',
  'src/components/Logo/MaxiiiLogo.tsx',
  'src/components/Nav/Navbar.tsx',
  'src/components/Nav/MobileMenu.tsx',
  'src/components/Marquee/MarqueeRibbon.tsx',
  'src/components/Cursor/CustomCursor.tsx',
  'src/components/Grain/FilmOverlay.tsx',
  'src/components/Preloader/Preloader.tsx',
  'src/components/WaitlistForm/WaitlistForm.tsx',
  'src/motion/tokens.ts',
  'src/components/Poster/PosterLayer.tsx',
  'src/components/Device/DeviceFrame3D.tsx',
  'src/components/WebGL/WebGLHeroMoon.tsx',
  'src/components/PosterStrip/PosterStrip.tsx',
  'src/components/Button/MagneticButton.tsx',
  'api/waitlist.ts',
  'AUDIT.md',
  'ASSETS.md',
  'DESIGN.md',
  'README.md'
];

requiredFiles.forEach(file => {
  assert(fs.existsSync(path.join(ROOT, file)), `File exists: ${file}`);
});

// 2. Strict Content Scan: Scan user-facing source files
const scanDirs = ['src', 'public', 'api'];

function getAllFiles(dir, extList = ['.ts', '.tsx', '.js', '.jsx', '.html', '.json', '.css']) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, extList));
    } else if (extList.includes(path.extname(file))) {
      results.push(fullPath);
    }
  });
  return results;
}

let allSourceFiles = [];
scanDirs.forEach(d => {
  const p = path.join(ROOT, d);
  if (fs.existsSync(p)) allSourceFiles = allSourceFiles.concat(getAllFiles(p));
});
allSourceFiles.push(path.join(ROOT, 'index.html'));

console.log(`\nScanning ${allSourceFiles.length} files for strict compliance...`);

// Forbidden patterns across all user-facing code
const FORBIDDEN_RULES = [
  { pattern: /₹/, name: 'Rupee symbol (₹)' },
  { pattern: /\$\d+/, name: 'Dollar amount ($XX)' },
  { pattern: /per month/i, name: '"per month" wording' },
  { pattern: /subscription plan/i, name: '"subscription plan" wording' },
  { pattern: /pricing tier/i, name: '"pricing tier" wording' },
  { pattern: /maxeee/i, name: 'Phonetic spelling "maxeee"' },
  { pattern: /\bAI\b/i, name: 'Word "AI"' },
  { pattern: /ai coach/i, name: '"AI coach" claim' },
  { pattern: /ICMR/i, name: '"ICMR" claim' },
  { pattern: /IFCT/i, name: '"IFCT" claim' },
  { pattern: /paywall/i, name: 'Word "paywall"' },
  { pattern: /zero payment/i, name: 'Phrase "zero payment"' },
  { pattern: /upsell/i, name: 'Word "upsell"' },
  { pattern: /HealthifyMe/i, name: 'Competitor "HealthifyMe"' },
  { pattern: /tadka/i, name: 'Regional slang "tadka"' },
  { pattern: /phulka/i, name: 'Regional slang "phulka"' },
  { pattern: /katori/i, name: 'Regional word "katori"' },
  { pattern: /ladle/i, name: 'Word "ladle"' },
  { pattern: /\bdal\b/i, name: 'Word "dal"' },
  { pattern: /roti/i, name: 'Word "roti"' },
  { pattern: /\btamil\b(?!\s*nadu)/i, name: 'Language "Tamil"' },
  { pattern: /hindi/i, name: 'Language "Hindi"' },
  { pattern: /telugu/i, name: 'Language "Telugu"' },
  { pattern: /languages/i, name: 'Word "languages"' },
  { pattern: /\bfour\b/i, name: 'Word "four"' }
];

allSourceFiles.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  FORBIDDEN_RULES.forEach(rule => {
    const match = content.match(rule.pattern);
    assert(!match, `No ${rule.name} in ${path.relative(ROOT, filePath)}`, match ? `Matched "${match[0]}"` : '');
  });
});

// 2b. Banned words and deleted labels across user-facing scene/page files
const BANNED_COPY_RULES = [
  { pattern: /\binstant\b/i, name: 'Banned word "instant"' },
  { pattern: /\blightning\b/i, name: 'Banned word "lightning"' },
  { pattern: /\bverified\b/i, name: 'Banned word "verified"' },
  { pattern: /in seconds/i, name: 'Banned phrase "in seconds"' },
  { pattern: /\bprecision\b/i, name: 'Banned word "precision"' },
  { pattern: /\bbenchmark\b/i, name: 'Banned word "benchmark"' },
  { pattern: /\bfriction\b/i, name: 'Banned word "friction"' },
  { pattern: /->/, name: 'Arrow "->"' },
  { pattern: /Poster archive/i, name: 'Label "Poster archive"' },
  { pattern: /Plate I to VI/i, name: 'Label "Plate I to VI"' },
  { pattern: /Foundational archives/i, name: 'Label "Foundational archives"' },
  { pattern: /Maxiii archive/i, name: 'Label "Maxiii archive"' },
  { pattern: /Macro specification/i, name: 'Label "Macro specification"' },
  { pattern: /Metabolic response/i, name: 'Label "Metabolic response"' },
  { pattern: /Measured yield/i, name: 'Label "Measured yield"' },
  { pattern: /Calibrated for lifters/i, name: 'Label "Calibrated for lifters"' },
  { pattern: /Instant nutrition capture/i, name: 'Label "Instant nutrition capture"' }
];

const copySceneFiles = getAllFiles(path.join(ROOT, 'src/scenes'));
const copyPageFiles = getAllFiles(path.join(ROOT, 'src/pages'));
const copyComponentFiles = [
  path.join(ROOT, 'src/components/PosterStrip/PosterStrip.tsx'),
  path.join(ROOT, 'src/components/Footer/Footer.tsx'),
  path.join(ROOT, 'src/components/Nav/Navbar.tsx'),
  path.join(ROOT, 'src/components/Nav/MobileMenu.tsx'),
  path.join(ROOT, 'src/components/Marquee/MarqueeRibbon.tsx')
];

[...copySceneFiles, ...copyPageFiles, ...copyComponentFiles].forEach(filePath => {
  if (filePath.endsWith('.tsx')) {
    const content = fs.readFileSync(filePath, 'utf8');
    BANNED_COPY_RULES.forEach(rule => {
      const match = content.match(rule.pattern);
      assert(!match, `No ${rule.name} in ${path.relative(ROOT, filePath)}`, match ? `Matched "${match[0]}"` : '');
    });
  }
});

// 3. Confirm exact required trial line exists in Join Scene
const joinSceneContent = fs.readFileSync(path.join(ROOT, 'src/scenes/JoinScene/JoinScene.tsx'), 'utf8');
assert(
  joinSceneContent.includes('Try Maxiii and maximise your gains'),
  'JoinScene contains updated line: "Try Maxiii and maximise your gains"'
);

// 4. Confirm HomeFoodScene has exact required text
const homeFoodContent = fs.readFileSync(path.join(ROOT, 'src/scenes/HomeFoodScene/HomeFoodScene.tsx'), 'utf8');
assert(
  homeFoodContent.includes('Home food.'),
  'HomeFoodScene contains exact headline: "Home food."'
);
assert(
  homeFoodContent.includes('Log ingredients raw or cooked. MAXIII accounts for cooking changes, including oil and ghee, so your numbers reflect the plate in front of you.'),
  'HomeFoodScene contains exact body text'
);

// 5. Confirm required unchanged lines
const heroContent = fs.readFileSync(path.join(ROOT, 'src/scenes/HeroScene/HeroScene.tsx'), 'utf8');
assert(heroContent.includes('Count what you actually eat.'), 'Hero contains unchanged line: "Count what you actually eat."');
assert(
  heroContent.includes('every calorie and macro counted properly, so you know exactly what'),
  'Hero contains updated catchy text'
);

const macrosContent = fs.readFileSync(path.join(ROOT, 'src/scenes/MacrosScene/MacrosScene.tsx'), 'utf8');
assert(macrosContent.includes('Every macro, from the first log.'), 'MacrosScene contains unchanged line: "Every macro, from the first log."');
assert(
  macrosContent.includes('Protein, carbohydrates, fibre and fat are tracked on every meal, with nothing hidden in a separate report.'),
  'MacrosScene contains updated text'
);

const adaptiveContent = fs.readFileSync(path.join(ROOT, 'src/scenes/AdaptiveTargetScene/AdaptiveTargetScene.tsx'), 'utf8');
assert(adaptiveContent.includes('Your target moves when you do.'), 'AdaptiveTargetScene contains unchanged line: "Your target moves when you do."');
assert(
  adaptiveContent.includes('Your daily calorie target adjusts as your weight trend changes, so the plan keeps pace with your progress.'),
  'AdaptiveTargetScene contains updated text'
);

const trainingContent = fs.readFileSync(path.join(ROOT, 'src/scenes/TrainingFloorScene/TrainingFloorScene.tsx'), 'utf8');
assert(trainingContent.includes('Fuel the lift') || trainingContent.includes('FUEL THE LIFT'), 'TrainingFloorScene contains stacked Anton text: "Fuel the lift"');
assert(
  !trainingContent.includes('A clean, dark interface for logging between sets.'),
  'TrainingFloorScene does not contain removed line: "A clean, dark interface for logging between sets."'
);

const scannerContent = fs.readFileSync(path.join(ROOT, 'src/scenes/BarcodeScannerScene/BarcodeScannerScene.tsx'), 'utf8');
assert(scannerContent.includes('Scan it.'), 'BarcodeScannerScene contains giant title: "Scan it."');
assert(
  scannerContent.includes('Point your camera at a barcode and add the food to your day.'),
  'BarcodeScannerScene contains updated text'
);

const footerContent = fs.readFileSync(path.join(ROOT, 'src/components/Footer/Footer.tsx'), 'utf8');
assert(footerContent.toLowerCase().includes('maximise your gains'), 'Footer contains "maximise your gains"');
assert(!footerContent.includes('Product'), 'Footer does not contain "Product" list');
assert(!footerContent.includes('Count what you actually eat'), 'Footer does not contain second "Count what you actually eat" line');

const homePageContent = fs.readFileSync(path.join(ROOT, 'src/pages/HomePage.tsx'), 'utf8');
assert(!homePageContent.includes('<PosterStrip'), 'HomePage has removed PosterStrip (Page 3 deleted completely)');
assert(!homePageContent.includes('offset: -70'), 'HomePage does not contain offset: -70');
assert(homePageContent.includes('offset: 0'), 'HomePage contains offset: 0 for flush poster alignment');

const transitionLinkContent = fs.readFileSync(path.join(ROOT, 'src/transitions/TransitionLink.tsx'), 'utf8');
assert(!transitionLinkContent.includes('offset: -70'), 'TransitionLink does not contain offset: -70');
assert(transitionLinkContent.includes('offset: 0'), 'TransitionLink contains offset: 0 for flush poster alignment');

const transitionProviderContent = fs.readFileSync(path.join(ROOT, 'src/transitions/TransitionProvider.tsx'), 'utf8');
assert(transitionProviderContent.includes('offset: 0'), 'TransitionProvider contains offset: 0 for flush poster alignment');

// Features Page validation
const featuresContent = fs.readFileSync(path.join(ROOT, 'src/pages/FeaturesPage.tsx'), 'utf8');
assert(featuresContent.includes('Everything in MAXIII, in one place.'), 'Features hero contains: "Everything in MAXIII, in one place."');
assert(featuresContent.includes('Protein, carbohydrates, fibre and fat on every meal, from the first log.'), 'Features contains Feature 1 copy');
assert(featuresContent.includes('Log ingredients raw or cooked, with cooking changes and oil and ghee accounted for.'), 'Features contains Feature 2 copy');
assert(featuresContent.includes('The daily calorie target adjusts as the weight trend changes.'), 'Features contains Feature 3 copy');
assert(featuresContent.includes('Scan packaged foods to log them faster.'), 'Features contains Feature 4 copy');
assert(featuresContent.includes('Set up the app around how you eat and train.'), 'Features contains Feature 5 copy');
assert(featuresContent.includes('A clean, dark interface for logging between sets.'), 'Features contains Feature 6 copy');
assert(!featuresContent.includes('A curated marketplace for people who train.'), 'Features does not contain removed Gym wear copy');
assert(!featuresContent.includes('Gym wear.'), 'Features does not contain removed Gym wear title');
assert(!featuresContent.includes('14 days'), 'Features closing poster does not contain trial line');

// 6. Confirm JSON-LD has no "offers" or price
const indexHtmlContent = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
assert(!indexHtmlContent.includes('"offers"'), 'JSON-LD has no "offers" property');
assert(!indexHtmlContent.includes('"price"'), 'JSON-LD has no "price" property');

// 7. Confirm Ribbon content has clean words without forbidden terms
const ribbonContent = fs.readFileSync(path.join(ROOT, 'src/components/Marquee/MarqueeRibbon.tsx'), 'utf8');
assert(
  ribbonContent.includes('Carbohydrates, fibre, protein, fat') && ribbonContent.includes('Raw to cooked yield'),
  'MarqueeRibbon contains clean feature words without regional/forbidden terms'
);

// 8. Confirm CTA is consistently "Join the waitlist"
const navbarContent = fs.readFileSync(path.join(ROOT, 'src/components/Nav/Navbar.tsx'), 'utf8');
assert(navbarContent.includes('Join the waitlist'), 'Navbar CTA is "Join the waitlist"');
assert(navbarContent.includes('isLegalPage'), 'Navbar has fixed logic for legal pages (terms & privacy)');
assert(navbarContent.includes('maxiii-logo-transparent.png') || navbarContent.includes('maxiii-cream.png'), 'Navbar uses maxiii logo asset');

// Verify screenshots are used for iOS mockups
assert(fs.existsSync(path.join(ROOT, 'src/assets/screenshots/IMG_1352.PNG')), 'IMG_1352.PNG exists in src/assets/screenshots');
assert(fs.existsSync(path.join(ROOT, 'src/assets/screenshots/IMG_1353.PNG')), 'IMG_1353.PNG exists in src/assets/screenshots');

const deviceFrameContent = fs.readFileSync(path.join(ROOT, 'src/components/Device/DeviceFrame3D.tsx'), 'utf8');
assert(deviceFrameContent.includes('IMG_1352.PNG'), 'DeviceFrame3D uses screenshot as default screenSrc');

const macrosSceneContent = fs.readFileSync(path.join(ROOT, 'src/scenes/MacrosScene/MacrosScene.tsx'), 'utf8');
assert(macrosSceneContent.includes('IMG_1352.PNG'), 'MacrosScene uses IMG_1352.PNG for iOS mockup');

const homeFoodSceneContent = fs.readFileSync(path.join(ROOT, 'src/scenes/HomeFoodScene/HomeFoodScene.tsx'), 'utf8');
assert(homeFoodSceneContent.includes('IMG_1353.PNG'), 'HomeFoodScene uses IMG_1353.PNG for iOS mockup');

// 9. Built HTML & Assets Check: fail if katori, ladle, dal, roti, Tamil, Hindi, Telugu, languages, or four appear,
// or if "14 days" appears more than once site-wide.
const NEW_FORBIDDEN_TERMS = [
  { pattern: /katori/i, name: 'Regional word "katori"' },
  { pattern: /ladle/i, name: 'Word "ladle"' },
  { pattern: /\bdal\b/i, name: 'Word "dal"' },
  { pattern: /roti/i, name: 'Word "roti"' },
  { pattern: /\btamil\b(?!\s*nadu)/i, name: 'Language "Tamil"' },
  { pattern: /hindi/i, name: 'Language "Hindi"' },
  { pattern: /telugu/i, name: 'Language "Telugu"' },
  { pattern: /languages/i, name: 'Word "languages"' },
  { pattern: /\bfour\b/i, name: 'Word "four"' }
];

const distDir = path.join(ROOT, 'dist');
if (fs.existsSync(distDir)) {
  // Built HTML check across all rules
  const builtHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
  FORBIDDEN_RULES.forEach(rule => {
    const match = builtHtml.match(rule.pattern);
    assert(!match, `Built HTML: No ${rule.name} in dist/index.html`, match ? `Matched "${match[0]}"` : '');
  });

  // Check application bundle for new forbidden terms
  const appAssets = getAllFiles(path.join(distDir, 'assets'), ['.js']);

  let total14DaysCount = (builtHtml.match(/14 days/gi) || []).length;

  appAssets.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.match(/14 days/gi);
    if (matches) total14DaysCount += matches.length;

    // Verify application code has zero forbidden terms from the copy fix
    NEW_FORBIDDEN_TERMS.forEach(rule => {
      const match = content.match(rule.pattern);
      assert(!match, `Built asset: No ${rule.name} in ${path.relative(ROOT, file)}`, match ? `Matched "${match[0]}"` : '');
    });
  });

  assert(
    total14DaysCount <= 1,
    `"14 days" appears no more than once site-wide in built output (found ${total14DaysCount})`,
    `Count: ${total14DaysCount}`
  );
}

console.log('\n==========================================');
console.log(`QA RESULTS: ${passed} PASSED, ${failures} FAILED`);
console.log('==========================================');

if (failures > 0) {
  process.exit(1);
} else {
  console.log('\nAll revised QA requirements verified successfully!');
}
