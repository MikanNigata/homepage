import React from "react";

type Variant = "primary" | "secondary" | "ghost";

type Props = {
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

const base =
  "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";
const styles: Record<Variant, string> = {
  primary: "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900",
  secondary:
    "bg-white text-gray-900 ring-1 ring-gray-200 hover:bg-gray-50 focus:ring-gray-900",
  ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-900",
};

export default function Button({
  variant = "primary",
  href,
  onClick,
  children,
}: Props) {
  const className = `${base} ${styles[variant]}`;

  if (href) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}
