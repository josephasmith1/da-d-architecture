'use client';

import { Switch, cn } from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  if (!mounted) {
    return null;
  }

  return (
    <Switch
      isSelected={theme === 'dark'}
      onValueChange={handleToggle}
      size="sm"
      classNames={{
        base: cn(
          "inline-flex flex-row-reverse w-full max-w-md items-center",
          "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
          "bg-content1 hover:bg-content2"
        ),
        wrapper: "ml-0"
      }}
    >
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-foreground">
          {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
        </span>
      </div>
    </Switch>
  );
}
