'use client';

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Card, CardBody, Input, Accordion, AccordionItem, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import faqData from "@/content/faq.json";

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export default function FAQPage() {
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
  }, [searchTerm]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <Section className="pt-8 pb-12 md:pt-12 md:pb-16">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              className="font-display text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Frequently Asked Questions
            </motion.h1>
            <motion.p
              className="text-xl text-foreground-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Answers to common questions about our services and process.
            </motion.p>
          </motion.div>
        </Section>

        <Section>
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Card className="border-0 bg-background/60 backdrop-blur-md mb-8">
              <CardBody>
                <Input
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onValueChange={setSearchTerm}
                  size="lg"
                  classNames={{
                    inputWrapper: "bg-background/50"
                  }}
                />
              </CardBody>
            </Card>
            
            {filteredFAQs.length === 0 ? (
              <Card className="border-0 bg-background/60 backdrop-blur-md">
                <CardBody className="text-center py-12">
                  <p className="text-foreground-500 text-lg">No FAQs found matching your search.</p>
                </CardBody>
              </Card>
            ) : (
              <Accordion 
                variant="splitted"
                selectionMode="multiple"
                className="px-0"
                itemClasses={{
                  base: "border-0 bg-background/60 backdrop-blur-md mb-4 shadow-sm",
                  title: "font-display text-lg font-semibold",
                  trigger: "px-6 py-4 data-[hover=true]:bg-background/80",
                  content: "px-6 pb-6 pt-0",
                  indicator: "text-foreground-500"
                }}
              >
                {filteredFAQs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    title={
                      <div className="flex items-center justify-between w-full">
                        <span>{faq.question}</span>
                        <Chip 
                          size="sm" 
                          variant="flat" 
                          color="primary"
                          className="ml-4"
                        >
                          {faq.category}
                        </Chip>
                      </div>
                    }
                  >
                    <div className="text-foreground-700 leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
            
            <Card className="border-0 bg-primary/10 backdrop-blur-md mt-8">
              <CardBody className="text-center py-8">
                <p className="text-lg font-medium text-primary">
                  Ready to discuss your project?
                </p>
                <p className="text-foreground-700 mt-2">
                  Contact us to schedule a consultation and bring your architectural vision to life.
                </p>
              </CardBody>
            </Card>
          </motion.div>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
