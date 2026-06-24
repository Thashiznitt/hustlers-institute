"use client";

import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface BrutalistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

export function BrutalistDialog({
  open,
  onOpenChange,
  children,
  className = "max-w-md",
  showCloseButton = true
}: BrutalistDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={showCloseButton} className={`${className} bg-white border border-slate-200 p-0 rounded-none shadow-xl z-50 overflow-hidden`}>
        {children}
      </DialogContent>
    </Dialog>
  );
}
