import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/Button";
import { Card, CardContent } from "@/components/Card";
import { useLocation } from "wouter";
import { Check, X, RotateCcw, Home, Trophy, X as CloseIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const WORD_BANK = [
  "anyone (pron.)", "anymore (adv.)", "anything (pron.)", "anyway (adv.)", "anywhere (adv.)",
  "apart (adv.)", "apart from (prep.)", "apartment (n.)", "apartment building (n.)", "app (n.)",
  "approach (n.)", "approach (v.)", "appropriate (adj.)", "approve (v.)", "approximately (adv.)",
  "architect (n.)", "architecture (n.)", "area (n.)", "arm (n.)", "armchair (n.)",
  "army (n.)", "around (prep./adv.)", "arrange (v.)", "arrangement (n.)", "arrive (v.)",
  "article (n.)", "artistic (adj.)", "asleep (adj.)", "assistant (n.)", "attend (v.)",
  "attention (n.)", "avoid (v.)", "awake (adj.)", "award (n.)", "award (v.)",
  "aware (adj.)", "awful (adj.)", "backwards (adv.)", "baggage (n.)", "balance (n.)",
  "balance (v.)", "bank (n.)", "base (n.)", "base (v.)", "basic (adj.)",
  "battle (n.)", "battle (v.)", "bean (n.)", "bear (v.)", "beat (v.)", "beauty (n.)"
];

const QUESTIONS = [
  "1. I don't live in that city __________.",
  "2. The children sat __________ the table.",
  "3. She won an __________ for her hard work.",
  "4. He lost his __________ while standing on one foot.",
  "5. Please pay __________ in class.",
  "6. The city is famous for its modern __________.",
  "7. I can't find my keys __________.",
  "8. Try to __________ junk food if you want to be healthier.",
  "9. The school __________ the trip yesterday.",
  "10. He walked __________ to see where he came from.",
  "11. She works as a shop __________.",
  "12. The statue stands on a wide __________.",
  "13. I read an interesting __________ about animals.",
  "14. Our team __________ theirs yesterday.",
  "15. She stayed __________ all night studying.",
  "16. This is a new __________ to learning English.",
  "17. I need to go to the __________ to take out some money.",
  "18. There were __________ 30 students in the class.",
  "19. I use this __________ every day on my phone.",
  "20. The story is __________ on real events.",
  "21. The two houses are far __________.",
  "22. She cooked some __________ for dinner.",
  "23. We talked about the seating __________.",
  "24. She has a very __________ style of drawing.",
  "25. I can't __________ the noise anymore.",
  "26. Everyone came __________ from Tom.",
  "27. We learned some __________ rules before the test.",
  "28. He broke his __________ while playing basketball.",
  "29. They talked about a famous __________ from history.",
  "30. The bus will __________ at eight o’clock.",
  "31. She was not __________ of the rule.",
  "32. He sat down in the comfortable __________.",
  "33. She __________ on one foot.",
  "34. He joined the __________ last year.",
  "35. The __________ of the place surprised everyone.",
  "36. She is still __________.",
  "37. Will you __________ the meeting tomorrow?",
  "38. We need to __________ the chairs before class.",
  "39. Don’t play in that __________; it’s dangerous.",
  "40. She wants to become an __________.",
  "41. The dog slowly __________ the door.",
  "42. You can ask me __________ if you need help.",
  "43. It was raining, but we went out __________.",
  "44. That __________ has many families living inside.",
  "45. The prize was __________ to her last year.",
  "46. Please collect your __________ at the airport.",
  "47. She felt __________ after getting sick.",
  "48. She lives in an __________ on the third floor.",
  "49. __________ can answer this question.",
  "50. She battled to finish the work."
];

// Note: question 50 is special, it's a complete sentence to test a specific word if needed, 
// but the format usually has a blank. Let's fix 50 to have a blank.
const CLEAN_QUESTIONS = QUESTIONS.map((q, idx) => {
  if (idx === 49) return "50. She __________ to finish the work.";
  return q;
});

const ANSWERS = [
  "anymore (adv.)", "around (prep./adv.)", "award (n.)", "balance (n.)", "attention (n.)",
  "architecture (n.)", "anywhere (adv.)", "avoid (v.)", "approve (v.)", "backwards (adv.)",
  "assistant (n.)", "base (n.)", "article (n.)", "beat (v.)", "awake (adj.)",
  "approach (n.)", "bank (n.)", "approximately (adv.)", "app (n.)", "base (v.)",
  "apart (adv.)", "bean (n.)", "arrangement (n.)", "artistic (adj.)", "bear (v.)",
  "apart from (prep.)", "basic (adj.)", "arm (n.)", "battle (n.)", "arrive (v.)",
  "aware (adj.)", "armchair (n.)", "balance (v.)", "army (n.)", "beauty (n.)",
  "asleep (adj.)", "attend (v.)", "arrange (v.)", "area (n.)", "architect (n.)",
  "approach (v.)", "anything (pron.)", "anyway (adv.)", "apartment building (n.)", "award (v.)",
  "baggage (n.)", "awful (adj.)", "apartment (n.)", "anyone (pron.)", "battle (v.)"
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
