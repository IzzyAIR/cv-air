const categories = [
  {
    title: "Core",
    items: [
      "JavaScript (ES6+)",
      "TypeScript",
      "HTML5",
      "CSS3",
      "DOM API",
      "Accessibility (a11y)",
    ],
  },
  {
    title: "Frameworks",
    items: [
      "React",
      "Next.js",
      "Vue 3",
      "Quasar",
      "Angular",
      "Svelte",
      "Astro",
    ],
  },
  {
    title: "State & Data",
    items: [
      "Redux Toolkit",
      "Zustand",
      "Pinia",
      "RxJS",
      "TanStack Query",
      "REST API",
      "GraphQL",
      "WebSockets",
    ],
  },
  {
    title: "Rendering & Architecture",
    items: [
      "SSR",
      "SSG",
      "ISR",
      "SPA Architecture",
      "Micro-frontends",
      "Feature-Sliced Design",
      "Clean Architecture (Frontend)",
      "Module Federation (Frontend & Backend)",
    ],
  },
  {
    title: "Backend & Real-time",
    items: [
      "Node.js",
      "Express.js",
      "NestJS",
      "Socket.IO",
      "SSE",
      "JWT Authentication",
    ],
  },
  {
    title: "AI & AIDD",
    items: [
      "AI-Driven Development (AIDD)",
      "Prompt Engineering",
      "AI-assisted Code Review",
      "AI-powered UI/UX Prototyping",
    ],
  },
  {
    title: "Mobile & Cross-platform",
    items: ["Ionic", "Capacitor", "PWA"],
  },
  {
    title: "Tooling & Testing",
    items: [
      "Vite",
      "Webpack",
      "ESBuild",
      "Jest",
      "Vitest",
      "Testing Library",
      "Cypress",
      "Docker (basic)",
      "CI/CD",
      "Fabric.js",
    ],
  },
];

const TechStackSection = () => {
  return (
    <section id="stack" className="py-24 relative">
      <div className="container">
        <div className="mb-16">
          <p className="font-mono text-primary text-sm tracking-widest uppercase mb-3">
            // tech stack
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Tools I Work With
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <div
              key={cat.title}
              className="group p-6 rounded-xl bg-card border border-border hover:border-glow transition-colors duration-300"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <h3 className="font-mono text-primary text-xs uppercase tracking-widest mb-5">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 text-sm font-medium rounded-md bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
