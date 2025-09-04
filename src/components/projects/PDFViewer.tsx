'use client';

import { useState } from 'react';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { FileText, Download, Maximize2, X } from 'lucide-react';

interface PDFViewerProps {
  src: string;
  title: string;
  className?: string;
}

export function PDFViewer({ src, title, className = "" }: PDFViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Ensure the path starts with /
  const pdfPath = src.startsWith('/') ? src : `/${src}`;
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = title + '.pdf';
    link.click();
  };

  return (
    <>
      {/* Thumbnail/Preview Card */}
      <div className={`relative group cursor-pointer ${className}`}>
        <div 
          onClick={() => setIsOpen(true)}
          className="relative bg-foreground-100 dark:bg-foreground-900 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          {/* PDF Icon and Title */}
          <div className="aspect-[8.5/11] flex flex-col items-center justify-center p-6 bg-gradient-to-br from-foreground-50 to-foreground-100 dark:from-foreground-900 dark:to-foreground-800">
            <FileText className="w-16 h-16 mb-4 text-foreground-400" />
            <h3 className="text-center font-medium text-foreground-700 dark:text-foreground-300">
              {title}
            </h3>
            <p className="text-sm text-foreground-500 mt-2">Click to view</p>
          </div>
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
            <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="mt-3 flex gap-2">
          <Button
            size="sm"
            variant="flat"
            className="flex-1"
            startContent={<Maximize2 className="w-4 h-4" />}
            onPress={() => setIsOpen(true)}
          >
            View
          </Button>
          <Button
            size="sm"
            variant="flat"
            className="flex-1"
            startContent={<Download className="w-4 h-4" />}
            onPress={handleDownload}
          >
            Download
          </Button>
        </div>
      </div>

      {/* Full Screen Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size="5xl"
        scrollBehavior="inside"
        classNames={{
          backdrop: "bg-black/70",
          base: "max-h-[90vh]",
        }}
      >
        <ModalContent>
          <ModalHeader className="flex justify-between items-center">
            <span>{title}</span>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </ModalHeader>
          <ModalBody className="p-0">
            <div className="relative w-full h-[75vh] bg-foreground-50 dark:bg-foreground-900">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              )}
              <iframe
                src={`${pdfPath}#view=FitH`}
                className="w-full h-full"
                title={title}
                onLoad={() => setIsLoading(false)}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="flat"
              onPress={handleDownload}
              startContent={<Download className="w-4 h-4" />}
            >
              Download PDF
            </Button>
            <Button
              color="primary"
              onPress={() => window.open(pdfPath, '_blank')}
              startContent={<Maximize2 className="w-4 h-4" />}
            >
              Open in New Tab
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

// Alternative inline viewer for embedding directly in page
export function PDFViewerInline({ src, title, className = "" }: PDFViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const pdfPath = src.startsWith('/') ? src : `/${src}`;
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = title + '.pdf';
    link.click();
  };

  return (
    <div className={`${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="flat"
            startContent={<Download className="w-4 h-4" />}
            onPress={handleDownload}
          >
            Download
          </Button>
          <Button
            size="sm"
            variant="flat"
            startContent={<Maximize2 className="w-4 h-4" />}
            onPress={() => window.open(pdfPath, '_blank')}
          >
            Full Screen
          </Button>
        </div>
      </div>
      <div className="relative w-full h-[600px] bg-foreground-50 dark:bg-foreground-900 rounded-lg overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}
        <iframe
          src={`${pdfPath}#view=FitH`}
          className="w-full h-full"
          title={title}
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
}