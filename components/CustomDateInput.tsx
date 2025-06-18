// CustomDateInput.tsx
import { forwardRef } from "react";
import Image from "next/image";

type Props = {
  value?: string;
  onClick?: () => void;
  placeholder?: string;
};

export const CustomDateInput = forwardRef<HTMLInputElement, Props>(
  ({ value, onClick, placeholder }, ref) => (
    <div
      onClick={onClick}
      ref={ref}
      className="flex items-center border border-gray-300 gap-3 px-4 py-2 rounded-md bg-black text-white cursor-pointer w-full"
    >
      <span className="text-white">{value || placeholder}</span>
      <Image
        src="/assets/icons/calendar.svg"
        alt="Calendar Icon"
        width={20}
        height={20}
        className="ml-auto"
      />
    </div>
  )
);

CustomDateInput.displayName = "CustomDateInput";
