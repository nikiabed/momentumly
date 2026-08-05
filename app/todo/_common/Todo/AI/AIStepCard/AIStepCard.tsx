"use client";

import { TickCircle, Edit2, Trash } from "iconsax-reactjs";
import { useState } from "react";

type AIStepCardProps = {
  step: {
    id: string;
    title: string;
    completed?: boolean;
  };
  onToggle?: (id: string) => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string, value: string) => void;
};

export const AIStepCard = ({
  step,
  onToggle,
  onDelete,
  onEdit,
}: AIStepCardProps) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(step.title);

  const handleSave = () => {
    setEditing(false);
    if (value.trim() !== step.title) {
      onEdit?.(step.id, value.trim());
    }
  };

  return (
    <div
      className={`
        group
        flex items-start gap-3
        rounded-2xl
        border
        border-border-gray
        bg-background
        px-4
        py-3
        transition-all
        duration-200
        hover:border-border
        hover:shadow-sm
      `}
    >
      {/* Complete */}
      <button onClick={() => onToggle?.(step.id)} className="mt-0.5 shrink-0">
        <TickCircle
          size={22}
          variant={step.completed ? "Bold" : "Outline"}
          className={
            step.completed
              ? "text-emerald-500"
              : "text-muted hover:text-emerald-500 transition-colors"
          }
        />
      </button>

      {/* Content */}
      <div className="flex-1">
        {editing ? (
          <input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") {
                setValue(step.title);
                setEditing(false);
              }
            }}
            className="
              w-full
              bg-transparent
              outline-none
              border-none
              text-sm
              font-medium
              text-foreground
            "
          />
        ) : (
          <p
            className={`
              text-sm
              leading-6
              font-medium
              transition-all
              ${
                step.completed
                  ? "line-through text-muted opacity-70"
                  : "text-foreground"
              }
            `}
          >
            {step.title}
          </p>
        )}
      </div>

      {/* Actions */}
      <div
        className="
          flex
          items-center
          gap-1
          opacity-0
          transition-opacity
          group-hover:opacity-100
        "
      >
        <button
          onClick={() => setEditing(true)}
          className="
            rounded-lg
            p-1.5
            text-muted
            hover:bg-muted/10
            hover:text-foreground
          "
        >
          <Edit2 size={16} />
        </button>

        <button
          onClick={() => onDelete?.(step.id)}
          className="
            rounded-lg
            p-1.5
            text-muted
            hover:bg-red-500/10
            hover:text-red-500
          "
        >
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
};
