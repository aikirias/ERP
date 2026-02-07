import * as React from "react";

import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "glow";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em]",
        variant === "default" &&
          "bg-amber-100 text-amber-900 shadow-[0_8px_30px_rgba(251,191,36,0.35)]",
        variant === "outline" &&
          "border border-slate-300/90 bg-white text-slate-700",
        variant === "glow" &&
          "bg-sky-900/90 text-sky-100 shadow-[0_12px_36px_rgba(14,165,233,0.35)]",
        className,
      )}
      {...props}
    />
  );
}
