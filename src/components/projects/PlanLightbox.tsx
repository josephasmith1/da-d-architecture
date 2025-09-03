'use client';

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";
import Image from "next/image";

type ProjectImage = {
  src: string;
  alt: string;
};

export function PlanLightbox({ images }: { images: ProjectImage[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  
  const slides = images.map((image) => ({
    src: `/projects/${image.src}`,
    alt: image.alt,
    width: 1920,
    height: 1080
  }));
  
  const openLightbox = (imageIndex: number) => {
    setIndex(imageIndex);
    setOpen(true);
  };
  
  return (
    <>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={index}
      />
      {images.map((image, i) => (
        <div 
          key={i} 
          className="cursor-pointer mb-6"
          onClick={() => openLightbox(i)}
        >
          <Image
            src={`/projects/${image.src}`}
            alt={image.alt}
            className="object-cover rounded-lg w-full h-auto"
            width={800}
            height={600}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <p className="text-sm mt-2 text-center">{image.alt}</p>
        </div>
      ))}
    </>
  );
}
