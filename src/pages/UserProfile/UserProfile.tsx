import { SpinnerComponent } from "../../components";
import { useUserContext } from "../../providers/UserProvider";
import PasswordChangeForm from "./PasswordChangeForm";

const UserProfile = () => {
  const { currentUser } = useUserContext();

  if (!currentUser) {
    return <SpinnerComponent />;
  }

  return (
    <div className="bg-background h-screen py-4">
      <div className="flex flex-col justify-center items-center text-primary gap-2">
        <img
          className="h-8 w-8 rounded-full"
          src="https://i.pinimg.com/736x/38/cf/07/38cf07312b17a66a8e0ee071d1f73043.jpg"
          alt="Profile"
        />
        <p className="text-xl font-bold">
          <span className="text-md font-normal">Email:</span>
          {currentUser.email}
        </p>
        <p className="text-xl font-bold">
          <span className="text-md font-normal">First Name:</span>
          {currentUser.firstName}
        </p>
        <p className="text-xl font-bold">
          <span className="text-md font-normal">Last Name:</span>
          {currentUser.lastName}
        </p>

        <PasswordChangeForm />
      </div>
    </div>
  );
};

export default UserProfile;
