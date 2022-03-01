import { nanoid } from 'nanoid';

// HEAD DATA
export const headData = {
  title: 'Joshua Gilman | Automation Expert', // e.g: 'Name | Developer'
  lang: 'en', // e.g: en, es, fr, jp
  description: 'Personal portfolio for Joshua Gilman', // e.g: Welcome to my website
};

// HERO DATA
export const heroData = {
  title: 'Hi, my name is',
  name: 'Joshua Gilman',
  subtitle: 'I am an Automation Expert',
  cta: 'See More',
};

let resume_url = 'https://jmgilman.s3.us-west-2.amazonaws.com/resume.pdf?response-content-disposition=attachment&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDp2PzJa0pTUD2FC8DHdIG03VmjYX2%2BEeycSuhZuRomnAiBxDlKov8KKvTrjOEcgZVFdKE5bafC5hgPBbNwYjw68riqZAggbEAAaDDk1NjAzMTYzNjA3MSIMVjjIyReR29EBNVZWKvYBUTSiFDnpg7JP88IPh8K0CofEmMVRs2NbazADebCh0%2BPOYyHZ5GWbz%2FaoZPT2f9MiRHdJFKONjZCxdD4bfCnyJaz7Yjq5oOKLvtnHzxOJ23PD8mKOJtVHoa2tmAz8tRASCFp6Zne5cKKpVzkEOTXChhC9wAqbqSYIuBismFAIcvfPmSVvBv2Lt8XCEWA1mWqoH6gd7fbCJ9xxFZU7atLtaHpQ6ozYkoDX%2F%2FaNP4AjmBhFRK%2BfFU1iW5EE65TTHJF1NAdhJvsTnx7squhT%2FO9lR2Fbxz%2B8xbMhjS3RJcyOtKFpi1LmXP6JhgU%2BHc69KFDYcj%2FdnvXSMNu7%2BZAGOuABykOoMQM%2BNMPp%2BtXDTYeTMDasOlcgqZsLlupV61Twt7zXJHPBlSwzwjz00KFJJvhQwBBWNcHIvlsjns5quF09nyxvdkz0a1cmbs1DZmJHwQRLKlezP6Uh%2BVQPtjVP9CyPUNSnu7SfFblxhwBEmGrUn1S3Nv2eNMnqu2%2Fk3%2FUyh9OlEnu5Xmi7srN29ZwHCx77G6keZtzMnlbcTdHuTnRVlJ8e64UbRTbVaVcMfC%2B7BqevDs6dLeWENT7MoaJE4t0a12W3ZAqOv4DKJSd3euSY3x7A9bzPqUDq17%2FDERxzowQ%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220301T175649Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA55F7NCJT57X4T7VJ%2F20220301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=2b1cc9a2b962b75604d01d5cb81b2d64b105ba300e9fb4f59b52b67e9a9f0231'
let blog_url = 'https://blog.jmgilman.com/'
let philosophy_url = 'https://dev.jmgilman.com/philosophy/'

let p1 = `
I have 10+ years of experience running industrial automation systems in mission
critical environments. I have worked on large-scale compute systems starting
from the power that goes into them, to the equipment that maintains them, and
even the software that runs on them. Through rigorous on-the-job experience I
have developed a keen ability to troubleshoot and solve some of the most complex
challenges. I've also nurtured a team-first attitude that pays special attention
to equipping people for success through excellent communication skills,
particularly in teaching and documentation.`

let p2 = `
Automation lies at the key of my professional identity. I have mastered the
ability to spot toil and develop safe, reliable, and efficient ways to reduce
or in some cases completely eliminate it. My experience in automating away toil
ranges from the physical to the software and encompasses PLC/IoT technologies as
well as software-based solutions (i.e. Ansible, Terraform, etc.).
`

let p3 = `
Recently I have shifted my attention and training towards mastering my
automation skills on the software side. I have numerous years of experience
developing open-source software and six months of professional experience
working as an SRE at Google. Please scroll down to see some of the projects
I have produced.
`

let pi1 = `
This project was my first complete project that I produced with Rust and
demonstrates my ability to quickly learn new technologies. I went from no prior
experience with the language to producing this project which is now featured as
one of the community SDKs for Vault. This was all done within a one month
period.
`

let pi2 = `
This project was a natural continuation of the above project and utilized it to
produce a CLI tool for generating SSH certificates. It aims to show the full
cycle of not just writing supporting libraries, but also turning them into a
useful tool. Take note of the CI pipeline run by Github Actions: it
demonstrates the care and attention to detail I take in providing a richly
automated approach to development in all of my core projects.
`

let pi3 = `
This project highlights my ability to design and deploy HTTP API's. The API is
backed by several other sub-projects that together help build the final product.
Pay particular attention to the detail that went into developing the Docker
container and the supporting CI infrastructure for building and publishing it.
Also note the extensive use of testing which is another staple in my core
projects and highlights my experience working in mission-critical environments.
Finally, note the extensive and high-quality documentation, which is another nod
to my team-first attitude which aims to equip others.
`

let pi4 = `
This project highlights my ability to tackle problems on-the-fly in a creative
manner. This was deployed in an offline network which was previously installing
software via USB drives. It utilizes automation to fetch, scan, and compile
applications into a package for easier auditing of installations. It also stands
as another demonstration of my ability to pickup new technologies, as prior to
this project I had never worked with Powershell.
`

// ABOUT DATA
export const aboutData = {
  img: 'profile.jpg',
  paragraphOne: p1,
  paragraphTwo: p2,
  paragraphThree: p3,
  resume: resume_url, // if no resume, the button will not show up
  blog: blog_url,
  philosophy: philosophy_url,
};

// PROJECTS DATA
export const projectsData = [
  {
    id: nanoid(),
    img: 'vaultrs.png',
    title: 'VaultRS',
    info: 'An asynchronous Rust client library for the Hashicorp Vault API.',
    info2: pi1,
    url: '',
    repo: 'https://github.com/jmgilman/vaultrs', // if no repo, the button will not show up
  },
  {
    id: nanoid(),
    img: 'vaultssh.png',
    title: 'VaultSSH',
    info: 'A small CLI wrapper for authenticating with SSH keys from Hashicorp Vault.',
    info2: pi2,
    url: '',
    repo: 'https://github.com/jmgilman/vaultssh', // if no repo, the button will not show up
  },
  {
    id: nanoid(),
    img: 'bapi.png',
    title: 'Bapi',
    info: 'The Beancount API provides an HTTP API for interacting with a Beancount ledger file.',
    info2: pi3,
    url: '',
    repo: 'https://github.com/jmgilman/bapi', // if no repo, the button will not show up
  },
  {
    id: nanoid(),
    img: 'cpc.png',
    title: 'Chocolatey Package Creator',
    info: 'Powershell module for creating internal Chocolatey packages',
    info2: pi4,
    url: '',
    repo: 'https://github.com/jmgilman/ChocolateyPackageCreator', // if no repo, the button will not show up
  },
];

// CONTACT DATA
export const contactData = {
  cta: '',
  btn: '',
  email: 'joshuagilman@gmail.com',
};

// FOOTER DATA
export const footerData = {
  networks: [
    {
      id: nanoid(),
      name: 'github',
      url: 'https://github.com/jmgilman',
    },
    {
      id: nanoid(),
      name: 'linkedin',
      url: 'https://www.linkedin.com/in/joshua-g-29083b5b/',
    },
  ],
};

// Github start/fork buttons
export const githubButtons = {
  isEnabled: false, // set to false to disable the GitHub stars/fork buttons
};
