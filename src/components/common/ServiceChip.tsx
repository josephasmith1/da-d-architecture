import { Chip } from "@heroui/react";

export function ServiceChip({ service }: { service: string }) {
  return (
    <Chip 
      size="sm" 
      variant="flat" 
      color="default"
      className="tracking-wider"
    >
      {service}
    </Chip>
  );
}
