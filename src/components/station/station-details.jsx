import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Seo from "../../layout/seo";
import {
  deleteStation,
  getAllLocations,
  getStationDetails,
  updateStation,
} from "../../services/system-config-service";

const StationDetails = () => {
  const [stationDetails, setStationDetails] = useState({});
  const [dirtyFields, setDirtyFields] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { stationId } = useParams();
  const [allLocations, setAllLocations] = useState([]);
  const [initialData, setInitialData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Update dirtyFields whenever userDetails changes
    const changes = Object.keys(stationDetails).reduce((result, key) => {
      if (stationDetails[key] !== initialData[key]) {
        result[key] = stationDetails[key];
      }
      return result;
    }, {});
    setDirtyFields(changes);
  }, [stationDetails, initialData]);

  const handleCancel = () => {
    navigate("/system-config/stations");
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getStationDetails(stationId);
      const locations = await getAllLocations();
      const activeLocations = locations.filter(
        (location) => location.status == "ACTIVE"
      );
      setAllLocations(activeLocations);
      setStationDetails(response);
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
        if (dirtyFields.name == "" && dirtyFields.location === "-") {
          alert("Invalid Station and Location names");
        } else if (dirtyFields.name == "") {
          alert("Invalid Station Name");
        } else if (dirtyFields.location === "-") {
          alert("Invalid Location Name");
        } else {
          if (dirtyFields.location) {
            dirtyFields.location = allLocations.find(
              (location) => location.name == dirtyFields.location
            ).id;
          }
          await updateStation({ ...dirtyFields, id: stationId });
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
        "Are you sure you want to completely Delete this Station?"
      );

      if (isConfirmed) {
        // Delete logic goes here
        const response = await deleteStation(stationId);
        navigate("/system-config/stations");
        alert(response);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRetry = () => {
    setErrorMessage(null);
    fetchData();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStationDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  return (
    <div>
      <Seo description="Station Details" title="Station Details" />
      <h1 className="text-xl text-green-700 mb-2">Service Point Details</h1>
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
            <label htmlFor="name" className="font-semibold">
              Location Name:{" "}
            </label>
            <input
              defaultValue={stationDetails.name}
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
              defaultValue={stationDetails.location}
              name="location"
              id="location"
              className="border p-1 outline-none  w-fit mb-2"
              onChange={handleChange}
            >
              <option value="-">-</option>
              {allLocations.map((location, index) => (
                <option key={index} value={location.name}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="status" className=" font-semibold">
              Status:{" "}
            </label>
            <select
              defaultValue={stationDetails.status}
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

export default StationDetails;
