import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Seo from "../../layout/seo";
import { addLocation } from "../../services/system-config-service";

const AddLocation = () => {
  const [formData, setformData] = useState({ name: "" });
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/system-config/locations");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!formData.name) {
        alert("Location name is Required");
      } else {
        await addLocation(formData);
        alert("Location Saved");
        navigate("/system-config/locations");
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

  return (
    <div>
      <Seo description="New Location" title="New Location" />
      <h1 className="text-xl text-green-700 mb-2">New Location</h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div>
          <label className=" font-semibold">Location Name: </label>
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

export default AddLocation;
