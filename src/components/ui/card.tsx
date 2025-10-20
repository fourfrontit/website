import React from "react";

export function Card({ children, className = "", ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`rounded-2xl p-0 ${className}`} {...rest}>{children}</div>;
}
export function CardHeader({ children, className = "", ...rest }: any) {
  return <div className={`p-4 ${className}`} {...rest}>{children}</div>;
}
export function CardTitle({ children, className = "", ...rest }: any) {
  return <div className={`font-semibold ${className}`} {...rest}>{children}</div>;
}
export function CardContent({ children, className = "", ...rest }: any) {
  return <div className={`p-4 ${className}`} {...rest}>{children}</div>;
}
