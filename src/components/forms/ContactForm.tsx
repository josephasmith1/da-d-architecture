'use client';

import { Input, Textarea, Select, SelectItem, Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  topic: z.string().min(1, "Please select a topic"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async () => {
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Toast.success("Message sent successfully!");
      reset();
    } catch {
      // Toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <Input
        {...register("name")}
        label="Name"
        variant="bordered"
        isRequired
        className="max-w-lg"
        errorMessage={errors.name?.message}
      />
      <Input
        {...register("email")}
        label="Email"
        type="email"
        variant="bordered"
        isRequired
        className="max-w-lg"
        errorMessage={errors.email?.message}
      />
      <Select 
        {...register("topic")}
        label="Topic" 
        variant="bordered"
        className="max-w-lg"
        errorMessage={errors.topic?.message}
      >
        <SelectItem key="architecture">Architecture</SelectItem>
        <SelectItem key="interior">Interior Design</SelectItem>
        <SelectItem key="fire">Fire Mitigation</SelectItem>
        <SelectItem key="other">Other</SelectItem>
      </Select>
      <Textarea
        {...register("message")}
        label="Message"
        variant="bordered"
        minRows={4}
        className="max-w-lg"
        errorMessage={errors.message?.message}
      />
      <Button 
        type="submit"
        color="primary"
        size="lg"
        isLoading={isSubmitting}
        className="max-w-xs"
      >
        Send Message
      </Button>
    </form>
  );
}
