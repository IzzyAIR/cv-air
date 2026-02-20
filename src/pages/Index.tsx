import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TechStackSection from "@/components/TechStackSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TechStackSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
      <footer className="py-8 border-t border-border">
        <div className="container text-center">
          <p className="font-mono text-sm text-muted-foreground">
            © 2026 Izzatilla Aliev — Built with passion & modern web tech
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
