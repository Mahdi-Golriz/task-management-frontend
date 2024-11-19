import { cn } from "../utils/cn";
import { ReactNode } from "react";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  icon?: ReactNode;
  variant: "dark" | "light" | "action";
}

const Button: React.FC<IProps> = ({
  children,
  icon,
  className,
  variant,
  ...props
}) => {
  const Icon = () => icon;
  const commpmStyles =
    "flex items-center justify-center gap-1 p-2 m-1 box-border border rounded-lg text-xs font-semibold";

  const variantStyles = {
    dark: "bg-slate-800 text-white",
    light: "bg-white",
    action: "p-1 border-none",
  };

  const content = (
    <>
      {icon && <span>{<Icon />}</span>}
      <span>{children}</span>
    </>
  );

  return (
    <button
      className={cn(commpmStyles, variantStyles[variant], className)}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
