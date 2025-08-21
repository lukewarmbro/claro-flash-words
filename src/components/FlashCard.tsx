import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, Volume2 } from "lucide-react";
import { FlashCard as FlashCardType } from "@/data/vocabulary";

interface FlashCardProps {
  card: FlashCardType;
}

export const FlashCard = ({ card }: FlashCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(card.spanish);
      utterance.lang = 'es-ES';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto perspective-1000">
      <Card 
        className={`
          relative w-full h-80 cursor-pointer transform-gpu transition-all duration-500 preserve-3d
          ${isFlipped ? 'rotate-y-180' : ''}
          bg-gradient-card shadow-card hover:shadow-hover
        `}
        onClick={handleFlip}
      >
        {/* Front of card - Spanish */}
        <div className={`
          absolute inset-0 w-full h-full backface-hidden rounded-lg
          flex flex-col items-center justify-center p-6 text-center
          ${isFlipped ? 'opacity-0' : 'opacity-100'}
        `}>
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
              {card.category}
            </span>
          </div>
          
          <h2 className="text-4xl font-bold text-primary mb-4">
            {card.spanish}
          </h2>
          
          <div className="flex items-center gap-2 mb-6">
            <span className="text-lg text-muted-foreground font-mono">
              /{card.pronunciation}/
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleSpeak();
              }}
              className="p-2"
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-muted-foreground text-sm">
            Click to reveal English translation
          </p>
        </div>

        {/* Back of card - English */}
        <div className={`
          absolute inset-0 w-full h-full backface-hidden rounded-lg rotate-y-180
          flex flex-col items-center justify-center p-6 text-center
          bg-gradient-primary text-primary-foreground
          ${isFlipped ? 'opacity-100' : 'opacity-0'}
        `}>
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-white/20 text-primary-foreground rounded-full">
              English Translation
            </span>
          </div>
          
          <h2 className="text-4xl font-bold mb-4">
            {card.english}
          </h2>
          
          <div className="text-lg mb-6 bg-white/10 rounded-lg px-4 py-2">
            <span className="font-semibold">Spanish:</span> {card.spanish}
          </div>
          
          <p className="text-primary-foreground/80 text-sm">
            Click to go back to Spanish
          </p>
        </div>
      </Card>
      
      <div className="flex justify-center mt-4">
        <Button
          variant="outline"
          onClick={handleFlip}
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Flip Card
        </Button>
      </div>
    </div>
  );
};