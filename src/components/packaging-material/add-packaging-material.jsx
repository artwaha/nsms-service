import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Seo from "../../layout/seo";
import { addPackagingMaterials } from "../../services/system-config-service";

const AddPackagingMaterial = () => {
  const [formData, setformData] = useState({
    name: "",
    minimumStockThreshold: "",
  });
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/system-config/packaging-materials");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!formData.name && !formData.minimumStockThreshold) {
        alert("Packaging Material Name & Minimum Stock Threshold are Required");
      } else if (!formData.name) {
        alert("Packaging Material Name is Required");
      } else if (!formData.minimumStockThreshold) {
        alert("Minimum Stock Threshold is Required");
      } else {
        formData.minimumStockThreshold = parseInt(
          formData.minimumStockThreshold,
          10
        );
        await addPackagingMaterials(formData);
        alert("Packaging Material Saved");
        navigate("/system-config/packaging-materials");
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
      <Seo description="Packaging Materials" title="Packaging Materials" />
      <h1 className="text-xl text-green-700 mb-2">New Packaging Material</h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className=" font-semibold">
            Packaging Material Name:{" "}
          </label>
          <input
            autoComplete="on"
            name="name"
            id="name"
            className="outline-none border p-1 mb-2 w-fit"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="minimumStockThreshold" className="font-semibold">
            Minimum Stock Threshold:{" "}
          </label>
          <input
            type="number"
            name="minimumStockThreshold"
            id="minimumStockThreshold"
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

export default AddPackagingMaterial;
