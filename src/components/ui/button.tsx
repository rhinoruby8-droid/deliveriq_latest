import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C79A4E] focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
	{
		variants: {
			variant: {
				default: "bg-[#d7c2b0] text-[#1a1a1a] hover:bg-[#c3ae9b] shadow-sm", // matching the exact color from screenshot
				destructive:
					"bg-red-600 text-white hover:bg-red-700 shadow-sm",
				outline:
					"border border-border bg-transparent text-foreground hover:bg-muted hover:text-white shadow-sm",
				secondary:
					"bg-muted text-white hover:bg-[#3A3E4A] shadow-sm",
				ghost: "text-muted-foreground hover:bg-muted hover:text-white",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-12 px-6 py-2",
				sm: "h-9 rounded-full px-4",
				lg: "h-14 rounded-full px-8 text-base",
				icon: "h-12 w-12",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
