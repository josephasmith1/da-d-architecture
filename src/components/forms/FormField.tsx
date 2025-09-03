import { Input } from "@heroui/react";

export function FormField({ 
  label, 
  name, 
  type = "text",
  required = false,
  error,
  ...props
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <Input
      label={label}
      name={name}
      type={type}
      isRequired={required}
      errorMessage={error}
      variant="bordered"
      className="max-w-lg"
      {...props}
    />
  );
}
