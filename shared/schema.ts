import { z } from "zod";

export const quizSchema = z.object({
  question: z.string(),
  options: z.array(z.string()),
  correctAnswerId: z.string(),
});

export const senseSchema = z.object({
  id: z.string(),
  pos: z.string(),
  definition_en: z.string(),
  examples: z.array(z.string()),
  note: z.string().optional(),
  quiz: quizSchema,
});

export const entrySchema = z.object({
  id: z.string(),
  headword: z.string(),
  senses: z.array(senseSchema),
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
export type Sense = z.infer<typeof senseSchema>;
export type Entry = z.infer<typeof entrySchema>;
export type Module = z.infer<typeof moduleSchema>;
export type Unit = z.infer<typeof unitSchema>;
