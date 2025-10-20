import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  const base =
    "px-8 py-3 font-semibold rounded-full transition shadow-lg active:scale-[0.98]";

  const variants = {
    primary: "bg-cyan-500 hover:bg-cyan-400 text-slate-900",
    secondary: "bg-violet-500 hover:bg-violet-400 text-slate-900",
  };

  return (
    <button className={cn(base, variants[variant], className)} {...props} />
  );
}
