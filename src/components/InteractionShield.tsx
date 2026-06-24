"use client";

import { useEffect } from "react";

export default function InteractionShield() {
  useEffect(() => {
    const handleLeftClick = (e: MouseEvent) => {
      // Intercept left clicks (button 0)
      if (e.button === 0) {
        const hostname = window.location.hostname;
        if (
          hostname !== "localhost" && 
          hostname !== "127.0.0.1" && 
          hostname !== ""
        ) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };

    // Use capturing phase (true) to intercept event before it reaches other handlers
    document.addEventListener("click", handleLeftClick, true);

    return () => {
      document.removeEventListener("click", handleLeftClick, true);
    };
  }, []);

  return null;
}
