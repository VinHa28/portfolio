"use client";
import Link from "next/link";
import React, { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  href?: string;
  color?: "purple-blue" | "purple-pink" | "red-yellow" | "purple-bold";
  icon?: ReactNode;
  children: ReactNode;
  size?: "md" | "sm";
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const colorClasses: Record<string, string> = {
  "purple-blue": "linear-border--purple-blue",
  "purple-pink": "linear-border--purple-pink",
  "red-yellow": "linear-border--red-yellow",
  "purple-bold": "linear-border--purple-bold",
};

const sizeClasses: Record<string, string> = {
  md: "h-[55px]",
  sm: "h-[40px]",
};

export default function Button({
  href,
  color = "purple-blue",
  icon,
  children,
  size = "md",
  className = "",
  onClick,
}: ButtonProps) {
  const inner = (
    <span
      className={`bg-[var(--background)] gap-[${
        size === "sm" ? "4px" : "10px"
      }] w-full h-full rounded-[3px] flex justify-center items-center px-2`}
    >
      {icon}
      {children}
    </span>
  );
  const btnClass = `btn p-[2px] rounded-[5px]  ${sizeClasses[size]} ${colorClasses[color]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={btnClass}>
        {inner}
      </Link>
    );
  }

  return (
    <button className={btnClass} onClick={onClick}>
      {inner}
    </button>
  );
}
