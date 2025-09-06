'use client';

import { Card, CardBody, Input, Accordion, AccordionItem, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { generateFAQSchema } from "@/lib/structured-data";

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export default function FAQClient({ faqData }: { faqData: FAQItem[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFAQs, setFilteredFAQs] = useState<FAQItem[]>(faqData);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredFAQs(faqData);
    } else {
      const filtered = faqData.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFAQs(filtered);
    }
  }, [searchTerm, faqData]);

  useEffect(() => {
    const faqSchema = generateFAQSchema(
      faqData.map(faq => ({
        question: faq.question,
        answer: faq.answer
      }))
    );
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(faqSchema);
    document.head.appendChild(script);
    
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [faqData]);

  const categories = Array.from(new Set(faqData.map(faq => faq.category)));

return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8
                space-y-6 sm:space-y-8 lg:space-y-12">

      <div className="w-full mx-auto max-w-md sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl">

        <Input
          size="lg"
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          startContent={
            <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          }
        />
        <div className="flex gap-2 mt-4 flex-wrap ">
          {categories.map(category => (
            <Chip
              key={category}
              variant="flat"
              onClick={() => {
                setSearchTerm(category);
              }}
              className="cursor-pointer p-4 text-lg bg-gray-200 hover:bg-gray-300 rounded-lg transform transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md cursor-pointer gap-2"
            >
              {category}
            </Chip>
          ))}
        </div>
      </div>

      {filteredFAQs.length === 0 ? (
        <Card className="w-full mx-auto max-w-md sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
          <CardBody className="text-center py-12 ">
            <p className="text-lg">No FAQs found matching your search.</p>
          </CardBody>
        </Card>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Accordion
            variant="shadow"
            className="mx-auto"
            selectionMode="multiple"
          >
            {filteredFAQs.map((faq) => (
              <AccordionItem
                key={faq.id}
                title={
                  <div className="flex flex-col gap-3 p-4">
                    <span className="text-small text-default-500">{faq.category}</span>
                    <span className="text-2xl">{faq.question}</span>
                  </div>
                }
                textValue={faq.question}
              >
                <div className="pb-4">
                  <p className="text-[#666666] text-lg font-normal leading-relaxed">{faq.answer}</p>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      )}
    </div>
  );
}