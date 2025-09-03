'use client';

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Card, CardBody, Divider, Input } from "@heroui/react";
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
        <Section className="py-24 md:py-32">
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Card className="border-0 bg-background/60 backdrop-blur-md max-w-3xl mx-auto">
              <CardBody className="space-y-4">
                <Input
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onValueChange={setSearchTerm}
                  className="mb-6"
                />
                
                {filteredFAQs.length === 0 ? (
                  <p className="text-center text-foreground-500">No FAQs found matching your search.</p>
                ) : (
                  <div className="space-y-4">
                    {filteredFAQs.map((faq) => (
                      <div key={faq.id} className="space-y-2">
                        <h3 className="font-display text-xl font-semibold">{faq.question}</h3>
                        <p>{faq.answer}</p>
                        <Divider className="my-4" />
                      </div>
                    ))}
                  </div>
                )}
                
                <p className="italic">
                  Ready to discuss your project? Contact us to schedule a consultation.
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
