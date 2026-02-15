import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost" | "link" | "destructive";
    size?: "default" | "sm" | "lg" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", ...props }, ref) => {
        return (
            <button
                className={cn(
                    "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50",
                    {
                        "bg-blue-600 text-white shadow hover:bg-blue-700 active:scale-[0.98] transition-all": variant === "default",
                        "border border-gray-300 bg-white shadow-sm hover:bg-gray-50 hover:text-gray-900": variant === "outline",
                        "hover:bg-gray-100 hover:text-gray-900": variant === "ghost",
                        "bg-red-500 text-white hover:bg-red-600 shadow-sm": variant === "destructive",
                        "text-blue-600 underline-offset-4 hover:underline": variant === "link",
                        "h-10 px-4 py-2": size === "default",
                        "h-9 rounded-md px-3 text-xs": size === "sm",
                        "h-11 rounded-md px-8 text-base": size === "lg",
                        "h-10 w-10": size === "icon",
                    },
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
