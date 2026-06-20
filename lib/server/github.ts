import { unstable_cache } from 'next/cache';

import {
  GithubLanguage,
  GithubRepository,
  GithubTopic,
  Project,
} from '@/types/global-types';

async function fetchGraphQL(
  query: string,
  variables: Record<string, unknown> = {}
) {
  const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  if (!GITHUB_USERNAME || !GITHUB_TOKEN) {
    throw new Error('GITHUB_USERNAME or GITHUB_TOKEN is missing');
  }

  try {
    const response = await fetch('https://api.github.com/graphql', {
      body: JSON.stringify({ query, variables }),
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.statusText}`);
    }

    const result = await response.json();
    if (result.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
    }

    return result.data;
  } catch (error) {
    throw error;
  }
}

export const getGithubProjects = unstable_cache(
  async (
    page = 1,
    perPage = 6,
    searchQuery = '',
    languages: string[] = []
  ): Promise<{ projects: Project[]; totalCount: number }> => {
    const login = process.env.GITHUB_USERNAME;
    // Build the search query string
    let queryStr = `user:${login} sort:updated-desc fork:false is:public`;
    if (searchQuery) {
      queryStr += ` ${searchQuery}`;
    }
    if (languages.length > 0) {
      const langQuery = languages.map(lang => `language:${lang}`).join(' OR ');
      queryStr += ` ${languages.length > 1 ? `(${langQuery})` : langQuery}`;
    }

    const query = `
      query($queryStr: String!, $first: Int!) {
        search(query: $queryStr, type: REPOSITORY, first: $first) {
          repositoryCount
          nodes {
            ... on Repository {
              id
              name
              description
              url
              stargazerCount
              forkCount
              homepageUrl
              repositoryTopics(first: 10) {
                nodes {
                  topic {
                    name
                  }
                }
              }
              languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                nodes {
                  name
                }
              }
            }
          }
        }
      }
    `;

    // Fetch up to 100 projects for local pagination/filtering if needed
    // or just fetch what's requested. For now, let's keep it simple.
    const fetchCount = Math.max(100, page * perPage);

    const data = await fetchGraphQL(query, {
      first: fetchCount,
      queryStr,
    });

    if (!data || !data.search) {
      return { projects: [], totalCount: 0 };
    }

    const repoNodes = data.search.nodes || [];
    const totalCount = data.search.repositoryCount || 0;

    const projects = repoNodes.map((repo: GithubRepository) => ({
      description: repo.description || '',
      forks: repo.forkCount,
      homepage: repo.homepageUrl || '',
      id: repo.id,
      language: repo.languages.nodes[0]?.name || '',
      link: repo.url,
      stars: repo.stargazerCount,
      tags: Array.from(
        new Set([
          ...repo.languages.nodes.map((l: GithubLanguage) => l.name),
          ...repo.repositoryTopics.nodes.map((t: GithubTopic) => t.topic.name),
        ])
      ),
      title: repo.name,
    }));

    // Slice for pagination (simulating offset)
    const slicedProjects = projects.slice((page - 1) * perPage, page * perPage);
    return { projects: slicedProjects, totalCount };
  },
  ['github-projects'],
  { revalidate: 3600, tags: ['projects'] }
);

export const getGithubLanguages = unstable_cache(
  async (): Promise<string[]> => {
    const query = `
      query($login: String!) {
        user(login: $login) {
          repositories(first: 100, privacy: PUBLIC, isArchived: false) {
            nodes {
              languages(first: 10) {
                nodes {
                  name
                }
              }
            }
          }
        }
      }
    `;

    const data = await fetchGraphQL(query, {
      login: process.env.GITHUB_USERNAME,
    });

    if (!data || !data.user) return [];

    const languages = new Set<string>();
    data.user.repositories.nodes.forEach(
      (repo: { languages: { nodes: GithubLanguage[] } }) => {
        repo.languages.nodes.forEach((lang: GithubLanguage) => {
          languages.add(lang.name);
        });
      }
    );

    return Array.from(languages).sort();
  },
  ['github-languages'],
  { revalidate: 3600, tags: ['languages'] }
);

export const getProjectBySlug = unstable_cache(
  async (slug: string): Promise<null | Project> => {
    const query = `
      query($login: String!, $name: String!) {
        repository(owner: $login, name: $name) {
          id
          name
          description
          url
          stargazerCount
          forkCount
          homepageUrl
          repositoryTopics(first: 10) {
            nodes {
              topic {
                name
              }
            }
          }
          languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
            nodes {
              name
            }
          }
        }
      }
    `;

    const data = await fetchGraphQL(query, {
      login: process.env.GITHUB_USERNAME,
      name: slug,
    });

    if (!data || !data.repository) return null;

    const repo = data.repository as GithubRepository;

    return {
      description: repo.description || '',
      forks: repo.forkCount,
      homepage: repo.homepageUrl || '',
      id: repo.id,
      language: repo.languages.nodes[0]?.name || '',
      link: repo.url,
      stars: repo.stargazerCount,
      tags: Array.from(
        new Set([
          ...repo.languages.nodes.map((l: GithubLanguage) => l.name),
          ...repo.repositoryTopics.nodes.map((t: GithubTopic) => t.topic.name),
        ])
      ),
      title: repo.name,
    };
  },
  ['github-project-detail'],
  { revalidate: 3600, tags: ['projects'] }
);
