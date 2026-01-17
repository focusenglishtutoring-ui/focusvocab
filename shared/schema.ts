import { z } from "zod";

export const quizSchema = z.object({
  question: z.string(),
  choices: z.array(z.string()),
  answer: z.string(), // "A", "B", "C"
});

export const senseSchema = z.object({
  sense_order: z.number(),
  definition: z.string(),
  note: z.string().nullable(),
  examples: z.array(z.string()),
  check: quizSchema,
});

export const entrySchema = z.object({
  headword: z.string(),
  pos: z.string(),
  zh: z.string(),
  senses: z.array(senseSchema),
});

export const moduleSchema = z.object({
  order: z.number(),
  title: z.string(),
  entries: z.array(entrySchema),
});

export const unitSchema = z.object({
  unit_id: z.string(),
  modules: z.array(moduleSchema),
});

export type Quiz = z.infer<typeof quizSchema>;
export type Sense = z.infer<typeof senseSchema>;
export type Entry = z.infer<typeof entrySchema>;
export type Module = z.infer<typeof moduleSchema>;
export type Unit = z.infer<typeof unitSchema>;
