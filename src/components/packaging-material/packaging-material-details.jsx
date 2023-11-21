import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Seo from "../../layout/seo";
import {
  deletePackagingMaterial,
  getPackagingMaterialDetails,
  updatePackagingMaterialDetails,
} from "../../services/system-config-service";

const PackagingMaterialDetails = () => {
  const [packagingMaterialDetails, setPackagingMaterialDetails] = useState({});
  const [dirtyFields, setDirtyFields] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { packagingMaterialId } = useParams();
  const [initialData, setInitialData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Update dirtyFields whenever userDetails changes
    const changes = Object.keys(packagingMaterialDetails).reduce(
      (result, key) => {
        if (packagingMaterialDetails[key] !== initialData[key]) {
          result[key] = packagingMaterialDetails[key];
        }
        return result;
      },
      {}
    );
    // console.log("Dirty: ", changes);
    setDirtyFields(changes);
  }, [packagingMaterialDetails, initialData]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getPackagingMaterialDetails(packagingMaterialId);
      setPackagingMaterialDetails(response);
      setInitialData(response);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!Object.keys(dirtyFields).length) {
        alert("Unable to save changes, nothing changed!");
      } else {
        if (dirtyFields.name == "" && !dirtyFields.minimumStockThreshold) {
          alert(
            "Packaging Material Name and Minimum Stock Threshold cant be empty"
          );
        } else if (dirtyFields.name == "") {
          alert("Invalid Packaging Material Name");
        } else if (dirtyFields.minimumStockThreshold <= 0) {
          alert("Invalid Minimum Stock Threshold");
        } else {
          await updatePackagingMaterialDetails({
            ...dirtyFields,
            id: packagingMaterialId,
          });
          fetchData();
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRemove = async () => {
    try {
      const isConfirmed = window.confirm(
        "Are you sure you want to completely Delete this packaging material?"
      );

      if (isConfirmed) {
        // Delete logic goes here
        const response = await deletePackagingMaterial(packagingMaterialId);
        navigate("/system-config/packaging-materials");
        alert(response);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCancel = () => {
    navigate("/system-config/packaging-materials");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Parse the value as an integer for the "minimumStockThreshold" field
    const parsedValue =
      name === "minimumStockThreshold" ? parseInt(value, 10) || "" : value;

    // console.log("Change: ", { name, value });
    setPackagingMaterialDetails((prevDetails) => ({
      ...prevDetails,
      [name]: parsedValue,
    }));
  };

  const handleRetry = () => {
    setErrorMessage(null);
    fetchData();
  };

  return (
    <div>
      <Seo
        description="Packaging Material Details"
        title="Packaging Material Details"
      />
      <h1 className="text-xl text-green-700 mb-2">
        Packaging Material Details
      </h1>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : errorMessage ? (
        <div className="text-red-600">
          {errorMessage}
          <button onClick={handleRetry} className="text-blue-600 ml-2">
            Retry
          </button>
        </div>
      ) : (
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className=" font-semibold">
              Packaging Material Name:{" "}
            </label>
            <input
              autoComplete="on"
              defaultValue={packagingMaterialDetails.name}
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
              defaultValue={packagingMaterialDetails.minimumStockThreshold}
              type="number"
              name="minimumStockThreshold"
              id="minimumStockThreshold"
              className="outline-none border p-1 mb-2 w-fit"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="status" className=" font-semibold">
              Status:{" "}
            </label>
            <select
              defaultValue={packagingMaterialDetails.status}
              name="status"
              id="status"
              className="border p-1 outline-none  w-fit mb-2"
              onChange={handleChange}
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          <div>
            <input
              onClick={handleRemove}
              type="button"
              value="Remove"
              className="border rounded bg-red-500 text-white w-fit cursor-pointer  p-1 font-semibold"
            />
            <input
              type="submit"
              value="Save"
              className="border rounded bg-black text-white w-fit cursor-pointer  p-1 font-semibold ml-2"
            />
            <input
              onClick={handleCancel}
              type="button"
              value="Cancel"
              className="border rounded bg-black text-white w-fit cursor-pointer  p-1 font-semibold ml-2"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default PackagingMaterialDetails;
