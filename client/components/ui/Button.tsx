import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 relative overflow-hidden cursor-pointer",
          {
            "bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 text-white shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] rounded-xl":
              variant === "default",
            "border border-[var(--border-primary)] bg-[var(--bg-input)] text-[var(--text-primary)] shadow-sm hover:bg-[var(--bg-hover)] hover:border-[var(--border-secondary)] rounded-xl backdrop-blur-sm":
              variant === "outline",
            "text-[var(--text-primary)] hover:bg-[var(--bg-hover)] rounded-xl":
              variant === "ghost",
          },
          {
            "h-11 px-5 py-2.5 text-sm": size === "default",
            "h-9 px-3.5 text-xs rounded-lg": size === "sm",
            "h-12 px-8 text-base": size === "lg",
            "h-10 w-10 p-0 flex items-center justify-center": size === "icon",
          },
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
export { Button };
