import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../assets/movie_logo.png";
import { Form } from "../../components";
import { useUserContext } from "../../providers/UserProvider";

const Login = () => {
  const { login } = useUserContext();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const success = await login(formData.email, formData.password);
    if (success) {
      toast.success("Login successful.");
      navigate("/");
    }
  };
  const loginConfig = {
    inputs: [
      {
        type: "text",
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
    handleSubmit: handleSubmit,
    type: "login",
  };

  return (
    <div>
      <div className="flex min-h-screen flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-background">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-16 w-auto" src={logo} alt="Your Company" />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-primary">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <Form configs={loginConfig} />

            <div className="flex items-center justify-between mt-4">
              <div className="text-sm leading-6">
                <a
                  href="#"
                  className="font-semibold text-accent hover:opacity-70"
                >
                  Forgot password?
                </a>
              </div>
              <div className="text-sm leading-6">
                <Link
                  to="/register"
                  className="font-semibold text-text hover:text-opacity-70"
                >
                  Create an account?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
