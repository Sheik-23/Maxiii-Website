import React, { useEffect } from 'react';
import styles from './CookiePolicyPage.module.css';

export const CookiePolicyPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Cookie Policy | MAXIII';

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
      'Read the Cookie Policy for MAXIII (maxiii.app) to understand how we use cookies, local storage, and your choices regarding data.'
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
    <main className={styles.cookieWrap} aria-label="Cookie Policy">
      <div className={styles.inner}>
        <header className={styles.headerBlock}>
          <div className={styles.eyebrow}>LEGAL DOCUMENTATION</div>
          <h1 className={styles.pageTitle}>COOKIE POLICY</h1>
          <div className={styles.lastUpdated}>Last updated November 24, 2026</div>
        </header>

        <div className={styles.contentBody}>
          <div className={styles.paragraph}>
            This Cookie Policy explains how MAXIII (&ldquo;<strong>Company</strong>,&rdquo; &ldquo;<strong>we</strong>,&rdquo; &ldquo;<strong>us</strong>,&rdquo; and &ldquo;<strong>our</strong>&rdquo;) uses cookies and similar technologies to recognize you when you visit our website at <a target="_blank" rel="noopener noreferrer" className={styles.inlineLink} href="https://www.maxiii.app">https://www.maxiii.app</a> (&ldquo;<strong>Website</strong>&rdquo;). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
          </div>

          <div className={styles.paragraph}>
            In some cases we may use cookies to collect personal information, or that becomes personal information if we combine it with other information.
          </div>

          <div className={styles.paragraph}>
            To accept, reject, or select cookies based on their purposes, you can use the controls in the cookie management pop-up banner. In particular, to find out which cookies are set via this Website and to express your preferences regarding them, select the &ldquo;Preferences&rdquo; option, where you can also view the individual cookies set in each category.
          </div>

          <div className={styles.paragraph}>
            Your preferences will be recorded in a dedicated Cookie Preference Center, developed in accordance with the principles of the applicable personal data protection legislation and in line with guidelines designed to allow users to exercise their choices in a granular manner. The Cookie Preference Center allows you to give or withhold consent to various types of cookies, which are identified and classified based on the purposes for which the cookies are set and used, making it easier and quicker to recognize them.
          </div>

          <div className={styles.paragraph}>
            The cookies used on this Website fall into the categories described below.
          </div>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>What are cookies?</h2>
            <p className={styles.paragraph}>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>
            <p className={styles.paragraph}>
              Cookies set by the website owner (in this case, MAXIII) are called &ldquo;first-party cookies.&rdquo; Cookies set by parties other than the website owner are called &ldquo;third-party cookies.&rdquo; Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Why do we use cookies?</h2>
            <p className={styles.paragraph}>
              We use first- and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as &ldquo;essential&rdquo; or &ldquo;strictly necessary&rdquo; cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties. Third parties serve cookies through our Website for advertising, analytics, and other purposes. This is described in more detail below.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>How can I control cookies?</h2>
            <p className={styles.paragraph}>
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Preference Center. The Cookie Preference Center allows you to select which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.
            </p>
            <p className={styles.paragraph}>
              The Cookie Preference Center can be found in the notification banner and on our Website. If you choose to reject cookies, you may still use our Website though your access to some functionality and areas of our Website may be restricted. You may also set or amend your web browser controls to accept or refuse cookies.
            </p>
            <p className={styles.paragraph}>
              The specific types of first- and third-party cookies served through our Website and the purposes they perform are described in the table below (please note that the specific cookies served may vary depending on the specific Online Properties you visit):
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Do my choices apply on all my devices?</h2>
            <p className={styles.paragraph}>
              No. We save your cookie choices in the browser you used to make them. They apply to that browser on that device only.
            </p>
            <p className={styles.paragraph}>
              We ask for your choices again when you visit from a different device or browser, when you use a private or incognito window since your browser deletes your choices when you close it, or when you clear your cookies or browser data.
            </p>
            <p className={styles.paragraph}>
              You can change your choices at any time in the Cookie Preference Center.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>How can I control cookies on my browser?</h2>
            <p className={styles.paragraph}>
              As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser&apos;s help menu for more information. The following is information about how to manage cookies on the most popular browsers:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <a className={styles.inlineLink} href="https://support.google.com/chrome/answer/95647#zippy=%2Callow-or-block-cookies" rel="noopener noreferrer" target="_blank">Chrome</a>
              </li>
              <li className={styles.listItem}>
                <a className={styles.inlineLink} href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" rel="noopener noreferrer" target="_blank">Internet Explorer</a>
              </li>
              <li className={styles.listItem}>
                <a className={styles.inlineLink} href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop?redirectslug=enable-and-disable-cookies-website-preferences&redirectlocale=en-US" rel="noopener noreferrer" target="_blank">Firefox</a>
              </li>
              <li className={styles.listItem}>
                <a className={styles.inlineLink} href="https://support.apple.com/en-ie/guide/safari/sfri11471/mac" rel="noopener noreferrer" target="_blank">Safari</a>
              </li>
              <li className={styles.listItem}>
                <a className={styles.inlineLink} href="https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd" rel="noopener noreferrer" target="_blank">Edge</a>
              </li>
              <li className={styles.listItem}>
                <a className={styles.inlineLink} href="https://help.opera.com/en/latest/web-preferences/" rel="noopener noreferrer" target="_blank">Opera</a>
              </li>
            </ul>

            <p className={styles.paragraph}>
              In addition, most advertising networks offer you a way to opt out of targeted advertising. If you would like to find out more information, please visit:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <a className={styles.inlineLink} href="https://www.aboutads.info/choices/" rel="noopener noreferrer" target="_blank">Digital Advertising Alliance</a>
              </li>
              <li className={styles.listItem}>
                <a className={styles.inlineLink} href="https://youradchoices.ca/" rel="noopener noreferrer" target="_blank">Digital Advertising Alliance of Canada</a>
              </li>
              <li className={styles.listItem}>
                <a className={styles.inlineLink} href="https://www.youronlinechoices.com/" rel="noopener noreferrer" target="_blank">European Interactive Digital Advertising Alliance</a>
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>What about other tracking technologies, like web beacons?</h2>
            <p className={styles.paragraph}>
              Cookies are not the only way to recognize or track visitors to a website. We may use other, similar technologies from time to time, like web beacons (sometimes called &ldquo;tracking pixels&rdquo; or &ldquo;clear gifs&rdquo;). These are tiny graphics files that contain a unique identifier that enables us to recognize when someone has visited our Website or opened an email including them. This allows us, for example, to monitor the traffic patterns of users from one page within a website to another, to deliver or communicate with cookies, to understand whether you have come to the website from an online advertisement displayed on a third-party website, to improve site performance, and to measure the success of email marketing campaigns. In many instances, these technologies are reliant on cookies to function properly, and so declining cookies will impair their functioning.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Do you serve targeted advertising?</h2>
            <p className={styles.paragraph}>
              Third parties may serve cookies on your computer or mobile device to serve advertising through our Website. These companies may use information about your visits to this and other websites in order to provide relevant advertisements about goods and services that you may be interested in. They may also employ technology that is used to measure the effectiveness of advertisements. They can accomplish this by using cookies or web beacons to collect information about your visits to this and other sites in order to provide relevant advertisements about goods and services of potential interest to you. The information collected through this process does not enable us or them to identify your name, contact details, or other details that directly identify you unless you choose to provide these.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>How often will you update this Cookie Policy?</h2>
            <p className={styles.paragraph}>
              We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
            </p>
            <p className={styles.paragraph}>
              The date at the top of this Cookie Policy indicates when it was last updated.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Where can I get further information?</h2>
            <p className={styles.paragraph}>
              If you have any questions about our use of cookies or other technologies, please contact us at:
            </p>
            <div className={styles.addressBox}>
              MAXIII<br />
              Batlagundu Road , Begampur, Dindigul<br />
              Dindigul, Tamil Nadu 624002<br />
              India
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};
