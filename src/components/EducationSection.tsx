const education = [
  {
    school: "Ulsan University of Tashkent",
    degree: "Ulsan project, ICT Convergence",
    period: "— Nov 2022",
  },
  {
    school: "TPKIT (Tashkent Professional College of Information Technologies)",
    degree: "Software and Computer Engineering",
    period: "— Nov 2019",
  },
];

const languages = [
  { name: "Uzbek", level: "C2 — Proficient" },
  { name: "Russian", level: "C2 — Proficient" },
  { name: "English", level: "B1 — Intermediate" },
  { name: "Korean", level: "B1 — Intermediate" },
];

const EducationSection = () => {
  return (
    <section id="education" className="py-24 border-t border-border">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Education */}
          <div>
            <p className="font-mono text-primary text-sm tracking-widest uppercase mb-3">
              // education
            </p>
            <h2 className="text-4xl font-bold tracking-tight mb-10">Education</h2>
            <div className="space-y-8">
              {education.map((edu) => (
                <div key={edu.school} className="border-l-2 border-border pl-6 hover:border-primary transition-colors">
                  <p className="font-mono text-xs text-muted-foreground mb-1">{edu.period}</p>
                  <h3 className="text-lg font-semibold mb-1">{edu.school}</h3>
                  <p className="text-muted-foreground text-sm">{edu.degree}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <p className="font-mono text-primary text-sm tracking-widest uppercase mb-3">
              // languages
            </p>
            <h2 className="text-4xl font-bold tracking-tight mb-10">Languages</h2>
            <div className="space-y-4">
              {languages.map((lang) => (
                <div key={lang.name} className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
                  <span className="font-semibold">{lang.name}</span>
                  <span className="font-mono text-sm text-muted-foreground">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
