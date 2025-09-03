import { AccordionItem } from "@heroui/react";

type FAQItem = {
  id?: string;
  question: string;
  answer: string;
};

export function FAQItem({ item }: { item: FAQItem }) {
  return (
    <AccordionItem 
      key={item.id} 
      aria-label={item.question} 
      title={item.question}
    >
      <p className="text-foreground-500">{item.answer}</p>
    </AccordionItem>
  );
}
