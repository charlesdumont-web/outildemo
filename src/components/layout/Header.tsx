"use client";

import { Bell, Search, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial preference
    if (document.documentElement.classList.contains("dark")) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  };

  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center bg-muted rounded-md px-3 py-1.5 w-96 border border-border/50 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
        <Search size={18} className="text-muted-foreground mr-2" />
        <input 
          type="text" 
          placeholder="Rechercher des modules, BC ou prospects..." 
          className="bg-transparent border-none outline-none w-full text-sm text-foreground placeholder:text-muted-foreground"
        />
        <div className="flex items-center gap-1 ml-2">
          <kbd className="text-[10px] bg-background border border-border rounded px-1.5 py-0.5 text-muted-foreground font-mono">⌘</kbd>
          <kbd className="text-[10px] bg-background border border-border rounded px-1.5 py-0.5 text-muted-foreground font-mono">K</kbd>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 mr-4 text-sm font-medium text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          Système opérationnel
        </div>
        
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-card"></span>
        </button>
      </div>
    </header>
  );
}
