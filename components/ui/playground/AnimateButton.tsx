export default function AnimateButton({
  onClick,
  className,
  children,
  alternate = false,
}: {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  alternate?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 ${
        !alternate ? "bg-violet-600 hover:border-violet-600" : "bg-gray-100"
      } rounded-xl px-3 py-1 cursor-pointer hover:bg-white hover:text-violet-600 border-2 transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
}
