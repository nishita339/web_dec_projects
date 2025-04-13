import Link from "next/link";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";
import UserList from "./UserList";

export default async function UserPage() {
  await connectDB();
  const users = await User.find({ visibility: true }); // boolean instead of string

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:text-gray-100 font-sans transition-colors duration-500">
      <div className="container mx-auto p-8 sm:p-12">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-300 tracking-tight animate-pulse">
            Awaiting Your Confirmation <span className="text-xl opacity-60">✉️</span>
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 italic">
            These wonderful people are waiting to join...
          </p>
        </header>

        <div className="flex justify-end mb-6">
          <Link href="/" legacyBehavior>
            <a className="relative inline-flex items-center px-4 py-2 rounded-md bg-indigo-500 dark:bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition duration-300 overflow-hidden">
              <span className="absolute left-0 top-0 w-0 h-0 transition-all duration-500 group-hover:w-full group-hover:h-full bg-indigo-400 dark:bg-indigo-500 opacity-10"></span>
              <span className="relative">Back to Dashboard</span>
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </Link>
        </div>

        {/* ✨ Animated User List */}
        <section className="space-y-6">
          <UserList users={JSON.parse(JSON.stringify(users))} />
        </section>
      </div>
    </div>
  );
}