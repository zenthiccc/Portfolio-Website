import { cacheLife, cacheTag } from "next/cache";
import snapshot from "./repos.snapshot.json";

export type Repo = {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  pushedAt: string;
  createdAt: string;
  stars: number;
};

const USERNAME = process.env.GITHUB_USERNAME ?? "zenthiccc";

export async function getRepos(): Promise<Repo[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("repos");

  try {
    const res = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated&visibility=public`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {}),
        },
      },
    );

    if (!res.ok) throw new Error(`GitHub responded ${res.status}`);

    const data: Array<{
      name: string;
      description: string | null;
      html_url: string;
      language: string | null;
      pushed_at: string;
      created_at: string;
      stargazers_count: number;
      fork: boolean;
      archived: boolean;
    }> = await res.json();

    if (!Array.isArray(data)) throw new Error("Unexpected GitHub payload");

    return data
      .filter((repo) => !repo.fork && !repo.archived)
      .map((repo) => ({
        name: repo.name,
        description: repo.description ?? null,
        url: repo.html_url,
        language: repo.language ?? null,
        pushedAt: repo.pushed_at,
        createdAt: repo.created_at,
        stars: repo.stargazers_count ?? 0,
      }))
      .sort((a, b) => Date.parse(b.pushedAt) - Date.parse(a.pushedAt));
  } catch {
    return snapshot;
  }
}
