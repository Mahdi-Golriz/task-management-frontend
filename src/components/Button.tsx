import { IconType } from "react-icons";
import { cn } from "../utils/cn";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  Icon?: IconType;
  variant: "dark" | "light" | "action";
}

const Button: React.FC<IProps> = ({
  text,
  Icon,
  className,
  variant,
  ...props
}) => {
  const commpmStyles =
    "flex items-center justify-center gap-1 p-2 m-1 box-border border rounded-lg text-xs font-semibold";

  const variantStyles = {
    dark: "bg-slate-800 text-white",
    light: "bg-white",
    action: "p-1 border-none",
  };

  const content = (
    <>
      {Icon && <span>{<Icon />}</span>}
      {text}
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
