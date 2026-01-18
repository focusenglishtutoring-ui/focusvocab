import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/Button";
import { Card, CardContent } from "@/components/Card";
import { useLocation, useRoute } from "wouter";
import { Check, X, ArrowRight, RotateCcw, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuizQuestion {
  id: number;
  prompt: string;
  choices: Record<string, string>;
  correct: string;
}

const QUIZ_DATA_BY_MODULE: Record<string, QuizQuestion[]> = {
  "1": [
    {
      "id": 1,
      "prompt": "It took ______ to finish the homework.",
      "choices": {"A":"aged","B":"age","C":"ages"},
      "correct": "C"
    },
    {
      "id": 2,
      "prompt": "The school will ______ the results tomorrow.",
      "choices": {"A":"announce","B":"announcement","C":"apologise"},
      "correct": "A"
    },
    {
      "id": 3,
      "prompt": "The view from the mountain was ______.",
      "choices": {"A":"amazed","B":"amazing","C":"amaze"},
      "correct": "B"
    },
    {
      "id": 4,
      "prompt": "Choose the sentence that sounds correct.",
      "choices": {
        "A":"He gave an apologise to the teacher.",
        "B":"He apologised for being late.",
        "C":"The apologise was short."
      },
      "correct": "B"
    },
    {
      "id": 5,
      "prompt": "What is your ______?",
      "choices": {"A":"age","B":"ages","C":"aged"},
      "correct": "A"
    },
    {
      "id": 6,
      "prompt": "Choose the sentence that sounds correct.",
      "choices": {
        "A":"The teacher announcement the test date.",
        "B":"She will announcement tomorrow.",
        "C":"We listened carefully to the announcement."
      },
      "correct": "C"
    },
    {
      "id": 7,
      "prompt": "The class is for children ______ 8 to 10.",
      "choices": {"A":"age","B":"aged","C":"ages"},
      "correct": "B"
    },
    {
      "id": 8,
      "prompt": "Her skills ______ everyone.",
      "choices": {"A":"amazed","B":"amaze","C":"amazing"},
      "correct": "B"
    },
    {
      "id": 9,
      "prompt": "Choose the sentence that sounds correct.",
      "choices": {
        "A":"What age do students take this test?",
        "B":"This class is for children aged 8 to 10.",
        "C":"People age differently under stress."
      },
      "correct": "C"
    },
    {
      "id": 10,
      "prompt": "I was ______ by the news.",
      "choices": {"A":"amazed","B":"amazing","C":"amaze"},
      "correct": "A"
    }
  ],
  "2": [
    {
      "id": 1,
      "prompt": "She cares a lot about her ______.",
      "choices": {"A":"appearance","B":"appear","C":"apology"},
      "correct": "A"
    },
    {
      "id": 2,
      "prompt": "A rainbow may ______ after the rain.",
      "choices": {"A":"appearance","B":"appear","C":"application"},
      "correct": "B"
    },
    {
      "id": 3,
      "prompt": "I filled out an ______ online for the course.",
      "choices": {"A":"application","B":"apply","C":"argument"},
      "correct": "A"
    },
    {
      "id": 4,
      "prompt": "Choose the sentence that uses apply correctly (meaning: put something on).",
      "choices": {
        "A":"She applied for the course last week.",
        "B":"He applied the program yesterday.",
        "C":"The nurse applied pressure to the wound."
      },
      "correct": "C"
    },
    {
      "id": 5,
      "prompt": "Their main ______ is to pass the test.",
      "choices": {"A":"argument","B":"aim","C":"apology"},
      "correct": "B"
    },
    {
      "id": 6,
      "prompt": "Choose the sentence that uses aim correctly as a verb.",
      "choices": {
        "A":"I aim to finish early today.",
        "B":"My aim is to finish early today.",
        "C":"The aim was very difficult."
      },
      "correct": "A"
    },
    {
      "id": 7,
      "prompt": "He didn’t want to ______ with his brother again.",
      "choices": {"A":"argument","B":"argue","C":"apply"},
      "correct": "B"
    },
    {
      "id": 8,
      "prompt": "They had an ______ last night, but it ended quickly.",
      "choices": {"A":"argument","B":"argue","C":"aim"},
      "correct": "A"
    },
    {
      "id": 9,
      "prompt": "She accepted his ______ after the mistake.",
      "choices": {"A":"application","B":"appearance","C":"apology"},
      "correct": "C"
    },
    {
      "id": 10,
      "prompt": "Choose the sentence that uses apply correctly (meaning: ask for a job/course).",
      "choices": {
        "A":"She applies make-up before work.",
        "B":"He applied for the course last week.",
        "C":"The nurse applied pressure to the wound."
      },
      "correct": "B"
    }
  ]
};

export default function ModuleQuiz() {
  const [, params] = useRoute("/unit/:unitId/module/:moduleId/quiz");
  const moduleId = params?.moduleId || "1";
  const quizData = QUIZ_DATA_BY_MODULE[moduleId] || QUIZ_DATA_BY_MODULE["1"];
  const bestScoreKey = `module${moduleId}QuizBestScore`;

  const [, setLocation] = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(bestScoreKey);
    if (saved) setBestScore(parseInt(saved));
  }, [bestScoreKey]);

  const currentQuestion = quizData[currentIndex];
  const totalQuestions = quizData.length;
  const isAllAnswered = Object.keys(answers).length === totalQuestions;

  const handleSelect = (choice: string) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: choice }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const score = quizData.reduce((acc, q) => acc + (answers[q.id] === q.correct ? 1 : 0), 0);
    if (bestScore === null || score > bestScore) {
      setBestScore(score);
      localStorage.setItem(bestScoreKey, score.toString());
    }
    window.scrollTo(0, 0);
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setAnswers({});
    setIsSubmitted(false);
    window.scrollTo(0, 0);
  };

  if (isSubmitted) {
    const score = quizData.reduce((acc, q) => acc + (answers[q.id] === q.correct ? 1 : 0), 0);
    return (
      <Layout>
        <div className="max-w-2xl mx-auto space-y-8 py-8">
          <Card className="border-2 shadow-xl overflow-hidden">
            <div className="bg-primary text-primary-foreground p-8 text-center space-y-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Trophy className="w-10 h-10" />
              </div>
              <h1 className="text-4xl font-bold">Quiz Complete!</h1>
              <p className="text-6xl font-black">You got {score}/{totalQuestions}</p>
              {bestScore !== null && (
                <p className="text-sm opacity-80 font-medium uppercase tracking-widest">
                  Best Score: {bestScore}/{totalQuestions}
                </p>
              )}
            </div>
            
            <CardContent className="p-8 space-y-8">
              <div className="space-y-6">
                {quizData.map((q, idx) => {
                  const isCorrect = answers[q.id] === q.correct;
                  return (
                    <div key={q.id} className={cn(
                      "p-4 rounded-xl border-2 transition-all",
                      isCorrect ? "border-green-100 bg-green-50/30" : "border-red-100 bg-red-50/30"
                    )}>
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-2">
                          <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Question {idx + 1}</p>
                          <p className="text-lg font-medium">{q.prompt}</p>
                          <div className="flex flex-wrap gap-4 mt-2">
                            <p className="text-sm">
                              <span className="text-muted-foreground">Your answer:</span>{" "}
                              <span className={cn("font-bold", isCorrect ? "text-green-600" : "text-red-600")}>
                                {answers[q.id]} ({q.choices[answers[q.id] as keyof typeof q.choices]})
                              </span>
                            </p>
                            {!isCorrect && (
                              <p className="text-sm">
                                <span className="text-muted-foreground">Correct:</span>{" "}
                                <span className="text-green-600 font-bold">
                                  {q.correct} ({q.choices[q.correct as keyof typeof q.choices]})
                                </span>
                              </p>
                            )}
                          </div>
                        </div>
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                          isCorrect ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        )}>
                          {isCorrect ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" onClick={handleRetry} className="flex-1 rounded-full h-14 text-lg">
                  <RotateCcw className="mr-2 w-5 h-5" />
                  Retry Quiz
                </Button>
                <Button size="lg" variant="outline" onClick={() => setLocation("/unit")} className="flex-1 rounded-full h-14 text-lg">
                  Back to Unit
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-8 py-8">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">End of Module {moduleId} Quiz</h2>
            <p className="text-xl font-bold">Question {currentIndex + 1} of {totalQuestions}</p>
          </div>
          <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300" 
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        <Card className="border-2 shadow-xl">
          <CardContent className="p-8 space-y-8">
            <h3 className="text-2xl font-bold leading-tight">
              {currentQuestion.prompt}
            </h3>

            <div className="grid gap-4">
              {Object.entries(currentQuestion.choices).map(([key, value]) => {
                const isSelected = answers[currentQuestion.id] === key;
                return (
                  <button
                    key={key}
                    onClick={() => handleSelect(key)}
                    className={cn(
                      "w-full text-left p-6 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between group",
                      isSelected 
                        ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-md" 
                        : "border-border hover:border-primary/40 hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg transition-colors",
                        isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                      )}>
                        {key}
                      </div>
                      <span className="text-lg font-medium">{value}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center gap-4">
          <Button 
            variant="ghost" 
            size="lg" 
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="rounded-full px-6"
          >
            Previous
          </Button>
          
          {currentIndex === totalQuestions - 1 ? (
            <Button 
              size="lg" 
              onClick={handleSubmit}
              disabled={!isAllAnswered}
              className="rounded-full px-10 h-14 text-lg shadow-lg"
            >
              Submit Quiz
              <Check className="ml-2 w-5 h-5" />
            </Button>
          ) : (
            <Button 
              size="lg" 
              onClick={() => setCurrentIndex(prev => Math.min(totalQuestions - 1, prev + 1))}
              className="rounded-full px-10 h-14 text-lg shadow-md"
            >
              Next
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </Layout>
  );
}
