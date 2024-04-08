export default function FilterButton({
  label,
  onClick,
  active,
}: {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  active: boolean;
}) {
  return (
    <li>
      <button
        className={`min-w-20 rounded-xl px-3 py-1 ${
          active
            ? "bg-violet-600  text-white border-2 border-transparent"
            : "border-2 text-violet-500"
        }`}
        onClick={onClick}
      >
        {label}
      </button>
    </li>
  );
}
