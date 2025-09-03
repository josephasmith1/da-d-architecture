'use client';

import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, Button } from "@heroui/react";
import { useState } from "react";
import NextLink from "next/link";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  
  const menuItems = [
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "People", href: "/people" },
    { name: "Fire Mitigation", href: "/fire-mitigation" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <>
      <Button 
        onPress={() => setIsOpen(true)} 
        className="sm:hidden"
        variant="light"
      >
        Menu
      </Button>
      <Drawer isOpen={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader className="flex items-center justify-between">
            <h3 className="font-display text-xl font-semibold">DA+D Inc.</h3>
            <Button onPress={() => setIsOpen(false)} variant="light">✕</Button>
          </DrawerHeader>
          <DrawerBody>
            <div className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <NextLink 
                  key={item.name}
                  href={item.href}
                  className="text-lg py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </NextLink>
              ))}
            </div>
          </DrawerBody>
          <DrawerFooter>
            <ThemeToggle />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

import { ThemeToggle } from "./ThemeToggle";
