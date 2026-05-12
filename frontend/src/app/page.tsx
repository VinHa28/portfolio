import HeroSection from "@/components/sections/HeroSection";
import TechStackSection from "@/components/sections/TechStackSection";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />

      <TechStackSection />
      <section className="py-20">
        <h2 className="text-3xl font-semibold">Experience</h2>
      </section>

      <section className="py-20">
        <h2 className="text-3xl font-semibold">Projects</h2>
      </section>
    </main>
  );
}
