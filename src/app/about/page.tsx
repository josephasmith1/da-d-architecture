'use client';

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Card, CardBody, Divider } from "@heroui/react";
import { motion } from "framer-motion";

export default function AboutPage() {
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
              About DA+D
            </motion.h1>
            <motion.p 
              className="text-xl text-foreground-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Since 2001, DeLoache Architecture & Design has been transforming visions into
              exceptional spaces where people live, work, and thrive.
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
                  <h2 className="font-display text-2xl font-bold mb-4">Designing Spaces for Modern Life</h2>
                  <p className="text-foreground-500 mb-4">
                    We believe great architecture does more than shelter—it inspires, functions beautifully, and enhances daily life. Our approach balances innovative design with practical functionality, creating buildings that are both striking and livable.
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
                  <h2 className="font-display text-2xl font-bold mb-4">Our Expertise</h2>
                  <p className="text-foreground-500 mb-3">
                    We offer comprehensive architectural services that guide your project from initial concept to final construction:
                  </p>
                  <ul className="text-foreground-500 space-y-1 text-sm">
                    <li>• Architectural & Interior Design</li>
                    <li>• Space Planning</li>
                    <li>• Sustainable Design</li>
                    <li>• Site Analysis & Selection</li>
                    <li>• Construction Administration</li>
                    <li>• Consultant Coordination</li>
                  </ul>
                </CardBody>
              </Card>
            </motion.div>

            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <Card className="border-0 bg-background/60 backdrop-blur-md">
                <CardBody>
                  <h2 className="font-display text-2xl font-bold mb-4">Meet Scott DeLoache, AIA</h2>
                  <p className="text-foreground-500 mb-4">
                    Principal architect Scott DeLoache brings a unique global perspective to every project. Licensed in California and a member of the American Institute of Architects, Scott&apos;s diverse portfolio spans continents and building types.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div>
                      <h3 className="font-semibold mb-2">Education</h3>
                      <ul className="text-foreground-500 text-sm space-y-1">
                        <li>Master of Architecture<br />University of Florida</li>
                        <li>Bachelor of Architecture<br />Texas Tech University</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Professional Journey</h3>
                      <ul className="text-foreground-500 text-sm space-y-1">
                        <li>HKS Architects</li>
                        <li>Frederic Fisher & Partners</li>
                        <li>David Gray Architects</li>
                        <li>The Jerde Partnership</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Global Experience</h3>
                      <ul className="text-foreground-500 text-sm space-y-1">
                        <li>Custom residential homes</li>
                        <li>Mixed-use developments</li>
                        <li>Commercial office buildings</li>
                        <li>Affordable housing communities</li>
                        <li>International projects in Shanghai, Dubai, and Berlin</li>
                      </ul>
                    </div>
                  </div>

                  <p className="text-foreground-500 mt-4">
                    This breadth of experience—from intimate residences to complex urban developments—informs our holistic approach to design. We bring world-class expertise to every project, whether it&apos;s a home renovation or a ground-up commercial development.
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          </motion.div>
        </Section>

        <Section>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <Card className="border-0 bg-background/60 backdrop-blur-md max-w-3xl mx-auto">
              <CardBody>
                <h2 className="font-display text-2xl font-bold mb-4">Our Philosophy</h2>
                <p className="text-foreground-500 mb-4">
                  We believe the best architecture emerges from listening closely to our clients and responding thoughtfully to each site&apos;s unique context. Every project is an opportunity to create something meaningful—spaces that not only meet today&apos;s needs but adapt gracefully to tomorrow&apos;s possibilities.
                </p>

                <Divider className="my-6" />

                <p className="text-foreground-500 italic text-center">
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
