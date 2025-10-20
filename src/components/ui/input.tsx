import React from "react";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`w-full px-3 py-2 rounded-md border border-white/10 ${props.className || ""}`} />;
}
export default Input;
