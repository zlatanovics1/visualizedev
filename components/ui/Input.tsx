import { ChangeEvent, forwardRef } from "react";

interface InputProps {
  name: string;
  labelText?: string;
  className?: string;
  onChange?: (e?: ChangeEvent<HTMLInputElement>) => void;
  ariaLabel?: string;
  placeholder?: string;
}

// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, InputProps>(function InputComponent(
  { name, labelText, className, onChange, ariaLabel, placeholder },
  ref?
) {
  return (
    <>
      <label htmlFor={name} aria-label={ariaLabel}>
        {labelText}
      </label>
      <input
        onChange={onChange}
        type="text"
        id={name}
        name={name}
        ref={ref}
        placeholder={placeholder}
        className={`rounded-xl transition-all duration-150  border-2 mb-4 px-4 py-2 text-gray-400 outline-none  bg-white focus:ring-2 focus:border-transparent focus:ring-indigo-600 ${className}`}
      />
    </>
  );
});

Input.displayName = "Input";

export default Input;
