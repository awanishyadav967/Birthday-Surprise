import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

export function BirthdayCountdown() {
  const [timeDisplay, setTimeDisplay] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const birthdayDate = new Date("2025-11-25T00:00:00");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const diff = birthdayDate.getTime() - now.getTime();
      
      if (diff < 0) {
        const daysSince = Math.floor(Math.abs(diff) / (1000 * 60 * 60 * 24));
        if (daysSince === 0) {
          setTimeDisplay("TODAY");
          setStatusMessage("SPECIAL DAY ACTIVE");
        } else {
          setTimeDisplay("THE DAY HAS PASSED");
          setStatusMessage("MEMORIES REMAIN");
        }
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        if (days > 0) {
          setTimeDisplay(`${days} DAYS`);
          setStatusMessage("COUNTDOWN ACTIVE");
        } else {
          setTimeDisplay(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
          setStatusMessage("FINAL HOURS");
        }
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card 
      className="inline-block px-8 py-4 bg-black/80 backdrop-blur-sm border-2"
      style={{
        borderColor: '#ffd700',
        boxShadow: '0 0 20px rgba(255, 215, 0, 0.4)'
      }}
      data-testid="card-countdown"
    >
      <div className="text-center">
        <p 
          className="font-retro text-sm text-muted-foreground mb-2"
          data-testid="text-countdown-date"
        >
          NOVEMBER 25, 2025
        </p>
        <div 
          className="font-display text-4xl md:text-5xl font-bold uppercase"
          style={{
            color: '#ffd700',
            textShadow: '0 0 20px #ffd700',
            letterSpacing: '0.1em'
          }}
          data-testid="text-countdown-value"
        >
          {timeDisplay || "IT'S YOUR DAY"}
        </div>
        <p 
          className="font-terminal text-sm mt-3" 
          style={{ color: '#ffd700' }}
          data-testid="text-countdown-status"
        >
          {statusMessage || "SPECIAL DAY ACTIVE"}
        </p>
      </div>
    </Card>
  );
}
