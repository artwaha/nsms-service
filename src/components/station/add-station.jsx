import React, { useEffect } from "react";
import Seo from "../../layout/seo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addStation,
  getAllLocations,
} from "../../services/system-config-service";

const AddStation = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setformData] = useState({ name: "", location: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const locations = await getAllLocations();
      const activeLocations = locations.filter(
        (location) => location.status == "ACTIVE"
      );

      setAllLocations(activeLocations);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!formData.name && !isValidLocation(formData.location)) {
        alert("Location and Station name are Required");
      } else if (!isValidLocation(formData.location)) {
        alert("Location is Required");
      } else if (!formData.name) {
        alert("Station name Required");
      } else {
        formData.location = parseInt(formData.location, 10);
        await addStation(formData);
        alert("Station Saved");
        navigate("/system-config/stations");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCancel = () => {
    navigate("/system-config/stations");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setformData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleRetry = () => {
    setErrorMessage(null);
    fetchData();
  };

  const isValidLocation = (location) => {
    return location && location !== "-";
  };

  return (
    <div>
      <Seo description="New Role" title="New Role" />
      <h1 className="text-xl text-green-700 mb-2">New Station</h1>
      {isLoading ? (
        <div>Loading ...</div>
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
              Station Name:{" "}
            </label>
            <input
              name="name"
              id="name"
              autoComplete="on"
              className="outline-none border p-1 mb-2 w-fit"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="location" className=" font-semibold">
              Location:{" "}
            </label>
            <select
              name="location"
              id="location"
              autoComplete="on"
              className="border p-1 outline-none  w-fit mb-2"
              onChange={handleChange}
            >
              <option value="-">-</option>
              {allLocations.map((location, index) => (
                <option key={index} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
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
      )}
    </div>
  );
};

export default AddStation;
