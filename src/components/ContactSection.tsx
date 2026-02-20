import { Mail, Github, Linkedin, Send } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 border-t border-border">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-mono text-primary text-sm tracking-widest uppercase mb-3">
            // contact
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Let's Work
            <br />
            <span className="text-gradient">Together</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Interested in working together? Feel free to reach out — I'm always
            open to discussing new projects and opportunities.
          </p>

          <a
            href="mailto:izzycode2105@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity text-lg mb-12"
          >
            <Mail className="w-5 h-5" />
            izzycode2105@gmail.com
          </a>

          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="https://t.me/izzy2105"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground border border-border hover:border-glow rounded-lg transition-colors"
            >
              <Send className="w-4 h-4" />
              <span className="text-sm font-mono">Telegram</span>
            </a>
            <a
              href="tel:+998946436555"
              className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground border border-border hover:border-glow rounded-lg transition-colors"
            >
              <span className="text-sm font-mono">📞 +998 94 643 6555</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
