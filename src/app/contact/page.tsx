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
              Contact Us
            </motion.h1>
            <motion.p 
              className="text-xl text-foreground-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Get in touch with our team to discuss your project needs.
            </motion.p>
          </motion.div>
        </Section>
        
        <Section>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Card className="border-0 bg-background/60 backdrop-blur-md">
                <CardBody>
                  <h2 className="font-display text-2xl font-bold mb-4">Studio Location</h2>
                  <p className="text-foreground-500 mb-2">123 Architecture Way</p>
                  <p className="text-foreground-500 mb-2">Los Angeles, CA 90210</p>
                  <p className="text-foreground-500 mb-4">United States</p>
                  <p className="text-foreground-500">
                    We&apos;re available for consultations Monday through Friday, 9am to 6pm PST.
                  </p>
                </CardBody>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              <Card className="border-0 bg-background/60 backdrop-blur-md">
                <CardBody>
                  <h2 className="font-display text-2xl font-bold mb-4">Business Hours</h2>
                  <p className="text-foreground-500">
                    Monday - Friday: 9am - 6pm<br />
                    Saturday: 10am - 4pm<br />
                    Sunday: Closed
                  </p>
                  <p className="text-foreground-500">
                    Phone: (310) 555-0123<br />
                    Email: info@dadinc.com
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          </motion.div>
        </Section>
        
        <Section>
          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            >
              <Card className="border-0 bg-background/60 backdrop-blur-md">
                <CardBody>
                  <h2 className="font-display text-2xl font-bold mb-4">Get in Touch</h2>
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
