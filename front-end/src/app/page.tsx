import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-3xl font-bold">Light / Dark Mode</h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        Theme
      </p>
        <ThemeToggle />
    </main>
  );
}
