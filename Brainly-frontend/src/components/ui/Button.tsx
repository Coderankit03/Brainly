import { ReactElement } from "react";

interface ButtonTypes {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  startIcon?: ReactElement;
  text: string;
  onClick?: () => void;
  loading: boolean;

}

const VariantStyles = {
  primary: "bg-purple-600 text-white rounded-md flex items-center font-light",
  secondary: "bg-purple-300 text-purple-500 rounded-md flex items-center font-light",
};

const sizeStyles = {
  sm: "px-3 py-1",
  md: "px-5 py-2",
  lg: "px-8 py-4",
};

const Button = (props: ButtonTypes) => {
  return (
    <button onClick={props.onClick} className={`${VariantStyles[props.variant]} ${sizeStyles[props.size]} ${props.loading? "opacity-50":""}`} disabled={props.loading} >
      {props.startIcon} <span className="pl-2">{props.text}</span>
    </button>
  );
};

export default Button;
