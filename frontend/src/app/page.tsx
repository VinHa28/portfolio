export default function Home() {
  return (
    <main className="flex-1">
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
        </div>

        <div></div>
      </section>

      <section className="py-20">
        <h2 className="text-3xl font-semibold">About Me</h2>
      </section>

      <section className="py-20">
        <h2 className="text-3xl font-semibold">Projects</h2>
      </section>
    </main>
  );
}
