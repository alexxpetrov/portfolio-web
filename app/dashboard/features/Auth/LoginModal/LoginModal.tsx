import { notification } from "antd";
import { UserContext } from "dashboard/contexts/UserContext";
import { LoginDtoType, RegisterDtoType, User } from "dashboard/types/User";
import { useContext, useEffect, useState } from "react";

export const LoginModal = () => {
  const { login, register, handleWebAuthRegister } = useContext(UserContext);
  const [formState, setFormState] = useState<"login" | "register">("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    remember: false,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const [, setOpened] = useState(true);

  const handleBiometricAuth = async () => {
    const response = await handleWebAuthRegister();

    notification.success({
      description: "Success",
      message:
        !response?.firstName && !response?.lastName
          ? "Welcome! Please fill in your profile details"
          : `Welcome ${response?.firstName ?? ""} ${response?.lastName ?? ""}`,
      icon: "check",
    });

    setOpened(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e!.preventDefault(); // Prevent page refresh

    let response: User | null = null;
    let authDto;

    switch (formState) {
      case "login":
        authDto = {
          email: formData.email,
          password: formData.password,
        };

        response = await login(authDto as LoginDtoType);
        break;
      case "register":
        authDto = {
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName ?? "",
          lastName: formData.lastName ?? "",
        };
        response = await register(authDto as RegisterDtoType);

        break;
      default:
        break;
    }

    notification.success({
      description: "Success",
      message: `Welcome ${response?.firstName} ${response?.lastName}`,
      icon: "check",
    });

    setOpened(false);

    if (formState === "login") {
      // Perform login API call
      console.log("Logging in with data:", formData);
    } else {
      // Perform registration API call
      console.log("Registering with data:", formData);
    }
  };

  useEffect(() => {
    handleBiometricAuth();
  }, []);

  return (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-95 flex items-center justify-center z-50">
      <div className="bg-slate-800 text-slate-200 rounded-md p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-teal-300 mb-4">
          {formState === "login" ? "Log In" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-teal-300 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 bg-slate-700 text-slate-200 rounded-md outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-teal-300 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 bg-slate-700 text-slate-200 rounded-md outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          {formState === "register" && (
            <>
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-teal-300 mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-slate-700 text-slate-200 rounded-md outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-teal-300 mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-slate-700 text-slate-200 rounded-md outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
            </>
          )}
          {/* <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              checked={formData.remember}
              onChange={handleInputChange}
              className="h-4 w-4 text-teal-500 focus:ring-2 focus:ring-teal-500 border-slate-600 bg-slate-700 rounded"
            />
            <label
              htmlFor="remember"
              className="text-sm text-slate-400 cursor-pointer"
            >
              Remember me
            </label>
          </div> */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() =>
                setFormState(formState === "login" ? "register" : "login")
              }
              className="text-teal-300 hover:underline"
            >
              {formState === "login"
                ? "Create an account"
                : "Already a member?"}
            </button>
          </div>
          <div className="space-y-2">
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md focus:ring-2 focus:ring-teal-500"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => handleBiometricAuth()}
              className="w-full bg-slate-700 hover:bg-slate-800 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center space-x-2"
            >
              <span>Sign in with Fingerprint</span>
              {/* Add your fingerprint icon here */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
