import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-4">Page Not Found</h2>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        The page you are looking for doesn&apos;t exist.
      </p>
      <Link 
        href="/" 
        className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-80 transition-opacity"
      >
        Go Home
      </Link>
    </div>
  );
}