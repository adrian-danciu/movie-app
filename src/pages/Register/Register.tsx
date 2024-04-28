import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../../api/auth/auth";
import logo from "../../assets/movie_logo.png";
import Form from "../../components/Form/Form";
import { IUser } from "../../types/User.types";

const Register = () => {
  const [formData, setFormData] = useState({} as IUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (formData: IUser) => {
    await registerUser(formData);
  };

  const registerConfig = {
    inputs: [
      {
        type: "text",
        name: "firstName",
        label: "First name",
        handleChange: handleChange,
        required: true,
      },
      {
        type: "text",
        name: "lastName",
        label: "Last name",
        handleChange: handleChange,
        required: true,
      },
      {
        type: "email",
        name: "email",
        label: "Email address",
        handleChange: handleChange,
        required: true,
      },
      {
        type: "password",
        name: "password",
        label: "Password",
        handleChange: handleChange,
        required: true,
      },
    ],
    handleSubmit: () => handleSubmit(formData),
    type: "register",
  };

  return (
    <div>
      <div className="flex min-h-screen flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-background">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-16 w-auto" src={logo} alt="Your Company" />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-primary">
            Create an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <Form configs={registerConfig} />

            <div className="flex items-center justify-between mt-4">
              <div className="text-sm leading-6">
                <Link
                  to="/login"
                  className="font-semibold text-text hover:text-opacity-70"
                >
                  Already have an account?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
