export interface SolutionStep {
  step: string;
  math: string;
  note?: string;
}

export interface Question {
  id: number;
  number: number;
  title: string;
  topic: string;
  difficulty: 'Foundation' | 'Core' | 'Extended';
  questionText: string;
  scenarioContext?: string;
  given: {
    label: string;
    value: string;
  }[];
  answerUnit: '$' | '%';
  unitPosition: 'prefix' | 'suffix';
  targetValue: number;
  tolerance: number; // e.g. 0.05
  hint: string;
  hintSteps?: string[];
  explanation: string;
  solutionSteps: SolutionStep[];
  commonMistake: string;
  examTip: string;
}

export interface UserProgress {
  studentName: string;
  currentQuestionIndex: number;
  answers: Record<number, string>;
  hintsRevealed: Record<number, boolean>;
  isSubmitted: boolean;
  score: number;
  totalQuestions: number;
  submittedAt: string | null;
  lastSavedAt: string | null;
}

export type TabType = 'learn' | 'practice' | 'review';
