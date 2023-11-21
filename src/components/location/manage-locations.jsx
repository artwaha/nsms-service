import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Seo from "../../layout/seo";
import { getAllLocations } from "../../services/system-config-service";

const ManageLocations = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const locations = await getAllLocations();
      setAllLocations(locations);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setErrorMessage(null);
    fetchData();
  };

  const handleCancel = () => {
    navigate("/system-config");
  };

  return (
    <div>
      <Seo title="Locations" description="Locations" />
      <h1 className="text-xl text-green-700 mb-2">Locations</h1>
      <div className="flex items-center mb-4">
        <div>
          <label className=" font-semibold">Search: </label>
          <input
            type="search"
            name="search"
            placeholder="type to search..."
            className="outline-none border p-1 w-fit"
          />
        </div>
        <Link to="new-location" className="text-blue-600 ml-4">
          <span className="text-xl">+</span> Add Location
        </Link>
      </div>
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
        <table>
          <thead>
            <tr>
              <th className="text-left">#</th>
              <th>Location</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allLocations.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-red-600">
                  No Locations found
                </td>
              </tr>
            ) : (
              allLocations.map((location, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{location.name}</td>
                  <td>{location.status.toLowerCase()}</td>
                  <td>
                    <Link
                      to={`${location.id}/details`}
                      className="text-blue-600 "
                    >
                      ℹ️details
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
      <input
        onClick={handleCancel}
        type="button"
        value="Cancel"
        className="border rounded bg-black text-white w-fit cursor-pointer p-1 mt-2"
      />
    </div>
  );
};

export default ManageLocations;
