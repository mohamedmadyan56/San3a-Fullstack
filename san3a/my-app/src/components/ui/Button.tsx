import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";
const variantStyles: Record<Variant, string> = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white border-transparent",
  secondary: "bg-white hover:bg-gray-50 text-gray-700 border-gray-200",
  ghost: "bg-transparent hover:bg-gray-100 text-gray-600 border-transparent",
  danger: "bg-red-50 hover:bg-red-100 text-red-600 border-transparent",};
const sizeStyles: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-5 py-2.5 text-base gap-2",};
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: React.ReactNode;
  loading?: boolean;}
export default function Button({
  variant = "primary",
  size = "md",
  icon,
  loading = false,
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center font-medium rounded-lg border
        transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/30
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}>
      {loading ? (
        <svg
          className="w-4 h-4 animate-spin shrink-0"
          fill="none"
          viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      ) : (
        icon && <span className="shrink-0">{icon}</span>)}
      {children}
    </button>
  );
}