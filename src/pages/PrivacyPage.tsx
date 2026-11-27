import React, { useEffect } from 'react';
import styles from './LegalPage.module.css';

export const PrivacyPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Privacy Policy | MAXIII';

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
      'Read the Privacy Policy for MAXIII (maxiii.app) to understand how we collect, process, protect, and handle your data.'
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
    <main className={styles.legalWrap} aria-label="Privacy Policy">
      <div className={styles.inner}>
        <header className={styles.legalHeader}>
          <div className={styles.legalEyebrow}>LEGAL DOCUMENTATION</div>
          <h1 className={styles.legalTitle}>PRIVACY POLICY</h1>
          <div className={styles.lastUpdated}>Last updated November 24, 2026</div>
        </header>

        <div className={styles.legalBody}>
          <div className={styles.paragraph}>
            This Privacy Notice for MAXIII (&ldquo;<strong>we</strong>,&rdquo; &ldquo;<strong>us</strong>,&rdquo; or &ldquo;<strong>our</strong>&rdquo;), describes how and why we might access, collect, store, use, and/or share (&ldquo;<strong>process</strong>&rdquo;) your personal information when you use our services (&ldquo;<strong>Services</strong>&rdquo;), including when you:
          </div>

          <ul className={styles.list}>
            <li className={styles.listItem}>
              Visit our website at <a className={styles.inlineLink} target="_blank" rel="noopener noreferrer" href="https://www.maxiii.app">https://www.maxiii.app</a> or any website of ours that links to this Privacy Notice
            </li>
            <li className={styles.listItem}>
              Download and use our mobile application (Maxiii), or any other application of ours that links to this Privacy Notice
            </li>
            <li className={styles.listItem}>
              Engage with us in other related ways, including any marketing or events
            </li>
          </ul>

          <div className={styles.paragraph}>
            <strong>Questions or concerns? </strong>Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <a className={styles.inlineLink} target="_blank" rel="noopener noreferrer" href="mailto:privacy@maxiii.app">privacy@maxiii.app</a>.
          </div>

          <section className={styles.legalSection}>
            <h2 className={styles.sectionH2}>SUMMARY OF KEY POINTS</h2>
            <div className={styles.paragraph}>
              <em>This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our <a className={styles.inlineLink} href="#toc">table of contents</a> below to find the section you are looking for.</em>
            </div>

            <div className={styles.paragraph}>
              <strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use. Learn more about <a className={styles.inlineLink} href="#personalinfo">personal information you disclose to us</a>.
            </div>

            <div className={styles.paragraph}>
              <strong>Do we process any sensitive personal information? </strong>Some of the information may be considered &ldquo;special&rdquo; or &ldquo;sensitive&rdquo; in certain jurisdictions, for example your racial or ethnic origins, sexual orientation, and religious beliefs. We may process sensitive personal information when necessary with your consent or as otherwise permitted by applicable law. Learn more about <a className={styles.inlineLink} href="#sensitiveinfo">sensitive information we process</a>.
            </div>

            <div className={styles.paragraph}>
              <strong>Do we collect any information from third parties?</strong> We do not collect any information from third parties.
            </div>

            <div className={styles.paragraph}>
              <strong>How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. Learn more about <a className={styles.inlineLink} href="#infouse">how we process your information</a>.
            </div>

            <div className={styles.paragraph}>
              <strong>In what situations and with which types of parties do we share personal information?</strong> We may share information in specific situations and with specific categories of third parties. Learn more about <a className={styles.inlineLink} href="#whoshare">when and with whom we share your personal information</a>.
            </div>

            <div className={styles.paragraph}>
              <strong>How do we keep your information safe?</strong> We have adequate organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Learn more about <a className={styles.inlineLink} href="#infosafe">how we keep your information safe</a>.
            </div>

            <div className={styles.paragraph}>
              <strong>What are your rights?</strong> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. Learn more about <a className={styles.inlineLink} href="#privacyrights">your privacy rights</a>.
            </div>

            <div className={styles.paragraph}>
              <strong>How do you exercise your rights?</strong> The easiest way to exercise your rights is by visiting <a className={styles.inlineLink} target="_blank" rel="noopener noreferrer" href="https://maxiii.app/contact">https://maxiii.app/contact</a>, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.
            </div>

            <div className={styles.paragraph}>
              Want to learn more about what we do with any information we collect? <a className={styles.inlineLink} href="#toc">Review the Privacy Notice in full</a>.
            </div>
          </section>

          <nav id="toc" className={styles.tocCard} aria-label="Table of Contents">
            <h2 className={styles.tocTitle}>TABLE OF CONTENTS</h2>
            <ol className={styles.tocList}>
              <li className={styles.tocItem}><a className={styles.tocLink} href="#infocollect">1. WHAT INFORMATION DO WE COLLECT?</a></li>
              <li className={styles.tocItem}><a className={styles.tocLink} href="#infouse">2. HOW DO WE PROCESS YOUR INFORMATION?</a></li>
              <li className={styles.tocItem}><a className={styles.tocLink} href="#legalbases">3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?</a></li>
              <li className={styles.tocItem}><a className={styles.tocLink} href="#whoshare">4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</a></li>
              <li className={styles.tocItem}><a className={styles.tocLink} href="#cookies">5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</a></li>
              <li className={styles.tocItem}><a className={styles.tocLink} href="#sociallogins">6. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</a></li>
              <li className={styles.tocItem}><a className={styles.tocLink} href="#intltransfers">7. IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?</a></li>
              <li className={styles.tocItem}><a className={styles.tocLink} href="#inforetain">8. HOW LONG DO WE KEEP YOUR INFORMATION?</a></li>
              <li className={styles.tocItem}><a className={styles.tocLink} href="#infosafe">9. HOW DO WE KEEP YOUR INFORMATION SAFE?</a></li>
              <li className={styles.tocItem}><a className={styles.tocLink} href="#infominors">10. DO WE COLLECT INFORMATION FROM MINORS?</a></li>
              <li className={styles.tocItem}><a className={styles.tocLink} href="#privacyrights">11. WHAT ARE YOUR PRIVACY RIGHTS?</a></li>
              <li className={styles.tocItem}><a className={styles.tocLink} href="#DNT">12. CONTROLS FOR DO-NOT-TRACK FEATURES</a></li>
              <li className={styles.tocItem}><a className={styles.tocLink} href="#uslaws">13. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</a></li>
              <li className={styles.tocItem}><a className={styles.tocLink} href="#clausea">14. USERS IN INDIA</a></li>
              <li className={styles.tocItem}><a className={styles.tocLink} href="#policyupdates">15. DO WE MAKE UPDATES TO THIS NOTICE?</a></li>
              <li className={styles.tocItem}><a className={styles.tocLink} href="#contact">16. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a></li>
              <li className={styles.tocItem}><a className={styles.tocLink} href="#request">17. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</a></li>
            </ol>
          </nav>

          <section id="infocollect" className={styles.legalSection}>
            <h2 className={styles.sectionH2}>1. WHAT INFORMATION DO WE COLLECT?</h2>
            <div id="personalinfo" className={styles.subSection}>
              <h3 className={styles.sectionH3}>Personal information you disclose to us</h3>
              <div className={styles.inShort}>
                <strong><em>In Short: </em></strong><em>We collect personal information that you provide to us.</em>
              </div>
            </div>

            <div className={styles.paragraph}>
              We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
            </div>

            <div className={styles.paragraph}>
              <strong>Personal Information Provided by You.</strong> The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:
            </div>

            <ul className={styles.list}>
              <li className={styles.listItem}>email addresses</li>
              <li className={styles.listItem}>names</li>
              <li className={styles.listItem}>phone numbers</li>
              <li className={styles.listItem}>usernames</li>
              <li className={styles.listItem}>passwords</li>
              <li className={styles.listItem}>contact or authentication data</li>
              <li className={styles.listItem}>billing addresses</li>
              <li className={styles.listItem}>debit/credit card numbers</li>
              <li className={styles.listItem}>mailing addresses</li>
              <li className={styles.listItem}>contact preferences</li>
            </ul>

            <div id="sensitiveinfo" className={styles.subSection}>
              <h3 className={styles.sectionH3}>Sensitive Information</h3>
              <div className={styles.paragraph}>
                When necessary, with your consent or as otherwise permitted by applicable law, we process the following categories of sensitive information:
              </div>
            </div>

            <ul className={styles.list}>
              <li className={styles.listItem}>health data</li>
              <li className={styles.listItem}>financial data</li>
              <li className={styles.listItem}>biometric data</li>
            </ul>

            <div className={styles.paragraph}>
              <strong>Payment Data.</strong> We may collect data necessary to process your payment if you choose to make purchases, such as your payment instrument number, and the security code associated with your payment instrument. All payment data is handled and stored by Apple (App Store subscriptions), Google Play (Play subscriptions), RevenueCat (subscription management) and Razorpay (marketplace payments). You may find their privacy notice link(s) here: <a className={styles.inlineLink} target="_blank" rel="noopener noreferrer" href="https://www.apple.com/legal/privacy/">https://www.apple.com/legal/privacy/</a>, <a className={styles.inlineLink} target="_blank" rel="noopener noreferrer" href="https://policies.google.com/privacy">https://policies.google.com/privacy</a>, <a className={styles.inlineLink} target="_blank" rel="noopener noreferrer" href="https://www.revenuecat.com/privacy/">https://www.revenuecat.com/privacy/</a> and <a className={styles.inlineLink} target="_blank" rel="noopener noreferrer" href="https://razorpay.com/privacy/">https://razorpay.com/privacy/</a>.
            </div>

            <div className={styles.paragraph}>
              <strong>Social Media Login Data. </strong>We may provide you with the option to register with us using your existing social media account details, like your Facebook, X, or other social media account. If you choose to register in this way, we will collect certain profile information about you from the social media provider, as described in the section called &ldquo;<a className={styles.inlineLink} href="#sociallogins">HOW DO WE HANDLE YOUR SOCIAL LOGINS?</a>&rdquo; below.
            </div>

            <div className={styles.paragraph}>
              <strong>Application Data.</strong> If you use our application(s), we also may collect the following information if you choose to provide us with access or permission:
            </div>

            <ul className={styles.list}>
              <li className={styles.listItem}>
                <em>Mobile Device Access.</em> We may request access or permission to certain features from your mobile device, including your mobile device&apos;s sensors, camera, and other features. If you wish to change our access or permissions, you may do so in your device&apos;s settings.
              </li>
              <li className={styles.listItem}>
                <em>Mobile Device Data.</em> We automatically collect device information (such as your mobile device ID, model, and manufacturer), operating system, version information and system configuration information, device and application identification numbers, browser type and version, hardware model Internet service provider and/or mobile carrier, and Internet Protocol (IP) address (or proxy server). If you are using our application(s), we may also collect information about the phone network associated with your mobile device, your mobile device&rsquo;s operating system or platform, the type of mobile device you use, your mobile device&rsquo;s unique device ID, and information about the features of our application(s) you accessed.
              </li>
              <li className={styles.listItem}>
                <em>Push Notifications.</em> We may request to send you push notifications regarding your account or certain features of the application(s). If you wish to opt out from receiving these types of communications, you may turn them off in your device&apos;s settings.
              </li>
            </ul>

            <div className={styles.paragraph}>
              This information is primarily needed to maintain the security and operation of our application(s), for troubleshooting, and for our internal analytics and reporting purposes.
            </div>

            <div className={styles.paragraph}>
              All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.
            </div>

            <div className={styles.subSection}>
              <h3 className={styles.sectionH3}>Information automatically collected</h3>
              <div className={styles.inShort}>
                <strong><em>In Short: </em></strong><em>Some information &mdash; such as your Internet Protocol (IP) address and/or browser and device characteristics &mdash; is collected automatically when you visit our Services.</em>
              </div>
            </div>

            <div className={styles.paragraph}>
              We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.
            </div>

            <div className={styles.paragraph}>
              Like many businesses, we also collect information through cookies and similar technologies. You can find out more about this in our Cookie Notice: <a className={styles.inlineLink} target="_blank" rel="noopener noreferrer" href="https://maxiii.app/cookie-policy">https://maxiii.app/cookie-policy</a>.
            </div>

            <div className={styles.paragraph}>The information we collect includes:</div>

            <ul className={styles.list}>
              <li className={styles.listItem}>
                <em>Log and Usage Data.</em> Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type, and settings and information about your activity in the Services (such as the date/time stamps associated with your usage, pages and files viewed, searches, and other actions you take such as which features you use), device event information (such as system activity, error reports (sometimes called &ldquo;crash dumps&rdquo;), and hardware settings).
              </li>
              <li className={styles.listItem}>
                <em>Device Data.</em> We collect device data such as information about your computer, phone, tablet, or other device you use to access the Services. Depending on the device used, this device data may include information such as your IP address (or proxy server), device and application identification numbers, location, browser type, hardware model, Internet service provider and/or mobile carrier, operating system, and system configuration information.
              </li>
            </ul>

            <div className={styles.subSection}>
              <h3 className={styles.sectionH3}>Google API</h3>
              <div className={styles.paragraph}>
                Our use of information received from Google APIs will adhere to <a className={styles.inlineLink} href="https://developers.google.com/terms/api-services-user-data-policy" rel="noopener noreferrer" target="_blank">Google API Services User Data Policy</a>, including the <a className={styles.inlineLink} href="https://developers.google.com/terms/api-services-user-data-policy#limited-use" rel="noopener noreferrer" target="_blank">Limited Use requirements</a>.
              </div>
            </div>
          </section>

          <section id="infouse" className={styles.legalSection}>
            <h2 className={styles.sectionH2}>2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
            <div className={styles.inShort}>
              <strong><em>In Short: </em></strong><em>We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We process the personal information for the following purposes listed below. We may also process your information for other purposes only with your prior explicit consent.</em>
            </div>

            <div className={styles.paragraph}>
              <strong>We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</strong>
            </div>

            <ul className={styles.list}>
              <li className={styles.listItem}>
                <strong>To deliver and facilitate delivery of services to the user. </strong>We may process your information to provide you with the requested service.
              </li>
              <li className={styles.listItem}>
                <strong>To respond to user inquiries/offer support to users. </strong>We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service.
              </li>
              <li className={styles.listItem}>
                <strong>To send administrative information to you. </strong>We may process your information to send you details about our products and services, changes to our terms and policies, and other similar information.
              </li>
              <li className={styles.listItem}>
                <strong>To fulfill and manage your orders.</strong> We may process your information to fulfill and manage your orders, payments, returns, and exchanges made through the Services.
              </li>
              <li className={styles.listItem}>
                <strong>To request feedback. </strong>We may process your information when necessary to request feedback and to contact you about your use of our Services.
              </li>
              <li className={styles.listItem}>
                <strong>To protect our Services.</strong> We may process your information as part of our efforts to keep our Services safe and secure, including fraud monitoring and prevention.
              </li>
              <li className={styles.listItem}>
                <strong>To identify usage trends.</strong> We may process information about how you use our Services to better understand how they are being used so we can improve them.
              </li>
              <li className={styles.listItem}>
                <strong>To save or protect an individual&apos;s vital interest.</strong> We may process your information when necessary to save or protect an individual’s vital interest, such as to prevent harm.
              </li>
            </ul>
          </section>

          <section id="legalbases" className={styles.legalSection}>
            <h2 className={styles.sectionH2}>3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</h2>
            <div className={styles.inShort}>
              <strong><em>In Short: </em></strong><em>We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e., legal basis) to do so under applicable law, like with your consent, to comply with laws, to provide you with services to enter into or fulfill our contractual obligations, to protect your rights, or to fulfill our legitimate business interests.</em>
            </div>

            <div className={styles.paragraph}>
              <em><u>If you are located in the EU or UK, this section applies to you.</u></em>
            </div>

            <div className={styles.paragraph}>
              The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we rely on in order to process your personal information. As such, we may rely on the following legal bases to process your personal information:
            </div>

            <ul className={styles.list}>
              <li className={styles.listItem}>
                <strong>Consent. </strong>We may process your information if you have given us permission (i.e., consent) to use your personal information for a specific purpose. You can withdraw your consent at any time. Learn more about <a className={styles.inlineLink} href="#withdrawconsent">withdrawing your consent</a>.
              </li>
              <li className={styles.listItem}>
                <strong>Performance of a Contract.</strong> We may process your personal information when we believe it is necessary to fulfill our contractual obligations to you, including providing our Services or at your request prior to entering into a contract with you.
              </li>
              <li className={styles.listItem}>
                <strong>Legitimate Interests.</strong> We may process your information when we believe it is reasonably necessary to achieve our legitimate business interests and those interests do not outweigh your interests and fundamental rights and freedoms. For example, we may process your personal information for some of the purposes described in order to:
                <ul className={styles.nestedList}>
                  <li>Analyze how our Services are used so we can improve them to engage and retain users</li>
                  <li>Diagnose problems and/or prevent fraudulent activities</li>
                  <li>Understand how our users use our products and services so we can improve user experience</li>
                </ul>
              </li>
              <li className={styles.listItem}>
                <strong>Legal Obligations.</strong> We may process your information where we believe it is necessary for compliance with our legal obligations, such as to cooperate with a law enforcement body or regulatory agency, exercise or defend our legal rights, or disclose your information as evidence in litigation in which we are involved.
              </li>
              <li className={styles.listItem}>
                <strong>Vital Interests.</strong> We may process your information where we believe it is necessary to protect your vital interests or the vital interests of a third party, such as situations involving potential threats to the safety of any person.
              </li>
            </ul>

            <div className={styles.paragraph}>
              <em><u>If you are located in Canada, this section applies to you.</u></em>
            </div>

            <div className={styles.paragraph}>
              We may process your information if you have given us specific permission (i.e., express consent) to use your personal information for a specific purpose, or in situations where your permission can be inferred (i.e., implied consent). You can <a className={styles.inlineLink} href="#withdrawconsent">withdraw your consent</a> at any time.
            </div>

            <div className={styles.paragraph}>
              In some exceptional cases, we may be legally permitted under applicable law to process your information without your consent, including, for example:
            </div>

            <ul className={styles.list}>
              <li className={styles.listItem}>If collection is clearly in the interests of an individual and consent cannot be obtained in a timely way</li>
              <li className={styles.listItem}>For investigations and fraud detection and prevention</li>
              <li className={styles.listItem}>For business transactions provided certain conditions are met</li>
              <li className={styles.listItem}>If it is contained in a witness statement and the collection is necessary to assess, process, or settle an insurance claim</li>
              <li className={styles.listItem}>For identifying injured, ill, or deceased persons and communicating with next of kin</li>
              <li className={styles.listItem}>If we have reasonable grounds to believe an individual has been, is, or may be victim of financial abuse</li>
              <li className={styles.listItem}>If it is reasonable to expect collection and use with consent would compromise the availability or the accuracy of the information and the collection is reasonable for purposes related to investigating a breach of an agreement or a contravention of the laws of Canada or a province</li>
              <li className={styles.listItem}>If disclosure is required to comply with a subpoena, warrant, court order, or rules of the court relating to the production of records</li>
              <li className={styles.listItem}>If it was produced by an individual in the course of their employment, business, or profession and the collection is consistent with the purposes for which the information was produced</li>
              <li className={styles.listItem}>If the collection is solely for journalistic, artistic, or literary purposes</li>
              <li className={styles.listItem}>If the information is publicly available and is specified by the regulations</li>
              <li className={styles.listItem}>We may disclose de-identified information for approved research or statistics projects, subject to ethics oversight and confidentiality commitments</li>
            </ul>
          </section>

          <section id="whoshare" className={styles.legalSection}>
            <h2 className={styles.sectionH2}>4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
            <div className={styles.inShort}>
              <strong><em>In Short:</em></strong><em> We may share information in specific situations described in this section and/or with the following categories of third parties.</em>
            </div>

            <div className={styles.paragraph}>
              <strong>Vendors, Consultants, and Other Third-Party Service Providers.</strong> We may share your data with third-party vendors, service providers, contractors, or agents (&ldquo;<strong>third parties</strong>&rdquo;) who perform services for us or on our behalf and require access to such information to do that work. We have contracts in place with our third parties, which are designed to help safeguard your personal information. This means that they cannot do anything with your personal information unless we have instructed them to do it. They will also not share your personal information with any organization apart from us. They also commit to protect the data they hold on our behalf and to retain it for the period we instruct.
            </div>

            <div className={styles.paragraph}>
              The categories of third parties we may share personal information with are as follows:
            </div>

            <ul className={styles.list}>
              <li className={styles.listItem}>Cloud Computing Services</li>
              <li className={styles.listItem}>Data Storage Service Providers</li>
              <li className={styles.listItem}>Data Analytics Services</li>
              <li className={styles.listItem}>Performance Monitoring Tools</li>
              <li className={styles.listItem}>Payment Processors</li>
              <li className={styles.listItem}>User Account Registration &amp; Authentication Services</li>
              <li className={styles.listItem}>Website Hosting Service Providers</li>
              <li className={styles.listItem}>Sales &amp; Marketing Tools</li>
            </ul>

            <div className={styles.paragraph}>
              We also may need to share your personal information in the following situations:
            </div>

            <ul className={styles.list}>
              <li className={styles.listItem}>
                <strong>Business Transfers.</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
              </li>
            </ul>
          </section>

          <section id="cookies" className={styles.legalSection}>
            <h2 className={styles.sectionH2}>5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h2>
            <div className={styles.inShort}>
              <strong><em>In Short:</em></strong><em> We may use cookies and other tracking technologies to collect and store your information.</em>
            </div>

            <div className={styles.paragraph}>
              We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.
            </div>

            <div className={styles.paragraph}>
              We also permit third parties and service providers to use online tracking technologies on our Services for analytics and advertising, including to help manage and display advertisements or to tailor advertisements to your interests. The third parties and service providers use their technology to provide advertising about products and services tailored to your interests which may appear either on our Services or on other websites.
            </div>

            <div className={styles.paragraph}>
              To the extent these online tracking technologies are deemed to be a &ldquo;sale&rdquo;/&ldquo;sharing&rdquo; (which includes targeted advertising, as defined under the applicable laws) under applicable US state laws, you can opt out of these online tracking technologies by submitting a request as described below under section &ldquo;<a className={styles.inlineLink} href="#uslaws">DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</a>&rdquo;
            </div>

            <div className={styles.paragraph}>
              Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice: <a className={styles.inlineLink} target="_blank" rel="noopener noreferrer" href="https://maxiii.app/cookie-policy">https://maxiii.app/cookie-policy</a>.
            </div>

            <div className={styles.subSection}>
              <h3 className={styles.sectionH3}>Google Analytics</h3>
              <div className={styles.paragraph}>
                We may share your information with Google Analytics to track and analyze the use of the Services. To opt out of being tracked by Google Analytics across the Services, visit <a className={styles.inlineLink} href="https://tools.google.com/dlpage/gaoptout" rel="noopener noreferrer" target="_blank">https://tools.google.com/dlpage/gaoptout</a>. For more information on the privacy practices of Google, please visit the <a className={styles.inlineLink} href="https://policies.google.com/privacy" rel="noopener noreferrer" target="_blank">Google Privacy &amp; Terms page</a>.
              </div>
            </div>
          </section>

          <section id="sociallogins" className={styles.legalSection}>
            <h2 className={styles.sectionH2}>6. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</h2>
            <div className={styles.inShort}>
              <strong><em>In Short: </em></strong><em>If you choose to register or log in to our Services using a social media account, we may have access to certain information about you.</em>
            </div>

            <div className={styles.paragraph}>
              Our Services offer you the ability to register and log in using your third-party social media account details (like your Facebook or X logins). Where you choose to do this, we will receive certain profile information about you from your social media provider. The profile information we receive may vary depending on the social media provider concerned, but will often include your name, email address, friends list, and profile picture, as well as other information you choose to make public on such a social media platform.
            </div>

            <div className={styles.paragraph}>
              We will use the information we receive only for the purposes that are described in this Privacy Notice or that are otherwise made clear to you on the relevant Services. Please note that we do not control, and are not responsible for, other uses of your personal information by your third-party social media provider. We recommend that you review their privacy notice to understand how they collect, use, and share your personal information, and how you can set your privacy preferences on their sites and apps.
            </div>
          </section>

          <section id="intltransfers" className={styles.legalSection}>
            <h2 className={styles.sectionH2}>7. IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?</h2>
            <div className={styles.inShort}>
              <strong><em>In Short: </em></strong><em>We may transfer, store, and process your information in countries other than your own.</em>
            </div>

            <div className={styles.paragraph}>
              Our servers are located in the United States. Regardless of your location, please be aware that your information may be transferred to, stored by, and processed by us in our facilities and in the facilities of the third parties with whom we may share your personal information (see &ldquo;<a className={styles.inlineLink} href="#whoshare">WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</a>&rdquo; above), including facilities in the United States, and other countries.
            </div>

            <div className={styles.paragraph}>
              If you are a resident in the European Economic Area (EEA), United Kingdom (UK), or Switzerland, then these countries may not necessarily have data protection laws or other similar laws as comprehensive as those in your country. However, we will take all necessary measures to protect your personal information in accordance with this Privacy Notice and applicable law.
            </div>

            <div className={styles.paragraph}>
              European Commission&apos;s Standard Contractual Clauses:
            </div>

            <div className={styles.paragraph}>
              We have implemented measures to protect your personal information, including by using the European Commission&apos;s Standard Contractual Clauses for transfers of personal information between our group companies and between us and our third-party providers. These clauses require all recipients to protect all personal information that they process originating from the EEA or UK in accordance with European data protection laws and regulations. Our Standard Contractual Clauses can be provided upon request. We have implemented similar appropriate safeguards with our third-party service providers and partners and further details can be provided upon request.
            </div>
          </section>

          <section id="inforetain" className={styles.legalSection}>
            <h2 className={styles.sectionH2}>8. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
            <div className={styles.inShort}>
              <strong><em>In Short: </em></strong><em>We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless otherwise required by law.</em>
            </div>

            <div className={styles.paragraph}>
              We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than account and health data (calorie, macro and body tracking) while your account is active. deleted or anonymised within 30 days of account deletion. subscription and order records 8 years, as required by indian tax and accounting law. waitlist and marketing emails until you unsubscribe, or until we contact you at launch. support messages and feedback 12 months after the conversation ends. crash, log and usage data 12 months..
            </div>

            <div className={styles.paragraph}>
              When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
            </div>
          </section>

          <section id="infosafe" className={styles.legalSection}>
            <h2 className={styles.sectionH2}>9. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
            <div className={styles.inShort}>
              <strong><em>In Short: </em></strong><em>We aim to protect your personal information through a system of organizational and technical security measures.</em>
            </div>

            <div className={styles.paragraph}>
              We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.
            </div>
          </section>

          <section id="infominors" className={styles.legalSection}>
            <h2 className={styles.sectionH2}>10. DO WE COLLECT INFORMATION FROM MINORS?</h2>
            <div className={styles.inShort}>
              <strong><em>In Short:</em></strong><em> We do not knowingly collect data from or market to children under 18 years of age or the equivalent age as specified by law in your jurisdiction.</em>
            </div>

            <div className={styles.paragraph}>
              We do not knowingly collect, solicit data from, or market to children under 18 years of age or the equivalent age as specified by law in your jurisdiction, nor do we knowingly sell such personal information. By using the Services, you represent that you are at least 18 or the equivalent age as specified by law in your jurisdiction or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the Services. If we learn that personal information from users less than 18 years of age or the equivalent age as specified by law in your jurisdiction has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18 or the equivalent age as specified by law in your jurisdiction, please contact us at <a className={styles.inlineLink} target="_blank" rel="noopener noreferrer" href="mailto:privacy@maxiii.app">privacy@maxiii.app</a>.
            </div>
          </section>

          <section id="privacyrights" className={styles.legalSection}>
            <h2 className={styles.sectionH2}>11. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
            <div className={styles.inShort}>
              <strong><em>In Short:</em></strong><em> Depending on your state of residence in the US or in some regions, such as the European Economic Area (EEA), United Kingdom (UK), Switzerland, and Canada, you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.</em>
            </div>

            <div className={styles.paragraph}>
              In some regions (like the EEA, UK, Switzerland, and Canada), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; (iv) if applicable, to data portability; and (v) not to be subject to automated decision-making. If a decision that produces legal or similarly significant effects is made solely by automated means, we will inform you, explain the main factors, and offer a simple way to request human review. In certain circumstances, you may also have the right to object to the processing of your personal information. You can make such a request by contacting us by using the contact details provided in the section &ldquo;<a className={styles.inlineLink} href="#contact">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>&rdquo; below.
            </div>

            <div className={styles.paragraph}>
              We will consider and act upon any request in accordance with applicable data protection laws.
            </div>

            <div className={styles.paragraph}>
              If you are located in the UK and are unhappy with how we have handled your personal information, you can make a complaint directly to us. This is in addition to the rights you have under the UK General Data Protection Regulation and the Data Protection Act 2018.
            </div>

            <div className={styles.paragraph}>How to contact us:</div>

            <ul className={styles.list}>
              <li className={styles.listItem}><strong>Online:</strong> <a className={styles.inlineLink} target="_blank" rel="noopener noreferrer" href="https://maxiii.app/contact">https://maxiii.app/contact</a></li>
              <li className={styles.listItem}><strong>Email: </strong><a className={styles.inlineLink} target="_blank" rel="noopener noreferrer" href="mailto:privacy@maxiii.app">privacy@maxiii.app</a></li>
              <li className={styles.listItem}><strong>Post: </strong>See &ldquo;<a className={styles.inlineLink} href="#contact">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>&rdquo;</li>
            </ul>

            <div className={styles.paragraph}>What happens after you complain</div>

            <ul className={styles.list}>
              <li className={styles.listItem}>We will acknowledge your complaint within 30 days of receiving it.</li>
              <li className={styles.listItem}>We will investigate without unjustifiable or excessive delay.</li>
              <li className={styles.listItem}>We will keep you informed of progress and explain the outcome.</li>
            </ul>

            <div className={styles.paragraph}>If you are not happy with our final response, you can refer your complaint to the Information Commissioner&apos;s Office, the UK supervisory authority.</div>

            <ul className={styles.list}>
              <li className={styles.listItem}><strong>Website:</strong> <a className={styles.inlineLink} href="https://ico.org.uk/make-a-complaint" rel="noopener noreferrer" target="_blank">ico.org.uk/make-a-complaint</a></li>
              <li className={styles.listItem}><strong>Helpline:</strong> 0303 123 1113</li>
              <li className={styles.listItem}><strong>Post:</strong> Information Commissioner&apos;s Office, Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF</li>
            </ul>

            <div className={styles.paragraph}>
              If you are located in the EEA or UK and you believe we are unlawfully processing your personal information, you also have the right to complain to your <a className={styles.inlineLink} href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm" rel="noopener noreferrer" target="_blank">Member State data protection authority</a> or <a className={styles.inlineLink} href="https://ico.org.uk/make-a-complaint/data-protection-complaints/data-protection-complaints/" rel="noopener noreferrer" target="_blank">UK data protection authority</a>.
            </div>

            <div className={styles.paragraph}>
              If you are located in Switzerland, you may contact the <a className={styles.inlineLink} href="https://www.edoeb.admin.ch/edoeb/en/home.html" rel="noopener noreferrer" target="_blank">Federal Data Protection and Information Commissioner</a>.
            </div>

            <div id="withdrawconsent" className={styles.subSection}>
              <div className={styles.paragraph}>
                <strong><u>Withdrawing your consent:</u></strong> If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section &ldquo;<a className={styles.inlineLink} href="#contact">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>&rdquo; below.
              </div>
            </div>

            <div className={styles.paragraph}>
              However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.
            </div>

            <div className={styles.paragraph}>
              <strong><u>Opting out of marketing and promotional communications:</u></strong> You can unsubscribe from our marketing and promotional communications at any time by clicking on the unsubscribe link in the emails that we send, or by contacting us using the details provided in the section &ldquo;<a className={styles.inlineLink} href="#contact">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a>&rdquo; below. You will then be removed from the marketing lists. However, we may still communicate with you &mdash; for example, to send you service-related messages that are necessary for the administration and use of your account, to respond to service requests, or for other non-marketing purposes.
            </div>

            <div className={styles.paragraph}>
              <strong><u>Cookies and similar technologies:</u></strong> Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Services. For further information, please see our Cookie Notice: <a className={styles.inlineLink} target="_blank" rel="noopener noreferrer" href="https://maxiii.app/cookie-policy">https://maxiii.app/cookie-policy</a>.
            </div>

            <div className={styles.paragraph}>
              If you have questions or comments about your privacy rights, you may email us at <a className={styles.inlineLink} target="_blank" rel="noopener noreferrer" href="mailto:privacy@maxiii.app">privacy@maxiii.app</a>.
            </div>
          </section>

          <section id="DNT" className={styles.legalSection}>
            <h2 className={styles.sectionH2}>12. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
            <div className={styles.paragraph}>
              Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track (&ldquo;DNT&rdquo;) feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Notice.
            </div>

            <div className={styles.paragraph}>
              California law requires us to let you know how we respond to web browser DNT signals. Because there currently is not an industry or legal standard for recognizing or honoring DNT signals, we do not respond to them at this time.
            </div>
          </section>

          <section id="uslaws" className={styles.legalSection}>
            <h2 className={styles.sectionH2}>13. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h2>
            <div className={styles.inShort}>
              <strong><em>In Short: </em></strong><em>If you are a resident of California, Colorado, Connecticut, Delaware, Florida, Indiana, Iowa, Kentucky, Maryland, Minnesota, Montana, Nebraska, New Hampshire, New Jersey, Oregon, Rhode Island, Tennessee, Texas, Utah, or Virginia, you may have the right to request access to and receive details about the personal information we maintain about you and how we have processed it, correct inaccuracies, get a copy of, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law. More information is provided below.</em>
            </div>

            <div className={styles.subSection}>
              <h3 className={styles.sectionH3}>Categories of Personal Information We Collect</h3>
              <div className={styles.paragraph}>
                The table below shows the categories of personal information we have collected in the past twelve (12) months. The table includes illustrative examples of each category and does not reflect the personal information we collect from you. For a comprehensive inventory of all personal information we process, please refer to the section &ldquo;<a className={styles.inlineLink} href="#infocollect">WHAT INFORMATION DO WE COLLECT?</a>&rdquo;
              </div>
            </div>

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th><strong>Category</strong></th>
                    <th><strong>Examples</strong></th>
                    <th><strong>Collected</strong></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>A. Identifiers</td>
                    <td>Contact details, such as real name, alias, postal address, telephone or mobile contact number, unique personal identifier, online identifier, Internet Protocol address, email address, and account name</td>
                    <td>YES</td>
                  </tr>
                  <tr>
                    <td>B. Personal information as defined in the California Customer Records statute</td>
                    <td>Name, contact information, education, employment, employment history, and financial information</td>
                    <td>YES</td>
                  </tr>
                  <tr>
                    <td>C. Protected classification characteristics under state or federal law</td>
                    <td>Gender, age, date of birth, race and ethnicity, national origin, marital status, and other demographic data</td>
                    <td>YES</td>
                  </tr>
                  <tr>
                    <td>D. Commercial information</td>
                    <td>Transaction information, purchase history, financial details, and payment information</td>
                    <td>YES</td>
                  </tr>
                  <tr>
                    <td>E. Biometric information</td>
                    <td>Fingerprints and voiceprints</td>
                    <td>NO</td>
                  </tr>
                  <tr>
                    <td>F. Internet or other similar network activity</td>
                    <td>Browsing history, search history, online behavior, interest data, and interactions with our and other websites, applications, systems, and advertisements</td>
                    <td>YES</td>
                  </tr>
                  <tr>
                    <td>G. Geolocation data</td>
                    <td>Device location</td>
                    <td>NO</td>
                  </tr>
                  <tr>
                    <td>H. Audio, electronic, sensory, or similar information</td>
                    <td>Images and audio, video or call recordings created in connection with our business activities</td>
                    <td>NO</td>
                  </tr>
                  <tr>
                    <td>I. Professional or employment-related information</td>
                    <td>Business contact details in order to provide you our Services at a business level or job title, work history, and professional qualifications if you apply for a job with us</td>
                    <td>NO</td>
                  </tr>
                  <tr>
                    <td>J. Education Information</td>
                    <td>Student records and directory information</td>
                    <td>NO</td>
                  </tr>
                  <tr>
                    <td>K. Inferences drawn from collected personal information</td>
                    <td>Inferences drawn from any of the collected personal information listed above to create a profile or summary about, for example, an individual’s preferences and characteristics</td>
                    <td>NO</td>
                  </tr>
                  <tr>
                    <td>L. Sensitive personal Information</td>
                    <td>Health data and account login information</td>
                    <td>YES</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={styles.paragraph}>
              We only collect sensitive personal information, as defined by applicable privacy laws or the purposes allowed by law or with your consent. Sensitive personal information may be used, or disclosed to a service provider or contractor, for additional, specified purposes. You may have the right to limit the use or disclosure of your sensitive personal information. We do not collect or process sensitive personal information for the purpose of inferring characteristics about you.
            </div>

            <div className={styles.paragraph}>
              We may also collect other personal information outside of these categories through instances where you interact with us in person, online, or by phone or mail in the context of:
            </div>

            <ul className={styles.list}>
              <li className={styles.listItem}>Receiving help through our customer support channels;</li>
              <li className={styles.listItem}>Participation in customer surveys or contests; and</li>
              <li className={styles.listItem}>Facilitation in the delivery of our Services and to respond to your inquiries.</li>
            </ul>

            <div className={styles.paragraph}>
              We will use and retain the collected personal information as needed to provide the Services or for:
            </div>

            <ul className={styles.list}>
              <li className={styles.listItem}>Category A - As long as the user has an account with us</li>
              <li className={styles.listItem}>Category B - As long as the user has an account with us</li>
              <li className={styles.listItem}>Category C - As long as the user has an account with us</li>
              <li className={styles.listItem}>Category D - As long as the user has an account with us</li>
              <li className={styles.listItem}>Category F - 1 year</li>
              <li className={styles.listItem}>Category L - As long as the user has an account with us</li>
            </ul>

            <div className={styles.subSection}>
              <h3 className={styles.sectionH3}>Sources of Personal Information</h3>
              <div className={styles.paragraph}>
                Learn more about the sources of personal information we collect in &ldquo;<a className={styles.inlineLink} href="#infocollect">WHAT INFORMATION DO WE COLLECT?</a>&rdquo;
              </div>
            </div>

            <div className={styles.subSection}>
              <h3 className={styles.sectionH3}>How We Use and Share Personal Information</h3>
              <div className={styles.paragraph}>
                Learn more about how we use your personal information in the section, &ldquo;<a className={styles.inlineLink} href="#infouse">HOW DO WE PROCESS YOUR INFORMATION?</a>&rdquo;
              </div>
            </div>

            <div className={styles.paragraph}>
              <strong>Will your information be shared with anyone else?</strong>
            </div>

            <div className={styles.paragraph}>
              We may disclose your personal information with our service providers pursuant to a written contract between us and each service provider. Learn more about how we disclose personal information to in the section, &ldquo;<a className={styles.inlineLink} href="#whoshare">WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</a>&rdquo;
            </div>

            <div className={styles.paragraph}>
              We may use your personal information for our own business purposes, such as for undertaking internal research for technological development and demonstration. This is not considered to be &ldquo;selling&rdquo; of your personal information.
            </div>

            <div className={styles.paragraph}>
              We have not sold or shared any personal information to third parties for a business or commercial purpose in the preceding twelve (12) months. We have disclosed the following categories of personal information to third parties for a business or commercial purpose in the preceding twelve (12) months:
            </div>

            <ul className={styles.list}>
              <li className={styles.listItem}>Category A. Identifiers</li>
              <li className={styles.listItem}>Category B. Personal information as defined in the California Customer Records law</li>
              <li className={styles.listItem}>Category C. Characteristics of protected classifications under state or federal law</li>
              <li className={styles.listItem}>Category D. Commercial information</li>
              <li className={styles.listItem}>Category F. Internet or other electronic network activity information</li>
              <li className={styles.listItem}>Category L. Sensitive personal information</li>
            </ul>
          </section>

          <section id="clausea" className={styles.legalSection}>
            <h2 className={styles.sectionH2}>14. USERS IN INDIA</h2>
            <div className={styles.paragraph}>
              If you are in India, we process your personal data in line with the Digital Personal Data Protection Act, 2023. We collect and use your data only with your consent or for the lawful purposes described in this policy. You have the right to:
            </div>

            <ul className={styles.list}>
              <li className={styles.listItem}>Access a summary of the personal data we hold about you.</li>
              <li className={styles.listItem}>Correct or update inaccurate data.</li>
              <li className={styles.listItem}>Delete your data and your account.</li>
              <li className={styles.listItem}>Withdraw your consent at any time. This does not affect processing done before you withdrew it.</li>
              <li className={styles.listItem}>Nominate another person to exercise your rights if you die or become unable to do so.</li>
              <li className={styles.listItem}>Raise a grievance and receive a response.</li>
            </ul>

            <div className={styles.paragraph}>
              To exercise these rights or raise a grievance, email <a className={styles.inlineLink} target="_blank" rel="noopener noreferrer" href="mailto:privacy@maxili.app">privacy@maxili.app</a> or use the contact form at <a className={styles.inlineLink} target="_blank" rel="noopener noreferrer" href="https://maxiii.app/contact">https://maxiii.app/contact</a>. We will respond within a reasonable time and in any case within the period required by law. If you are not satisfied with our response, you may complain to the Data Protection Board of India. MAXIII is intended for people aged 18 and over. We do not knowingly collect personal data from children.
            </div>
          </section>

          <section id="policyupdates" className={styles.legalSection}>
            <h2 className={styles.sectionH2}>15. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
            <div className={styles.inShort}>
              <strong>In Short: </strong><em>Yes, we will update this notice as necessary to stay compliant with relevant laws.</em>
            </div>

            <div className={styles.paragraph}>
              We may update this Privacy Notice from time to time. The updated version will be indicated by an updated &ldquo;Revised&rdquo; date at the top of this Privacy Notice. If we make material changes to this Privacy Notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this Privacy Notice frequently to be informed of how we are protecting your information.
            </div>
          </section>

          <section id="contact" className={styles.legalSection}>
            <h2 className={styles.sectionH2}>16. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
            <div className={styles.paragraph}>
              If you have questions or comments about this notice, you may email us at <a className={styles.inlineLink} target="_blank" rel="noopener noreferrer" href="mailto:privacy@maxili.app">privacy@maxili.app</a> or contact us by post at:
            </div>

            <div className={styles.addressBox}>
              MAXIII<br />
              Batlagundu Road , Begampur, Dindigul<br />
              Dindigul, Tamil Nadu 624002<br />
              India
            </div>
          </section>

          <section id="request" className={styles.legalSection}>
            <h2 className={styles.sectionH2}>17. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h2>
            <div className={styles.paragraph}>
              Based on the applicable laws of your country or state of residence in the US, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law. To request to review, update, or delete your personal information, please visit: <a className={styles.inlineLink} target="_blank" rel="noopener noreferrer" href="https://maxiii.app/contact">https://maxiii.app/contact</a>.
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};
