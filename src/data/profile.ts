// Profile data - separated from implementation
export const profile = {
  name: 'Joshua Gilman',
  title: 'Lead Site Reliability Engineer',
  company: 'Input Output Global',
  location: 'Portland, OR',
  email: 'JoshuaGilman@gmail.com',
  phone: '(707) 580-8473',
  tagline: 'Lead SRE specializing in resilient cloud platforms and cost-optimized delivery',
  summary: `Veteran SRE with 15+ years' experience building and operating large-scale systems for big tech, Web3, data center, and manufacturing industries. I design resilient cloud platforms, cut waste through automation, and lead cross-functional teams to ship reliably for 1K-400K+ users.`,
  bio: `I've been in the professional workforce for over 15 years, currently serving as Lead Site Reliability Engineer at Input Output Global. Throughout my career, I've worked across multiple industries in critical operations roles. My primary focus is on automation and efficiency—I strive to create the most reliable, performant, and cost-effective solutions possible.`,
  social: {
    linkedin: 'https://linkedin.com/in/jmgilman',
    github: 'https://github.com/jmgilman',
    twitter: 'https://twitter.com/jmgilman',
  },
  highlights: [
    { label: 'Scale', value: '400K+ users', detail: 'Project Catalyst community' },
    { label: 'Efficiency', value: '92% faster tests', detail: '100+ hours saved weekly' },
    { label: 'Cost', value: '$250K annual savings', detail: 'via platform enablement' },
    { label: 'Leadership', value: '20+ engineers', detail: 'enabled with DevOps practices' },
  ],
  trustedBy: ['Google', 'IOG', 'Cardano'],
  focusAreas: [
    'Reliability first: SLOs, chaos drills, and blameless ops to keep teams shipping.',
    'Automation as default: Terraform + GitOps to remove toil and accelerate delivery.',
    'Cost guardrails: right-size infra, optimize pipelines, and keep budgets honest.',
    'Security built-in: hardened CI/CD, least-privilege patterns, and repeatable controls.',
  ],
  quickRoles: [
    {
      role: 'Lead SRE',
      company: 'IOG / Project Catalyst',
      impact: 'Built and ran the Cardano governance platform for 400K+ users.',
    },
    {
      role: 'SRE, Core Infra',
      company: 'Google',
      impact: 'Modernized delivery pipelines for 1K+ engineers; reduced toil across DC ops.',
    },
    {
      role: 'Controls & SCADA',
      company: 'Google DCs',
      impact: 'Automated security/monitoring, preventing incidents and saving 400K+ hours.',
    },
  ],
  interests: [
    'Locally Hosted AI Server',
    'Home IoT',
    'Hiking',
    'Camping',
    'Reading',
    'Music',
    'Guitar',
  ],
};

export const skills = {
  cloud: ['AWS', 'Google Cloud', 'EKS', 'Kubernetes', 'Argo CD', 'Helm', 'Timoni'],
  automation: ['Terraform', 'Ansible', 'Nix', 'Jsonnet', 'GitLab CI', 'Docker'],
  programming: ['Go', 'Python', 'Rust', 'JavaScript', 'SQL'],
  reliability: [
    'SLO/SLI design',
    'Observability (Prometheus, Grafana)',
    'Incident response',
    'Runbooks & playbooks',
    'Chaos testing',
    'Cost optimization',
    'Security automation',
  ],
};

export const experience = [
  {
    company: 'Input Output HK',
    location: 'Portland, OR',
    title: 'Lead Site Reliability Engineer',
    period: 'Oct 2022 – Present',
    highlights: [
      "Develop, iterate, and maintain infrastructure (Kubernetes, Terraform, Earthly) for operating Cardano's decentralized innovation system (Project Catalyst), completing projects 4-6 months quicker than prior average, supporting 4 funds annually ($50M+ annual distributions), and improving community engagement with platform (200K-400K+ members)",
      'Architect complete software stack (CUE, Timoni, Argo CD) capable of running blockchain workload and implement safe/reliable methodologies necessary, improving public confidence in an on-chain governance system',
      'Design and implement automated software testing and delivery pipeline, decreasing testing times by 92% and reducing testing by 100+ hours weekly',
      'Create documentation and training to enable 20+ software engineers to take ownership of systems and promote strong DevOps culture focusing on platform engineering, saving $250K annually on infrastructure costs',
    ],
  },
  {
    company: 'Google',
    location: 'Portland, OR',
    roles: [
      {
        title: 'Site Reliability Engineer (Core Infrastructure Team)',
        period: 'Mar 2022 – Oct 2022',
        highlights: [
          'Created multiple software delivery pipelines with Python, improving software delivery reliability by 10% for 1K+ SWEs',
          'Migrated legacy applications used by 10K+ employees to newer orchestration systems, increasing developer velocity and reducing cognitive load',
          'Spearheaded first Data Center Modernization Initiative at Google and integrated SRE principles into data center operations, improving visibility into critical data center services and reducing toil',
        ],
      },
      {
        title: 'Data Center Technician I/II',
        period: 'Jul 2014 – Mar 2022',
        highlights: [
          'Led 2-3 year data center build projects to commission 3 data centers (total 400MW+), achieving top ranking for controls engineering and compliance and securing first ever promotion from Data Center Technician to SRE at Google',
          'Collaborated with Controls Engineer to maintain and improve complex SCADA software and networking deployments, including medium-sized Cisco-based network and 4 FactoryTalk deployments',
          'Designed, led, and implemented software-based improvements to SCADA systems (automated security systems, software-based monitoring tools, disaster recovery software), leading to no major cybersecurity incidents and saving 400K+ manual labor hours for data center operations annually',
          '15+ Google Awards & Recognition including Top Awards for Control Systems Automated Anti-Virus Solution',
        ],
      },
    ],
  },
  {
    company: 'Johnson Controls',
    location: 'San Francisco, CA',
    title: 'HVAC Controls Technician',
    period: 'May 2013 – Jul 2014',
    highlights: [
      'Supported 20+ sites in the Greater San Francisco Bay Area and performed preventative maintenance on building management solutions, ranking in the top 5% of technicians with a 100% on time project delivery rate',
      'Responded to and resolved 15-20 BMS service requests weekly, completing 90% of requests within 2-3 hours',
      'Designed and commissioned 9 HVAC process plants ($100K-$3M+) for technology companies, data centers, skyscraper HVAC systems, manufacturing plants, and laboratory facilities',
    ],
  },
];

export const previousExperience = [
  { title: 'Electrical Maintenance Technician (Nuclear)', company: 'US Navy' },
  { title: 'Software Developer', company: 'Alias Projects' },
];

export const certifications = ['Programming for Data Science Nano Certification (Udacity)'];
