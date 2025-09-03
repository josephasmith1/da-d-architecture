import { Card, CardBody, Accordion, AccordionItem } from "@heroui/react";
import { ResponsiveImage } from "./ResponsiveImage";

type TeamMember = {
  image: string;
  name: string;
  role: string;
  bio: string;
};

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <Card className="border-0 bg-background/60 backdrop-blur-md">
      <CardBody>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <ResponsiveImage
              name={member.image}
              alt={member.name}
              className="object-cover rounded-lg"
            />
          </div>
          <div className="md:w-2/3">
            <h3 className="font-display text-xl">{member.name}</h3>
            <p className="text-primary font-medium mb-4">{member.role}</p>
            <Accordion>
              <AccordionItem 
                key="bio" 
                aria-label="Bio" 
                title="Bio"
              >
                <p className="text-foreground-500">{member.bio}</p>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
