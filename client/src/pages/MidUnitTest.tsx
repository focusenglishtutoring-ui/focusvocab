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
  "amount (n./v.)", "ancient (adj.)", "ankle (n.)", "anniversary (n.)", "amuse (v.)",
  "amusing (adj.)", "annoy (v.)", "anxious (adj.)", "anybody (pron.)", "apologise (v.)",
  "apology (n.)", "appear (v.)", "appearance (n.)", "apply (v.) – put on / use",
  "apply (v.) – request / form", "application (n.)", "argue (v.)", "argument (n.)", "album (n.)"
];

const QUESTIONS = [
  "1. The house is hidden __________ the trees.",
  "2. I feel very __________ before an important test.",
  "3. The clown __________ the children.",
  "4. Please read the sentence __________ so everyone can hear you.",
  "5. The museum shows __________ art from long ago.",
  "6. We wait at the __________ before boarding the plane.",
  "7. I __________ for the course online.",
  "8. The twins look very __________ in this photo.",
  "9. The teacher does not __________ phones in class.",
  "10. Her wedding __________ is next weekend.",
  "11. I don’t see him for __________ when he travels abroad.",
  "12. The class starts at 8 ________ Inc.",
  "13. Loud noises __________ small children.",
  "14. My main __________ is to improve my English.",
  "15. The nurse __________ pressure to the wound.",
  "16. The animal is still __________ after the accident.",
  "17. This music __________ is very popular.",
  "18. The class is for children __________ 8 to 10.",
  "19. We turn on the __________ to cool the room.",
  "20. The teacher is __________ by the result.",
  "21. The soldiers join the __________ after school.",
  "22. __________ can join the club.",
  "23. They have an __________ about the answer.",
  "24. I hurt my __________ while playing football.",
  "25. She feels __________ when waiting for the results.",
  "26. The answer is __________ — everyone agrees.",
  "27. I __________ to finish my homework early.",
  "28. A rainbow __________ after the rain stops.",
  "29. Please write your name using the English ________..",
  "30. The movie was very __________.",
  "31. The driver calls an __________ after the accident.",
  "32. He does not want to __________ with his brother.",
  "33. I give her an __________ for being late.",
  "34. The result __________ everyone in the room.",
  "35. She stays at home __________ in the evening.",
  "36. The course __________ to help students.",
  "37. The teacher is surprised by the __________ of homework.",
  "38. I describe the __________ of the building.",
  "39. The music is __________ — everyone loves it.",
  "40. The __________ wakes me at six every morning.",
  "41. We choose a cheap __________ for our holiday.",
  "42. I feel __________ when I understand the lesson.",
  "43. The test asks about your __________.",
  "44. They will __________ the winner today.",
  "45. I __________ for a new job this year.",
  "46. The students sit __________ their friends.",
  "47. She has an __________ memory.",
  "48. The class __________ at helping students.",
  "49. He works in the __________.",
  "50. The sound makes people feel __________."
];

// Fixing question 12 and 29 text from the provided prompt
const CLEAN_QUESTIONS = QUESTIONS.map((q, idx) => {
  if (idx === 11) return "12. The class starts at 8 __________.";
  if (idx === 28) return "29. Please write your name using the English __________.";
  return q;
});

const ANSWERS = [
  "among / amongst (prep.)", "anxious (adj.)", "amuse (v.)", "aloud (adv.)", "ancient (adj.)",
  "airport (n.)", "apply (v.) – request / form", "alike (adj./adv.)", "allow (v.)", "anniversary (n.)",
  "ages (n.)", "a.m. (adv.)", "alarm (v.)", "ambition (n.)", "apply (v.) – put on / use",
  "alive (adj.)", "album (n.)", "aged (adj.)", "air conditioning / air conditioner (n.)", "amazed (adj.)",
  "air force (n.)", "anybody (pron.)", "argument (n.)", "ankle (n.)", "anxious (adj.)",
  "all right / alright (adj./adv.)", "aim (v.)", "appear (v.)", "alphabet (n.)", "amusing (adj.)",
  "ambulance (n.)", "argue (v.)", "apology (n.)", "amaze (v.)", "alone (adj./adv.)",
  "aim (n.)", "amount (n./v.)", "appearance (n.)", "amazing (adj.)", "alarm (n.)",
  "airline (n.)", "amazed (adj.)", "age (n.)", "amuse (v.)", "apply (v.) – request / form",
  "among / amongst (prep.)", "amazing (adj.)", "aim (v.)", "air force (n.)", "anxious (adj.)"
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
