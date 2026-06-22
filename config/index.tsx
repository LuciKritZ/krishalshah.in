import { NavLinkItem } from '@/components/atoms/nav-link';

const links = {
  github: 'https://github.com/LuciKritZ',
  linkedin: 'https://linkedin.com/in/krishal-shah',
  phone: '+919104070699',
  twitter: 'https://x.com/lucikritz',
  website: 'https://krishal-shah.in',
};

export const EXPERIENCES = [
  {
    _id: 'f8c3a9e1-4b7d-4f9a-8c2e-1d5b6a7c9e0f',
    companyImage: '', // Add your Sanity CDN URL for Photosynth AI
    companyLink: 'https://useperry.com',
    companyName: 'Photosynth AI',
    companyShortName: 'Perry AI',
    description: `Implemented an LLM fallback architecture from scratch, routing failed Gemini calls to backup models on Vertex AI to keep document review and investment summary flows running through model failures.
Refactored the document review UI with decoupled comments and versioned change suggestions, significantly reducing reviewer friction.
Implemented centralized error handling end-to-end, standardizing error patterns across API routes with Sentry integration for production visibility.
Set up E2E testing infrastructure from scratch using Playwright with network mocking and unit tests.`,
    isCurrent: true,
    isRemote: true,
    jobTitle: 'Senior Fullstack Engineer',
    skills: [
      'LLM Architecture',
      'Vertex AI',
      'Gemini API',
      'React',
      'Playwright',
      'Sentry',
      'E2E Testing',
      'Full Stack',
    ],
    startDate: new Date('2026-01-01'),
  },
  {
    _id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    companyImage:
      'https://cdn.sanity.io/images/kwg5n8yi/production/uber-logo-placeholder.svg', // Replace with actual Uber logo URL
    companyLink: 'https://www.uber.com',
    companyName: 'Uber',
    companyShortName: 'Uber',
    description: `Owned frontend architecture and delivery for MagLev, an Uber-wide cost-optimization initiative used by internal Data-Central teams.
Stabilized a large-scale DAG editor built with React Flow by fixing render lifecycle and state management issues, improving reliability and usability.
Implemented strict authorization logic across sensitive UI workflows, closing critical security gaps and preventing unauthorized access.`,
    endDate: new Date('2025-09-30'),
    isCurrent: false,
    isRemote: true,
    jobTitle: 'Consultant, Software Engineering',
    skills: [
      'React Flow',
      'Frontend Architecture',
      'Authorization & Security',
      'State Management',
      'Performance Optimization',
    ],
    startDate: new Date('2022-11-01'),
  },
  {
    _id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    companyImage:
      'https://cdn.sanity.io/images/kwg5n8yi/production/jupiter-logo-placeholder.svg', // Replace with actual Jupiter logo URL
    companyLink: 'https://www.jupintel.com',
    companyName: 'Jupiter Intelligence',
    companyShortName: 'Jupiter Intel',
    description: `Served as the initial frontend engineer, establishing development workflows and onboarding senior engineers and QA.
Automated Dundas BI migration validation using custom Postman scripts, reducing manual verification from 60+ hours to minutes.
Instrumented frontend observability using Datadog RUM and Heap Analytics to track real-user performance and behavioral bottlenecks.`,
    endDate: new Date('2025-09-30'),
    isCurrent: false,
    isRemote: true,
    jobTitle: 'Consultant, Software Engineering',
    skills: [
      'Datadog RUM',
      'Heap Analytics',
      'Postman Automation',
      'CI/CD Workflows',
      'Frontend Observability',
    ],
    startDate: new Date('2022-11-01'),
  },
  {
    _id: '568090f4-735a-4d17-8d0a-85be0af96037',
    companyImage:
      'https://cdn.sanity.io/images/kwg5n8yi/production/68c56b4b307caed8c19247d0bbc2d6a0b14510a6-796x759.svg?fit=max&auto=format',
    companyLink: 'https://www.deuexsolutions.com',
    companyName: 'Deuex Solutions',
    companyShortName: 'Deuex Solutions',
    description: `The 12th Men: Built real-time auction interfaces using WebSockets and Node.js to support synchronized bidding at scale.
Implemented custom React hooks to virtualize thousands of live-updating records, eliminating DOM bottlenecks during peak auctions.
Developed pagination and data APIs (Node.js, MongoDB) to support high-frequency dashboard updates.`,
    endDate: new Date('2025-09-30'),
    isCurrent: false,
    isRemote: true,
    jobTitle: 'Software Engineer',
    skills: [
      'WebSockets',
      'Node.js',
      'React Hooks',
      'Virtualization',
      'MongoDB',
      'Real-time Systems',
    ],
    startDate: new Date('2022-11-01'),
  },
  {
    _id: '9be28132-1051-4cd1-b638-06ecd008acdd',
    companyImage:
      'https://cdn.sanity.io/images/kwg5n8yi/production/6db42bd9e44a987f99215296c05d63481c9ea19a-1524x288.webp?fit=max&auto=format',
    companyLink: 'https://www.orangehealth.in/',
    companyName: 'Orange Health Labs',
    companyShortName: 'Orange Health',
    description: `Re-architected center-selection logic, reducing fetch latency by 83% (6s → <1s) and directly improving conversion.
Led a major React Native revamp (Android & iOS), contributing to ~10K incremental downloads.
Owned mobile and web release pipelines (CodePush, AppCenter, GitHub Actions), maintaining 99.9% production stability.`,
    endDate: new Date('2022-10-31'),
    isCurrent: false,
    isRemote: true,
    jobTitle: 'Software Engineer 2',
    skills: [
      'React Native',
      'Performance Optimization',
      'CI/CD',
      'CodePush',
      'AppCenter',
      'GitHub Actions',
    ],
    startDate: new Date('2022-03-01'),
  },
  {
    _id: '568090f4-735a-4d17-8d0a-85be0af96038',
    companyImage:
      'https://cdn.sanity.io/images/kwg5n8yi/production/68c56b4b307caed8c19247d0bbc2d6a0b14510a6-796x759.svg?fit=max&auto=format',
    companyLink: 'https://www.deuexsolutions.com',
    companyName: 'Deuex Solutions',
    companyShortName: 'Deuex Solutions',
    description: `StarTree.ai: Optimized client-side data-fetching patterns, consolidating four API calls into one and reducing TTI by 2 seconds.
Architected an internal HR platform using React and Node.js, streamlining operations for 40+ employees.
Built and maintained a 200+ component Storybook-based design system, reducing frontend duplication by 15%.`,
    endDate: new Date('2022-02-28'),
    isCurrent: false,
    isRemote: true,
    jobTitle: 'Software Engineer',
    skills: [
      'React',
      'Node.js',
      'Storybook',
      'Design Systems',
      'Performance Optimization',
      'Data Fetching',
    ],
    startDate: new Date('2021-04-01'),
  },
  {
    _id: '67662c98-8ab4-473b-a4bb-4a3a50123908',
    companyImage:
      'https://cdn.sanity.io/images/kwg5n8yi/production/0c44782c38e7be2fb436fd5d14fc4dd758c5395e-1115x176.png?fit=max&auto=format',
    companyLink: 'https://www.crestdata.ai',
    companyName: 'Crest Data Systems',
    companyShortName: 'Crest Data',
    description: `Mentored six junior engineers, reducing onboarding time and improving overall code quality.
Built core HR modules using Python (Flask) and MongoDB, defining the initial database architecture.
Received the Crest Appreciation Award (2020) for early delivery of critical systems.`,
    endDate: new Date('2021-03-31'),
    isCurrent: false,
    isRemote: false,
    jobTitle: 'Software Engineer (E3 & E2)',
    skills: [
      'Python',
      'Flask',
      'MongoDB',
      'Database Architecture',
      'Mentorship',
      'HR Systems',
    ],
    startDate: new Date('2019-10-01'),
  },
  {
    _id: '605dc1f0-7b06-4cd0-85fc-a0d94faa80ac',
    companyImage:
      'https://cdn.sanity.io/images/kwg5n8yi/production/841cb7365706b6240266a88e031c80969faec6b4-1366x768.svg?fit=max&auto=format',
    companyLink: 'https://www.cygnet-digital.com/',
    companyName: 'Cygnet Infotech',
    companyShortName: 'Cygnet Infotech',
    description: `Built the Cygnature mobile app from scratch using React Native, delivering full feature parity within three months.
Collaborated with designers using Figma and Balsamiq to translate wireframes into pixel-accurate mobile interfaces.`,
    endDate: new Date('2019-09-30'),
    isCurrent: false,
    isRemote: false,
    jobTitle: 'Associate Software Engineer',
    skills: [
      'React Native',
      'Figma',
      'Balsamiq',
      'Mobile Development',
      'UI/UX Implementation',
    ],
    startDate: new Date('2019-01-01'),
  },
];

export const siteConfig = {
  author: 'Krishal',
  description:
    'I am a senior SWE with 6+ years of experience at big tech companies like Uber and fast-growing startups like Photosynth AI. I build high-performance software systems and scalable architectures.',
  experience: EXPERIENCES,
  firstName: 'KRISHAL',
  fullName: 'Krishal Shah',
  lastName: 'Shah',
  links,
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
  name: '<Krishal />',
  resumeDoc:
    'https://drive.google.com/file/d/1OOYQMDR1ZAHMhjuQs7UgXArSUxlIfvr_/view?usp=sharing',
  shortName: '<K />',
  socialLinks: [
    {
      _id: '1826a7ff-b0ac-426a-a0cf-65d3e882e4cd',
      icon: (
        <svg
          className='h-5 w-5'
          fill='currentColor'
          height='20'
          viewBox='0 0 24 24'
          width='20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' />
        </svg>
      ),
      link: 'https://twitter.com/lucikritz',
      title: 'X',
    },
    {
      _id: '37bba0c4-d717-464d-8740-7ba6b60c2ce2',
      icon: (
        <svg
          className='h-5 w-5'
          fill='currentColor'
          height='20'
          viewBox='0 0 24 24'
          width='20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z' />
        </svg>
      ),
      link: 'https://linkedin.com/in/krishal-shah',
      title: 'LinkedIn',
    },
    {
      _id: '86dc6c6f-add8-4025-96cf-e07b7aa907b2',
      icon: (
        <svg
          className='h-5 w-5'
          fill='currentColor'
          height='20'
          viewBox='0 0 24 24'
          width='20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
        </svg>
      ),
      link: 'https://github.com/LuciKritZ',
      title: 'Github',
    },
  ],
  status: 'Available',
  url: 'https://krishal-shah.in',
};

export const NAVIGATION_OPTIONS: NavLinkItem[] = [
  {
    href: '/experience',
    name: 'Experience',
    type: 'link',
  },
  {
    href: '/projects',
    name: 'Projects',
    type: 'link',
  },
  {
    href: '/posts',
    name: 'Blog',
    type: 'link',
  },
  {
    href: '/contact',
    name: 'Contact',
    type: 'link',
  },
];

export const SOCIAL_LINKS = {
  ...siteConfig.links,
  resume:
    'https://drive.google.com/file/d/1OOYQMDR1ZAHMhjuQs7UgXArSUxlIfvr_/view?usp=sharing',
};

export type SiteConfig = typeof siteConfig;
