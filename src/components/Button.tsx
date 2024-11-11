import { IconType } from "react-icons";
import { cn } from "../utils/cn";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  onClick: () => void;
  Icon?: IconType;
  variant: "dark" | "light" | "action";
}

const Button: React.FC<IProps> = ({
  onClick,
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
      onClick={onClick}
      className={cn(commpmStyles, variantStyles[variant], className)}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
