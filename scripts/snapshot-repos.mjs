import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const USERNAME = process.env.GITHUB_USERNAME ?? "zenthiccc";
const OUTPUT = fileURLToPath(new URL("../lib/repos.snapshot.json", import.meta.url));

async function main() {
  const res = await fetch(
    `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated&visibility=public`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "portfolio-snapshot",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
    },
  );

  if (!res.ok) throw new Error(`GitHub responded ${res.status}`);

  const data = await res.json();
  if (!Array.isArray(data)) throw new Error("Unexpected GitHub payload");

  const repos = data
    .filter((repo) => !repo.fork && !repo.archived)
    .map((repo) => ({
      name: repo.name,
      description: repo.description ?? null,
      url: repo.html_url,
      language: repo.language ?? null,
      pushedAt: repo.pushed_at,
      stars: repo.stargazers_count ?? 0,
    }))
    .sort((a, b) => new Date(b.pushedAt) - new Date(a.pushedAt));

  await writeFile(OUTPUT, `${JSON.stringify(repos, null, 2)}\n`);
  console.log(`Saved ${repos.length} repos to lib/repos.snapshot.json`);
}

main().catch((error) => {
  console.warn(`Snapshot skipped: ${error.message}`);
});
