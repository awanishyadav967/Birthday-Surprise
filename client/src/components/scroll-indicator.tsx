import { useState, useEffect } from "react";

export function ScrollIndicator() {
  const [activeSection, setActiveSection] = useState(0);
  const sections = ['hero', 'gallery', 'messages', 'cake'];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const sectionIndex = Math.floor(scrollPosition / windowHeight);
      setActiveSection(Math.min(sectionIndex, sections.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
      {sections.map((_, index) => (
        <button
          key={index}
          onClick={() => {
            window.scrollTo({
              top: index * window.innerHeight,
              behavior: 'smooth'
            });
          }}
          className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
            activeSection === index
              ? 'bg-primary border-primary scale-125'
              : 'bg-transparent border-primary/50 hover:border-primary'
          }`}
          style={{
            boxShadow: activeSection === index ? '0 0 10px #ff0000' : 'none'
          }}
          aria-label={`Go to section ${index + 1}`}
          data-testid={`button-scroll-${index}`}
        />
      ))}
    </div>
  );
}
