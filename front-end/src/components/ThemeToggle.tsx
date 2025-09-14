"use client";
import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="mt-4 px-4 py-2 rounded-xl bg-foreground text-background"
    >
      {isDark ? "Switch to Light" : "Switch to Dark"}
    </button>
  );
}
