"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FaqSectionProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
  items: {
    question: string;
    answer: string;
  }[];
  contactInfo?: {
    title: string;
    description: string;
    buttonText: string;
    onContact?: () => void;
  };
}

const FaqSection = React.forwardRef<HTMLElement, FaqSectionProps>(
  ({ className, title, description, items, contactInfo, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          "py-8 md:py-12 lg:py-16 w-full flex justify-center",
          className
        )}
        {...props}
      >
        <div className="container w-full max-w-[90%] sm:max-w-[85%] md:max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-full sm:max-w-2xl mx-auto text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 md:mb-3">
              {title}
            </h2>
            {description && (
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                {description}
              </p>
            )}
          </motion.div>

          {/* FAQ Items */}
          <div className="max-w-full sm:max-w-2xl mx-auto space-y-2">
            {items.map((item, index) => (
              <FaqItem
                key={index}
                question={item.question}
                answer={item.answer}
                index={index}
              />
            ))}
          </div>

          {/* Contact Section */}
          {contactInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-full sm:max-w-md mx-auto mt-8 md:mt-12 p-4 sm:p-6 rounded-lg text-center"
            >
              <div className="inline-flex items-center justify-center p-1 sm:p-1.5 rounded-full mb-3 sm:mb-4">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
              </div>
              <p className="text-xs sm:text-sm md:text-base font-medium text-foreground mb-1">
                {contactInfo.title}
              </p>
              <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mb-3 sm:mb-4">
                {contactInfo.description}
              </p>
              <Button size="sm" onClick={contactInfo.onContact}>
                {contactInfo.buttonText}
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    );
  }
);
FaqSection.displayName = "FaqSection";

const FaqItem = React.forwardRef<
  HTMLDivElement,
  { question: string; answer: string; index: number }
>((props, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { question, answer, index } = props;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
      className={cn(
        "group rounded-lg",
        "transition-all duration-200 ease-in-out",
        "border border-border/50",
        isOpen ? "" : "hover:bg-muted/50"
      )}
    >
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 sm:px-6 py-3 sm:py-4 h-auto justify-between hover:bg-transparent"
      >
        <h3
          className={cn(
            "text-sm sm:text-base md:text-lg font-medium transition-colors duration-200 text-left",
            "text-foreground/70",
            "group-hover:text-foreground",
            isOpen && "text-foreground"
          )}
        >
          {question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "p-0.5 rounded-full flex-shrink-0",
            "transition-colors duration-200",
            isOpen ? "text-primary" : "text-muted-foreground"
          )}
        >
          <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
        </motion.div>
      </Button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: { duration: 0.2, ease: "easeOut" },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: { duration: 0.2, ease: "easeIn" },
            }}
          >
            <div className="px-4 sm:px-6 pb-3 sm:pb-4 pt-1 sm:pt-2">
              <motion.p
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed"
              >
                {answer}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});
FaqItem.displayName = "FaqItem";

export { FaqSection };