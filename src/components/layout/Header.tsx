'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-4 sm:py-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 sm:gap-4 hover:opacity-80 transition-opacity group">
          <Image src="/logo.svg" alt="QuickMeet Logo" width={40} height={40} className="w-8 h-8 sm:w-10 sm:h-10 group-hover:scale-105 transition-transform duration-200" />
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">QuickMeet</h1>
            <p className="text-xs sm:text-sm text-gray-500 leading-tight">AI-powered meeting agendas</p>
          </div>
        </Link>
        <Link href="/generate" className="rounded-lg bg-gray-900 px-3 py-2 sm:px-4 text-sm sm:text-base text-white hover:bg-gray-800">Generate</Link>
      </div>
    </header>
  );
}
