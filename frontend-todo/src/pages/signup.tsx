import axios from "axios";
import React, { useState } from "react";
import { apiEndpoints } from "../assets/authconfig";
import { useNavigate } from "react-router-dom";

interface SignUpInterface {}
const SignUp: React.FC<SignUpInterface> = ({}) => {
  // email, password, firstname, lastname
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signUpHandler = async () => {
    try {
      const res = await axios.post(
        `${apiEndpoints.backendAPIEndpiont}/user/signup`,
        {
          email,
          password,
          firstname: fname,
          lastname: lname,
        }
      );
      console.log(res.data.token);
      localStorage.setItem("todoToken", res.data.token);
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      console.log("error");
      console.log(err);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4  ">Sign Up</h2>

        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter First Name"
            value={fname}
            onChange={(e) => {
              setFname(e.target.value);
            }}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter Last Name"
            value={lname}
            onChange={(e) => {
              setLname(e.target.value);
            }}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email Address"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          onClick={signUpHandler}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
