import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/Button";
import { Card, CardContent } from "@/components/Card";
import { useLocation } from "wouter";
import { Check, X, RotateCcw, Home, Trophy, X as CloseIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const WORD_BANK = [
  "a.m. (adv.)", "age (n.)", "age (v.)", "aged (adj.)", "ages (n.)",
  "air conditioning / air conditioner (n.)", "air force (n.)", "airline (n.)", "airport (n.)",
  "aim (n.)", "aim (v.)", "alarm (n.)", "alarm (v.)", "alike (adj./adv.)", "alive (adj.)",
  "all right / alright (adj./adv.)", "allow (v.)", "almost (adv.)", "alone (adj./adv.)",
  "aloud (adv.)", "alphabet (n.)", "although (conj.)", "altogether (adv.)", "ambition (n.)",
  "ambulance (n.)", "amaze (v.)", "amazed (adj.)", "amazing (adj.)", "among / amongst (prep.)",
  "amount (n./v.)", "ancient (adj.)", "ankle (n.)", "anniversary (n.)", "announce (v.)",
  "announcement (n.)", "amuse (v.)", "amusing (adj.)", "annoy (v.)", "anxious (adj.)",
  "anybody (pron.)", "apologise (v.)", "apology (n.)", "appear (v.)", "appearance (n.)",
  "apply (v.) – put on / use", "apply (v.) – request / form", "application (n.)", "argue (v.)",
  "argument (n.)", "album (n.)"
];

const QUESTIONS = [
  "1. The soldiers joined the __________ to protect the country from the air.",
  "2. She felt very __________ about her exam results.",
  "3. I haven't seen my cousins for __________ since they moved away.",
  "4. He twisted his __________ while running in the park.",
  "5. The teacher asked the student to read the poem __________.",
  "6. The nurse __________ a clean bandage to the cut.",
  "7. We celebrate our wedding __________ every October.",
  "8. The museum is full of __________ treasures from Egypt.",
  "9. It is important to __________ when you make a mistake.",
  "10. The driver called for an __________ after the car crash.",
  "11. My biggest __________ is to travel around the world.",
  "12. The movie was so __________ that everyone in the cinema laughed.",
  "13. We need to __________ for a visa before we can travel.",
  "14. The twins look very __________; it's hard to tell them apart.",
  "15. A rainbow __________ in the sky after the storm passed.",
  "16. Please pay __________ to the safety instructions on the plane.",
  "17. I like to listen to my favorite music __________ in the evening.",
  "18. Is __________ going to the party tonight?",
  "19. The school will __________ the winner of the competition today.",
  "20. The doctor asked for the patient's __________ on the form.",
  "21. The city is famous for its beautiful __________.",
  "22. They had a loud __________ about which movie to watch.",
  "23. The animal was still __________ when the rescuers found it.",
  "24. My __________ wakes me up at 7 o'clock every morning.",
  "25. I was __________ at how fast the children had grown.",
  "26. The view from the top of the mountain was absolutely __________.",
  "27. We turn on the __________ because it's very hot today.",
  "28. He prefers to study __________ in the library where it's quiet.",
  "29. The English __________ has 26 letters.",
  "30. I'm __________ finished with my project; just one more page.",
  "31. The price was 50 dollars __________ for the whole family.",
  "32. __________ it was raining, they decided to go for a walk.",
  "33. His main __________ is to pass the exam with high marks.",
  "34. We arrived at the __________ two hours before our flight.",
  "35. Does the loud music __________ the neighbors next door?",
  "36. The clown's tricks really __________ the young children.",
  "37. She wrote a sincere __________ for missing the meeting.",
  "38. We chose a cheap __________ for our trip to London.",
  "39. Some people seem to __________ more quickly than others.",
  "40. This special class is for children __________ 5 to 7.",
  "41. The sudden noise __________ the birds, and they flew away.",
  "42. Don't __________ with your sister; try to be kind.",
  "43. The teacher made an __________ about the school trip.",
  "44. I found a small kitten hiding __________ the bushes.",
  "45. The bank received a large __________ of money yesterday.",
  "46. Does it feel __________ if I open the window?",
  "47. Her magic tricks __________ everyone who watched her.",
  "48. The class starts at 9 __________ tomorrow morning.",
  "49. You are not __________ to use your phone during the test.",
  "50. Please fill out this __________ for the job."
];

const CLEAN_QUESTIONS = QUESTIONS;

const ANSWERS = [
  "air force (n.)", "anxious (adj.)", "ages (n.)", "ankle (n.)", "aloud (adv.)",
  "apply (v.) – put on / use", "anniversary (n.)", "ancient (adj.)", "apologise (v.)", "ambulance (n.)",
  "ambition (n.)", "amusing (adj.)", "apply (v.) – request / form", "alike (adj./adv.)", "appear (v.)",
  "attention (n.)", "album (n.)", "anybody (pron.)", "announce (v.)", "age (n.)",
  "appearance (n.)", "argument (n.)", "alive (adj.)", "alarm (n.)", "amazed (adj.)",
  "amazing (adj.)", "air conditioning / air conditioner (n.)", "alone (adj./adv.)", "alphabet (n.)", "almost (adv.)",
  "altogether (adv.)", "although (conj.)", "aim (n.)", "airport (n.)", "annoy (v.)",
  "amuse (v.)", "apology (n.)", "airline (n.)", "age (v.)", "aged (adj.)",
  "alarm (v.)", "argue (v.)", "announcement (n.)", "among / amongst (prep.)", "amount (n./v.)",
  "all right / alright (adj./adv.)", "amaze (v.)", "a.m. (adv.)", "allow (v.)", "application (n.)"
];

export default function MidUnitTest() {
  const [, setLocation] = useLocation();
  const [selections, setSelections] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const usedWords = Object.values(selections);
  const isComplete = Object.keys(selections).length === CLEAN_QUESTIONS.length;

  const handleSelect = (idx: number, word: string) => {
    if (isSubmitted) return;
    if (word === "") {
      const newSelections = { ...selections };
      delete newSelections[idx];
      setSelections(newSelections);
    } else {
      setSelections({ ...selections, [idx]: word });
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    window.scrollTo(0, 0);
  };

  const handleRetry = () => {
    setSelections({});
    setIsSubmitted(false);
    window.scrollTo(0, 0);
  };

  const score = CLEAN_QUESTIONS.reduce((acc, _, idx) => {
    return acc + (selections[idx] === ANSWERS[idx] ? 1 : 0);
  }, 0);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 py-8 pb-20">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Mid-Unit Test (Modules 1–5)</h1>
          <p className="text-muted-foreground">Test your knowledge of the vocabulary from the first five modules.</p>
        </div>

        {/* Result Header */}
        {isSubmitted && (
          <Card className="border-2 border-primary shadow-xl overflow-hidden bg-primary/5">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Test Complete!</h2>
              <p className="text-5xl font-black text-primary">Score: {score} / {CLEAN_QUESTIONS.length}</p>
              <div className="flex gap-4 justify-center pt-4">
                <Button onClick={handleRetry} variant="outline" className="rounded-full">
                  <RotateCcw className="mr-2 w-4 h-4" /> Retry Test
                </Button>
                <Button onClick={() => setLocation("/unit")} className="rounded-full">
                  <Home className="mr-2 w-4 h-4" /> Back to Unit
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Word Bank */}
        <Card className="border-2 bg-muted/30">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-bold uppercase tracking-wider text-muted-foreground">Word Bank</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {WORD_BANK.map((word, i) => {
                const isUsed = usedWords.includes(word);
                return (
                  <div 
                    key={i} 
                    className={cn(
                      "text-sm p-1 px-2 rounded border transition-all",
                      isUsed ? "text-muted-foreground line-through opacity-50 bg-muted border-transparent" : "bg-card border-border"
                    )}
                  >
                    {word}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Questions */}
        <div className="space-y-6">
          {CLEAN_QUESTIONS.map((q, idx) => {
            const currentSelection = selections[idx] || "";
            const isCorrect = selections[idx] === ANSWERS[idx];
            
            return (
              <Card key={idx} className={cn(
                "border-2 transition-all",
                isSubmitted ? (isCorrect ? "border-green-200 bg-green-50/20" : "border-red-200 bg-red-50/20") : "border-border"
              )}>
                <CardContent className="p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <p className="text-lg font-medium">{q}</p>
                    {isSubmitted && !isCorrect && (
                      <p className="text-sm font-bold text-green-600">
                        Correct answer: {ANSWERS[idx]}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1 min-w-[200px]">
                      <select
                        disabled={isSubmitted}
                        value={currentSelection}
                        onChange={(e) => handleSelect(idx, e.target.value)}
                        className={cn(
                          "w-full h-10 px-3 rounded-md border-2 bg-background appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all",
                          isSubmitted ? (isCorrect ? "border-green-500" : "border-red-500") : "border-border hover:border-primary/50"
                        )}
                      >
                        <option value="">Select a word...</option>
                        {WORD_BANK.map((word, i) => (
                          <option 
                            key={i} 
                            value={word}
                            disabled={usedWords.includes(word) && currentSelection !== word}
                          >
                            {word}
                          </option>
                        ))}
                      </select>
                      {!isSubmitted && currentSelection && (
                        <button 
                          onClick={() => handleSelect(idx, "")}
                          className="absolute right-8 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          <CloseIcon className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    {isSubmitted && (
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                        isCorrect ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                      )}>
                        {isCorrect ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Submit Button */}
        {!isSubmitted && (
          <div className="fixed bottom-8 left-0 right-0 flex justify-center px-4 z-40">
            <Button
              size="lg"
              disabled={!isComplete}
              onClick={handleSubmit}
              className="w-full max-w-md h-14 rounded-full text-lg shadow-2xl font-bold"
            >
              Finish Test
              <Check className="ml-2 w-6 h-6" />
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
