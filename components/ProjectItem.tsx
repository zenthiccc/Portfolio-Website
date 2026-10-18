import type { Repo } from "@/lib/github";
import { getLanguageIcon, LanguageIcon } from "./LanguageIcon";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function ProjectItem({ repo }: { repo: Repo }) {
  const updated = dateFormat.format(new Date(repo.pushedAt));
  const created = dateFormat.format(new Date(repo.createdAt));
  const language = repo.language;
  const icon = language ? getLanguageIcon(language) : undefined;

  return (
    <article>
      <p className="flex flex-wrap items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.18em]">
        {icon && language ? (
          <span className="inline-flex items-center" title={language}>
            <LanguageIcon icon={icon} className="h-5.5 w-5.5 shrink-0" />
            <span className="sr-only">{language}</span>
          </span>
        ) : language ? (
          <span>{language}</span>
        ) : null}
        {language ? <span aria-hidden="true">·</span> : null}
        <span>Updated {updated}</span>
        <span aria-hidden="true">·</span>
        <span>Created {created}</span>
      </p>
      <h3 className="mt-2 font-display text-lg font-semibold break-words">
        {repo.name}
      </h3>
      {repo.description ? (
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {repo.description}
        </p>
      ) : null}
      <a
        href={repo.url}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-opacity hover:opacity-80"
      >
        See more in github
        <span aria-hidden="true">↗</span>
      </a>
    </article>
  );
}
