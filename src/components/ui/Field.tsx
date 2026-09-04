"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useId } from "react";

export function Field({
  label,
  hint,
  className,
  ...props
}: { label: string; hint?: string } & ComponentPropsWithoutRef<"input">) {
  const id = useId();
  return (
    <div className={`flex flex-col gap-2 ${className ?? ""}`}>
      <label htmlFor={id} className="mono-label text-muted">
        {label}
      </label>
      <input
        id={id}
        className="h-11 border-b border-hairline-strong bg-transparent text-[0.9375rem] text-paper outline-none transition-colors duration-200 placeholder:text-faint hover:border-paper/35 focus:border-signal focus-visible:outline-none"
        {...props}
      />
      {hint && <p className="text-xs text-faint">{hint}</p>}
    </div>
  );
}
