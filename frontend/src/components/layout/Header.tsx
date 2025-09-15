import ToggleTheme from "@/components/ToggleTheme";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="flex justify-center py-[42px] bg-[var(--hero-bg)]">
      <div className="max-w-[1080px] w-full flex items-center justify-between">
        <Link href={"/"} className="text-[24px] font-light">
          VinhHa.
        </Link>
        <nav className="flex items-center space-x-[20px]">
          <ToggleTheme />
          <Link className="font-light text-[18px] hover:underline" href={"/"}>
            Projects
          </Link>
          <Link className="font-light text-[18px] hover:underline" href={"/"}>
            Contact
          </Link>
          <Link
            href="/"
            className="social-btn p-[2px] h-[40px] rounded-[5px] linear-border--blue"
          >
            <span className=" bg-[var(--background)] gap-[4px] w-full h-full px-[10px] rounded-[3px] flex justify-center items-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_6_9647)">
                  <path
                    d="M19 9H15V3H9V9H5L12 16L19 9ZM5 18V20H19V18H5Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_6_9647">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Resume 
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
