import { z } from "zod";

export const quizSchema = z.object({
  question: z.string(),
  options: z.array(z.string()),
  correctAnswer: z.string(),
});

export const entrySchema = z.object({
  id: z.string(),
  word: z.string(),
  meaning: z.string(),
  examples: z.array(z.string()),
  note: z.string().optional(),
  quiz: quizSchema,
});

export const moduleSchema = z.object({
  id: z.string(),
  title: z.string(),
  entries: z.array(entrySchema),
});

export const unitSchema = z.object({
  id: z.string(),
  title: z.string(),
  modules: z.array(moduleSchema),
});

export type Quiz = z.infer<typeof quizSchema>;
export type Entry = z.infer<typeof entrySchema>;
export type Module = z.infer<typeof moduleSchema>;
export type Unit = z.infer<typeof unitSchema>;
