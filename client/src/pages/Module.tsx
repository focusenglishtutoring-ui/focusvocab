import { useState, useEffect, useMemo } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/Button";
import { Card, CardContent } from "@/components/Card";
import { ProgressBar } from "@/components/ProgressBar";
import { useUnit } from "@/hooks/use-content";
import { useRoute, useLocation } from "wouter";
import { Check, X, ArrowRight, RotateCcw, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Step = "learn" | "quiz" | "complete";

export default function Module() {
  const [, params] = useRoute("/unit/:unitId/module/:moduleId");
  const [, setLocation] = useLocation();
  const { data: unit, isLoading } = useUnit();

  // State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [step, setStep] = useState<Step>("learn");
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Derived data
  const module = useMemo(() => unit?.modules.find(m => String(m.order) === params?.moduleId || m.title === params?.moduleId), [unit, params?.moduleId]);
  
  const flattenedSenses = useMemo(() => {
    if (!module) return [];
    return module.entries.flatMap(entry => 
      entry.senses.map(sense => ({
        ...sense,
        headword: entry.headword,
        pos: entry.pos,
        zh: entry.zh
      }))
    );
  }, [module]);

  const currentSense = flattenedSenses[currentIndex];
  const isLastSense = currentIndex === flattenedSenses.length - 1;

  // Effects
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentIndex, step]);

  if (isLoading) return <LoadingState />;
  if (!unit || !module || !currentSense) return <ErrorState />;

  // Handlers
  const handleNextToQuiz = () => {
    setStep("quiz");
  };

  const handleCheckAnswer = () => {
    if (selectedChoiceIndex === null) return;
    const answerMap: Record<string, number> = { "A": 0, "B": 1, "C": 2 };
    const correctIndex = answerMap[currentSense.check.answer];
    const correct = selectedChoiceIndex === correctIndex;
    setIsCorrect(correct);
    setIsAnswerChecked(true);
  };

  const handleNextSense = () => {
    setSelectedChoiceIndex(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);
    
    if (isLastSense) {
      setStep("complete");
    } else {
      setCurrentIndex(prev => prev + 1);
      setStep("learn");
    }
  };

  const handleRetry = () => {
    setSelectedChoiceIndex(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);
  };

  const isModuleComplete = step === "complete";

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Header / Progress */}
        {!isModuleComplete && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-muted-foreground">{module.title}</h2>
              <Button variant="ghost" size="sm" onClick={() => setLocation(`/unit`)}>
                Exit
              </Button>
            </div>
            <ProgressBar current={currentIndex + 1} total={flattenedSenses.length} />
          </div>
        )}

        <AnimatePresence mode="wait">
          
          {/* COMPLETE STATE */}
          {step === "complete" && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-12 space-y-8"
            >
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-12 h-12" />
              </div>
              <h1 className="text-4xl font-bold text-foreground">Module Complete!</h1>
              <p className="text-xl text-muted-foreground">You've mastered {flattenedSenses.length} senses.</p>
              
              <div className="flex gap-4 justify-center pt-8">
                <Button variant="outline" size="lg" onClick={() => setLocation("/unit")}>
                  <Home className="mr-2 w-5 h-5" />
                  Back to Unit
                </Button>
                <Button size="lg" onClick={() => window.location.reload()}>
                  <RotateCcw className="mr-2 w-5 h-5" />
                  Review Again
                </Button>
              </div>
            </motion.div>
          )}

          {/* LEARN STATE */}
          {step === "learn" && (
            <motion.div
              key="learn"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <Card className="overflow-hidden border-2 shadow-lg">
                <div className="bg-primary/5 p-8 text-center border-b border-border/50">
                  <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">{currentSense.pos} · {currentSense.zh}</p>
                  <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-4">
                    {currentSense.headword}
                  </h1>
                </div>
                
                <CardContent className="p-8 space-y-8">
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-accent rounded-full"/>
                      Definition
                    </h3>
                    <p className="text-xl text-muted-foreground leading-relaxed pl-4">
                      {currentSense.definition}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-secondary rounded-full"/>
                      Examples
                    </h3>
                    <ul className="space-y-3 pl-4">
                      {currentSense.examples.map((ex, i) => (
                        <li key={i} className="flex gap-3 text-lg text-muted-foreground italic">
                          <span className="text-border font-not-italic select-none">"</span>
                          {ex}
                          <span className="text-border font-not-italic select-none">"</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {currentSense.note && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl border border-yellow-200 dark:border-yellow-900/50">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">
                        💡 Note: {currentSense.note}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button size="lg" onClick={handleNextToQuiz} className="text-lg px-8 h-14 rounded-full">
                  Quiz Me
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* QUIZ STATE */}
          {step === "quiz" && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card className="border-2 shadow-md">
                <CardContent className="p-8 space-y-8">
                  <div className="space-y-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-secondary text-xs font-bold uppercase tracking-wider">
                      Comprehension Check
                    </span>
                    <h3 className="text-2xl font-bold leading-tight">
                      {currentSense.check.question}
                    </h3>
                  </div>

                  <div className="grid gap-3">
                    {currentSense.check.choices.map((choice, index) => {
                      const isSelected = selectedChoiceIndex === index;
                      const answerMap: Record<string, number> = { "A": 0, "B": 1, "C": 2 };
                      const correctIndex = answerMap[currentSense.check.answer];
                      
                      let variantStyles = "hover:border-primary hover:bg-primary/5 border-border bg-card";
                      
                      if (isAnswerChecked) {
                        if (index === correctIndex) {
                          variantStyles = "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300";
                        } else if (isSelected && !isCorrect) {
                          variantStyles = "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300";
                        } else {
                          variantStyles = "opacity-50 border-border bg-card";
                        }
                      } else if (isSelected) {
                        variantStyles = "border-primary bg-primary/10 ring-1 ring-primary";
                      }

                      return (
                        <button
                          key={index}
                          disabled={isAnswerChecked}
                          onClick={() => setSelectedChoiceIndex(index)}
                          className={cn(
                            "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group",
                            variantStyles
                          )}
                        >
                          <span className="font-medium text-lg">{String.fromCharCode(65 + index)}. {choice}</span>
                          {isAnswerChecked && index === correctIndex && (
                            <Check className="w-5 h-5 text-green-600" />
                          )}
                          {isAnswerChecked && isSelected && !isCorrect && (
                            <X className="w-5 h-5 text-red-600" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Feedback Area */}
              <div className="h-24">
                {isAnswerChecked && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "p-4 rounded-xl flex items-center justify-between",
                      isCorrect 
                        ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200" 
                        : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        isCorrect ? "bg-green-200 dark:bg-green-800" : "bg-red-200 dark:bg-red-800"
                      )}>
                        {isCorrect ? <Check className="w-6 h-6" /> : <X className="w-6 h-6" />}
                      </div>
                      <div>
                        <p className="font-bold text-lg">
                          {isCorrect ? "Correct!" : "Incorrect"}
                        </p>
                        <p className="text-sm opacity-90">
                          {isCorrect ? "Great job mastering this sense." : "Give it another try."}
                        </p>
                      </div>
                    </div>
                    
                    {isCorrect ? (
                      <Button onClick={handleNextSense} variant="default" size="lg" className="rounded-full px-6 bg-green-600 hover:bg-green-700 text-white">
                        {isLastSense ? "Finish Module" : "Next Card"}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    ) : (
                      <Button onClick={handleRetry} variant="destructive" size="lg" className="rounded-full px-6">
                        Try Again
                        <RotateCcw className="ml-2 w-4 h-4" />
                      </Button>
                    )}
                  </motion.div>
                )}
                
                {!isAnswerChecked && (
                  <div className="flex justify-end">
                    <Button 
                      size="lg" 
                      onClick={handleCheckAnswer} 
                      disabled={selectedChoiceIndex === null}
                      className="text-lg px-8 h-14 rounded-full w-full sm:w-auto shadow-lg"
                    >
                      Check Answer
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </Layout>
  );
}

function LoadingState() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-8 animate-pulse">
        <div className="h-6 w-1/3 bg-muted rounded"></div>
        <div className="h-80 bg-muted rounded-2xl"></div>
      </div>
    </Layout>
  );
}

function ErrorState() {
  return (
    <Layout>
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-destructive">Something went wrong</h2>
        <Button className="mt-4" onClick={() => window.location.href = "/unit"}>Back to Unit</Button>
      </div>
    </Layout>
  );
}
