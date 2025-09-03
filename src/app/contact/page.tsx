'use client';

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/forms/ContactForm";
import { Card, CardBody } from "@heroui/react";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Section className="pt-8 pb-12 md:pt-12 md:pb-16">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
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
              Contact Us
            </motion.h1>
            <motion.p 
              className="text-xl text-foreground-500 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Ready to bring your architectural vision to life? Get in touch with our team to discuss your project needs.
            </motion.p>
          </motion.div>
        </Section>
        
        <Section className="pb-8">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Card className="border-0 bg-background/60 backdrop-blur-md h-full">
                <CardBody className="text-center">
                  <h3 className="font-display text-lg font-bold mb-3">Studio Location</h3>
                  <p className="text-foreground-500 text-sm">
                    123 Architecture Way<br />
                    Los Angeles, CA 90210<br />
                    United States
                  </p>
                </CardBody>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Card className="border-0 bg-background/60 backdrop-blur-md h-full">
                <CardBody className="text-center">
                  <h3 className="font-display text-lg font-bold mb-3">Business Hours</h3>
                  <p className="text-foreground-500 text-sm">
                    Monday - Friday: 9am - 6pm<br />
                    Saturday: 10am - 4pm<br />
                    Sunday: Closed
                  </p>
                </CardBody>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <Card className="border-0 bg-background/60 backdrop-blur-md h-full">
                <CardBody className="text-center">
                  <h3 className="font-display text-lg font-bold mb-3">Get in Touch</h3>
                  <p className="text-foreground-500 text-sm">
                    Phone: (310) 555-0123<br />
                    Email: info@dadinc.com<br />
                    Quick response guaranteed
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          </motion.div>
        </Section>
        
        <Section>
          <motion.div 
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <Card className="border-0 bg-background/60 backdrop-blur-md">
                <CardBody className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="font-display text-3xl font-bold mb-4">Start Your Project</h2>
                    <p className="text-foreground-600 max-w-2xl mx-auto">
                      Tell us about your project and we&apos;ll get back to you within 24-48 hours with next steps and a consultation proposal.
                    </p>
                  </div>
                  <ContactForm />
                </CardBody>
              </Card>
            </motion.div>
          </motion.div>
        </Section>
      </main>
      
      <Footer />
    </div>
  );
}
