import { profile } from "@/lib/data";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="z-20 flex flex-col gap-4 border-b border-border bg-background pb-5 backdrop-blur sm:flex-row sm:items-end sm:justify-between lg:sticky lg:top-0 lg:items-center lg:gap-6 lg:pt-5">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {profile.name}
        </h1>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
          {profile.tagline}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <nav className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium uppercase tracking-[0.18em]">
          {profile.links.map((link, index) => (
            <span key={link.label} className="flex items-center gap-x-3">
              {index > 0 ? <span className="text-border">/</span> : null}
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </span>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
