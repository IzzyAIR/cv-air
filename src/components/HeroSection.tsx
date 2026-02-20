import profilePhoto from "@/assets/profile-photo.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-grid overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 rounded-full bg-primary/5 blur-[100px]" />

      <div className="container relative z-10 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="max-w-3xl">
            <p className="font-mono text-primary text-sm tracking-widest uppercase mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              &lt;Senior Frontend Developer /&gt;
            </p>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Izzatilla
              <br />
              <span className="text-gradient">Aliev</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Senior/Lead Frontend developer specializing in creating high-load and modern web applications with deep expertise in a wide range of technologies and frameworks.
            </p>
            <p className="text-sm text-muted-foreground font-mono mb-10 animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
              📍 Tashkent · Open to relocation · Remote / Full-time / Part-time
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <a href="mailto:izzycode2105@gmail.com" className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity">
                Get in Touch
              </a>
              <a href="#stack" className="inline-flex items-center px-6 py-3 border border-glow text-foreground font-semibold rounded-lg hover:bg-secondary transition-colors">
                View Stack
              </a>
            </div>
          </div>

          <div className="shrink-0 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-2xl overflow-hidden border-2 border-glow shadow-[0_0_40px_hsl(175_80%_50%/0.15)]">
              <img src={profilePhoto} alt="Izzatilla Aliev" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
