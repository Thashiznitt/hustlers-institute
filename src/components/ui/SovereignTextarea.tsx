import * as React from "react"
import { cn } from "@/lib/utils"

export interface SovereignTextareaProps extends React.ComponentProps<"textarea"> {}

export const SovereignTextarea = React.forwardRef<HTMLTextAreaElement, SovereignTextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full bg-[#faf9f6] border border-slate-200 py-2.5 px-3 text-xs font-mono rounded-none focus:outline-none focus:border-[#000000] text-slate-800 placeholder:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed resize-none",
          className
        )}
        {...props}
      />
    )
  }
)
SovereignTextarea.displayName = "SovereignTextarea"
