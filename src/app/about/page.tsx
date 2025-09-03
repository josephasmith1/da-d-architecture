'use client';

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { Card, CardBody, CardHeader, Chip, Avatar, Button, Spacer } from "@heroui/react";
import { motion } from "framer-motion";
import { Building2, Users, Award, MapPin, GraduationCap, Briefcase, Globe } from "lucide-react";

export default function AboutPage() {
  const services = [
    "Architectural Design",
    "Interior Design", 
    "Space Planning",
    "Sustainable Building Design",
    "Site Analysis and Selection",
    "Construction Administration",
    "Document Checking",
    "Consultant Coordination"
  ];

  const experiences = [
    { company: "HKS Architects", type: "Large Scale Commercial" },
    { company: "Frederic Fisher & Partners", type: "Contemporary Residential" },
    { company: "David Gray Architects", type: "Mixed Use Development" },
    { company: "The Jerde Partnership", type: "International Projects" }
  ];

  const projectTypes = [
    { icon: Building2, title: "Single Family Residences", description: "Custom homes designed for modern living" },
    { icon: Users, title: "Mixed Use Developments", description: "Integrated commercial and residential spaces" },
    { icon: Briefcase, title: "Office Buildings", description: "Innovative workspace solutions" },
    { icon: Award, title: "Affordable Housing", description: "Quality design for all communities" }
  ];

  const globalProjects = ["Shanghai", "Dubai", "Berlin"];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-background/80">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section with Statistics */}
        <Section className="py-24 md:py-32 relative overflow-hidden">
          <motion.div 
            className="text-center max-w-4xl mx-auto relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="flex justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            >
              <Chip 
                startContent={<Building2 size={16} />}
                variant="flat" 
                color="primary"
                size="lg"
                className="px-4 py-2"
              >
                Established 2001
              </Chip>
            </motion.div>
            
            <motion.h1 
              className="font-display text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              DeLoache Architecture & Design
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-foreground-600 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Creating living and working environments for modern life through innovative design 
              and exceptional craftsmanship.
            </motion.p>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">23+</div>
                <div className="text-sm text-foreground-500">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100+</div>
                <div className="text-sm text-foreground-500">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">3</div>
                <div className="text-sm text-foreground-500">Continents</div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-secondary/5 blur-3xl"></div>
          </div>
        </Section>

        {/* Mission & Services */}
        <Section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <Card className="h-full border-0 bg-background/60 backdrop-blur-md shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="font-display text-3xl font-bold">Our Mission</h2>
                  </div>
                </CardHeader>
                <CardBody className="pt-0">
                  <p className="text-foreground-600 text-lg leading-relaxed mb-6">
                    DeLoache Architecture & Design provides clients with a full range of architectural 
                    design and planning services from initial concepts through the final stages of construction.
                  </p>
                  <p className="text-foreground-600 leading-relaxed">
                    Our goal is to produce buildings that seamlessly combine great design and functionality, 
                    creating spaces that not only meet today&apos;s needs but adapt to tomorrow&apos;s possibilities.
                  </p>
                  <Spacer y={4} />
                  <Button color="primary" variant="flat" size="lg" className="w-fit">
                    View Our Projects
                  </Button>
                </CardBody>
              </Card>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <Card className="h-full border-0 bg-background/60 backdrop-blur-md shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <Users className="w-6 h-6 text-secondary" />
                    </div>
                    <h2 className="font-display text-3xl font-bold">Our Services</h2>
                  </div>
                </CardHeader>
                <CardBody className="pt-0">
                  <p className="text-foreground-600 mb-6">
                    Comprehensive services to guide your project from concept to completion:
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {services.map((service, index) => (
                      <motion.div
                        key={service}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                      >
                        <Chip
                          variant="flat"
                          color="default"
                          size="sm"
                          className="w-full justify-start p-3 h-auto"
                        >
                          {service}
                        </Chip>
                      </motion.div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </Section>

        {/* Project Types */}
        <Section>
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="font-display text-4xl font-bold mb-4">Project Expertise</h2>
            <p className="text-foreground-600 text-lg max-w-2xl mx-auto">
              From intimate residential spaces to large-scale commercial developments, 
              we bring expertise across all project types.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {projectTypes.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
              >
                <Card className="border-0 bg-background/60 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardBody className="text-center p-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-primary/10 rounded-full">
                        <project.icon className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-display text-xl font-bold mb-3">{project.title}</h3>
                    <p className="text-foreground-500 text-sm leading-relaxed">{project.description}</p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Scott DeLoache Profile */}
        <Section>
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Card className="border-0 bg-background/60 backdrop-blur-md shadow-xl">
              <CardHeader className="pb-6">
                <div className="flex flex-col md:flex-row items-center gap-6 w-full">
                  <Avatar
                    size="lg"
                    className="w-24 h-24"
                    name="Scott DeLoache"
                    classNames={{
                      base: "bg-primary/10",
                      name: "text-primary font-bold text-lg"
                    }}
                  />
                  <div className="text-center md:text-left flex-1">
                    <h2 className="font-display text-4xl font-bold mb-2">Scott DeLoache, AIA</h2>
                    <p className="text-foreground-600 text-lg mb-4">Principal & Founder</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                      <Chip startContent={<Award size={14} />} color="primary" variant="flat" size="sm">
                        Licensed Architect - California
                      </Chip>
                      <Chip startContent={<Users size={14} />} color="secondary" variant="flat" size="sm">
                        AIA Member
                      </Chip>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardBody className="pt-0">
                <p className="text-foreground-600 text-lg leading-relaxed mb-8">
                  DeLoache Architecture & Design was founded by Principal Scott DeLoache, bringing 
                  a unique global perspective to every project through diverse experience across 
                  residential, commercial, and international developments.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Education */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-success/10 rounded-lg">
                        <GraduationCap className="w-5 h-5 text-success" />
                      </div>
                      <h3 className="font-display text-xl font-bold">Education</h3>
                    </div>
                    <div className="space-y-3">
                      <Card className="border border-success/20 bg-success/5">
                        <CardBody className="p-4">
                          <p className="font-semibold text-sm">Master of Architecture</p>
                          <p className="text-foreground-500 text-sm">University of Florida</p>
                        </CardBody>
                      </Card>
                      <Card className="border border-success/20 bg-success/5">
                        <CardBody className="p-4">
                          <p className="font-semibold text-sm">Bachelor of Architecture</p>
                          <p className="text-foreground-500 text-sm">Texas Tech University</p>
                        </CardBody>
                      </Card>
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-warning/10 rounded-lg">
                        <Briefcase className="w-5 h-5 text-warning" />
                      </div>
                      <h3 className="font-display text-xl font-bold">Experience</h3>
                    </div>
                    <div className="space-y-3">
                      {experiences.map((exp, index) => (
                        <Card key={index} className="border border-warning/20 bg-warning/5">
                          <CardBody className="p-4">
                            <p className="font-semibold text-sm">{exp.company}</p>
                            <p className="text-foreground-500 text-xs">{exp.type}</p>
                          </CardBody>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Global Reach */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-danger/10 rounded-lg">
                        <Globe className="w-5 h-5 text-danger" />
                      </div>
                      <h3 className="font-display text-xl font-bold">Global Reach</h3>
                    </div>
                    <div className="space-y-3">
                      <Card className="border border-danger/20 bg-danger/5">
                        <CardBody className="p-4">
                          <p className="font-semibold text-sm mb-2">International Projects</p>
                          <div className="flex flex-wrap gap-1">
                            {globalProjects.map((location) => (
                              <Chip key={location} size="sm" variant="flat" color="danger">
                                <MapPin size={12} className="mr-1" />
                                {location}
                              </Chip>
                            ))}
                          </div>
                        </CardBody>
                      </Card>
                      <div className="text-foreground-500 text-sm">
                        <p>• Single Family Residences</p>
                        <p>• Mixed Use Developments</p>
                        <p>• Office Buildings</p>
                        <p>• Affordable Housing</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </Section>

        {/* Call to Action */}
        <Section>
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Card className="border-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 backdrop-blur-md shadow-xl">
              <CardBody className="p-12">
                <h2 className="font-display text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
                <p className="text-foreground-600 text-lg mb-8 leading-relaxed">
                  We are committed to creating exceptional architectural solutions that enhance 
                  the way people live and work. Let&apos;s discuss how we can bring your vision to life.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button color="primary" size="lg" className="px-8">
                    Schedule Consultation
                  </Button>
                  <Button variant="bordered" size="lg" className="px-8">
                    View Portfolio
                  </Button>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </Section>
      </main>
      
      <Footer />
    </div>
  );
}
