'use client';

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { TeamCard } from "@/components/common/TeamCard";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
};

// Mock data - in a real app this would come from a data fetching solution
const mockTeam: TeamMember[] = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Principal Architect",
    image: "bel-air/Bel Air Living 1",
    bio: "Alex leads our firm with over 15 years of experience in sustainable architecture. He specializes in residential design and has won multiple awards for innovative housing solutions."
  },
  {
    id: 2,
    name: "Taylor Kim",
    role: "Design Director",
    image: "bel-air/Bel Air Bed 1",
    bio: "Taylor brings a unique perspective to commercial spaces, focusing on human-centered design. She has a background in interior architecture and urban planning."
  },
  {
    id: 3,
    name: "Jordan Smith",
    role: "Project Manager",
    image: "bel-air/Bel Air 3",
    bio: "Jordan ensures our projects run smoothly from concept to completion. With expertise in construction management and client relations, they are essential to our team's success."
  }
];

export default function PeoplePage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  
  useEffect(() => {
    // Simulate data fetching
    setTeam(mockTeam);
  }, []);
  
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
              Our Team
            </motion.h1>
            <motion.p 
              className="text-xl text-foreground-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Meet the talented professionals behind our architectural vision.
            </motion.p>
          </motion.div>
        </Section>
        
        <Section>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {team.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              >
                <TeamCard member={member} />
              </motion.div>
            ))}
          </motion.div>
        </Section>
      </main>
      
      <Footer />
    </div>
  );
}
