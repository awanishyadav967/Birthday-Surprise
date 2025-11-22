import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  onEnter: () => void;
}

export function HeroSection({ onEnter }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/50" />
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold uppercase mb-8 animate-flicker"
          style={{
            color: '#ff0000',
            textShadow: `
              0 0 10px #ff0000,
              0 0 20px #ff0000,
              0 0 30px #ff0000,
              0 0 40px #ff0000,
              0 0 70px #ff0000,
              0 0 80px #ff0000,
              0 0 100px #ff0000
            `,
            letterSpacing: '0.05em'
          }}
          data-testid="text-hero-title"
        >
          Happy Birthday
        </h1>
        
        <h2 
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase mb-12 animate-flicker"
          style={{
            color: '#ff0000',
            textShadow: `
              0 0 10px #ff0000,
              0 0 20px #ff0000,
              0 0 30px #ff0000,
              0 0 40px #ff0000,
              0 0 70px #ff0000,
              0 0 80px #ff0000,
              0 0 100px #ff0000
            `,
            letterSpacing: '0.05em',
            animationDelay: '0.3s'
          }}
          data-testid="text-hero-name"
        >
          Archi
        </h2>

        <p className="font-terminal text-xl md:text-2xl text-foreground/90 mb-12 max-w-2xl mx-auto leading-relaxed">
          Welcome to the <span className="text-secondary font-bold">Upside Down</span> of birthday celebrations.<br />
          A special surprise awaits you...
        </p>

        <Button
          size="lg"
          onClick={onEnter}
          className="relative group px-8 py-6 text-lg font-terminal uppercase tracking-wider"
          style={{
            background: 'transparent',
            border: '2px solid #ff0000',
            color: '#ffffff',
            boxShadow: `
              0 0 10px #ff0000,
              inset 0 0 10px rgba(255, 0, 0, 0.1)
            `
          }}
          data-testid="button-enter"
        >
          <span className="relative z-10">Enter</span>
          <div 
            className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300"
            style={{
              boxShadow: '0 0 20px #ff0000'
            }}
          />
        </Button>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown 
            className="w-8 h-8 text-primary" 
            style={{
              filter: 'drop-shadow(0 0 8px #ff0000)'
            }}
            data-testid="icon-scroll-down"
          />
        </div>
      </div>
    </section>
  );
}
