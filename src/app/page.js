import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen font-sans bg-white dark:bg-black text-black dark:text-white transition-colors flex flex-col">
      {/* Navbar (Placed at the top) */}
      <nav className="w-full py-4 px-6 sm:px-20 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <Image
            className="dark:invert"
            src="/logo.svg" // Ensure you have this logo in your public directory
            alt="Greetify logo"
            width={40}
            height={40}
            priority
          />
          <span className="text-xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
            Greetify
          </span>
        </div>
        <ul className="flex gap-6 text-sm font-mono">
          <li>
            <Link href="/" className="hover:underline underline-offset-4 transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/feature" className="hover:underline underline-offset-4 transition">
              Features
            </Link>
          </li>
          <li>
            <Link href="/pricing" className="hover:underline underline-offset-4 transition">
              Pricing
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:underline underline-offset-4 transition">
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content (Takes the remaining height) */}
      <main className="flex flex-col items-center justify-center gap-6 text-center py-8 sm:py-20 px-6 sm:px-20 flex-grow">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
          Welcome to <span className="text-blue-600 dark:text-blue-400">Greetify</span>
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl">
          Automate your greetings with scheduled emails! Whether it’s a birthday, holiday, or just a kind message — Greetify has you covered.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/admin"
            className="rounded-full bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white hover:bg-gray-900 dark:hover:bg-gray-200 transition px-6 py-2 text-sm sm:text-base font-semibold"
          >
            Admin
          </Link>
          <Link
            href="/user"
            className="rounded-full bg-blue-600 text-white hover:bg-blue-700 transition px-6 py-2 text-sm sm:text-base font-semibold"
          >
            User
          </Link>
        </div>
      </main>

      {/* Footer (Placed at the bottom) */}
      <footer className="w-full py-3 px-6 sm:px-20 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        <a
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:underline underline-offset-4"
        >
          <Image
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
            className="dark:invert"
          />
          Built with Next.js
        </a>
      </footer>
    </div>
  );
}
