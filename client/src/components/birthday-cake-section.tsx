import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cake, Sparkles } from "lucide-react";

export function BirthdayCakeSection() {
  const [candlesLit, setCandlesLit] = useState(true);
  const [hasBlown, setHasBlown] = useState(false);

  const handleBlowCandles = () => {
    setCandlesLit(false);
    setHasBlown(true);
    setTimeout(() => {
      setCandlesLit(true);
      setHasBlown(false);
    }, 3000);
  };

  return (
    <section className="min-h-screen py-24 px-4 flex items-center justify-center" id="cake">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-12">
          <h2 
            className="font-display text-4xl md:text-6xl font-bold uppercase mb-4"
            style={{
              color: '#ffd700',
              textShadow: `
                0 0 10px #ffd700,
                0 0 20px #ffd700,
                0 0 30px #ffd700
              `
            }}
            data-testid="text-cake-title"
          >
            Make a Wish
          </h2>
          <p className="font-terminal text-muted-foreground text-lg">
            It's time to celebrate!
          </p>
        </div>

        <Card className="p-12 bg-card/80 backdrop-blur-sm relative overflow-hidden">
          <div className="relative z-10">
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <Cake 
                  className="w-32 h-32 md:w-40 md:h-40"
                  style={{
                    color: '#ffd700',
                    filter: 'drop-shadow(0 0 20px #ffd700)'
                  }}
                  data-testid="icon-cake"
                />
                {candlesLit && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2" data-testid="candles-lit">
                    <div className="flex gap-3">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1 h-8 bg-gradient-to-t from-primary to-yellow-300 animate-flicker"
                          style={{
                            boxShadow: '0 0 10px #ff0000, 0 0 20px #ffd700',
                            animationDelay: `${i * 0.2}s`
                          }}
                          data-testid={`candle-${i}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {!hasBlown ? (
              <Button
                size="lg"
                onClick={handleBlowCandles}
                disabled={!candlesLit}
                className="font-terminal text-lg uppercase tracking-wider"
                style={{
                  background: candlesLit ? '#ffd700' : '#666',
                  color: '#000',
                  boxShadow: candlesLit ? '0 0 20px #ffd700' : 'none'
                }}
                data-testid="button-blow-candles"
              >
                {candlesLit ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Blow Out the Candles
                  </>
                ) : (
                  'Candles Blown!'
                )}
              </Button>
            ) : (
              <div className="space-y-4 animate-pulse">
                <p 
                  className="font-display text-3xl md:text-4xl uppercase"
                  style={{
                    color: '#00d4ff',
                    textShadow: '0 0 20px #00d4ff'
                  }}
                  data-testid="text-wish-made"
                >
                  Wish Granted!
                </p>
                <p className="font-terminal text-lg text-muted-foreground">
                  May all your dreams come true, Archi
                </p>
              </div>
            )}

            <div className="mt-12 p-6 bg-muted/20 rounded-md border border-primary/30">
              <p className="font-terminal text-base text-muted-foreground leading-relaxed">
                "In a world full of tens, you're an Eleven." 💫
              </p>
              <p className="font-retro text-sm text-primary mt-3">
                - Happy Birthday from the Upside Down
              </p>
            </div>
          </div>

          {!hasBlown && candlesLit && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${3 + Math.random() * 2}s`,
                    opacity: 0.6
                  }}
                />
              ))}
            </div>
          )}
        </Card>

        <div className="mt-12">
          <p className="font-terminal text-lg text-foreground/90 mb-4">
            November 25, 2025
          </p>
          <div className="flex items-center justify-center gap-2">
            <div 
              className="w-3 h-3 rounded-full bg-primary animate-pulse"
              style={{ boxShadow: '0 0 10px #ff0000' }}
            />
            <p className="font-retro text-primary text-xl">
              IT'S YOUR SPECIAL DAY!
            </p>
            <div 
              className="w-3 h-3 rounded-full bg-primary animate-pulse"
              style={{ boxShadow: '0 0 10px #ff0000' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
