'use client';

import { Input, Textarea, Select, SelectItem, Button, Card, CardBody, Divider, Checkbox, RadioGroup, Radio } from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { motion } from "framer-motion";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  projectType: z.string().min(1, "Please select a project type"),
  services: z.array(z.string()).min(1, "Please select at least one service"),
  budget: z.string().min(1, "Please select a budget range"),
  timeline: z.string().min(1, "Please select a timeline"),
  location: z.string().min(1, "Project location is required"),
  description: z.string().min(20, "Please provide a detailed project description (minimum 20 characters)")
});

type ContactFormData = z.infer<typeof contactSchema>;

const projectTypes = [
  { key: "residential", label: "Residential" },
  { key: "commercial", label: "Commercial" },
  { key: "renovation", label: "Renovation/Addition" },
  { key: "fire-rebuild", label: "Fire Rebuild" },
  { key: "consultation", label: "Design Consultation" },
  { key: "other", label: "Other" }
];

const services = [
  { key: "architecture", label: "Architecture" },
  { key: "interior", label: "Interior Design" },
  { key: "landscape", label: "Landscape Design" },
  { key: "fire-mitigation", label: "Fire Mitigation" },
  { key: "general-contractor", label: "General Contractor" },
  { key: "project-management", label: "Project Management" }
];

const budgetRanges = [
  { key: "under-100k", label: "Under $100K" },
  { key: "100k-250k", label: "$100K - $250K" },
  { key: "250k-500k", label: "$250K - $500K" },
  { key: "500k-1m", label: "$500K - $1M" },
  { key: "1m-plus", label: "$1M+" },
  { key: "prefer-not-to-say", label: "Prefer not to say" }
];

const timelines = [
  { key: "immediate", label: "Immediate (Ready to start)" },
  { key: "3-months", label: "Within 3 months" },
  { key: "6-months", label: "Within 6 months" },
  { key: "1-year", label: "Within 1 year" },
  { key: "exploring", label: "Just exploring options" }
];

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { handleSubmit, control, formState: { errors, isSubmitting }, reset, watch } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      services: []
    }
  });

  const selectedServices = watch("services");

  const onSubmit = async (data: ContactFormData) => {
    try {
      console.log("Form data:", data);
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      // In a real app, you would send this data to your backend
      // reset();
    } catch (error) {
      console.error("Form submission error:", error);
      // Handle error - show toast notification
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-0 bg-success/10 backdrop-blur-md">
          <CardBody className="text-center py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h3 className="font-display text-2xl font-bold text-success mb-4">
                Thank You for Your Inquiry!
              </h3>
              <p className="text-foreground-700 mb-6">
                We've received your project details and will review them carefully. Our team will get back to you within 24-48 hours to discuss your architectural needs.
              </p>
              <Button 
                color="success" 
                variant="flat"
                onClick={() => {
                  setIsSubmitted(false);
                  reset();
                }}
              >
                Submit Another Inquiry
              </Button>
            </motion.div>
          </CardBody>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.form 
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Personal Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <h3 className="font-display text-xl font-semibold mb-4 text-primary">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="First Name"
                variant="bordered"
                isRequired
                isInvalid={!!errors.firstName}
                errorMessage={errors.firstName?.message}
                classNames={{
                  inputWrapper: "bg-background/50 backdrop-blur-sm"
                }}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Last Name"
                variant="bordered"
                isRequired
                isInvalid={!!errors.lastName}
                errorMessage={errors.lastName?.message}
                classNames={{
                  inputWrapper: "bg-background/50 backdrop-blur-sm"
                }}
              />
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Email Address"
                type="email"
                variant="bordered"
                isRequired
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
                classNames={{
                  inputWrapper: "bg-background/50 backdrop-blur-sm"
                }}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Phone Number"
                type="tel"
                variant="bordered"
                placeholder="(Optional)"
                classNames={{
                  inputWrapper: "bg-background/50 backdrop-blur-sm"
                }}
              />
            )}
          />
        </div>
        
        <div className="mt-4">
          <Controller
            name="company"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Company/Organization"
                variant="bordered"
                placeholder="(Optional)"
                classNames={{
                  inputWrapper: "bg-background/50 backdrop-blur-sm"
                }}
              />
            )}
          />
        </div>
      </motion.div>

      <Divider />

      {/* Project Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h3 className="font-display text-xl font-semibold mb-4 text-primary">Project Details</h3>
        
        <div className="space-y-6">
          <Controller
            name="projectType"
            control={control}
            render={({ field }) => (
              <Select
                label="Project Type"
                placeholder="Select your project type"
                variant="bordered"
                isRequired
                isInvalid={!!errors.projectType}
                errorMessage={errors.projectType?.message}
                selectedKeys={field.value ? [field.value] : []}
                onSelectionChange={(keys) => {
                  const selectedKey = Array.from(keys)[0] as string;
                  field.onChange(selectedKey);
                }}
                classNames={{
                  trigger: "bg-background/50 backdrop-blur-sm"
                }}
              >
                {projectTypes.map((type) => (
                  <SelectItem key={type.key} value={type.key}>
                    {type.label}
                  </SelectItem>
                ))}
              </Select>
            )}
          />

          <div>
            <label className="block text-sm font-medium mb-3">Services Needed (Select all that apply)</label>
            <Controller
              name="services"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {services.map((service) => (
                    <Checkbox
                      key={service.key}
                      isSelected={field.value.includes(service.key)}
                      onValueChange={(checked) => {
                        if (checked) {
                          field.onChange([...field.value, service.key]);
                        } else {
                          field.onChange(field.value.filter((s: string) => s !== service.key));
                        }
                      }}
                      classNames={{
                        base: "max-w-full",
                        label: "text-sm"
                      }}
                    >
                      {service.label}
                    </Checkbox>
                  ))}
                </div>
              )}
            />
            {errors.services && (
              <p className="text-danger text-sm mt-2">{errors.services.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="budget"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="block text-sm font-medium mb-3">Budget Range</label>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    isInvalid={!!errors.budget}
                    errorMessage={errors.budget?.message}
                  >
                    {budgetRanges.map((budget) => (
                      <Radio key={budget.key} value={budget.key} size="sm">
                        {budget.label}
                      </Radio>
                    ))}
                  </RadioGroup>
                </div>
              )}
            />

            <Controller
              name="timeline"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="block text-sm font-medium mb-3">Project Timeline</label>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    isInvalid={!!errors.timeline}
                    errorMessage={errors.timeline?.message}
                  >
                    {timelines.map((timeline) => (
                      <Radio key={timeline.key} value={timeline.key} size="sm">
                        {timeline.label}
                      </Radio>
                    ))}
                  </RadioGroup>
                </div>
              )}
            />
          </div>

          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Project Location"
                variant="bordered"
                isRequired
                placeholder="City, State"
                isInvalid={!!errors.location}
                errorMessage={errors.location?.message}
                classNames={{
                  inputWrapper: "bg-background/50 backdrop-blur-sm"
                }}
              />
            )}
          />
        </div>
      </motion.div>

      <Divider />

      {/* Project Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h3 className="font-display text-xl font-semibold mb-4 text-primary">Project Description</h3>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              label="Tell us about your project"
              variant="bordered"
              minRows={6}
              isRequired
              placeholder="Please describe your vision, goals, specific requirements, site conditions, and any other details that would help us understand your project better..."
              isInvalid={!!errors.description}
              errorMessage={errors.description?.message}
              classNames={{
                inputWrapper: "bg-background/50 backdrop-blur-sm"
              }}
            />
          )}
        />
      </motion.div>

      {/* Submit Button */}
      <motion.div
        className="pt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Button
          type="submit"
          color="primary"
          size="lg"
          isLoading={isSubmitting}
          className="w-full md:w-auto px-8"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending Your Inquiry..." : "Send Inquiry"}
        </Button>
        <p className="text-foreground-500 text-sm mt-3">
          By submitting this form, you agree to be contacted by our team regarding your project inquiry.
        </p>
      </motion.div>
    </motion.form>
  );
}
