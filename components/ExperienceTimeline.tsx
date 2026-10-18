import Image from "next/image";
import { experience } from "@/lib/data";

export function ExperienceTimeline() {
  return (
    <section
      aria-labelledby="experience-heading"
      className="flex flex-col gap-8"
    >
      <h2
        id="experience-heading"
        className="font-display text-xl font-semibold tracking-tight sm:text-2xl"
      >
        Work Experience
      </h2>
      <ol className="flex flex-col gap-8 border-l border-border">
        {experience.map((entry) => (
          <li
            key={`${entry.company}-${entry.period}`}
            className="relative pl-8"
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent"
            />
            <div className="flex items-start gap-3">
              <Image
                src={entry.logo.src}
                alt={entry.logo.alt}
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 rounded-md"
              />
              <div className="min-w-0">
                <p className="font-mono text-xs text-muted">{entry.period}</p>
                <p className="mt-1 font-semibold">{entry.company}</p>
                <p className="text-sm text-muted">{entry.role}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
