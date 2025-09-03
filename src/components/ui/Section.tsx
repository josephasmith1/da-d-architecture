import { cn } from "@/lib/utils";

export function Section({ 
  children, 
  className,
  containerClassName,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("py-12 md:py-16", className)} {...props}>
      <div className={cn("container mx-auto px-4", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
