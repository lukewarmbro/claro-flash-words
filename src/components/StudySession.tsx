import { useState } from "react";
import { FlashCard } from "./FlashCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { vocabulary } from "@/data/vocabulary";
import { Card } from "@/components/ui/card";

export const StudySession = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [studiedCards, setStudiedCards] = useState<Set<number>>(new Set());

  const currentCard = vocabulary[currentIndex];
  const progress = ((currentIndex + 1) / vocabulary.length) * 100;

  const handleNext = () => {
    setStudiedCards(prev => new Set([...prev, currentCard.id]));
    if (currentIndex < vocabulary.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setStudiedCards(new Set());
  };

  const isLastCard = currentIndex === vocabulary.length - 1;

  return (
    <div className="max-w-2xl mx-auto px-4">
      {/* Progress Header */}
      <Card className="p-6 mb-8 bg-gradient-warm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-foreground">
            Spanish Flash Cards
          </h2>
          <Button
            variant="outline"
            onClick={handleRestart}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Restart
          </Button>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Card {currentIndex + 1} of {vocabulary.length}</span>
            <span>{studiedCards.size} studied</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      </Card>

      {/* Flash Card */}
      <div className="mb-8">
        <FlashCard card={currentCard} />
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {isLastCard ? "Last card!" : "Swipe or click to study"}
          </p>
        </div>

        <Button
          onClick={handleNext}
          disabled={isLastCard}
          className="flex items-center gap-2 bg-gradient-primary"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Completion Message */}
      {isLastCard && (
        <Card className="mt-8 p-6 text-center bg-gradient-primary text-primary-foreground">
          <h3 className="text-xl font-bold mb-2">¡Felicidades!</h3>
          <p className="mb-4">You've completed all {vocabulary.length} cards!</p>
          <Button
            variant="secondary"
            onClick={handleRestart}
            className="bg-white/20 hover:bg-white/30 text-primary-foreground"
          >
            Study Again
          </Button>
        </Card>
      )}
    </div>
  );
};