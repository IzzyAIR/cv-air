const experiences = [
  {
    role: "Senior / Lead Frontend Developer",
    company: "UZINFOCOM",
    period: "Mar 2024 — Present",
    description:
      "Lead Frontend developer responsible for architecture, technical direction, and quality of the company's key web products. Building state-level projects with high security, stability, and scalability requirements.",
    highlights: [
      "Led development of a next-gen web video editor with Fabric.js, dynamic JSON structures, and a flexible timeline system",
      "Implementing SSR interfaces with enhanced SEO optimization for state order projects",
      "Software development, system integration, and IT consulting",
    ],
    stack: [
      "JavaScript (ES6+)",
      "TypeScript",
      "Node.js",
      "React",
      "Next.js",
      "Angular",
      "Vue 3",
      "Svelte",
      "Astro",
      "SSR",
      "Quasar",
      "REST API",
      "WebSockets",
      "Fabric.js",
    ],
  },
  {
    role: "Senior Frontend Developer",
    company: "abcollab",
    location: "United Kingdom",
    period: "Jul 2023 — Aug 2024",
    description:
      'Development and maintenance of the "abcollab" web service for collaboration in the field of art.',
    highlights: [
      "Built features with React, Redux Toolkit, and Firebase",
      "Active participation in product team discussions for new features",
      "Ensuring high performance and responsiveness of the UI",
    ],
    stack: ["React", "Redux Toolkit", "Firebase", "TypeScript"],
  },
  {
    role: "Frontend Developer",
    company: "Alovoice",
    location: "Tashkent",
    period: "Aug 2022 — Jun 2023",
    description:
      "Development of a CRM web application to optimize customer interaction.",
    highlights: [
      "Applied MVVM methodology for better code structure",
      "Integrated various libraries and tools for improved functionality",
    ],
    stack: ["React", "MobX", "MVVM", "REST API"],
  },
  {
    role: "Frontend Developer",
    company: "MED YU MED",
    location: "Tashkent",
    period: "Dec 2021 — Jul 2022",
    description:
      "Development of an electronic journal and database for a medical clinic.",
    highlights: [
      "Created intuitive UI components",
      "Integration with RESTful API for efficient data exchange",
      "Performance optimization and responsive layout",
    ],
    stack: ["React.js", "REST API", "CSS3"],
  },
  {
    role: "Web Developer",
    company: "Korea Academy",
    location: "Tashkent",
    period: "Aug 2019 — Nov 2021",
    description:
      "Creating modern websites, supporting and developing a learning platform, and building a student accounting system.",
    stack: ["JavaScript", "HTML5", "CSS3"],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 border-t border-border">
      <div className="container">
        <div className="mb-16">
          <p className="font-mono text-primary text-sm tracking-widest uppercase mb-3">
            // experience · 6+ years
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Where I've Worked
          </h2>
        </div>

        <div className="space-y-0">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="group grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-4 lg:gap-10 py-10 border-b border-border last:border-b-0 hover:bg-card/50 -mx-6 px-6 rounded-lg transition-colors"
            >
              <div>
                <p className="font-mono text-sm text-muted-foreground whitespace-nowrap">
                  {exp.period}
                </p>
                {exp.location && (
                  <p className="font-mono text-xs text-muted-foreground/60 mt-1">
                    📍 {exp.location}
                  </p>
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">{exp.role}</h3>
                <p className="text-primary font-mono text-sm mb-3">
                  {exp.company}
                </p>
                <p className="text-muted-foreground mb-3">{exp.description}</p>
                {exp.highlights && (
                  <ul className="text-muted-foreground text-sm space-y-1 mb-4 list-none">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="flex gap-2">
                        <span className="text-primary shrink-0">→</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex flex-wrap gap-2">
                  {exp.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-mono rounded bg-secondary text-secondary-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
