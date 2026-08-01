export type AIDifficulty = "Easy" | "Medium" | "Hard";

export type AIStep = {
  id: string;
  title: string;
  description?: string;
  estimatedMinutes: number;
  difficulty: AIDifficulty;
  completed?: boolean;
};
