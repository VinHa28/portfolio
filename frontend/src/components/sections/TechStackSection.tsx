import React from "react";
import { TechCard, TechItem } from "@/components/TechCard";

export default function TechStackSection() {
  const techStack: TechItem[] = [
    {
      name: "JavaScript",
      height: 64,
      width: 64,
      src: "/images/tech-stack/javascript.svg",
    },
    {
      name: "TypeScript",
      height: 64,
      width: 64,
      src: "/images/tech-stack/typescript.svg",
    },
    {
      name: "React",
      height: 64,
      width: 64,
      src: "/images/tech-stack/reactjs.svg",
    },
    {
      name: "Next.js",
      height: 64,
      width: 64,
      fillColor: true,
      src: "/images/tech-stack/nextjs.svg",
    },
    {
      name: "Node.js",
      height: 64,
      width: 64,
      src: "/images/tech-stack/nodejs.svg",
    },
    {
      name: "Express",
      height: 64,
      width: 64,
      fillColor: true,
      src: "/images/tech-stack/express.svg",
    },
    {
      name: "NestJS",
      height: 64,
      width: 64,
      src: "/images/tech-stack/nestjs.svg",
    },
    {
      name: "MongoDB",
      height: 64,
      width: 64,
      src: "/images/tech-stack/mongodb.svg",
    },
    {
      name: "PostgreSQL",
      height: 64,
      width: 64,
      src: "/images/tech-stack/postgre.svg",
    },
    {
      name: "Sass",
      height: 64,
      width: 64,
      src: "/images/tech-stack/sass.svg",
    },
    {
      name: "Tailwind CSS",
      height: 64,
      width: 64,
      src: "/images/tech-stack/tailwind.svg",
    },
    {
      name: "Ant Design",
      width: 64,
      height: 64,
      src: "/images/tech-stack/ant-design.svg",
    },
    {
      name: "MUI",
      height: 64,
      width: 64,
      src: "/images/tech-stack/mui.svg",
    },
    {
      name: "Git",
      height: 64,
      width: 64,
      src: "/images/tech-stack/git.svg",
    },
    {
      name: "Docker",
      height: 64,
      width: 64,
      src: "/images/tech-stack/docker.svg",
    },

    {
      name: "Socket.IO",
      height: 64,
      width: 64,
      src: "/images/tech-stack/socket.svg",
    },
  ];
  return (
    <section className="py-20 flex justify-center">
      <div className="max-w-[1080px] w-full">
        <h2 className="text-3xl font-light text-[18px]">TEACH STACK</h2>
        <div>
          <ul className="flex flex-wrap justify-center gap-y-8 mt-12">
            {techStack.map((tech, index) => (
              <TechCard
                key={index}
                name={tech.name}
                width={tech.width}
                height={tech.height}
                src={tech.src}
                fillColor={tech.fillColor}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
