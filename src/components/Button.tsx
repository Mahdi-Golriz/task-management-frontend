import { cn } from "../utils/cn";
import { ReactNode } from "react";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  icon?: ReactNode;
  variant: "dark" | "light" | "iconOnly";
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
    iconOnly: "p-1 border-none", // for cases like delete and edit icon in each task item
  };

  const content = (
    <>
      {icon && <span>{<Icon />}</span>}
      <span>{children}</span>
    </>
  );

  // using cn to prevent from any conflict between tailwind classes
  // for each button we have the common styles and then based on use case we choose the variant of button
  // and in required situations we can use className property to customize the button
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
