import { useState } from "react";
import { Button, Input } from "../../components";
import { useUserContext } from "../../providers/UserProvider";

const PasswordChangeForm = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { updatePassword } = useUserContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      setError("Passwords do not match.");
      return;
    }
    const result = await updatePassword(
      passwords.currentPassword,
      passwords.newPassword
    );
    if (result.success) {
      setSuccess("Password successfully updated.");
      setError("");
    } else {
      setError(result.message as string);
      setSuccess("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="lg:w-[30%] w-full p-4 bg-white rounded-lg flex-col flex gap-4"
    >
      <Input
        config={{
          type: "password",
          name: "currentPassword",
          value: passwords.currentPassword,
          handleChange: handleChange,
          required: true,
          label: "Current Password",
        }}
      />

      <Input
        config={{
          type: "password",
          name: "newPassword",
          value: passwords.newPassword,
          handleChange: handleChange,
          required: true,
          label: "New Password",
        }}
      />
      <Input
        config={{
          type: "password",
          name: "confirmNewPassword",
          value: passwords.confirmNewPassword,
          handleChange: handleChange,
          required: true,
          label: "Confirm New Password",
        }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <Button
        text="Update Password"
        variant="secondary"
        type="submit"
        onClick={() => {}}
      />
    </form>
  );
};

export default PasswordChangeForm;
