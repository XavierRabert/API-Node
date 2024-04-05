import z from "zod";

const gameSchema = z.object({
  title: z.string({
    invalid_type_error: "Game title must be a string",
    required_error: "Game title is required.",
  }),
  players: z.string(),
  age: z.string(),
  duration: z.string(),
  image: z.string(),
  rate: z.number().min(0).max(10).default(5),
});

export function validateGame(input) {
  return gameSchema.safeParse(input);
}

export function validatePartialGame(input) {
  return gameSchema.partial().safeParse(input);
}
