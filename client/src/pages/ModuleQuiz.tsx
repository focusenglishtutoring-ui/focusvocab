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
      "prompt": "The clown ______ the children at the party.",
      "choices": {"A":"amuses","B":"announces","C":"apologises"},
      "correct": "A"
    },
    {
      "id": 3,
      "prompt": "The movie was very ______; everyone laughed.",
      "choices": {"A":"amused","B":"amusing","C":"amazing"},
      "correct": "B"
    },
    {
      "id": 4,
      "prompt": "Choose the sentence that sounds correct.",
      "choices": {
        "A":"He told an amusing story.",
        "B":"He told an amuse story.",
        "C":"He told an amused story."
      },
      "correct": "A"
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
        "A":"The story amused everyone in the class.",
        "B":"The story amazing everyone in the class.",
        "C":"The story announcement everyone in the class."
      },
      "correct": "A"
    },
    {
      "id": 7,
      "prompt": "Does this game ______ you?",
      "choices": {"A":"amuse","B":"amazing","C":"ages"},
      "correct": "A"
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
      "prompt": "Choose the sentence that uses 'apply' correctly (meaning: put something on).",
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
      "prompt": "Choose the sentence that uses 'aim' correctly as a verb.",
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
      "prompt": "Choose the sentence that uses 'apply' correctly (meaning: ask for a job/course).",
      "choices": {
        "A":"She applies make-up before work.",
        "B":"He applied for a position at the new company last week.",
        "C":"The nurse applied pressure to the wound."
      },
      "correct": "B"
    }
  ],
  "3": [
    {
      "id": 1,
      "prompt": "Choose the sentence that sounds correct.",
      "choices": {"A":"The twins are very alive.","B":"The twins are very all right.","C":"The twins are very alike."},
      "correct": "C"
    },
    {
      "id": 2,
      "prompt": "We waited at the ______ for three hours before the flight.",
      "choices": {"A":"airline","B":"airport","C":"air force"},
      "correct": "B"
    },
    {
      "id": 3,
      "prompt": "My ______ went off loudly this morning.",
      "choices": {"A":"alarm","B":"album","C":"airline"},
      "correct": "A"
    },
    {
      "id": 4,
      "prompt": "We turned on the ______ to cool the whole building.",
      "choices": {"A":"air conditioner","B":"air conditioning","C":"alarm"},
      "correct": "B"
    },
    {
      "id": 5,
      "prompt": "Choose the sentence that sounds correct.",
      "choices": {"A":"This airport flies to Japan.","B":"This air force flies to Japan.","C":"This airline flies to Japan."},
      "correct": "C"
    },
    {
      "id": 6,
      "prompt": "The ______ is the machine that cools the room.",
      "choices": {"A":"air conditioner","B":"air conditioning","C":"airport"},
      "correct": "A"
    },
    {
      "id": 7,
      "prompt": "He joined the ______ after finishing school.",
      "choices": {"A":"airline","B":"air force","C":"airport"},
      "correct": "B"
    },
    {
      "id": 8,
      "prompt": "Choose the sentence that sounds correct.",
      "choices": {"A":"Her new alarm is very popular.","B":"Her new airport is very popular.","C":"Her new album is very popular."},
      "correct": "C"
    },
    {
      "id": 9,
      "prompt": "Loud noises can ______ small children.",
      "choices": {"A":"alarm","B":"album","C":"airport"},
      "correct": "A"
    },
    {
      "id": 10,
      "prompt": "Is everything ______?",
      "choices": {"A":"alive","B":"alike","C":"all right"},
      "correct": "C"
    }
  ],
  "4": [
    {
      "id": 1,
      "prompt": "Please read the sentence ______ so everyone can hear you.",
      "choices": {"A":"alone","B":"almost","C":"aloud"},
      "correct": "C"
    },
    {
      "id": 2,
      "prompt": "Her ambition is ______ a doctor one day.",
      "choices": {"A":"to forget","B":"to become","C":"to arrive"},
      "correct": "B"
    },
    {
      "id": 3,
      "prompt": "The teacher does not ______ phones in class.",
      "choices": {"A":"allow","B":"almost","C":"aloud"},
      "correct": "A"
    },
    {
      "id": 4,
      "prompt": "That’s 300 dollars ______.",
      "choices": {"A":"aloud","B":"altogether","C":"almost"},
      "correct": "B"
    },
    {
      "id": 5,
      "prompt": "School starts at 8 ______.",
      "choices": {"A":"p.m.","B":"noon","C":"a.m."},
      "correct": "C"
    },
    {
      "id": 6,
      "prompt": "She stayed at home ______ all evening.",
      "choices": {"A":"aloud","B":"almost","C":"alone"},
      "correct": "C"
    },
    {
      "id": 7,
      "prompt": "Choose the sentence that sounds correct.",
      "choices": {
        "A":"We called an ambulance for the hurt man.",
        "B":"We called an alphabet for the hurt man.",
        "C":"We called an ambition for the hurt man."
      },
      "correct": "A"
    },
    {
      "id": 8,
      "prompt": "______ it was raining, we still went out.",
      "choices": {"A":"Altogether","B":"Almost","C":"Although"},
      "correct": "C"
    },
    {
      "id": 9,
      "prompt": "Choose the sentence that sounds correct.",
      "choices": {
        "A":"The English alphabet has 26 letters.",
        "B":"The English alphabet has 26 numbers.",
        "C":"The English alphabet has 26 words."
      },
      "correct": "A"
    },
    {
      "id": 10,
      "prompt": "I ______ missed the bus this morning.",
      "choices": {"A":"altogether","B":"almost","C":"alone"},
      "correct": "B"
    }
  ],
  "5": [
    {
      "id": 1,
      "prompt": "The ______ of homework surprised the students.",
      "choices": {"A":"ankle","B":"anniversary","C":"amount"},
      "correct": "C"
    },
    {
      "id": 2,
      "prompt": "Choose the sentence that sounds correct.",
      "choices": {
        "A":"Loud music can announce the neighbors.",
        "B":"Loud music can annoy the neighbors.",
        "C":"Loud music can anxious the neighbors."
      },
      "correct": "B"
    },
    {
      "id": 3,
      "prompt": "She felt nervous ______ so many people.",
      "choices": {"A":"among","B":"amount","C":"anybody"},
      "correct": "A"
    },
    {
      "id": 4,
      "prompt": "Today is their wedding ______.",
      "choices": {"A":"ancient","B":"anniversary","C":"announcement"},
      "correct": "B"
    },
    {
      "id": 5,
      "prompt": "She twisted her ______ while playing football.",
      "choices": {"A":"ankle","B":"ancient","C":"anxious"},
      "correct": "A"
    },
    {
      "id": 6,
      "prompt": "Choose the sentence that uses *announce* correctly.",
      "choices": {
        "A":"The teacher will announcement the winner today.",
        "B":"The teacher will announce the winner today.",
        "C":"The teacher will announcer the winner today."
      },
      "correct": "B"
    },
    {
      "id": 7,
      "prompt": "We listened carefully to the school ______.",
      "choices": {"A":"announce","B":"anniversary","C":"announcement"},
      "correct": "C"
    },
    {
      "id": 8,
      "prompt": "They studied ______ history in class.",
      "choices": {"A":"anxious","B":"annoyed","C":"ancient"},
      "correct": "C"
    },
    {
      "id": 9,
      "prompt": "She felt ______ before the test started.",
      "choices": {"A":"annoyed","B":"anxious","C":"ancient"},
      "correct": "B"
    },
    {
      "id": 10,
      "prompt": "______ can join the club.",
      "choices": {"A":"Anxious","B":"Anniversary","C":"Anybody"},
      "correct": "C"
    }
  ],
  "6": [
    {
      "id": 1,
      "prompt": "That ______ has many families living inside.",
      "choices": {"A":"apartment","B":"app","C":"apartment building"},
      "correct": "C"
    },
    {
      "id": 2,
      "prompt": "I don’t live there ______.",
      "choices": {"A":"anywhere","B":"anymore","C":"anyway"},
      "correct": "B"
    },
    {
      "id": 3,
      "prompt": "Choose the sentence that sounds correct.",
      "choices": {
        "A":"Everyone came apart Tom.",
        "B":"Everyone came apart from Tom.",
        "C":"Everyone came apart with Tom."
      },
      "correct": "B"
    },
    {
      "id": 4,
      "prompt": "I can’t find my keys ______.",
      "choices": {"A":"apart","B":"anyway","C":"anywhere"},
      "correct": "C"
    },
    {
      "id": 5,
      "prompt": "You can ask me ______ if you need help.",
      "choices": {"A":"anyone","B":"anywhere","C":"anything"},
      "correct": "C"
    },
    {
      "id": 6,
      "prompt": "The two houses are far ______.",
      "choices": {"A":"apart","B":"anywhere","C":"apart from"},
      "correct": "A"
    },
    {
      "id": 7,
      "prompt": "I use this ______ every day on my phone.",
      "choices": {"A":"apartment","B":"app","C":"apartment building"},
      "correct": "B"
    },
    {
      "id": 8,
      "prompt": "______ can answer this question.",
      "choices": {"A":"Anyone","B":"Anything","C":"Anywhere"},
      "correct": "A"
    },
    {
      "id": 9,
      "prompt": "It was raining, but we went out ______.",
      "choices": {"A":"anywhere","B":"apart","C":"anyway"},
      "correct": "C"
    },
    {
      "id": 10,
      "prompt": "She lives in an ______ on the third floor.",
      "choices": {"A":"apartment building","B":"apartment","C":"app"},
      "correct": "B"
    }
  ],
  "7": [
    {
      "id": 1,
      "prompt": "The city is famous for its modern ______.",
      "choices": {"A":"architect","B":"architecture","C":"area"},
      "correct": "B"
    },
    {
      "id": 2,
      "prompt": "The dog slowly ______ the door.",
      "choices": {"A":"approves","B":"approaches","C":"approximately"},
      "correct": "B"
    },
    {
      "id": 3,
      "prompt": "This is a new ______ to learning English.",
      "choices": {"A":"approach","B":"area","C":"army"},
      "correct": "A"
    },
    {
      "id": 4,
      "prompt": "There were ______ 30 students in the class.",
      "choices": {"A":"approve","B":"exactly","C":"approximately"},
      "correct": "C"
    },
    {
      "id": 5,
      "prompt": "She wants to become an ______ and design buildings.",
      "choices": {"A":"architecture","B":"architect","C":"army"},
      "correct": "B"
    },
    {
      "id": 6,
      "prompt": "Choose the sentence that sounds correct.",
      "choices": {
        "A":"The teacher approved the plan.",
        "B":"The teacher approached the plan.",
        "C":"The teacher approximately the plan."
      },
      "correct": "A"
    },
    {
      "id": 7,
      "prompt": "Don’t play in that ______; it’s dangerous.",
      "choices": {"A":"architect","B":"area","C":"arm"},
      "correct": "B"
    },
    {
      "id": 8,
      "prompt": "He broke his ______ while playing basketball.",
      "choices": {"A":"army","B":"arm","C":"armchair"},
      "correct": "B"
    },
    {
      "id": 9,
      "prompt": "He sat down in the comfortable ______ by the window.",
      "choices": {"A":"arm","B":"army","C":"armchair"},
      "correct": "C"
    },
    {
      "id": 10,
      "prompt": "He joined the ______ last year to protect his country.",
      "choices": {"A":"area","B":"architect","C":"army"},
      "correct": "C"
    }
  ],
  "8": [
    {
      "id": 1,
      "prompt": "Please pay ______ in class.",
      "choices": {"A":"assistant","B":"attention","C":"article"},
      "correct": "B"
    },
    {
      "id": 2,
      "prompt": "The children sat ______ the table.",
      "choices": {"A":"around","B":"arrive","C":"attend"},
      "correct": "A"
    },
    {
      "id": 3,
      "prompt": "She works as a shop ______.",
      "choices": {"A":"attention","B":"article","C":"assistant"},
      "correct": "C"
    },
    {
      "id": 4,
      "prompt": "We need to ______ the chairs before class starts.",
      "choices": {"A":"arrange","B":"attend","C":"arrive"},
      "correct": "A"
    },
    {
      "id": 5,
      "prompt": "I read an interesting ______ about animals.",
      "choices": {"A":"assistant","B":"asleep","C":"article"},
      "correct": "C"
    },
    {
      "id": 6,
      "prompt": "Choose the sentence that sounds correct.",
      "choices": {
        "A":"He fell artistic quickly.",
        "B":"He fell attend quickly.",
        "C":"He fell asleep quickly."
      },
      "correct": "C"
    },
    {
      "id": 7,
      "prompt": "The bus will ______ at eight o’clock.",
      "choices": {"A":"attend","B":"arrive","C":"arrange"},
      "correct": "B"
    },
    {
      "id": 8,
      "prompt": "She has a very ______ style of drawing.",
      "choices": {"A":"artistic","B":"asleep","C":"assistant"},
      "correct": "A"
    },
    {
      "id": 9,
      "prompt": "Choose the sentence that sounds correct.",
      "choices": {
        "A":"We talked about the seating arrange.",
        "B":"We talked about the seating arrive.",
        "C":"We talked about the seating arrangement."
      },
      "correct": "C"
    },
    {
      "id": 10,
      "prompt": "Will you ______ the meeting tomorrow?",
      "choices": {"A":"arrive","B":"arrange","C":"attend"},
      "correct": "C"
    }
  ],
  "9": [
    {
      "id": 1,
      "prompt": "He lost his ______ while standing on one foot.",
      "choices": {"A":"award","B":"balance","C":"baggage"},
      "correct": "B"
    },
    {
      "id": 2,
      "prompt": "Try to ______ junk food if you want to be healthier.",
      "choices": {"A":"avoid","B":"enjoy","C":"award"},
      "correct": "A"
    },
    {
      "id": 3,
      "prompt": "She felt ______ after getting sick on the trip.",
      "choices": {"A":"aware","B":"awake","C":"awful"},
      "correct": "C"
    },
    {
      "id": 4,
      "prompt": "Choose the sentence that sounds correct.",
      "choices": {
        "A":"She was not aware of the rule.",
        "B":"She was not awake of the rule.",
        "C":"She was not awful of the rule."
      },
      "correct": "A"
    },
    {
      "id": 5,
      "prompt": "The prize was ______ to her last year.",
      "choices": {"A":"avoided","B":"awarded","C":"awakened"},
      "correct": "B"
    },
    {
      "id": 6,
      "prompt": "He walked ______ to see where he came from.",
      "choices": {"A":"carefully","B":"forwards","C":"backwards"},
      "correct": "C"
    },
    {
      "id": 7,
      "prompt": "Please collect your ______ at the airport.",
      "choices": {"A":"balance","B":"baggage","C":"award"},
      "correct": "B"
    },
    {
      "id": 8,
      "prompt": "She stayed ______ all night studying.",
      "choices": {"A":"asleep","B":"awake","C":"awful"},
      "correct": "B"
    },
    {
      "id": 9,
      "prompt": "Choose the sentence that uses balance (v.) correctly.",
      "choices": {
        "A":"He balanced carefully on the line.",
        "B":"He balance carefully on the line.",
        "C":"He balancing carefully on the line."
      },
      "correct": "A"
    },
    {
      "id": 10,
      "prompt": "She won an ______ for her hard work.",
      "choices": {"A":"aware","B":"balance","C":"award"},
      "correct": "C"
    }
  ],
  "10": [
    {
      "id": 1,
      "prompt": "I need to go to the ______ to take out some money.",
      "choices": {"A":"bank","B":"battle","C":"base"},
      "correct": "A"
    },
    {
      "id": 2,
      "prompt": "The statue stands on a wide ______.",
      "choices": {"A":"basic","B":"base","C":"beauty"},
      "correct": "B"
    },
    {
      "id": 3,
      "prompt": "The story is ______ on real events.",
      "choices": {"A":"beaten","B":"battled","C":"based"},
      "correct": "C"
    },
    {
      "id": 4,
      "prompt": "We learned some ______ rules before the test.",
      "choices": {"A":"basic","B":"base","C":"beauty"},
      "correct": "A"
    },
    {
      "id": 5,
      "prompt": "They talked about a famous ______ from history.",
      "choices": {"A":"bean","B":"battle","C":"bank"},
      "correct": "B"
    },
    {
      "id": 6,
      "prompt": "Choose the sentence that sounds correct.",
      "choices": {
        "A":"She battled to finish the work.",
        "B":"She battled the drum loudly.",
        "C":"She battled the game easily."
      },
      "correct": "A"
    },
    {
      "id": 7,
      "prompt": "She cooked some ______ for dinner.",
      "choices": {"A":"bears","B":"beats","C":"beans"},
      "correct": "C"
    },
    {
      "id": 8,
      "prompt": "I can’t ______ the noise anymore.",
      "choices": {"A":"beat","B":"bear","C":"battle"},
      "correct": "B"
    },
    {
      "id": 9,
      "prompt": "Our team ______ theirs yesterday.",
      "choices": {"A":"lost","B":"stopped","C":"beat"},
      "correct": "C"
    },
    {
      "id": 10,
      "prompt": "The ______ of the place surprised everyone.",
      "choices": {"A":"base","B":"bank","C":"beauty"},
      "correct": "C"
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

  const renderFormattedPrompt = (text: string) => {
    const parts = text.split(/(\*.*?\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={i} className="font-italic not-italic italic">{part.slice(1, -1)}</em>;
      }
      return part;
    });
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
                          <p className="text-lg font-medium">{renderFormattedPrompt(q.prompt)}</p>
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
                {moduleId === "5" ? (
                  <Button size="lg" onClick={() => setLocation("/mid-unit-test-1")} className="flex-1 rounded-full h-14 text-lg">
                    <Check className="mr-2 w-5 h-5" />
                    Finish & Start Mid-Unit Test
                  </Button>
                ) : moduleId === "10" ? (
                  <Button size="lg" onClick={() => setLocation("/unit-test-2")} className="flex-1 rounded-full h-14 text-lg">
                    <Check className="mr-2 w-5 h-5" />
                    Finish & Start Unit Test 2
                  </Button>
                ) : (
                  <Button size="lg" onClick={handleRetry} className="flex-1 rounded-full h-14 text-lg">
                    <RotateCcw className="mr-2 w-5 h-5" />
                    Retry Quiz
                  </Button>
                )}
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
              {renderFormattedPrompt(currentQuestion.prompt)}
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
