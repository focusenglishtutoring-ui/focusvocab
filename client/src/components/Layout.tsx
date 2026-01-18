import React from 'react';
import { Link } from 'wouter';
import { BookOpen } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight">FocusVocab</span>
          </Link>
          <nav>
            {/* Nav items could go here */}
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-3xl mx-auto w-full">
          {children}
        </div>
      </main>

      <footer className="border-t border-border py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} FocusVocab. Keep learning.</p>
        </div>
      </footer>
    </div>
  );
}
