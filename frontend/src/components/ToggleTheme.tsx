"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function ToggleTheme() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);
  return (
    <button onClick={() => setIsDark(!isDark)} className="cursor-pointer">
      {isDark ? (
        <Image alt="" src="/images/sun_fill_2.png" width={24} height={24} />
      ) : (
        <Image alt="" src="/images/sun_fill.png" width={24} height={24} />
      )}
    </button>
  );
}
