import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-none border border-slate-200 bg-[#faf9f6] px-3 py-2.5 text-xs font-mono transition-colors outline-none placeholder:text-slate-400 focus-visible:border-black focus-visible:ring-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-50 text-slate-800",
        className
      )}
      {...props}
    />
  )
}

export { Input }

