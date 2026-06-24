import * as React from "react"
import { cn } from "@/lib/utils"

export interface SovereignButtonProps extends React.ComponentProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "success";
}

export const SovereignButton = React.forwardRef<HTMLButtonElement, SovereignButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-heading text-xs uppercase tracking-widest font-bold py-3.5 px-6 transition-all rounded-none cursor-pointer h-12 border select-none disabled:cursor-not-allowed",
          variant === "primary" && "bg-black hover:bg-slate-900 border-black text-white disabled:bg-slate-200 disabled:border-slate-200 disabled:text-slate-400",
          variant === "secondary" && "bg-slate-800 hover:bg-slate-900 border-slate-800 text-white",
          variant === "outline" && "bg-transparent hover:bg-[#faf9f6] border-black text-black disabled:border-slate-200 disabled:text-slate-400",
          variant === "success" && "bg-[#000000] hover:bg-slate-900 border-black text-white disabled:bg-slate-200 disabled:border-slate-200 disabled:text-slate-400",
          className
        )}
        {...props}
      />
    )
  }
)
SovereignButton.displayName = "SovereignButton"
