import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSignUpMutation,useCheckSignInMutation } from "../redux/api/apiSlice";
import { setTokenAndUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hook";
const SignUp = () => {
  const [checkSignIn] = useCheckSignInMutation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpMutation] = useSignUpMutation();
  const dispatch = useAppDispatch();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      toast.error(
        `Please fill all the fields: ${name.length === 0 ? "name" : ""} ${
          email.length === 0 ? ", email" : ""
        } ${password.length === 0 ? ", password" : ""}`
      );
      return;
    }
    if (password.length < 6) {
      toast.error("Password length minimum 6.");
      return;
    }
    if (name.length > 0 && email.length > 0 && password.length > 5) {
      signUpMutation({
        userData: {
          name,
          email,
          password,
          token: {
            tokenText: "",
            validateTime: new Date(),
          },
        },
      }).then((response) => {
        if ("data" in response) {
          toast.success(response.data.message);
          const token = response.data.data.token.tokenText;
          if (token) {
            localStorage.setItem("bookishHaven-token", token);
            checkSignIn({
              token: token,
            }).then((response) => {
              console.log(response);
              if ("data" in response) {
                if (response.data.data) {
                  // toast.success(response.data.message);
                  dispatch(
                    setTokenAndUser({
                      token: token,
                      user: response.data.data,
                    })
                  );
                } else {
                  toast.error(response.data.message);
                  localStorage.removeItem("bookishHaven-token");
                }
              } else if ("error" in response) {
                if ("error" in response.error) {
                  toast.warn("Something went wrong");
                }
              }
            });
          }
        } else if ("error" in response) {
          if ("error" in response.error) {
            if (response.error.error.match("TypeError: Failed to fetch")) {
              toast.warn("Type Error : Email already have an account!");
            }
          }
        }
      });
    }
  };
  return (
    <div className="my-10 flex justify-center">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign up to our platform
          </h5>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-start">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  required
                />
              </div>
              <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
            >
              Lost Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create your account
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Have an account?{" "}
            <Link
              to="/signin"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
