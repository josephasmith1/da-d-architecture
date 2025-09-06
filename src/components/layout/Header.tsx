'use client';

import { useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const menuItems = [
    { label: "PROJECTS", href: "/projects" },
    { label: "ABOUT", href: "/about" },
    { label: "PEOPLE", href: "/people" },
    { label: "FIRE MITIGATION", href: "/fire-mitigation" },
    { label: "FAQ", href: "/faq" },
    { label: "CONTACT", href: "/contact" }
  ];

  return (
    <header className="bg-black z-50 relative">
      <nav className="px-10 py-6 flex items-center justify-between">
        {/* Logo */}
        <NextLink href="/" className="relative z-50">
          <Image
            src="/DAd LOGO copy-03.svg"
            alt="DA+D"
            width={120}
            height={46}
            className="h-9 w-auto"
            priority
          />
        </NextLink>

        {/* Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative z-50 text-white"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Full Screen Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
            >
              <div className="flex flex-col items-center justify-center h-full space-y-8">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <NextLink
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-white text-3xl md:text-4xl font-light tracking-wider hover:text-gray-300 transition-colors duration-200"
                    >
                      {item.label}
                    </NextLink>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}