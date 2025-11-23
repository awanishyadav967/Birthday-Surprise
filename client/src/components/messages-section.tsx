import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

const messages = [
  {
    id: 1,
    title: "To Someone Special",
    content: " We wanted to remind you how  dumboooooo you are [This is test word]. Your love for Stranger Things inspired this entire experience - just like Eleven, you have the power to make impossible things happen.",
    color: "#ff0000"
  },
  {
    id: 2,
    title: "Your Light in the Darkness",
    content: "dumbooooooo",
    color: "#00d4ff"
  },
  {
    id: 3,
    title: "Never Forget",
    content: "paglet",
    color: "#ffd700"
  },
  {
    id: 4,
    title: "Your Special Day",
    content: "dumbooooooo",
    color: "#ff0000"
  },
  {
    id: 5,
    title: "Wishing You Magic",
    content: "paglet",
    color: "#00d4ff"
  }
];

function TypewriterText({ text, isVisible }: { text: string; isVisible: boolean }) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!isVisible) {
      setDisplayedText("");
      return;
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setShowCursor(false);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [text, isVisible]);

  return (
    <span className="inline">
      {displayedText}
      {showCursor && isVisible && (
        <span className="animate-blink">|</span>
      )}
    </span>
  );
}

export function MessagesSection() {
  const [visibleMessages, setVisibleMessages] = useState<Set<number>>(new Set());
  const messageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setVisibleMessages((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.3 }
    );

    messageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      messageRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section className="min-h-screen py-24 px-4" id="messages">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="font-display text-4xl md:text-6xl font-bold uppercase mb-4"
            style={{
              color: '#ff0000',
              textShadow: `
                0 0 10px #ff0000,
                0 0 20px #ff0000,
                0 0 30px #ff0000
              `
            }}
            data-testid="text-messages-title"
          >
            Transmissions
          </h2>
          <p className="font-terminal text-muted-foreground text-lg">
            Messages from the <span className="text-primary">other side</span>
          </p>
        </div>

        <div className="space-y-12">
          {messages.map((message, index) => (
            <div
              key={message.id}
              ref={(el) => (messageRefs.current[index] = el)}
              data-index={index}
              className={`transition-all duration-700 ${
                visibleMessages.has(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              data-testid={`card-message-${message.id}`}
            >
              <Card
                className="p-8 bg-card/60 backdrop-blur-sm border-2"
                style={{
                  borderColor: message.color,
                  boxShadow: `0 0 20px ${message.color}40`
                }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full animate-pulse"
                    style={{
                      backgroundColor: message.color,
                      boxShadow: `0 0 10px ${message.color}`
                    }}
                    data-testid={`indicator-message-${message.id}`}
                  />
                  <h3
                    className="font-terminal text-xl font-bold uppercase tracking-wider"
                    style={{ color: message.color }}
                    data-testid={`text-message-title-${message.id}`}
                  >
                    {message.title}
                  </h3>
                </div>

                <div
                  className="font-terminal text-base leading-relaxed"
                  style={{
                    color: '#ffffff',
                    textShadow: `0 0 5px ${message.color}20`
                  }}
                  data-testid={`text-message-content-${message.id}`}
                >
                  <TypewriterText
                    text={message.content}
                    isVisible={visibleMessages.has(index)}
                  />
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
