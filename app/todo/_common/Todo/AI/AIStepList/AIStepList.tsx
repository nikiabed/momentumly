"use client";

import { AIStepCard } from "../AIStepCard";

export type AIStep = {
  id: string;
  title: string;
  completed?: boolean;
};

type AIStepListProps = {
  steps: AIStep[];
  onToggle?: (id: string) => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string, value: string) => void;
};

export const AIStepList = ({
  steps,
  onToggle,
  onDelete,
  onEdit,
}: AIStepListProps) => {
  if (!steps.length) {
    return (
      <div
        className="
          flex
          items-center
          justify-center
          rounded-2xl
          border
          border-dashed
          border-border-gray
          bg-background/50
          py-10
          text-sm
          text-muted
        "
      >
        هنوز مرحله‌ای ساخته نشده است.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {steps.map((step) => (
        <AIStepCard
          key={step.id}
          step={step}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};
