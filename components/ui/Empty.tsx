import { ReactNode } from "react";

export default function Empty({
  message,
  className,
  icon,
}: {
  message?: string;
  className?: string;
  icon?: ReactNode;
}) {
  return (
    <h2
      className={`flex gap-2 text-2xl items-center justify-center font-medium mt-10 ${className}`}
    >
      {icon}
      {message || "No data to display at the moment..."}
    </h2>
  );
}
