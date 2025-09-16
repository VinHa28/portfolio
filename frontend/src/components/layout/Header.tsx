import Button from "@/components/common/Button";
import { DownloadIcon } from "@/components/icons";
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
          <Button size="sm" icon={<DownloadIcon />}>
            Resume
          </Button>
        </nav>
      </div>
    </header>
  );
}
