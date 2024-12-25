const links = {
  twitter: 'https://x.com/lucikritz',
  github: 'https://github.com/LuciKritZ',
  website: 'https://krishalshah.in',
  linkedin: 'https://linkedin.com/in/krishal-shah',
  instagram: 'https://instagram.com/lucikritz',
};

export const EXPERIENCES = [
  {
    description: `Converted the web app of Jupiter Intelligence's CSG WebApp from react app to next with end-to-end testing using Cypress and unit testing using Jest.
Led the development of a comprehensive Storybook component library (Material UI + TypeScript) featuring over 200 components.
Integrated istanbul for merged code coverage of Cypress E2E and Jest, optimizing testing strategies.
Reduced code duplication by 15% through the rewrite of over 20 components in the CSG WebApp.
Architected the database, frontend, and backend design of "Tribe," an internal HRMS tool used by over 40 people.
Optimized a data analytics app (Thirdeye by StarTree.ai) by reducing fetch API calls from 4 to 1.`,
    _id: '568090f4-735a-4d17-8d0a-85be0af96037',
    startDate: new Date('2022-11-16'),
    companyLink: 'https://www.deuexsolutions.com',
    isCurrent: true,
    isRemote: true,
    companyName: 'Deuex Solutions',
    jobTitle: 'Software Engineer',
    companyImage:
      'https://cdn.sanity.io/images/kwg5n8yi/production/68c56b4b307caed8c19247d0bbc2d6a0b14510a6-796x759.svg?fit=max&auto=format',
  },
  {
    description: `Enhanced the automatic center selection based on location fetching in mobile apps and decreased the fetching time from 6s to ≈1s
Revamped homepages in mobile apps resulted in an increase in total downloads of ~10K.
Implemented over 10 features like multiple location support, deleting accounts, and updating email notifications on every order.
Reduced code duplication by 30% by writing sharable code between React Native and React using react-app-wired library.
Deployed on Play Store , App Store , and web using GitHub actions & Appcenter (Codepush).`,
    companyImage:
      'https://cdn.sanity.io/images/kwg5n8yi/production/6db42bd9e44a987f99215296c05d63481c9ea19a-1524x288.webp?fit=max&auto=format',
    _id: '9be28132-1051-4cd1-b638-06ecd008acdd',
    companyLink: 'https://www.orangehealth.in/',
    jobTitle: 'Software Engineer',
    endDate: new Date('2022-10-31'),
    startDate: new Date('2022-03-01'),
    isRemote: true,
    companyName: 'Orange Health Labs',
    isCurrent: false,
  },
  {
    endDate: new Date('2021-04-30'),
    startDate: new Date('2019-10-01'),
    _id: '67662c98-8ab4-473b-a4bb-4a3a50123908',
    companyImage:
      'https://cdn.sanity.io/images/kwg5n8yi/production/0c44782c38e7be2fb436fd5d14fc4dd758c5395e-1115x176.png?fit=max&auto=format',
    jobTitle: 'Software Engineer E3/E2',
    companyName: 'Crest Data Systems',
    description: `Led the CrestHRMS team, managing weekly deliverables and designing algorithms for performance appraisal cycles.
Mentored and trained 6 junior/intern developers in JavaScript and React.
Reduced code duplications from 40% to 10% in HRMS, resulting in a 3s improvement in loading time.
Crest Appreciation Award: For outstanding performance and delivering projects before time with excellent code quality (2020)`,
    companyLink: 'https://www.crestdatasys.com',
    isRemote: true,
    isCurrent: false,
  },
  {
    companyName: 'Cygnet InfoTech',
    endDate: new Date('2019-09-30'),
    companyLink: 'https://www.cygnet-digital.com/',
    companyImage:
      'https://cdn.sanity.io/images/kwg5n8yi/production/841cb7365706b6240266a88e031c80969faec6b4-1366x768.svg?fit=max&auto=format',
    jobTitle: 'Associate Software Engineer / SDE Intern',
    _id: '605dc1f0-7b06-4cd0-85fc-a0d94faa80ac',
    startDate: new Date('2019-01-01'),
    description: `Contributed to Cygnet GSP as a frontend platform engineer upon receiving a full-time offer after the internship.
Wrote UI code for Cygnature app from scratch using React Native and completed all the features in 3 months.
Architected screen designs & wire-frames for Cygnature in less than a month using Balsamiq & Figma.`,
    isCurrent: false,
    isRemote: false,
  },
];

export const siteConfig = {
  name: '<Krishal />',
  shortName: '<K />',
  url: 'https://krishalshah.in',
  description:
    'I am a Full Stack Software Engineer dedicated to creating seamless digital experiences. With a strong foundation in JavaScript and its ecosystem — including Next.js, React, Express, and React Native for mobile development — I offer a versatile skill set to drive impactful solutions.',
  author: 'Krishal Shah',
  links,
  socialLinks: [
    {
      link: 'https://twitter.com/lucikritz',
      _id: '1826a7ff-b0ac-426a-a0cf-65d3e882e4cd',
      title: 'X (Formerly Twitter)',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
          fill='currentColor'
          viewBox='0 0 24 24'
        >
          <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' />
        </svg>
      ),
    },
    {
      link: 'https://linkedin.com/in/krishal-shah',
      _id: '37bba0c4-d717-464d-8740-7ba6b60c2ce2',
      title: 'LinkedIn',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
          fill='currentColor'
          viewBox='0 0 24 24'
        >
          <path d='M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z' />
        </svg>
      ),
    },
    {
      _id: '86dc6c6f-add8-4025-96cf-e07b7aa907b2',
      title: 'Github',
      link: 'https://github.com/LuciKritZ',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
          fill='currentColor'
          viewBox='0 0 24 24'
        >
          <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
        </svg>
      ),
    },
    {
      link: 'https://instagram.com/lucikritz',
      _id: 'ae975201-8802-4f3f-8b90-9a862f1ecdde',
      title: 'Instagram',
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
          fill='currentColor'
          viewBox='0 0 24 24'
        >
          <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
        </svg>
      ),
    },
  ],
  loadingTexts: [
    ' (•◡•) /',
    'ᕦ(⩾﹏⩽)ᕥ',
    '◕‿↼',
    '(◕‿◕✿)',
    '(•̀ᴗ•́)و ̑̑',
    '【≽ܫ≼】',
    'ᶘ ᵒᴥᵒᶅ',
    '┌( ಠ_ಠ)┘',
    '¯_( ͡° ͜ʖ ͡°)_/¯',
  ],
  experience: EXPERIENCES,
  resumeDoc:
    'https://docs.google.com/document/d/1L9vqJXg33BBBuceWqZSsKmsw-56PMOFQKDgCBfLqmz0',
};

export const NAVIGATION_OPTIONS = [
  {
    name: 'posts',
    href: '/posts',
  },
  {
    name: 'categories',
    href: '/tags',
  },
  {
    name: 'contact',
    href: '/contact',
  },
];

export const ADMIN_NAVIGATION_OPTIONS = [
  {
    name: 'Admin',
    href: '/admin',
  },
];

export type SiteConfig = typeof siteConfig;
