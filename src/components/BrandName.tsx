import React from "react";

interface BrandNameProps {
  className?: string;
  iconClassName?: string;
  showIcon?: boolean;
}

export default function BrandName({ className = "", iconClassName = "w-3.5 h-3.5", showIcon = true }: BrandNameProps) {
  return (
    <span className="inline-flex items-center gap-1.5 font-cormorant-sc">
      {showIcon && (
        <img src="/icon.png" alt="Sovereign Millionaires Icon" className={`${iconClassName} object-contain shrink-0`} />
      )}
      <span className={className}>
        Sovereign Millionaires
      </span>
    </span>
  );
}

