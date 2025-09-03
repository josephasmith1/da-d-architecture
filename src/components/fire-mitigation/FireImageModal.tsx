'use client';

import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";
import { ResponsiveImage } from "../common/ResponsiveImage";

type FireImageModalProps = {
  image: string;
  alt: string;
  caption: string;
  children: React.ReactNode;
};

export function FireImageModal({ image, alt, caption, children }: FireImageModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        className="cursor-pointer inline-block"
        onClick={() => setIsOpen(true)}
      >
        {children}
      </div>
      
      <Modal 
        isOpen={isOpen} 
        onOpenChange={setIsOpen}
        size="3xl"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">{caption}</ModalHeader>
          <ModalBody>
            <ResponsiveImage
              name={image}
              alt={alt}
              className="w-full h-auto object-contain"
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" variant="light" onPress={() => setIsOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
