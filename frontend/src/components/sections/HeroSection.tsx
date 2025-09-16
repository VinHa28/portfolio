import Button from "@/components/common/Button";
import { EmailIcon, FacebookIcon, GitHubIcon } from "@/components/icons";
import React from "react";

export default function HeroSection() {
  return (
    <section className="min-h-[calc(100vh-120px)] flex justify-center bg-[var(--hero-bg)]">
      <div className="max-w-[1080px] w-full flex flex-col justify-center">
        <p className="font-light">{"Hey, I'm"}</p>
        <h1 className="text-4xl font-bold text-[96px] my-[26px] linear-text">
          Ha Van Vinh
        </h1>
        <p className="font-light text-[18px]">
          {`I’m a web developer specializing in React, Next.js, and Node.js.
              I’m passionate about building optimized, intuitive, and modern applications with a strong focus on user experience.
              This portfolio showcases my projects, ideas, and development journey, reflecting my problem-solving skills and creative approach to coding.`}
        </p>
        <div className="mt-[194px] flex space-x-[8px]">
          <Button
            color="purple-blue"
            className="w-[200px]"
            icon={<EmailIcon />}
            href="/"
          >
            Send an email
          </Button>
          <Button
            href="https://github.com/VinHa28"
            color="purple-pink"
            className="w-[200px]"
            icon={<GitHubIcon />}
          >
            Github
          </Button>
          <Button
            href="https://www.facebook.com/vanvinh.ha.52"
            color="purple-pink"
            className="w-[200px]"
            icon={<FacebookIcon />}
          >
            Facebook
          </Button>
        </div>
      </div>
    </section>
  );
}
