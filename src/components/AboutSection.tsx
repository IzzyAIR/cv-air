const AboutSection = () => {
  return (
    <section id="about" className="py-24 border-t border-border">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="font-mono text-primary text-sm tracking-widest uppercase mb-3">
              // about me
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-8">
              Passionate about
              <br />
              <span className="text-gradient">pixel-perfect</span> UI
            </h2>
          </div>
          <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
            <p>
              Senior/Lead Frontend developer with 6+ years of experience specializing in creating 
              high-load and modern web applications. I have deep expertise in a wide range of 
              technologies and frameworks — from React and Vue to Angular, Svelte, and Astro.
            </p>
            <p>
              I thrive in environments where design meets engineering — turning complex requirements 
              into elegant, user-friendly interfaces. Currently leading frontend architecture at 
              UZINFOCOM, building state-level projects with high requirements for security, 
              stability, and scalability.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-6">
              {[
                { label: "Frameworks", value: "6+" },
                { label: "Years Exp.", value: "6+" },
                { label: "Languages", value: "4" },
                { label: "Technologies", value: "20+" },
              ].map((stat) => (
                <div key={stat.label} className="border-l-2 border-primary pl-4">
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground font-mono">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
