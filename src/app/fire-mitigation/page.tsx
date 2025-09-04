'use client';

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Card, CardBody, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { FireImageModal } from "@/components/fire-mitigation/FireImageModal";
import { ResponsiveImage } from "@/components/common/ResponsiveImage";
import Image from "next/image";
import { Shield, Home, Droplets, Trees } from "lucide-react";

export default function FireMitigationPage() {
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
              Fire Mitigation
            </motion.h1>
            <motion.p 
              className="text-xl text-foreground-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Specialized architectural solutions for fire-prone environments.
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
                  <h2 className="font-display text-2xl font-bold mb-4">Fire-Resistant Design</h2>
                  <p className="text-foreground-500 mb-4">
                    Our fire mitigation approach integrates fire-resistant materials, strategic 
                    landscaping, and building design elements to minimize risk in wildfire-prone 
                    areas. We work closely with local fire departments and environmental experts 
                    to ensure compliance with all safety regulations.
                  </p>
                  <p className="text-foreground-500">
                    We specify Class A fire-rated roofing materials, ember-resistant vents, 
                    and non-combustible siding options. All designs incorporate the latest 
                    fire safety technologies and building codes specific to high-risk zones.
                  </p>
                  <div className="mt-6">
                    <FireImageModal 
                      image="bel-air/Bel Air 1"
                      alt="Fire-resistant roofing materials"
                      caption="Class A fire-rated roofing materials installation"
                    >
                      <ResponsiveImage
                        name="bel-air/Bel Air 1"
                        alt="Fire-resistant roofing materials"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <p className="text-sm mt-2 text-foreground-500">Fire-resistant roofing materials example</p>
                    </FireImageModal>
                  </div>
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
                  <h2 className="font-display text-2xl font-bold mb-4">Defensible Space</h2>
                  <p className="text-foreground-500 mb-4">
                    We design homes with defensible space principles, creating buffer zones 
                    around structures using fire-resistant plants and materials. Our landscape 
                    architects specialize in xeriscaping solutions that reduce fire risk while 
                    maintaining aesthetic appeal.
                  </p>
                  <p className="text-foreground-500">
                    Our defensible space strategies include plant selection, hardscaping elements, 
                    and water features that contribute to fire safety.
                  </p>
                  <div className="mt-6">
                    <FireImageModal 
                      image="bel-air/Bel Air Living 1"
                      alt="Defensible space landscaping"
                      caption="Fire-resistant landscaping with defensible space"
                    >
                      <ResponsiveImage
                        name="bel-air/Bel Air Living 1"
                        alt="Defensible space landscaping"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <p className="text-sm mt-2 text-foreground-500">Defensible space landscaping example</p>
                    </FireImageModal>
                  </div>
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
                  <h2 className="font-display text-2xl font-bold mb-4">Building Materials</h2>
                  <p className="text-foreground-500 max-w-3xl">
                    We specify materials that meet or exceed California&#39;s WUI building codes, 
                    including fire-resistant siding, windows, and decking materials.
                  </p>
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <FireImageModal 
                      image="bel-air/Bel Air 2"
                      alt="Fire-resistant siding options"
                      caption="Non-combustible siding materials selection"
                    >
                      <ResponsiveImage
                        name="bel-air/Bel Air 2"
                        alt="Fire-resistant siding options"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <p className="text-sm mt-2 text-foreground-500">Siding materials</p>
                    </FireImageModal>
                    <FireImageModal 
                      image="bel-air/Bel Air 3"
                      alt="Ember-resistant vents"
                      caption="Ember-resistant ventilation systems"
                    >
                      <ResponsiveImage
                        name="bel-air/Bel Air 3"
                        alt="Ember-resistant vents"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <p className="text-sm mt-2 text-foreground-500">Ventilation systems</p>
                    </FireImageModal>
                    <FireImageModal 
                      image="bel-air/Bel Air Bed 1"
                      alt="Fire-resistant decking"
                      caption="Non-combustible decking materials"
                    >
                      <ResponsiveImage
                        name="bel-air/Bel Air Bed 1"
                        alt="Fire-resistant decking"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <p className="text-sm mt-2 text-foreground-500">Decking options</p>
                    </FireImageModal>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </motion.div>
        </Section>

        {/* Malibu Oceanfront Rebuild Case Study */}
        <Section className="py-16 bg-foreground-50 dark:bg-foreground-100">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-center">Case Study: Malibu Oceanfront Rebuild</h2>
            <p className="text-center text-foreground-500 mb-12 max-w-3xl mx-auto">
              A comprehensive wildfire resilience project demonstrating our advanced mitigation strategies
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                <Card className="border-0 bg-background/60 backdrop-blur-md h-full">
                  <CardBody>
                    <h3 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
                      <Home className="w-6 h-6" />
                      Project Overview
                    </h3>
                    <div className="space-y-3 text-foreground-500">
                      <p><strong>Size:</strong> 2,546 square feet</p>
                      <p><strong>Configuration:</strong> 3 Bedroom / 3.5 Bath</p>
                      <p><strong>Features:</strong></p>
                      <ul className="list-disc list-inside ml-4 space-y-2">
                        <li>Open floor plan maximizing ocean views</li>
                        <li>Master suite with private terrace</li>
                        <li>Media Room</li>
                        <li>Outdoor Patio with Pool</li>
                        <li>Fire-hardened structure with defensive landscape</li>
                        <li>Beach access landscape terrace</li>
                      </ul>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                <Card className="border-0 bg-background/60 backdrop-blur-md h-full">
                  <CardBody>
                    <h3 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
                      <Shield className="w-6 h-6" />
                      The Challenge
                    </h3>
                    <p className="text-foreground-500 mb-4">
                      The 2025 wildfire devastated the previous home, destroying it down to its concrete foundation. 
                      After a thorough assessment with the homeowner&apos;s insurance company, rebuilding was determined 
                      to be the best course of action.
                    </p>
                    <p className="text-foreground-500 mb-4">
                      The existing raised concrete platform and foundation caissons were carefully examined by 
                      DA+D Inc&apos;s structural engineers and city inspectors, and found to be structurally sound 
                      for reuse.
                    </p>
                    <p className="text-foreground-500">
                      <strong>Achievement:</strong> The home received a Wildfire Prepared Home Designation 
                      certificate from the Insurance Institute for Business & Home Safety (IBHS), resulting 
                      in significant annual premium savings.
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.5 }}
              >
                <Card className="border-0 bg-background/60 backdrop-blur-md h-full">
                  <CardBody>
                    <h3 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
                      <Droplets className="w-6 h-6" />
                      Wildfire Mitigation Measures
                    </h3>
                    <ul className="space-y-3 text-foreground-500">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Non-flammable CMU block wall construction with fire-retardant U-Stucco finish</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>No projections or eaves in side yards to prevent ember collection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Ember-resistant grilles on all perimeter wall and rooftop vents</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Gravel bed rooftop to reduce flammable materials and dissipate heat</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Exterior sprinkler system powered by on-site pool water pump generator</span>
                      </li>
                    </ul>
                  </CardBody>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7, duration: 0.5 }}
              >
                <Card className="border-0 bg-background/60 backdrop-blur-md h-full">
                  <CardBody>
                    <h3 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
                      <Trees className="w-6 h-6" />
                      Defensive Landscape Measures
                    </h3>
                    <ul className="space-y-3 text-foreground-500">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Zone 0 non-combustible ground cover surrounding the home</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Low-lying, drought-resistant plants in gravel beds requiring minimal irrigation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Increased building setbacks to reduce radiant heat ignition risk</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Community contribution: Redesigned public coastal access route at no cost</span>
                      </li>
                    </ul>
                  </CardBody>
                </Card>
              </motion.div>
            </div>

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            >
              <Image
                src="/projects/malibu-oceanfront-rebuild/ariel.png"
                alt="Malibu Oceanfront Rebuild aerial view"
                width={1200}
                height={800}
                className="rounded-lg shadow-xl mx-auto"
              />
              <p className="mt-4 text-foreground-500">Aerial view of the Malibu Oceanfront Rebuild project</p>
            </motion.div>

            <motion.div
              className="mt-12 p-6 bg-primary/10 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9, duration: 0.5 }}
            >
              <p className="text-center text-lg font-medium">
                By combining advanced construction techniques, thoughtful design choices, and proactive 
                community involvement, this Malibu oceanfront rebuild offers lasting safety, comfort, 
                and beauty for both the homeowner and the wider neighborhood.
              </p>
            </motion.div>
          </motion.div>
        </Section>
        
        <Section className="py-16">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <h2 className="font-display text-3xl font-bold mb-6">Ready to Protect Your Property?</h2>
            <p className="text-foreground-500 mb-8">
              Contact us today to schedule a fire mitigation assessment for your property.
            </p>
            <Button 
              color="primary" 
              size="lg"
              className="font-medium"
              onPress={() => window.location.href = '/contact'}
            >
              Request Assessment
            </Button>
          </motion.div>
        </Section>
      </main>
      
      <Footer />
    </div>
  );
}
