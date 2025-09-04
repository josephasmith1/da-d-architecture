'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        An error occurred while loading this page.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-80 transition-opacity"
        >
          Try again
        </button>
        <Link 
          href="/" 
          className="px-6 py-3 border border-black dark:border-white rounded-lg hover:opacity-80 transition-opacity"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}