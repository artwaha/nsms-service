import React, { useState } from "react";
import Seo from "../../layout/seo";
import { login } from "../../services/user-service";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await login(formData);
    console.log("Response: ", response);
  };

  return (
    <div>
      <Seo description="Login Page" title="Login" />
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <h1 className="text-xl">Login Page</h1>
        <div>
          <label className="font-semibold">Email: </label>
          <input
            type="email"
            name="email"
            className="outline-none border p-1 mb-2 w-fit"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="font-semibold">Password: </label>
          <input
            type="password"
            name="password"
            className="border p-1 outline-none w-fit mb-2"
            onChange={handleChange}
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="border rounded bg-black text-white w-fit cursor-pointer p-1 font-semibold"
        />
      </form>
    </div>
  );
};

export default Login;
