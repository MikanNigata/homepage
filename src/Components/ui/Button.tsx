import React from "react";
import { Link } from "react-router-dom";


type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type Props = {
    variant?: Variant;
    size?: Size;
    href?: string;
    to?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
};

const base =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap";

const sizeStyles: Record<Size, string> = {
    sm: "px-3 py-1.5 text-xs h-8 rounded-md",
    md: "px-4 py-2 text-sm h-10 rounded-md",
    lg: "px-6 py-3 text-base h-12 rounded-lg",
};

const styles: Record<Variant, string> = {
    primary: "bg-[#000000] text-white hover:bg-[#333] shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)] hover:-translate-y-[1px] focus:ring-[#000000]",
    secondary:
        "bg-white text-[#000000] border border-[#eaeaea] hover:bg-[#fafafa] shadow-[0_2px_4px_0_rgba(0,0,0,0.02)] focus:ring-[#000000]",
    ghost: "text-[#666666] hover:text-[#000] hover:bg-[#fafafa] focus:ring-[#000000]",
};

export default function Button({
    variant = "primary",
    size = "md",
    href,
    to,
    onClick,
    type = "button",
    disabled = false,
    children,
    className: extraClassName = "",
}: Props) {
    const className = [
        base,
        sizeStyles[size],
        styles[variant],
        disabled ? "opacity-60 cursor-not-allowed" : "",
        extraClassName,
    ]
        .filter(Boolean)
        .join(" ");

    // Internal navigation using React Router
    if (to) {
        return (
            <Link className={className} to={to}>
                {children}
            </Link>
        );
    }

    // External link
    if (href) {
        return (
            <a className={className} href={href} target="_blank" rel="noreferrer">
                {children}
            </a>
        );
    }

    return (
        <button type={type} className={className} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}
