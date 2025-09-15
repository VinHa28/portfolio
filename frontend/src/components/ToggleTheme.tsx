"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function ToggleTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    } else {
      const preferDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDark(preferDark);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button onClick={() => setIsDark(!isDark)} className="cursor-pointer">
      {isDark ? (
        <Image
          alt="Switch to light mode"
          src="/images/sun_fill_2.png"
          width={24}
          height={24}
        />
      ) : (
        <Image
          alt="Switch to dark mode"
          src="/images/sun_fill.png"
          width={24}
          height={24}
        />
      )}
    </button>
  );
}
