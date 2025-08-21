import { StudySession } from "@/components/StudySession";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground py-8 mb-8 shadow-card">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            ¡Aprende Español!
          </h1>
          <p className="text-xl text-primary-foreground/90">
            Master Spanish with interactive flashcards and pronunciation guides
          </p>
          <p className="text-sm text-primary-foreground/70 mt-2">
            Perfect for Americans learning Spanish
          </p>
        </div>
      </header>

      {/* Main Study Area */}
      <main className="pb-12">
        <StudySession />
      </main>

      {/* Footer */}
      <footer className="bg-card border-t py-6 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm">
            Practice daily to improve your Spanish vocabulary • 
            <span className="text-primary font-medium"> ¡Buena suerte!</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
