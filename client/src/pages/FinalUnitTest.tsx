import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/Button";
import { Card, CardContent } from "@/components/Card";
import { useLocation } from "wouter";
import { Check, X, RotateCcw, Home, Trophy, Lock, Unlock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Section {
  title: string;
  wordBank: string[];
  passage: string;
  answers: string[];
}

const SECTIONS: Section[] = [
  {
    title: "📘 Reading 1 — A Beginner Fitness & Health App",
    wordBank: ["alphabet (n.)", "approximately (adv.)", "arm (n.)", "article (n.)", "amount (n./v.)", "almost (adv.)", "album (n.)", "ankle (n.)", "app (n.)", "bean (n.)", "backwards (adv.)", "altogether (adv.)"],
    passage: "Many young people now use an (1) to learn about exercise and healthy habits. Inside the app, there is an (2) of photos showing correct movements and a short (3) explaining why exercise is important.\nTo make learning easier, the exercises are organized using the (4), from A to Z. Each exercise shows the correct (5) of movement, such as lifting your (6) or carefully moving your (7). Some activities even ask students to move (8) to improve balance.\nThe app also gives simple health advice. For example, it explains that eating a (9) can be a healthy snack. It shows (10) how many minutes students should exercise each day.\nAt first, some students feel (11) tired, but they soon feel stronger. (12), the daily program is short and easy to follow.",
    answers: ["app (n.)", "album (n.)", "article (n.)", "alphabet (n.)", "amount (n./v.)", "arm (n.)", "ankle (n.)", "backwards (adv.)", "bean (n.)", "approximately (adv.)", "almost (adv.)", "altogether (adv.)"]
  },
  {
    title: "📘 Reading 2 — Training for Emergency and Service Work",
    wordBank: ["award (v.)", "battle (n.)", "assistant (n.)", "balance (v.)", "army (n.)", "beauty (n.)", "aware (adj.)", "ambulance (n.)", "beat (v.)", "attend (v.)", "air force (n.)", "award (n.)", "bear (v.)", "battle (v.)", "balance (n.)"],
    passage: "Many young people choose to (1) special training programs to prepare for service jobs. Some want to join the (2), others hope to work in the (3), and some plan to help people by working on an (4) team.\nDuring training, each (5) learns to support others and follow instructions carefully. Trainees must stay (6) of safety rules at all times. The work is not easy, and many describe it as a long (7). They must (8) stress, pain, and tiredness without giving up.\nIn physical training, students learn to (9) their bodies and keep good (10). They also learn how to (11) difficult situations calmly instead of panicking.\nAt the end of the program, the best trainees receive an (12) for their hard work. Leaders may even (13) those who show strong responsibility and teamwork. Many students learn their real (14) is in who they are, not in how they look. In the end, success is not about who you (15), but about what you can give.",
    answers: ["attend (v.)", "army (n.)", "air force (n.)", "ambulance (n.)", "assistant (n.)", "aware (adj.)", "battle (n.)", "bear (v.)", "balance (v.)", "balance (n.)", "battle (v.)", "award (n.)", "award (v.)", "beauty (n.)", "beat (v.)"]
  },
  {
    title: "📘 Reading 3 — A Student Council Meeting",
    wordBank: ["aim (v.)", "argument (n.)", "apology (n.)", "attention (n.)", "announce (v.)", "ambition (n.)", "allow (v.)", "aim (n.)", "apologise (v.)", "aloud (adv.)", "argue (v.)", "approve (v.)", "announcement (n.)", "avoid (v.)"],
    passage: "The student council met after school to discuss new ideas. The main (1) of the meeting was to improve school life for everyone. The president stood up to (2) the plans for the next month, and an official (3) was written on the board.\nAll students were asked to pay close (4) and listen carefully. One member began to speak (5), explaining his personal (6) to become a leader in the future.\nDuring the discussion, two students started to (7) about the best way to organize events. The (8) became louder, and the teacher had to step in to calm everyone down.\nOne student chose to (9) for speaking rudely, and later gave a short (10). To (11) more problems, the group agreed to vote calmly.\nIn the end, the teacher decided to (12) the plan and (13) students to help organize the event. Everyone agreed that the clear (14) of the meeting helped them work better together.",
    answers: ["aim (n.)", "announce (v.)", "announcement (n.)", "attention (n.)", "aloud (adv.)", "ambition (n.)", "argue (v.)", "argument (n.)", "apologise (v.)", "apology (n.)", "avoid (v.)", "approve (v.)", "allow (v.)", "aim (v.)"]
  },
  {
    title: "📘 Reading 4 — Applying to Join a New Club",
    wordBank: ["anywhere (adv.)", "apply (v.) – put on / use", "appearance (n.)", "anybody (pron.)", "application (n.)", "alone (adj./adv.)", "alike (adj./adv.)", "appear (v.)", "anyone (pron.)", "anymore (adv.)", "apply (v.) – request / form", "anything (pron.)", "anyway (adv.)"],
    passage: "At the start of the school year, students can (1) to join different clubs and programs. Each student must fill out an (2) online before the deadline.\nBefore the interview, teachers remind students that their (3) and attitude are important. When students (4) confident, they often feel more relaxed.\nThe club is open to (5) who is interested, and students do not need special skills or (6). Some students worry about joining (7), but they soon realize that many members are very (8).\nMeetings can take place (9) on campus, so members should always check the schedule. If students feel nervous (10), they are encouraged to try (11). They don’t need to (12) special skills on the first day (13).",
    answers: ["apply (v.) – request / form", "application (n.)", "appearance (n.)", "appear (v.)", "anyone (pron.)", "anything (pron.)", "alone (adj./adv.)", "alike (adj./adv.)", "anywhere (adv.)", "anymore (adv.)", "anyway (adv.)", "apply (v.) – put on / use", "anybody (pron.)"]
  },
  {
    title: "📘 Reading 5 — Moving to a New Place",
    wordBank: ["amazed (adj.)", "area (n.)", "annoy (v.)", "around (prep./adv.)", "apartment building (n.)", "bank (n.)", "alive (adj.)", "apart from (prep. phr.)", "amazing (adj.)", "armchair (n.)", "awful (adj.)", "anxious (adj.)", "apartment (n.)", "apart (adv.)", "amaze (v.)"],
    passage: "When Leo moved into a new (1), he felt excited but also (2). The (3) was large and modern, and the (4) around it was busy and noisy.\nOn his first day, he walked (5) the neighborhood to learn where things were. He found a small (6) on the corner and a park nearby. (7) from the noise, the place felt friendly.\nAt first, the sounds from other homes began to (8) him, and one night the noise was truly (9). However, there were moments that continued to (10) him. The city lights at night were (11), and he often felt (12) when watching people walk by.\nInside his apartment, Leo sat in his (13) and thought about his day. Even though he lived far (14) from his old home, he knew this experience would keep him feeling (15) for days.",
    answers: ["apartment (n.)", "anxious (adj.)", "apartment building (n.)", "area (n.)", "around (prep./adv.)", "bank (n.)", "apart from (prep. phr.)", "annoy (v.)", "awful (adj.)", "amaze (v.)", "amazing (adj.)", "alive (adj.)", "armchair (n.)", "apart (adv.)", "amazed (adj.)"]
  },
  {
    title: "📘 Reading 6 — How Families Plan and Experience Trips",
    wordBank: ["alarm (v.)", "ages (n.)", "airport (n.)", "airline (n.)", "baggage (n.)", "air conditioning / air conditioner (n.)", "anniversary (n.)", "ancient (adj.)", "arrive (v.)", "a.m. (adv.)", "alarm (n.)", "awake (adj.)", "asleep (adj.)", "age (n.)", "age (v.)", "aged (adj.)"],
    passage: "Many families plan trips differently depending on the (1) of everyone. A child and an (2) grandparent may not enjoy the same schedule.\nFor many parents, it can feel like (3) have passed since the last family holiday. Some families travel to celebrate an (4) or to visit an (5) place.\nOn travel days, an (6) often rings early, sometimes before 6:00 (7). Some people are already (8), while others are still (9). Parents may (10) quickly from the stress of traveling with young kids.\nAt the (11), families check in with the (12) and carry their (13). Inside the building, the (14) helps everyone stay comfortable while they wait. When people finally (15) at the destination, the trip can sometimes (16) younger travelers—especially if everything feels new.",
    answers: ["age (n.)", "aged (adj.)", "ages (n.)", "anniversary (n.)", "ancient (adj.)", "alarm (n.)", "a.m. (adv.)", "awake (adj.)", "asleep (adj.)", "age (v.)", "airport (n.)", "airline (n.)", "baggage (n.)", "air conditioning / air conditioner (n.)", "arrive (v.)", "alarm (v.)"]
  },
  {
    title: "📘 Reading 7 — How Buildings Are Designed and Planned",
    wordBank: ["architecture (n.)", "base (v.)", "approach (n.)", "architect (n.)", "arrange (v.)", "base (n.)", "artistic (adj.)", "arrangement (n.)", "approach (v.)"],
    passage: "An (1) is the person who plans and designs buildings. The study of building design is called (2), and it combines safety, function, and style.\nWhen starting a new project, designers first choose an (3). This plan helps them decide how to (4) the design on the needs of the people who will use the building. A strong (5) is important because it supports the entire structure.\nNext, rooms are planned carefully. Designers (6) spaces so that people can move easily, and the final (7) must be practical and comfortable. At the same time, many buildings include (8) details that make them attractive.\nOverall, it is important to (9) a design by balancing beauty and usefulness.",
    answers: ["architect (n.)", "architecture (n.)", "approach (n.)", "base (v.)", "base (n.)", "arrange (v.)", "arrangement (n.)", "artistic (adj.)", "approach (v.)"]
  }
];

export default function FinalUnitTest() {
  const [, setLocation] = useLocation();
  const [unlockedIndex, setUnlockedIndex] = useState(0);
  const [bestScores, setBestScores] = useState<Record<number, number>>({});
  const [currentSection, setCurrentSection] = useState(0);
  const [selections, setSelections] = useState<Record<number, string>>({});
  const [results, setResults] = useState<{ correct: number; total: number; score: number } | null>(null);
  const [checkedBlanks, setCheckedBlanks] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem("finalTestProgress");
    if (saved) {
      const { unlocked, scores } = JSON.parse(saved);
      setUnlockedIndex(unlocked || 0);
      setBestScores(scores || {});
    }
  }, []);

  const saveProgress = (newUnlocked: number, newScores: Record<number, number>) => {
    localStorage.setItem("finalTestProgress", JSON.stringify({ unlocked: newUnlocked, scores: newScores }));
    setUnlockedIndex(newUnlocked);
    setBestScores(newScores);
  };

  const resetTest = () => {
    localStorage.removeItem("finalTestProgress");
    setUnlockedIndex(0);
    setBestScores({});
    setCurrentSection(0);
    setSelections({});
    setResults(null);
    setCheckedBlanks({});
  };

  const handleSelect = (idx: number, word: string) => {
    setResults(null);
    setCheckedBlanks({});
    if (word === "") {
      const newSels = { ...selections };
      delete newSels[idx];
      setSelections(newSels);
    } else {
      setSelections({ ...selections, [idx]: word });
    }
  };

  const section = SECTIONS[currentSection];
  const totalBlanks = section.answers.length;
  const isComplete = Object.keys(selections).length === totalBlanks;
  const usedWords = Object.values(selections);

  const checkAnswers = () => {
    let correct = 0;
    const newChecked: Record<number, boolean> = {};
    section.answers.forEach((ans, i) => {
      const isCorrect = selections[i] === ans;
      if (isCorrect) correct++;
      newChecked[i] = isCorrect;
    });

    const score = Math.round((correct / totalBlanks) * 100);
    setResults({ correct, total: totalBlanks, score });
    setCheckedBlanks(newChecked);

    const newScores = { ...bestScores, [currentSection]: Math.max(bestScores[currentSection] || 0, score) };
    let newUnlocked = unlockedIndex;
    if (score >= 90 && currentSection === unlockedIndex && unlockedIndex < SECTIONS.length - 1) {
      newUnlocked = currentSection + 1;
    }
    saveProgress(newUnlocked, newScores);
  };

  const renderPassage = () => {
    const parts = section.passage.split(/(\(\d+\))/);
    return parts.map((part, i) => {
      const match = part.match(/\((\d+)\)/);
      if (match) {
        const blankIdx = parseInt(match[1]) - 1;
        const isCorrect = checkedBlanks[blankIdx];
        const isWrong = checkedBlanks[blankIdx] === false;

        return (
          <select
            key={i}
            value={selections[blankIdx] || ""}
            onChange={(e) => handleSelect(blankIdx, e.target.value)}
            className={cn(
              "mx-1 px-2 py-1 h-9 rounded border-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer text-sm font-medium",
              isCorrect && "border-green-500 bg-green-50/10",
              isWrong && "border-red-500 bg-red-50/10",
              !isCorrect && !isWrong && "border-border hover:border-primary/50"
            )}
          >
            <option value="">...</option>
            {section.wordBank.map((word, j) => {
              const isUsedElsewhere = usedWords.includes(word) && selections[blankIdx] !== word;
              return (
                <option key={j} value={word} className={isUsedElsewhere ? "text-muted-foreground line-through" : ""}>
                  {word}
                </option>
              );
            })}
          </select>
        );
      }
      return <span key={i} className="leading-relaxed">{part}</span>;
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 py-8 pb-24 px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Final Unit Test</h1>
            <p className="text-muted-foreground italic">Score 90% or higher to unlock the next reading challenge.</p>
          </div>
          <Button variant="outline" size="sm" onClick={resetTest} className="w-fit text-red-500 border-red-200 hover:bg-red-50">
            <RotateCcw className="mr-2 w-4 h-4" /> Reset All Progress
          </Button>
        </div>

        {/* Section Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {SECTIONS.map((_, i) => {
            const isUnlocked = i <= unlockedIndex;
            const isCurrent = i === currentSection;
            const best = bestScores[i];
            
            return (
              <button
                key={i}
                disabled={!isUnlocked}
                onClick={() => {
                  setCurrentSection(i);
                  setSelections({});
                  setResults(null);
                  setCheckedBlanks({});
                }}
                className={cn(
                  "p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1",
                  isCurrent ? "border-primary bg-primary/5 shadow-md" : "border-border hover:border-primary/50",
                  !isUnlocked && "opacity-50 grayscale cursor-not-allowed bg-muted"
                )}
              >
                <div className="text-xs font-bold uppercase opacity-50">Part {i + 1}</div>
                {isUnlocked ? (
                  best !== undefined ? (
                    <div className={cn("text-sm font-black", best >= 90 ? "text-green-600" : "text-amber-600")}>{best}%</div>
                  ) : <Unlock className="w-4 h-4 text-primary" />
                ) : <Lock className="w-4 h-4" />}
              </button>
            );
          })}
        </div>

        <Card className="border-2 shadow-sm overflow-hidden">
          <div className="bg-muted/50 border-b p-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              {section.title}
            </h2>
          </div>
          <CardContent className="p-6 space-y-8">
            {/* Word Bank */}
            <div className="p-4 rounded-xl border-2 border-dashed bg-muted/20 space-y-3">
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Word Bank</div>
              <div className="flex flex-wrap gap-2">
                {section.wordBank.map((word, i) => (
                  <div
                    key={i}
                    className={cn(
                      "text-xs px-2 py-1 rounded border bg-card transition-all",
                      usedWords.includes(word) ? "text-muted-foreground line-through opacity-50 bg-muted" : "border-border shadow-sm"
                    )}
                  >
                    {word}
                  </div>
                ))}
              </div>
            </div>

            {/* Passage */}
            <div className="text-lg leading-loose space-y-4 whitespace-pre-wrap font-serif text-foreground/90">
              {renderPassage()}
            </div>

            {/* Feedback & Actions */}
            <div className="pt-6 border-t flex flex-col items-center gap-6">
              {results && (
                <div className={cn(
                  "w-full p-4 rounded-xl text-center border-2",
                  results.score >= 90 ? "bg-green-50 border-green-200 text-green-700" : "bg-amber-50 border-amber-200 text-amber-700"
                )}>
                  <div className="text-3xl font-black mb-1">Score: {results.score}%</div>
                  <div className="text-sm font-medium">({results.correct} / {results.total} correct)</div>
                  {results.score >= 90 ? (
                    <div className="mt-2 font-bold animate-bounce">✨ Success! Section Unlocked! ✨</div>
                  ) : (
                    <div className="mt-2 font-bold">Need 90% to unlock next section. Try again.</div>
                  )}
                </div>
              )}

              <div className="flex gap-4 w-full justify-center">
                <Button
                  size="lg"
                  disabled={!isComplete}
                  onClick={checkAnswers}
                  className="rounded-full px-8 h-12 text-lg font-bold shadow-lg"
                >
                  <Check className="mr-2 w-5 h-5" /> Check Answers
                </Button>
                {results && results.score >= 90 && currentSection < SECTIONS.length - 1 && (
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      setCurrentSection(currentSection + 1);
                      setSelections({});
                      setResults(null);
                      setCheckedBlanks({});
                    }}
                    className="rounded-full px-8 h-12 text-lg font-bold"
                  >
                    Next Section <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
