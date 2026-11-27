const SITE_URL = (typeof process !== 'undefined' && process.env?.SITE_URL) ? process.env.SITE_URL : 'https://maxiii.app';

export const SEO_CONFIG = {
  title: 'MAXIII: Calorie & Macro Tracker',
  description: 'A mobile calorie and macro tracker. Carbohydrates and fibre included by default, cooking yield calculations, and adaptive targets.',
  featuresTitle: 'Features | MAXIII',
  featuresDescription: 'Complete calorie and macro tracker features: raw to cooked yield calculations, adaptive daily targets, barcode scanning, customisation, and training floor interface.',
  canonical: SITE_URL,
  ogImage: `${SITE_URL}/og-image.svg`,
  twitterHandle: '@maxiiiapp',
  jsonLd: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        'name': 'MAXIII',
        'url': SITE_URL,
        'logo': `${SITE_URL}/favicon.svg`
      },
      {
        '@type': 'MobileApplication',
        '@id': `${SITE_URL}/#app`,
        'name': 'MAXIII',
        'operatingSystem': 'iOS, Android',
        'applicationCategory': 'HealthApplication',
        'description': 'Mobile calorie and macro tracker with carbohydrates and fibre included by default, cooking yield calculations, and adaptive daily targets.',
        'publisher': {
          '@id': `${SITE_URL}/#organization`
        }
      }
    ]
  }
};
