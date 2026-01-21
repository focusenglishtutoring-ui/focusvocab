import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/Button";
import { Card, CardContent } from "@/components/Card";
import { useLocation } from "wouter";
import { Check, X, RotateCcw, Home, Trophy, X as CloseIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const WORD_BANK = [
  "anymore (adv.)", "anyone (pron.)", "anything (pron.)", "anyway (adv.)", "anywhere (adv.)",
  "apart (adv.)", "apart from (prep. phr.)", "apartment (n.)", "apartment building (n.)", "app (n.)",
  "approach (n.)", "approach (v.)", "approve (v.)", "approximately (adv.)", "architect (n.)",
  "architecture (n.)", "area (n.)", "arm (n.)", "armchair (n.)", "army (n.)",
  "around (prep. / adv.)", "arrange (v.)", "arrangement (n.)", "arrive (v.)", "article (n.)",
  "artistic (adj.)", "asleep (adj.)", "assistant (n.)", "attend (v.)", "attention (n.)",
  "avoid (v.)", "awake (adj.)", "award (n.)", "award (v.)", "aware (adj.)",
  "awful (adj.)", "backwards (adv.)", "baggage (n.)", "balance (n.)", "balance (v.)",
  "bank (n.)", "base (n.)", "base (v.)", "basic (adj.)", "battle (n.)",
  "battle (v.)", "bean (n.)", "bear (v.)", "beat (v.)", "beauty (n.)"
];

const QUESTIONS = [
  "1. I don't live in that city __________; I moved last year.",
  "2. Does __________ have a pen I can borrow?",
  "3. I'm so hungry I could eat __________ on the menu.",
  "4. It was raining, but we went for a walk __________.",
  "5. I've looked __________, but I still can't find my keys.",
  "6. The two houses are about 100 meters __________.",
  "7. __________ the rain, it was a very pleasant day.",
  "8. She lives in a small __________ on the third floor.",
  "9. That large __________ has twenty different flats.",
  "10. I just downloaded a new __________ to help me learn English.",
  "11. We need a new __________ to solving this difficult problem.",
  "12. The cat began to __________ the mouse very quietly.",
  "13. Did your parents __________ of your decision to travel?",
  "14. There were __________ fifty people at the party.",
  "15. The __________ showed us the plans for the new house.",
  "16. I love the __________ of ancient Greek temples.",
  "17. This __________ of the city is very quiet at night.",
  "18. He broke his __________ while playing basketball.",
  "19. She sat in the comfortable __________ and read a book.",
  "20. He joined the __________ when he was eighteen years old.",
  "21. We walked __________ the park for an hour.",
  "22. Can you __________ a meeting for next Tuesday?",
  "23. We made an __________ to meet at the cinema at seven.",
  "24. What time does the train __________ in London?",
  "25. I read an interesting __________ about space travel.",
  "26. She is very __________ and loves painting and drawing.",
  "27. The baby is finally __________ after a long day.",
  "28. He works as a shop __________ in a large department store.",
  "29. How many people will __________ the wedding ceremony?",
  "30. Please pay __________ to what the teacher is saying.",
  "31. You should __________ walking alone late at night.",
  "32. I was still __________ when the sun came up this morning.",
  "33. She won an __________ for her excellent photography.",
  "34. The committee will __________ the prize to the best student.",
  "35. Are you __________ of the new rules for the exam?",
  "36. The weather was __________—it rained every single day.",
  "37. He took a few steps __________ to get a better view.",
  "38. Please collect your __________ from the carousel.",
  "39. He lost his __________ and fell off the bicycle.",
  "40. It's difficult to __________ on one foot for a long time.",
  "41. I need to go to the __________ to withdraw some money.",
  "42. The statue stands on a heavy stone __________.",
  "43. The movie is __________ on a true story.",
  "44. We only need some __________ tools to fix the chair.",
  "45. Many soldiers died in the famous __________ of Waterloo.",
  "46. The two countries continued to __________ for many years.",
  "47. I ate a delicious salad with green __________ for lunch.",
  "48. I can't __________ the heat in this room; let's open a window.",
  "49. Our team managed to __________ the champions in the final.",
  "50. We were all surprised by the natural __________ of the island."
];

const CLEAN_QUESTIONS = QUESTIONS;

const ANSWERS = [
  "anymore (adv.)", "anyone (pron.)", "anything (pron.)", "anyway (adv.)", "anywhere (adv.)",
  "apart (adv.)", "apart from (prep. phr.)", "apartment (n.)", "apartment building (n.)", "app (n.)",
  "approach (n.)", "approach (v.)", "approve (v.)", "approximately (adv.)", "architect (n.)",
  "architecture (n.)", "area (n.)", "arm (n.)", "armchair (n.)", "army (n.)",
  "around (prep. / adv.)", "arrange (v.)", "arrangement (n.)", "arrive (v.)", "article (n.)",
  "artistic (adj.)", "asleep (adj.)", "assistant (n.)", "attend (v.)", "attention (n.)",
  "avoid (v.)", "awake (adj.)", "award (n.)", "award (v.)", "aware (adj.)",
  "awful (adj.)", "backwards (adv.)", "baggage (n.)", "balance (n.)", "balance (v.)",
  "bank (n.)", "base (n.)", "base (v.)", "basic (adj.)", "battle (n.)",
  "battle (v.)", "bean (n.)", "bear (v.)", "beat (v.)", "beauty (n.)"
];

export default function UnitTest2() {
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
          <h1 className="text-3xl font-bold">Second-Half Unit Test (Modules 6–10)</h1>
          <p className="text-muted-foreground">Comprehensive assessment of vocabulary from modules six to ten.</p>
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
