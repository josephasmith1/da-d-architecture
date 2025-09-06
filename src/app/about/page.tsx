"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import StatItem from "@/components/common/AboutComponents";
import Image from "next/image";
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Avatar,
  Button,
  Spacer,
} from "@heroui/react";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  Award,
  MapPin,
  GraduationCap,
  Briefcase,
  Globe,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const services = [
    "Architectural Design",
    "Interior Design",
    "Space Planning",
    "Sustainable Building Design",
    "Site Analysis and Selection",
    "Construction Administration",
    "Document Checking",
    "Consultant Coordination",
  ];

  const experiences = [
    { company: "HKS Architects", type: "Large Scale Commercial" },
    { company: "Frederic Fisher & Partners", type: "Contemporary Residential" },
    { company: "David Gray Architects", type: "Mixed Use Development" },
    { company: "The Jerde Partnership", type: "International Projects" },
  ];

  const projectTypes = [
    {
      icon: Building2,
      title: "Single Family Residences",
      description: "Custom homes designed for modern living",
    },
    {
      icon: Users,
      title: "Mixed Use Developments",
      description: "Integrated commercial and residential spaces",
    },
    {
      icon: Briefcase,
      title: "Office Buildings",
      description: "Innovative workspace solutions",
    },
    {
      icon: Award,
      title: "Affordable Housing",
      description: "Quality design for all communities",
    },
  ];

  const globalProjects = ["Shanghai", "Dubai", "Berlin"];

  const fadeIn = (delay = 0) => ({
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { delay } },
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-background/80">
      <Header />

      <main className=" w-full ">
        {/* Hero Section with Statistics */}
        <Section className="relative overflow-hidden bg-[#F8F8F7] m-2">
          <motion.div
            className="flex flex-col text-center max-w-8xl mx-auto relative z-10 gap-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="flex justify-center mb-5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            >
              <Chip
                startContent={<Building2 size={30} />}
                variant="flat"
                color="primary"
                size="lg"
                className="px-4 py-2 mt-8 gap-3"
              >
                <span className="text-2xl font-bold ">
                  {" "}
                  Established 2001
                </span>
              </Chip>
            </motion.div>

            <motion.h1
              className="font-display text-4xl md:text-7xl font-bold mb-6 text-black"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              DeLoache Architecture <span className="text-[#91836B]">&</span>{" "}
              Design
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-foreground-600 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Creating living and working environments for modern life through
              innovative design and exceptional craftsmanship.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={fadeIn(0.8)}
              initial="hidden"
              animate="show"
              className="mt-12 grid grid-cols-3 gap-10 md:gap-20 mx-auto"
            >
              <StatItem value="23+" label="Years Experience" />
              <StatItem value="100" label="Projects Completed" />
              <StatItem value="3" label="Continents" />
            </motion.div>
          </motion.div>

          {/* Mission Updated by Raees */}
          <motion.section
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-8xl px-6 py-24"
          >
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <motion.div>
                <Image
                  src="/projects/beach-house/living-room-interior.jpg"
                  alt="Living room interior"
                  width={600}
                  height={600}
                  className="rounded-lg shadow-lg"
                />
              </motion.div>
              <motion.div variants={fadeIn(0.2)}>
                <Building2 className="w-6 h-6 text-primary my-4" />
                <h2 className="text-3xl md:text-4xl font-serif mb-6">
                  Our Mission
                </h2>
                <p className=" text-xl text-[#666666] leading-relaxed mb-4">
                  DeLoache Architecture & Design provides clients with a full
                  range of architectural design and planning services from
                  initial concepts through the final stages of construction.
                </p>
                <p className="text-xl text-[#666666] leading-relaxed">
                  Our goal is to produce buildings that seamlessly combine great
                  design and functionality, creating spaces that not only meet
                  today's needs but adapt to tomorrow's possibilities.
                </p>
                <Link href="/projects">
                <Button className="w-fit my-5 text-lg bg-black text-[#91836B] hover:bg-gray-800">
                  View Our Projects
                </Button>
                </Link>
              </motion.div>
            </div>
          </motion.section>
        </Section>
        {/* Services Updated by Raees*/}
        <motion.section
           initial={{ opacity: 0, x: 50 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.4, duration: 0.8 }}
  viewport={{ once: true, amount: 0.3 }}
          className="bg-white py-24 max-w-8xl"
        >
          <div className="container mx-auto px-6">
            <motion.h2
              variants={fadeIn()}
              className="text-3xl md:text-5xl font-serif text-center mb-18"
            >
              Our Services
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 max-w-5xl mx-auto">
              {[
                "Architectural Design",
                "Interior Design",
                "Space Planning",
                "Sustainable Building Design",
                "Site Analysis and Selection",
                "Construction Administration",
                "Document Checking",
                "Consultant Coordination",
              ].map((service, i) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex items-center gap-2 p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transform transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md cursor-pointer">
                    <div className="w-px h-6 bg-gray-300 mt-1"></div>
                    <div>
                      <h3 className="font-semibold text-lg md:text-xl text-gray-700">
                        {service}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
        {/* Services
        <Section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Mission 
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
                    <h2 className="font-display text-3xl font-bold">
                      Our Mission
                    </h2>
                  </div>
                </CardHeader>
                <CardBody className="pt-0">
                  <p className="text-foreground-600 text-lg leading-relaxed mb-6">
                    DeLoache Architecture & Design provides clients with a full
                    range of architectural design and planning services from
                    initial concepts through the final stages of construction.
                  </p>
                  <p className="text-foreground-600 leading-relaxed">
                    Our goal is to produce buildings that seamlessly combine
                    great design and functionality, creating spaces that not
                    only meet today&apos;s needs but adapt to tomorrow&apos;s
                    possibilities.
                  </p>
                  <Spacer y={4} />
                  <Button
                    color="primary"
                    variant="flat"
                    size="lg"
                    className="w-fit"
                  >
                    View Our Projects
                  </Button>
                </CardBody>
              </Card>
            </motion.div>

            {/* Services 
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
                    <h2 className="font-display text-3xl font-bold">
                      Our Services
                    </h2>
                  </div>
                </CardHeader>
                <CardBody className="pt-0">
                  <p className="text-foreground-600 mb-6">
                    Comprehensive services to guide your project from concept to
                    completion:
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
        */}
        {/* Project Types Updated by Raees*/}
        <section className="py-24 md:py-24 relative overflow-hidden bg-[#F8F8F7] m-5">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 , x:-50}}
            whileInView={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.4, duration: 0.8 }}
  viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2
              variants={fadeIn()}
              className="text-3xl md:text-4xl font-serif text-center mb-4"
            >
              Project Expertise
            </motion.h2>
            <motion.p
              variants={fadeIn(0.2)}
              className="text-[#666666] text-center max-w-2xl mx-auto mb-12"
            >
              From intimate residential spaces to large-scale commercial
              developments, we bring expertise across all project types.
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {projectTypes.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                  className="h-full max-w-8xl" // ensures motion.div stretches full height
                >
                  <Card className="border-0 bg-white backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col m-5 md:h-full lg:h-full items-center justify-center">
                    <CardBody className="text-center p-6 flex flex-col justify-between h-full items-center">
                      <div>
                        <div className="flex justify-center mb-4">
                          <div className="p-4 bg-primary/10 rounded-full">
                            <project.icon className="w-8 h-8 text-primary" />
                          </div>
                        </div>
                        <h3 className="font-display text-xl font-bold mb-3">
                          {project.title}
                        </h3>
                        <p className="text-foreground-500 text-sm leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
        {/* Project Types 
        <Section>
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="font-display text-4xl font-bold mb-4">
              Project Expertise
            </h2>
            <p className="text-foreground-600 text-lg max-w-2xl mx-auto">
              From intimate residential spaces to large-scale commercial
              developments, we bring expertise across all project types.
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
                    <h3 className="font-display text-xl font-bold mb-3">
                      {project.title}
                    </h3>
                    <p className="text-foreground-500 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>*/}
        {/* Scott DeLoache Profile - Updated by Raees*/}
        <Section className="bg-white">
          <motion.div
            className="max-w-7xl mx-auto py-10"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.4, duration: 0.8 }}
  viewport={{ once: true, amount: 0.3 }}
          >
            <div className="container mx-auto px-6">
              <div className="grid md:grid-cols-3 gap-18">
                {/* Profile */}
                <div className="md:col-span-1">
                  <div className="w-24 h-24 bg-[#E5E5E3] rounded-full mb-6 flex items-center justify-center">
                    <span className="text-4xl font-serif text-[#A3A3A3]">
                      SD
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif mb-2">
                    Scott DeLoache,{" "}
                    <span className="text-[#A3A3A3]">AIA Member</span>
                  </h2>
                  <p className="font-semibold text-sm uppercase tracking-widest text-[#666666] mb-4">
                    Principal & Founder
                  </p>
                  <p className="text-[#666666] leading-relaxed text-md">
                    DeLoache Architecture & Design, bringing a unique
                    global perspective to every project through diverse
                    experience across residential, commercial, and international
                    developments.
                  </p>
                </div>

                {/* Right section: Experience, Education, Global Reach */}
                <div className="md:col-span-2 grid sm:grid-cols-3 gap-8">
                  {/* Experience */}
                  <div>
                    <h3 className="group relative font-serif font-extrabold text-xl md:text-2xl text-gray-900 uppercase tracking-widest mb-6 flex items-center">
                      <Briefcase className="w-6 h-6 mr-3 text-primary transform transition-transform duration-300 group-hover:rotate-12" />
                      Experience
                      <span className="absolute -bottom-2 left-0 w-25 h-1 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500 group-hover:w-30"></span>
                    </h3>

                    {experiences.map((exp) => (
                      <div key={exp.company} className="mb-6 md:text-xl text-lg">
                        <h4 className="font-semibold">{exp.company}</h4>
                        <p className="text-[#666666] text-sm">{exp.type}</p>
                      </div>
                    ))}
                  </div>

                  {/* Education */}
                  <div>
                    <h3 className="group relative font-serif font-extrabold text-xl md:text-2xl text-gray-900 uppercase tracking-widest mb-6 flex items-center">
                      <Award className="w-6 h-6 mr-3 text-primary transform transition-transform duration-300 group-hover:rotate-12" />
                      Education
                      <span className="absolute -bottom-2 left-0 w-25 h-1 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500 group-hover:w-30"></span>
                    </h3>
                    <div className="mb-6">
                    <div className="mb-4">
                      <h4 className="font-semibold md:text-xl text-lg">Master of Architecture</h4>
                      <p className="text-[#666666] text-sm">
                        University of Kanto
                      </p>
                    </div>
                    <div className="mb-4">
                      <h4 className="font-semibold md:text-xl text-lg">
                        Bachelor of Architecture
                      </h4>
                      <p className="text-[#666666] text-sm">
                        Texas Tech University
                      </p>
                    </div>
                    </div>
                  </div>

                  {/* Global Reach */}
                  <div>
                    <h3 className="group relative font-serif font-extrabold text-xl md:text-2xl text-gray-900 uppercase tracking-widest mb-6 flex items-center">
                      <Globe className="w-6 h-6 mr-3 text-primary transform transition-transform duration-300 group-hover:rotate-12" />
                      Global Reach
                      <span className="absolute -bottom-2 left-0 w-25 h-1 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500 group-hover:w-30"></span>
                    </h3>
                    {globalProjects.map((location) => (
                      <div key={location} className="mb-4 md:text-xl text-lg">
                        <p className="text-[#666666]">{location}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </Section>
        {/* Scott DeLoache Profile 
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
                      name: "text-primary font-bold text-lg",
                    }}
                  />
                  <div className="text-center md:text-left flex-1">
                    <h2 className="font-display text-4xl font-bold mb-2">
                      Scott DeLoache, AIA
                    </h2>
                    <p className="text-foreground-600 text-lg mb-4">
                      Principal & Founder
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                      <Chip
                        startContent={<Award size={14} />}
                        color="primary"
                        variant="flat"
                        size="sm"
                      >
                        Licensed Architect - California
                      </Chip>
                      <Chip
                        startContent={<Users size={14} />}
                        color="secondary"
                        variant="flat"
                        size="sm"
                      >
                        AIA Member
                      </Chip>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardBody className="pt-0">
                <p className="text-foreground-600 text-lg leading-relaxed mb-8">
                  DeLoache Architecture & Design was founded by Principal Scott
                  DeLoache, bringing a unique global perspective to every
                  project through diverse experience across residential,
                  commercial, and international developments.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Education 
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-success/10 rounded-lg">
                        <GraduationCap className="w-5 h-5 text-success" />
                      </div>
                      <h3 className="font-display text-xl font-bold">
                        Education
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <Card className="border border-success/20 bg-success/5">
                        <CardBody className="p-4">
                          <p className="font-semibold text-sm">
                            Master of Architecture
                          </p>
                          <p className="text-foreground-500 text-sm">
                            University of Florida
                          </p>
                        </CardBody>
                      </Card>
                      <Card className="border border-success/20 bg-success/5">
                        <CardBody className="p-4">
                          <p className="font-semibold text-sm">
                            Bachelor of Architecture
                          </p>
                          <p className="text-foreground-500 text-sm">
                            Texas Tech University
                          </p>
                        </CardBody>
                      </Card>
                    </div>
                  </div>

                  {/* Experience 
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-warning/10 rounded-lg">
                        <Briefcase className="w-5 h-5 text-warning" />
                      </div>
                      <h3 className="font-display text-xl font-bold">
                        Experience
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {experiences.map((exp, index) => (
                        <Card
                          key={index}
                          className="border border-warning/20 bg-warning/5"
                        >
                          <CardBody className="p-4">
                            <p className="font-semibold text-sm">
                              {exp.company}
                            </p>
                            <p className="text-foreground-500 text-xs">
                              {exp.type}
                            </p>
                          </CardBody>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Global Reach 
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-danger/10 rounded-lg">
                        <Globe className="w-5 h-5 text-danger" />
                      </div>
                      <h3 className="font-display text-xl font-bold">
                        Global Reach
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <Card className="border border-danger/20 bg-danger/5">
                        <CardBody className="p-4">
                          <p className="font-semibold text-sm mb-2">
                            International Projects
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {globalProjects.map((location) => (
                              <Chip
                                key={location}
                                size="sm"
                                variant="flat"
                                color="danger"
                              >
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
        */}

        {/* Call to Action */}

          {/* Call to Action Updated by Raees */}
          <motion.section
            initial={{ opacity: 0, scale: 1 }}
            whileInView={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.4, duration: 0.8 }}
  viewport={{ once: true, amount: 0.3 }}
        className="relative bg-black text-white py-24"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=3540&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative container mx-auto px-6 text-center">
          <motion.h2 variants={fadeIn()} className="text-3xl md:text-5xl font-serif mb-6 max-w-3xl mx-auto">Ready to Start Your Project?</motion.h2>
          <motion.p variants={fadeIn(0.2)} className="text-[#E5E5E3] max-w-2xl mx-auto mb-8">We are committed to creating exceptional architectural solutions that enhance the way people live and work. Let's discuss how we can bring your vision to life.</motion.p>
          <motion.div variants={fadeIn(0.4)} className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/contact">
            <button className="bg-white text-black px-8 py-3 font-semibold tracking-wider uppercase text-sm hover:bg-opacity-90 transition-all duration-300 w-full sm:w-auto">
              Schedule Consultation
            </button>
            </Link>
            <Link href='/projects'>
            <button className="border border-white/50 text-white px-8 py-3 font-semibold tracking-wider uppercase text-sm hover:bg-white hover:text-black transition-all duration-300 w-full sm:w-auto">
              View Portfolio
            </button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
      {/* Call to Action 
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Card className="border-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 backdrop-blur-md shadow-xl">
              <CardBody className="p-12">
                <h2 className="font-display text-3xl font-bold mb-4">
                  Ready to Start Your Project?
                </h2>
                <p className="text-foreground-600 text-lg mb-8 leading-relaxed">
                  We are committed to creating exceptional architectural
                  solutions that enhance the way people live and work.
                  Let&apos;s discuss how we can bring your vision to life.
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
          */}
      </main>

      <Footer />
    </div>
  );
}
