import { FC, ReactNode } from "react";

type ToggleButtonProps = {
  onClick: () => void;
  isActive?: boolean;
  children: ReactNode;
  className?: string;
};

export const ToggleButton: FC<ToggleButtonProps> = ({
  onClick,
  isActive,
  children,
  className,
}) => {
  const activeStyle = isActive
    ? "bg-gray-800 text-white"
    : "bg-black text-gray-300";
  return (
    <button
      onClick={onClick}
      className={`${activeStyle} px-3 py-1 rounded transition-colors ${className}`}
    >
      {children}
    </button>
  );
};
