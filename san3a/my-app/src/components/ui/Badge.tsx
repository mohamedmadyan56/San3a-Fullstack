type BadgeVariant =
  | "green"
  | "red"
  | "yellow"
  | "blue"
  | "purple"
  | "gray";

const variantStyles: Record<BadgeVariant, string> = {
  green: "bg-green-100 text-green-700",
  red: "bg-red-100 text-red-600",
  yellow: "bg-yellow-100 text-yellow-700",
  blue: "bg-blue-100 text-blue-700",
  purple: "bg-purple-100 text-purple-700",
  gray: "bg-gray-100 text-gray-600",};
interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  dot?: boolean;
  className?: string;}
export default function Badge({
  label,
  variant = "gray",
  dot = true,
  className = "",}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}>
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70 shrink-0" />)}
      {label}
    </span>
  );
}