import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Seo from "../../layout/seo";
import { addRole } from "../../services/system-config-service";

const AddRole = () => {
  const [formData, setformData] = useState({ name: "" });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!formData.name) {
        alert("Role Name is Required");
      } else {
        await addRole(formData);
        alert("Role Saved");
        navigate("/system-config/roles");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setformData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleCancel = () => {
    navigate("/system-config/roles");
  };

  return (
    <div>
      <Seo description="New Role" title="New Role" />
      <h1 className="text-xl text-green-700 mb-2">New Role</h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div>
          <label className=" font-semibold">Role Name: </label>
          <input
            name="name"
            className="outline-none border p-1 mb-2 w-fit"
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="submit"
            value="Save"
            className="border rounded bg-black text-white w-fit cursor-pointer  p-1 font-semibold"
          />
          <input
            onClick={handleCancel}
            type="button"
            value="Cancel"
            className="border rounded bg-black text-white w-fit cursor-pointer  p-1 font-semibold ml-2"
          />
        </div>
      </form>
    </div>
  );
};

export default AddRole;
