import React, { useEffect } from "react";
import Seo from "../../layout/seo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addStation, getAllLocations } from "../../services/system-config-service";

const AddStation = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setformData] = useState({ name: "", location: "" });
  const navigate = useNavigate();

  const fetchData = async () => {
    setIsLoading(true);
    const locations = await getAllLocations();
    setIsLoading(false);
    const activeLocations = locations.filter(
      (location) => location.status == "ACTIVE"
    );

    setAllLocations(activeLocations);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCancel = () => {
    navigate("/system-config/stations");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.name && !isValidLocation(formData.location)) {
      alert("Location and Station name are Required");
    } else if (!isValidLocation(formData.location)) {
      alert("Location is Required");
    } else if (!formData.name) {
      alert("Station name Required");
    } else {
      formData.location = parseInt(formData.location, 10);
      const response = await addStation(formData);
      alert("Station Saved");
      navigate("/system-config/stations");
      // console.log(formData);
    }
  };

  const isValidLocation = (location) => {
    return location && location !== "-";
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setformData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  return (
    <div>
      <Seo description="New Role" title="New Role" />
      <h1 className="text-xl text-green-700 mb-2">New Station</h1>
      {isLoading ? (
        <div>Loading Locations...</div>
      ) : allLocations.length === 0 ? (
        <div className="text-red-600">
          No Active Locations found. You must add Locations before adding
          Stations
        </div>
      ) : (
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div>
            <label className=" font-semibold">Station Name: </label>
            <input
              name="name"
              className="outline-none border p-1 mb-2 w-fit"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className=" font-semibold">Location: </label>
            <select
              name="location"
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
