import { getRepos } from "@/lib/github";
import { ProjectItem } from "./ProjectItem";

export async function ProjectsList() {
  const repos = await getRepos();

  return (
    <section aria-labelledby="projects-heading" className="flex flex-col gap-10">
      <h2
        id="projects-heading"
        className="font-display text-xl font-semibold tracking-tight sm:text-2xl"
      >
        Projects
      </h2>
      {repos.length === 0 ? (
        <p className="text-sm text-muted">No projects to show right now.</p>
      ) : (
        <div className="flex flex-col gap-9">
          {repos.map((repo) => (
            <ProjectItem key={repo.url} repo={repo} />
          ))}
        </div>
      )}
    </section>
  );
}
