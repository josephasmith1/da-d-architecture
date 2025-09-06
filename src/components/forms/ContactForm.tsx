'use client';

import {
  Input,
  Textarea,
  Select,
  SelectItem,
  Button,
  Card,
  CardBody,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio
} from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

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

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      services: [],
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      projectType: '',
      budget: '',
      timeline: '',
      location: '',
      description: ''
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      console.log("Form data:", data);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  if (isSubmitted) {
    return (
      <Card>
        <CardBody className="text-center py-12">
          <h3 className="text-2xl font-bold text-success mb-4">
            Thank You for Your Inquiry!
          </h3>
          <p className="text-default-600 mb-6">
            We&apos;ve received your project details and will review them carefully.
            Our team will get back to you within 24-48 hours to discuss your architectural needs.
          </p>
          <Button
            color="success"
            variant="flat"
            onPress={() => {
              setIsSubmitted(false);
              reset();
            }}
          >
            Submit Another Inquiry
          </Button>
        </CardBody>
      </Card>
    );
  }

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10" noValidate>
  <Card className="shadow-lg border border-gray-200 rounded-2xl">
    <CardBody className="space-y-8 p-8">
      <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-100 to-gray-200 px-6 py-3 rounded-xl text-center shadow-sm">
        Personal Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-lg font-semibold text-gray-700">
            First Name <span className="text-red-500">*</span>
          </label>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="Enter your first name"
                variant="bordered"
                size="md"
                className="rounded-lg shadow-sm focus:ring-2 focus:ring-primary"
                isInvalid={!!errors.firstName}
                errorMessage={errors.firstName?.message}
              />
            )}
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg font-semibold text-gray-700">
            Last Name <span className="text-red-500">*</span>
          </label>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="Enter your last name"
                variant="bordered"
                size="md"
                className="rounded-lg shadow-sm focus:ring-2 focus:ring-primary"
                isInvalid={!!errors.lastName}
                errorMessage={errors.lastName?.message}
              />
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-lg font-semibold text-gray-700">
            Email Address <span className="text-red-500">*</span>
          </label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                placeholder="john@example.com"
                variant="bordered"
                size="md"
                className="rounded-lg shadow-sm focus:ring-2 focus:ring-primary"
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
              />
            )}
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg font-semibold text-gray-700">
            Phone Number
          </label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="tel"
                placeholder="(555) 123-4567"
                variant="bordered"
                size="md"
                className="rounded-lg shadow-sm focus:ring-2 focus:ring-primary"
              />
            )}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-lg font-semibold text-gray-700">
          Company/Organization
        </label>
        <Controller
          name="company"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              placeholder="Your company name (optional)"
              variant="bordered"
              size="md"
              className="rounded-lg shadow-sm focus:ring-2 focus:ring-primary"
            />
          )}
        />
      </div>
    </CardBody>
  </Card>

  <Card className="shadow-lg border border-gray-200 rounded-2xl">
    <CardBody className="space-y-8 p-8">
      <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-100 to-gray-200 px-6 py-3 rounded-xl text-center shadow-sm">
        Project Details
      </h3>

      <div className="space-y-2">
        <label className="text-lg font-semibold text-gray-700">
          Project Type <span className="text-red-500">*</span>
        </label>
        <Controller
          name="projectType"
          control={control}
          render={({ field }) => (
            <Select
              className="rounded-lg border-gray-300 shadow-sm bg-white"
              placeholder="Select your project type"
              variant="bordered"
              size="lg"
              isInvalid={!!errors.projectType}
              errorMessage={errors.projectType?.message}
              selectedKeys={field.value ? new Set([field.value]) : new Set()}
              onSelectionChange={(keys) => {
                const selectedKey = Array.from(keys as Set<string>)[0] ?? "";
                field.onChange(selectedKey);
              }}
              disallowEmptySelection={false}
            >
              {projectTypes.map((type) => (
                <SelectItem
                  key={type.key}
                  className="text-center rounded-lg text-lg bg-white rounded-lg"
                >
                  {type.label}
                </SelectItem>
              ))}
            </Select>
          )}
        />
      </div>

      <Controller
        name="services"
        control={control}
        render={({ field }) => (
          <CheckboxGroup
            label="Services Needed :"
            value={field.value}
            onValueChange={field.onChange}
            isRequired
            isInvalid={!!errors.services}
            errorMessage={errors.services?.message}
            description="Select all that apply"
            classNames={{
              label: "text-lg font-semibold text-gray-700 mb-3",
              description: "text-lg font-semibold text-gray-700 mb-3",
              wrapper: "grid grid-cols-1 md:grid-cols-2 gap-4",
            }}
          >
            {services.map((service) => (
              <Checkbox
                key={service.key}
                value={service.key}
                size="md"
                className="flex items-center gap-3 p-4 rounded-lg 
                         hover:bg-gray-200 transition-all duration-200"
              >
                <span className="text-gray-800 font-medium">
                  {service.label}
                </span>
              </Checkbox>
            ))}
          </CheckboxGroup>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Controller
          name="budget"
          control={control}
          render={({ field }) => (
            <RadioGroup
              label="Budget Range"
              value={field.value}
              onValueChange={field.onChange}
              isRequired
              isInvalid={!!errors.budget}
              errorMessage={errors.budget?.message}
              classNames={{
                label: "text-lg font-semibold text-gray-700 mb-3",
              }}
            >
              {budgetRanges.map((budget) => (
                <Radio
                  key={budget.key}
                  value={budget.key}
                  size="md"
                  className="hover:bg-gray-200 rounded-md px-2"
                >
                  {budget.label}
                </Radio>
              ))}
            </RadioGroup>
          )}
        />

        <Controller
          name="timeline"
          control={control}
          render={({ field }) => (
            <RadioGroup
              label="Project Timeline"
              value={field.value}
              onValueChange={field.onChange}
              isRequired
              isInvalid={!!errors.timeline}
              errorMessage={errors.timeline?.message}
              classNames={{
                label: "text-lg font-semibold text-gray-700 mb-3",
              }}
            >
              {timelines.map((timeline) => (
                <Radio
                  key={timeline.key}
                  value={timeline.key}
                  size="md"
                  className="hover:bg-gray-50 rounded-md px-2"
                >
                  {timeline.label}
                </Radio>
              ))}
            </RadioGroup>
          )}
        />
      </div>

      <div className="space-y-2">
        <label className="text-lg font-semibold text-gray-700">
          Project Location <span className="text-red-500">*</span>
        </label>
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              placeholder="City, State"
              variant="bordered"
              size="md"
              className="rounded-lg shadow-sm focus:ring-2 focus:ring-primary"
              isInvalid={!!errors.location}
              errorMessage={errors.location?.message}
            />
          )}
        />
      </div>
    </CardBody>
  </Card>

  <Card className="shadow-lg border border-gray-200 rounded-2xl">
    <CardBody className="space-y-8 p-8">
      <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-100 to-gray-200 px-6 py-3 rounded-xl text-center shadow-sm">
        Project Description
      </h3>

      <div className="space-y-2">
        <label className="text-base font-semibold text-gray-700">
          Tell us about your project <span className="text-red-500">*</span>
        </label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              placeholder="Please describe your vision, goals, specific requirements, site conditions, and any other details..."
              variant="bordered"
              size="md"
              minRows={6}
              className="rounded-lg shadow-sm focus:ring-2 focus:ring-primary mb-25"
              isInvalid={!!errors.description}
              errorMessage={errors.description?.message}
            />
          )}
        />
      </div>
    </CardBody>
  </Card>

  <div className="flex flex-col gap-4">
    <Button
      type="submit"
      color="primary"
      size="lg"
      isLoading={isSubmitting}
      className="bg-black hover:bg-gray-900 w-full text-white font-semibold py-3 rounded-xl shadow-md transition-all"
    >
      {isSubmitting ? "Sending Your Inquiry..." : "Send Inquiry"}
    </Button>
    <p className="text-sm text-gray-500 text-center">
      By submitting this form, you agree to be contacted by our team regarding
      your project inquiry.
    </p>
  </div>
</form>
</>
    
  );
}