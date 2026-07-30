export type FeedbackEvent =
  | {
      type: "todo-completed";
    }
  | {
      type: "coin-earned";
      amount: number;
    };

export type FeedbackContextType = {
  todoCompleted: () => void;
  coinEarned: (amount: number) => void;
};

export type CoinFeedback = {
  id: number;
  amount: number;
  origin?: {
    x: number;
    y: number;
  };
};
