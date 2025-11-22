import { useState } from "react";
import { HeroSection } from "@/components/hero-section";
import { GallerySection } from "@/components/gallery-section";
import { MessagesSection } from "@/components/messages-section";
import { BirthdayCakeSection } from "@/components/birthday-cake-section";
import { BirthdayCountdown } from "@/components/birthday-countdown";
import { FloatingParticles } from "@/components/floating-particles";
import { ScanlineEffect } from "@/components/scanline-effect";
import { ScrollIndicator } from "@/components/scroll-indicator";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <FloatingParticles />
      <ScanlineEffect />
      <ScrollIndicator />
      
      {!hasEntered ? (
        <HeroSection onEnter={() => setHasEntered(true)} />
      ) : (
        <div className="relative z-10">
          <div className="py-16 flex justify-center">
            <BirthdayCountdown />
          </div>
          <GallerySection />
          <MessagesSection />
          <BirthdayCakeSection />
          <footer className="py-12 text-center border-t border-border/30">
            <p className="font-terminal text-muted-foreground text-sm">
              Made with{" "}
              <span className="text-primary animate-pulse">♥</span>{" "}
              for Archi
            </p>
            <p className="font-retro text-xs text-muted-foreground/70 mt-2">
              November 25, 2025
            </p>
          </footer>
        </div>
      )}
    </div>
  );
}
