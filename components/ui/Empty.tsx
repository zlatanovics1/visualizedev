export default function Empty({
  message,
  className,
}: {
  message?: string;
  className?: string;
}) {
  return (
    <h2 className={`text-2xl text-center font-semibold mt-10 ${className}`}>
      {message || "No data to display at the moment..."}
    </h2>
  );
}
