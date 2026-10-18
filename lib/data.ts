export type ProfileLink = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  tagline: string;
  location: string;
  links: ProfileLink[];
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  logo: {
    src: string;
    alt: string;
  };
};

export const profile: Profile = {
  name: "Joseph Duron Jr.",
  tagline:
    "AI & Software Engineer.",
  location: "Philippines",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/joseph-duron-jr/" },
    { label: "GitHub", href: "https://github.com/zenthiccc" },
    { label: "Email", href: "mailto:djesph@gmail.com" },
  ],
};

export const experience: Experience[] = [
  {
    company: "General Motors Philippines",
    role: "Transformation Analyst (Automations Engineer)",
    period: "June 2026 – Present",
    logo: { src: "/logos/general-motors.svg", alt: "General Motors" },
  },
  {
    company: "Shopee Philippines",
    role: "Data Analysis & Automation Intern",
    period: "Feb 2026 – May 2026",
    logo: { src: "/logos/shopee.svg", alt: "Shopee" },
  },
  {
    company: "General Motors Philippines",
    role: "Software Automation Intern",
    period: "May 2025 – Oct 2025",
    logo: { src: "/logos/general-motors.svg", alt: "General Motors" },
  },
  {
    company: "AMS Installation & Maintenance Western Australia",
    role: "Software Developer",
    period: "Jul 2022 – May 2024 (Freelance)",
    logo: { src: "/logos/ams.svg", alt: "AMS Installation & Maintenance" },
  },
  {
    company: "Skvllpvnkz NFT Project",
    role: "Frontend Web Developer",
    period: "Sep 2021 – Feb 2022 (Freelance)",
    logo: { src: "/logos/skvllpvnkz.svg", alt: "Skvllpvnkz" },
  },
];
