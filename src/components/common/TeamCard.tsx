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
    <Card className="bg-content1 border-1 border-divider">
      <CardBody className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <ResponsiveImage
              name={member.image}
              alt={member.name}
              className="object-cover rounded-lg"
            />
          </div>
          <div className="md:w-2/3">
            <h3 className="font-display text-xl font-semibold">{member.name}</h3>
            <p className="text-primary font-medium mb-4">{member.role}</p>
            <Accordion variant="light">
              <AccordionItem 
                key="bio" 
                aria-label="Bio" 
                title="Bio"
                classNames={{
                  title: "text-medium",
                  content: "text-default-600"
                }}
              >
                {member.bio}
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
