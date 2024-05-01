import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { logoutUser } from "../../api/auth/auth";
import logo from "../../assets/movie_logo.png";
import { useUserContext } from "../../providers/UserProvider";
import SpinnerComponent from "../Spinner/SpinnerComponent";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const location = useLocation();
  const { currentUser, loading } = useUserContext();

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  if (loading) {
    return <SpinnerComponent />;
  }

  const baseNavigation = [{ name: "Home", path: "/" }];
  const navigation = currentUser
    ? [...baseNavigation, { name: "Favorites", path: "/favorites" }]
    : baseNavigation;

  const getNavItemClass = (path: string) => {
    return location.pathname === path
      ? "text-primary"
      : "text-text hover:text-primary";
  };

  return (
    <nav className="bg-background h-16">
      <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img className="h-12 w-auto" src={logo} alt="Matrix Mov" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`${getNavItemClass(item.path)} rounded-md px-3 py-4 text-sm font-medium`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {currentUser ? (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div
                className="relative ml-3"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              >
                <button className="flex rounded-full bg-primary text-sm">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://i.pinimg.com/736x/38/cf/07/38cf07312b17a66a8e0ee071d1f73043.jpg"
                    alt="Profile"
                  />
                </button>
                {profileMenuOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Your Profile
                    </Link>
                    <Link
                      to="/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={logoutUser}
                    >
                      Sign out
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-primary">
                Login
              </Link>
              <Link to="/register" className="text-primary">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`${getNavItemClass(item.path)} block rounded-md px-3 py-2 text-base font-medium`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
