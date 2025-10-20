import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "outline" | "default" };

export function Button({ children, className = "", variant, ...rest }: Props) {
  const base = "px-4 py-2 rounded-md font-medium";
  const v = variant === "outline" ? "bg-transparent border border-white/20" : "";
  return <button className={`${base} ${v} ${className}`} {...rest}>{children}</button>;
}

export default Button;
