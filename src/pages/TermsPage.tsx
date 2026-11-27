import React, { useEffect } from 'react';
import styles from './LegalPage.module.css';

export const TermsPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Terms and Conditions | MAXIII';

    let metaDesc = document.querySelector('meta[name="description"]');
    let created = false;
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
      created = true;
    }
    const previousDesc = metaDesc.getAttribute('content');
    metaDesc.setAttribute(
      'content',
      'Read the Terms and Conditions for MAXIII (maxiii.app) governing your access to and use of our services.'
    );

    return () => {
      if (created && metaDesc?.parentNode) {
        metaDesc.parentNode.removeChild(metaDesc);
      } else if (previousDesc && metaDesc) {
        metaDesc.setAttribute('content', previousDesc);
      }
    };
  }, []);

  return (
    <main className={styles.legalWrap} aria-label="Terms and Conditions">
      <div className={styles.inner}>
        <header className={styles.legalHeader}>
          <div className={styles.legalEyebrow}>LEGAL DOCUMENTATION</div>
          <h1 className={styles.legalTitle}>Terms and Conditions</h1>
          <div className={styles.lastUpdated}>Last updated November 24, 2026</div>
        </header>

        <div className={styles.legalBody}>

          {/* Preamble */}
          <div className={styles.paragraph}>
            We are <strong>MAXIII</strong> (&ldquo;<strong>Company</strong>,&rdquo; &ldquo;<strong>we</strong>,&rdquo; &ldquo;<strong>us</strong>,&rdquo; or &ldquo;<strong>our</strong>&rdquo;). We operate the website{' '}
            <a className={styles.inlineLink} href="https://www.maxiii.app" target="_blank" rel="noopener noreferrer">https://www.maxiii.app</a>, the{' '}
            <strong>Maxiii</strong> mobile application, and any related products or services that link to these terms (collectively, the &ldquo;<strong>Services</strong>&rdquo;). You can reach us by email at{' '}
            <a className={styles.inlineLink} href="mailto:privacy@maxiii.app">privacy@maxiii.app</a> or by post at:
          </div>

          <div className={styles.paragraph}>
            These Legal Terms form a binding contract between you and <strong>MAXIII</strong> governing your access to and use of the Services. By accessing the Services, you confirm that you have read, understood, and agreed to these terms. If you do not agree, you must stop using the Services immediately.
          </div>

          <div className={styles.paragraph}>
            Any supplemental policies posted on the Services are incorporated into these terms. We may update these Legal Terms at any time by changing the &ldquo;Last updated&rdquo; date at the top of this document, and you waive any right to receive individual notice of changes. Continuing to use the Services after updates are posted constitutes your acceptance of the revised terms. We recommend saving or printing a copy of these terms for your records.
          </div>

          {/* Table of Contents */}
          <section className={styles.legalSection} id="toc">
            <h2 className={styles.sectionH2}>TABLE OF CONTENTS</h2>
            <div className={styles.tocCard}>
              <ol className={styles.list}>
                <li className={styles.listItem}><a className={styles.inlineLink} href="#s1">OUR SERVICES</a></li>
                <li className={styles.listItem}><a className={styles.inlineLink} href="#s2">INTELLECTUAL PROPERTY RIGHTS</a></li>
                <li className={styles.listItem}><a className={styles.inlineLink} href="#s3">USER REPRESENTATIONS</a></li>
                <li className={styles.listItem}><a className={styles.inlineLink} href="#s4">PROHIBITED ACTIVITIES</a></li>
                <li className={styles.listItem}><a className={styles.inlineLink} href="#s5">USER GENERATED CONTRIBUTIONS</a></li>
                <li className={styles.listItem}><a className={styles.inlineLink} href="#s6">CONTRIBUTION LICENSE</a></li>
                <li className={styles.listItem}><a className={styles.inlineLink} href="#s7">SERVICES MANAGEMENT</a></li>
                <li className={styles.listItem}><a className={styles.inlineLink} href="#s8">TERM AND TERMINATION</a></li>
                <li className={styles.listItem}><a className={styles.inlineLink} href="#s9">MODIFICATIONS AND INTERRUPTIONS</a></li>
                <li className={styles.listItem}><a className={styles.inlineLink} href="#s10">GOVERNING LAW</a></li>
                <li className={styles.listItem}><a className={styles.inlineLink} href="#s11">DISPUTE RESOLUTION</a></li>
                <li className={styles.listItem}><a className={styles.inlineLink} href="#s12">CORRECTIONS</a></li>
                <li className={styles.listItem}><a className={styles.inlineLink} href="#s13">DISCLAIMER</a></li>
                <li className={styles.listItem}><a className={styles.inlineLink} href="#s14">LIMITATIONS OF LIABILITY</a></li>
                <li className={styles.listItem}><a className={styles.inlineLink} href="#s15">INDEMNIFICATION</a></li>
                <li className={styles.listItem}><a className={styles.inlineLink} href="#s16">USER DATA</a></li>
                <li className={styles.listItem}><a className={styles.inlineLink} href="#s17">ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</a></li>
                <li className={styles.listItem}><a className={styles.inlineLink} href="#s18">MISCELLANEOUS</a></li>
                <li className={styles.listItem}><a className={styles.inlineLink} href="#s19">CONTACT US</a></li>
              </ol>
            </div>
          </section>

          {/* Section 1 */}
          <section className={styles.legalSection} id="s1">
            <h2 className={styles.sectionH2}>1. OUR SERVICES</h2>
            <div className={styles.paragraph}>
              The Services are not intended for distribution or use in any jurisdiction where doing so would violate local law or require us to register within that jurisdiction. Users who access the Services from other locations do so on their own initiative and are responsible for complying with applicable local laws.
            </div>
          </section>

          {/* Section 2 */}
          <section className={styles.legalSection} id="s2">
            <h2 className={styles.sectionH2}>2. INTELLECTUAL PROPERTY RIGHTS</h2>

            <div className={styles.paragraph}>
              <strong>Our Intellectual Property:</strong> We own or license all intellectual property in the Services&mdash;including source code, databases, software, website designs, audio, video, text, photos, and graphics (&ldquo;<strong>Content</strong>&rdquo;)&mdash;as well as our trademarks, service marks, and logos (&ldquo;<strong>Marks</strong>&rdquo;). These are protected by global copyright and trademark laws and are provided &ldquo;AS IS&rdquo; solely for your personal, non-commercial use or internal business purposes.
            </div>

            <div className={styles.paragraph}>
              <strong>Your Use of Our Services:</strong> Provided you comply with these terms (including the Prohibited Activities section), we grant you a revocable, non-exclusive, non-transferable license to access the Services and download or print portions of the Content you have properly accessed strictly for personal, non-commercial, or internal business use. You may not copy, reproduce, republish, upload, sell, or commercially exploit any part of the Services, Content, or Marks without our prior written consent. To request permission for other uses, email{' '}
              <a className={styles.inlineLink} href="mailto:privacy@maxiii.app">privacy@maxiii.app</a>. If permission is granted, you must credit us as the owner/licensor and keep all copyright notices visible. All rights not expressly granted remain reserved, and any breach immediately terminates your right to use the Services.
            </div>

            <div className={styles.paragraph}>
              <strong>Your Submissions:</strong> Any questions, comments, suggestions, ideas, or feedback you send us regarding the Services (&ldquo;<strong>Submissions</strong>&rdquo;) become our sole property. You assign all intellectual property rights in Submissions to us, allowing us to use and distribute them freely for any lawful purpose without compensation or credit to you. By submitting content, you confirm it complies with our Prohibited Activities rules, waive moral rights where permitted by law, warrant that you own or have rights to the content and that it is not confidential, and agree to reimburse us for any losses resulting from a breach of these promises.
            </div>
          </section>

          {/* Section 3 */}
          <section className={styles.legalSection} id="s3">
            <h2 className={styles.sectionH2}>3. USER REPRESENTATIONS</h2>
            <div className={styles.paragraph}>
              By using the Services, you confirm that: (1) you have the legal capacity to agree to these terms; (2) you are not a minor in your jurisdiction; (3) you will not access the Services via bots, scripts, or other automated means; (4) you will not use the Services for illegal or unauthorized purposes; and (5) your use will comply with all applicable laws. If you provide false, inaccurate, or incomplete information, we may suspend or terminate your account and block future access.
            </div>
          </section>

          {/* Section 4 */}
          <section className={styles.legalSection} id="s4">
            <h2 className={styles.sectionH2}>4. PROHIBITED ACTIVITIES</h2>
            <div className={styles.paragraph}>
              You may only use the Services for their intended purpose and not for unapproved commercial ventures. You agree not to:
            </div>
            <ul className={styles.list}>
              <li className={styles.listItem}>Systematically scrape or collect data to build a database or directory without written permission.</li>
              <li className={styles.listItem}>Trick, defraud, or mislead us or other users, including attempting to obtain sensitive details like passwords.</li>
              <li className={styles.listItem}>Bypass, disable, or interfere with security features or content-copying restrictions.</li>
              <li className={styles.listItem}>Disparage, tarnish, or harm MAXIII or the Services.</li>
              <li className={styles.listItem}>Use information from the Services to harass, abuse, or harm others.</li>
              <li className={styles.listItem}>Misuse our support services or file false abuse reports.</li>
              <li className={styles.listItem}>Use the Services in violation of any laws or regulations.</li>
              <li className={styles.listItem}>Engage in unauthorized framing of or linking to the Services.</li>
              <li className={styles.listItem}>Upload or transmit viruses, malware, or repetitive spam that disrupts the Services.</li>
              <li className={styles.listItem}>Use automated scripts, bots, or data-mining tools to interact with the Services.</li>
              <li className={styles.listItem}>Remove copyright or proprietary notices from any Content.</li>
              <li className={styles.listItem}>Impersonate another user or use someone else&rsquo;s username.</li>
              <li className={styles.listItem}>Transmit passive data-collection mechanisms (such as spyware, web bugs, or tracking pixels).</li>
              <li className={styles.listItem}>Disrupt or place an undue burden on the Services or connected networks.</li>
              <li className={styles.listItem}>Harass, intimidate, or threaten our employees or agents.</li>
              <li className={styles.listItem}>Attempt to bypass access controls on the Services.</li>
              <li className={styles.listItem}>Copy, adapt, decompile, disassemble, or reverse engineer any software powering the Services.</li>
              <li className={styles.listItem}>Launch or distribute unauthorized automated scripts, spiders, or scrapers (outside standard search engine browsers).</li>
              <li className={styles.listItem}>Use a buying or purchasing agent to make purchases on the Services.</li>
              <li className={styles.listItem}>Collect usernames or email addresses electronically to send unsolicited spam, or create accounts via automated means or false pretenses.</li>
              <li className={styles.listItem}>Use the Services or Content to compete with us or for any commercial, revenue-generating enterprise.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className={styles.legalSection} id="s5">
            <h2 className={styles.sectionH2}>5. USER GENERATED CONTRIBUTIONS</h2>
            <div className={styles.paragraph}>
              While the Services generally do not host public user posts, if we provide features allowing you to submit, upload, or transmit content (&ldquo;<strong>Contributions</strong>&rdquo;), those Contributions may be viewable by others. Whenever you create or submit Contributions, you warrant that you own or have permission to share them and that they do not infringe third-party rights or violate any laws.
            </div>
          </section>

          {/* Section 6 */}
          <section className={styles.legalSection} id="s6">
            <h2 className={styles.sectionH2}>6. CONTRIBUTION LICENSE</h2>
            <div className={styles.paragraph}>
              You agree that we may access, store, process, and use the information and personal data you provide in accordance with our Privacy Policy and your account settings. We do not claim ownership over your Contributions; you retain full ownership and intellectual property rights in them. However, we are not liable for any statements or representations in your Contributions, and you agree to hold us harmless from any legal claims arising from them. Any feedback or suggestions you submit may be used by us freely without compensation.
            </div>
          </section>

          {/* Section 7 */}
          <section className={styles.legalSection} id="s7">
            <h2 className={styles.sectionH2}>7. SERVICES MANAGEMENT</h2>
            <div className={styles.paragraph}>
              We reserve the right (but are not obligated) to monitor the Services for violations of these terms, take legal action against violators, restrict or disable access to any user&rsquo;s Contributions, and manage the Services to protect our rights and maintain proper functionality.
            </div>
          </section>

          {/* Section 8 */}
          <section className={styles.legalSection} id="s8">
            <h2 className={styles.sectionH2}>8. TERM AND TERMINATION</h2>
            <div className={styles.paragraph}>
              These Legal Terms remain active while you use the Services. We may suspend or terminate your access or delete your account at any time, without notice or liability, for any reason&mdash;including any breach of these terms or applicable law. You may also delete your account at any time by contacting us.
            </div>
          </section>

          {/* Section 9 */}
          <section className={styles.legalSection} id="s9">
            <h2 className={styles.sectionH2}>9. MODIFICATIONS AND INTERRUPTIONS</h2>
            <div className={styles.paragraph}>
              We may change, modify, or remove any part of the Services at any time without notice. We do not guarantee uninterrupted availability and are not liable for any downtime, maintenance delays, or service discontinuations.
            </div>
          </section>

          {/* Section 10 */}
          <section className={styles.legalSection} id="s10">
            <h2 className={styles.sectionH2}>10. GOVERNING LAW</h2>
            <div className={styles.paragraph}>
              These Legal Terms and your use of the Services are governed by the laws of India.
            </div>
          </section>

          {/* Section 11 */}
          <section className={styles.legalSection} id="s11">
            <h2 className={styles.sectionH2}>11. DISPUTE RESOLUTION</h2>
            <div className={styles.paragraph}>
              Any dispute arising out of these Legal Terms or the Services will first be addressed through good-faith informal negotiations for at least 30 days after written notice. If unresolved, the dispute will be subject to the exclusive jurisdiction of the courts in Dindigul, Tamil Nadu, India.
            </div>
          </section>

          {/* Section 12 */}
          <section className={styles.legalSection} id="s12">
            <h2 className={styles.sectionH2}>12. CORRECTIONS</h2>
            <div className={styles.paragraph}>
              The Services may occasionally contain typographical errors, inaccuracies, or omissions regarding descriptions, pricing, or availability. We reserve the right to correct any errors and update information at any time without prior notice.
            </div>
          </section>

          {/* Section 13 */}
          <section className={styles.legalSection} id="s13">
            <h2 className={styles.sectionH2}>13. DISCLAIMER</h2>
            <div className={styles.paragraph}>
              The Services are provided on an &ldquo;AS-IS&rdquo; and &ldquo;AS-AVAILABLE&rdquo; basis at your sole risk. To the fullest extent permitted by law, we disclaim all express or implied warranties, including merchantability, fitness for a particular purpose, and non-infringement. We are not liable for content accuracy, personal injury or property damage resulting from your use of the Services, unauthorized server access, or service interruptions.
            </div>
          </section>

          {/* Section 14 */}
          <section className={styles.legalSection} id="s14">
            <h2 className={styles.sectionH2}>14. LIMITATIONS OF LIABILITY</h2>
            <div className={styles.paragraph}>
              To the maximum extent permitted by law, MAXIII and its directors, employees, or agents will not be liable for any indirect, incidental, special, consequential, or punitive damages&mdash;including lost profits, data loss, or business interruption&mdash;arising from your use or inability to use the Services. Our total liability for any cause of action is limited to the amount you paid to MAXIII in the six months preceding the claim, or INR 100 (whichever is greater).
            </div>
          </section>

          {/* Section 15 */}
          <section className={styles.legalSection} id="s15">
            <h2 className={styles.sectionH2}>15. INDEMNIFICATION</h2>
            <div className={styles.paragraph}>
              You agree to defend, indemnify, and hold harmless MAXIII and its officers, directors, employees, and agents from any claims, liabilities, damages, judgments, or expenses (including reasonable legal fees) arising out of your use of the Services, your Contributions, or your breach of these Legal Terms.
            </div>
          </section>

          {/* Section 16 */}
          <section className={styles.legalSection} id="s16">
            <h2 className={styles.sectionH2}>16. USER DATA</h2>
            <div className={styles.paragraph}>
              We will maintain certain data you transmit to the Services for the purpose of managing the Services, as well as data relating to your use of the Services. You are solely responsible for all data you transmit or that relates to any activity you have undertaken using the Services. We shall have no liability to you for any loss or corruption of such data, and you hereby waive any right of action against us arising from any such loss or corruption.
            </div>
          </section>

          {/* Section 17 */}
          <section className={styles.legalSection} id="s17">
            <h2 className={styles.sectionH2}>17. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</h2>
            <div className={styles.paragraph}>
              Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications and agree that all agreements, notices, disclosures, and other communications we provide electronically satisfy any legal requirement that such communications be in writing. You agree to the use of electronic signatures, contracts, orders, and other records, and to electronic delivery of notices, policies, and records of transactions initiated or completed by us or through the Services. You hereby waive any rights or requirements under any statutes or regulations in any jurisdiction requiring an original signature or delivery or retention of non-electronic records.
            </div>
          </section>

          {/* Section 18 */}
          <section className={styles.legalSection} id="s18">
            <h2 className={styles.sectionH2}>18. MISCELLANEOUS</h2>
            <div className={styles.paragraph}>
              These Legal Terms and any policies or operating rules posted by us on the Services or in respect to the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver of such right or provision. These Legal Terms operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control. If any provision or part of a provision of these Legal Terms is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Legal Terms and does not affect the validity and enforceability of any remaining provisions.
            </div>
          </section>

          {/* Section 19 */}
          <section className={styles.legalSection} id="s19">
            <h2 className={styles.sectionH2}>19. CONTACT US</h2>
            <div className={styles.paragraph}>
              In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:
            </div>
            <div className={styles.addressBox}>
              <strong>MAXIII</strong><br />
              Batlagundu Road, Begampur<br />
              Dindigul, Tamil Nadu 624002<br />
              India<br />
              <a className={styles.inlineLink} href="mailto:privacy@maxiii.app">privacy@maxiii.app</a>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
};
