export type TButton = {
  text: string;
  onClick: () => void;
  variant: string;
  type?: "button" | "submit" | "reset";
};

export type TButtonProps = {
  button: TButton;
};
