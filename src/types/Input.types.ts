export interface Iinput {
  type: string;
  name: string;
  label?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
  value?: string;
  placeholder?: string;
}

export interface IinputProps {
  config: Iinput;
}
