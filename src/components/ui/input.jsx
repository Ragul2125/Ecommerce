import * as React from "react";
import { cn } from "@/lib/utils";
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-[1.5rem] border-2 border-transparent bg-muted/40 px-6 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:bg-background focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all font-medium",
        className
      )}
      ref={ref}
      {...props}
    />;
  }
);
Input.displayName = "Input";
export {
  Input
};
