import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-4xl font-bold mb-8">Welcome</h1>
        <nav className="flex flex-col gap-4">
          <Link href="/login" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Go to Login
          </Link>
          <Link href="/dashboard" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Go to Dashboard
          </Link>
        </nav>
      </main>
    </div>
  );
}
