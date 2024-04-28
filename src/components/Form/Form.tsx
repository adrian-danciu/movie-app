import Button from "../Button/Button";
import Input, { TInput } from "../Input/Input";

interface IFormConfig {
  inputs: TInput[];
  handleSubmit: () => void;
  type: string;
}

interface TForm {
  configs: IFormConfig;
}

const Form: React.FC<TForm> = ({ configs }) => {
  return (
    <form className="space-y-6">
      {configs.inputs.map((input: TInput, index) => (
        <Input
          key={index}
          config={{
            type: input.type,
            name: input.name,
            label: input.label,
            handleChange: input.handleChange,
            required: true,
          }}
        />
      ))}

      {configs.type === "login" ? (
        <Button
          text="Sign in"
          onClick={configs.handleSubmit}
          variant="secondary"
        />
      ) : (
        <Button
          text="Register"
          onClick={configs.handleSubmit}
          variant="secondary"
        />
      )}
    </form>
  );
};

export default Form;
