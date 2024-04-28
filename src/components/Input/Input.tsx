import { IinputProps } from "../../types/Input.types";

const Input: React.FC<IinputProps> = ({ config }) => {
  return (
    <div>
      {config.label ? (
        <label
          htmlFor={config.name}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {config.label as string}
        </label>
      ) : null}
      <div className="mt-2">
        <input
          id={config.name}
          name={config.name}
          type={config.type}
          onChange={config.handleChange}
          className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
          required={config.required}
          value={config.value}
          placeholder={config.placeholder}
        />
      </div>
    </div>
  );
};

export default Input;
