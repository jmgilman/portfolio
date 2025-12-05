// Projects data
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  impact: string;
  role: string;
  tags: string[];
  image?: string;
  github?: string;
  demo?: string;
  featured: boolean;
  date: string;
}

export const projects: Project[] = [
  {
    id: 'sow',
    title: 'sow - System of Work',
    description:
      'AI-powered framework that orchestrates multiple specialized Claude Code agents through a 5-phase development workflow with zero-context resumability.',
    longDescription:
      'sow coordinates specialized AI agents (researcher, architect, planner, implementer, reviewer) through a proven workflow while maintaining human oversight of planning and architecture decisions. Built with Go, it solves the critical challenge of AI-assisted development—context loss between sessions—through comprehensive filesystem-based state management. The framework enables complete session resumability, making AI collaboration as seamless as human pair programming.',
    impact:
      'Enables structured AI-assisted feature development without context loss, replacing conversation history with filesystem state for seamless multi-session workflows.',
    role: 'Creator & primary author',
    tags: ['Go', 'AI', 'Developer Tools'],
    github: 'https://github.com/jmgilman/sow',
    featured: true,
    date: '2024-11-01',
  },
  {
    id: 'catalyst-forge',
    title: 'Catalyst Forge',
    description:
      'Comprehensive developer platform that automates CI/CD, project discovery, and Kubernetes deployments through CUE-based blueprints and GitOps workflows.',
    longDescription:
      'Catalyst Forge is a multi-component platform built with Go that unifies CI/CD automation, project management, and infrastructure deployment. It uses CUE-based blueprints for configuration, Earthly for distributed builds, and Kubernetes operators for automated deployments. The platform intelligently discovers projects within monorepos and dynamically generates CI pipelines without requiring centralized configuration.',
    impact:
      'Eliminates manual CI/CD pipeline configuration for Project Catalyst, enabling GitOps-style deployment automation across complex monorepos with multiple interdependent projects.',
    role: 'Primary author & architect',
    tags: ['Go', 'Kubernetes', 'CI/CD'],
    github: 'https://github.com/input-output-hk/catalyst-forge',
    featured: true,
    date: '2024-06-01',
  },
  {
    id: 'vaultrs',
    title: 'vaultrs',
    description:
      'Production-ready async Rust client library for HashiCorp Vault with comprehensive API coverage for secrets management, PKI, and encryption.',
    longDescription:
      'vaultrs is a feature-complete Rust client library for HashiCorp Vault built on async/await foundations with Tokio and Reqwest. It provides strongly-typed APIs covering 11+ secret engines (PKI, AWS, databases, KV, transit encryption) and multiple authentication methods (AppRole, AWS, Kubernetes, JWT/OIDC). The library prioritizes developer ergonomics through builder patterns and operational robustness through comprehensive error handling and tracing integration.',
    impact:
      'Enables Rust teams to securely manage secrets with production-grade reliability. Published on crates.io with 14.5K+ lines of code and 5.6K+ lines of integration tests against live Vault instances.',
    role: 'Author & primary maintainer',
    tags: ['Rust', 'Security', 'HashiCorp Vault'],
    github: 'https://github.com/jmgilman/vaultrs',
    demo: 'https://crates.io/crates/vaultrs',
    featured: true,
    date: '2021-08-01',
  },
  {
    id: 'bapi',
    title: 'Beancount API',
    description:
      'RESTful API service that exposes Beancount financial ledgers with pluggable storage backends, JWT authentication, and advanced querying capabilities.',
    longDescription:
      'A modern Python/FastAPI application that transforms Beancount ledger files into queryable REST APIs. Features pluggable storage backends (local/Redis/S3), intelligent caching with background invalidation, JMESPath filtering, full-text search, and JWT authentication. Enables seamless integration of Beancount-based financial data with dashboards, mobile apps, and third-party tools.',
    impact:
      "Bridges the gap between Beancount's powerful CLI-based accounting and modern web applications, enabling programmatic access to personal finance data.",
    role: 'Author & maintainer',
    tags: ['Python', 'FastAPI', 'Finance'],
    github: 'https://github.com/jmgilman/bapi',
    featured: false,
    date: '2022-03-01',
  },
  {
    id: 'nixago',
    title: 'Nixago',
    description:
      'Nix flake library for declaratively generating configuration files using Nix expressions, eliminating repository clutter and configuration duplication.',
    longDescription:
      'Nixago provides a pluggable engine architecture supporting multiple configuration formats (JSON, YAML, TOML, INI, XML) through the Nix engine and advanced validation/transformation through the CUE engine. It seamlessly integrates with Nix flake-based development environments, automatically managing generated files through intelligent shell hooks with automatic .gitignore management.',
    impact:
      'Enables teams using Nix to maintain a single source of truth for all tool configurations. Part of the nix-community organization with an active ecosystem of pre-built configurations.',
    role: 'Primary author & maintainer',
    tags: ['Nix', 'Developer Tools'],
    github: 'https://github.com/nix-community/nixago',
    featured: false,
    date: '2022-06-01',
  },
];

export const getAllTags = (): string[] => {
  const tags = new Set<string>();
  projects.forEach((project) => project.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
};

export const getFeaturedProjects = (): Project[] => {
  return projects.filter((p) => p.featured).slice(0, 3);
};
