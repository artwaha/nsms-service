import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Seo from "../../layout/seo";
import {
  deleteLocation,
  getLocationDetails,
  updateLocation,
} from "../../services/system-config-service";

const LocationDetails = () => {
  const { locationId } = useParams();
  const navigate = useNavigate();
  const [locationDetails, setLocationDetails] = useState({});
  const [dirtyFields, setDirtyFields] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [initialData, setInitialData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Update dirtyFields whenever userDetails changes
    const changes = Object.keys(locationDetails).reduce((result, key) => {
      if (locationDetails[key] !== initialData[key]) {
        result[key] = locationDetails[key];
      }
      return result;
    }, {});
    setDirtyFields(changes);
  }, [locationDetails, initialData]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getLocationDetails(locationId);
      setLocationDetails(response);
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
        if (dirtyFields.name == "") {
          alert("Invalid Location Name");
        } else {
          await updateLocation({
            ...dirtyFields,
            id: locationId,
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
        "Are you sure you want to completely Delete this Location? Deleting this Location will also delete All Stations associated with this Location. You can deactivate this station instead. This action can't be undone"
      );

      if (isConfirmed) {
        // Delete logic goes here
        const response = await deleteLocation(locationId);
        navigate("/system-config/locations");
        alert(response);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCancel = () => {
    navigate("/system-config/locations");
  };

  const handleRetry = () => {
    setErrorMessage(null);
    fetchData();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLocationDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  return (
    <div>
      <Seo description="Location Details" title="Location Details" />
      <h1 className="text-xl text-green-700 mb-2">Location Details</h1>
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
            <label className="font-semibold">Location Name: </label>
            <input
              defaultValue={locationDetails.name}
              name="name"
              className="outline-none border p-1 mb-2 w-fit"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className=" font-semibold">Status: </label>
            <select
              defaultValue={locationDetails.status}
              name="status"
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

export default LocationDetails;
