import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SovereignSelectProps extends React.ComponentProps<"select"> {
  wrapperClassName?: string;
}

export const SovereignSelect = React.forwardRef<HTMLSelectElement, SovereignSelectProps>(
  ({ className, wrapperClassName, children, ...props }, ref) => {
    return (
      <div className={cn("relative w-full", wrapperClassName)}>
        <select
          ref={ref}
          className={cn(
            "w-full appearance-none bg-[#faf9f6] border border-slate-200 py-2.5 pl-3 pr-10 text-xs font-mono rounded-none focus:outline-none focus:border-[#000000] text-slate-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    )
  }
)
SovereignSelect.displayName = "SovereignSelect"
