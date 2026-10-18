import { Header } from "@/components/Header";
import { ProjectsList } from "@/components/ProjectsList";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";

export default async function Home() {
  "use cache";
  return (
    <div className="mx-auto w-full max-w-7xl px-6 pt-12 pb-16 sm:px-10 sm:pt-16">
      <Header />
      <main className="mt-12 grid grid-cols-1 gap-12 lg:mt-10 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1">
          <ProjectsList />
        </div>
        <div className="order-1 lg:order-2 lg:sticky lg:top-36 lg:self-start">
          <ExperienceTimeline />
        </div>
      </main>
      <footer className="mt-20 border-t border-border pt-6 text-xs text-muted">
        © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
