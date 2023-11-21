import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Seo from "../../layout/seo";
import { getAllStations } from "../../services/system-config-service";

const ManageStations = () => {
  const [allStations, setAllStations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const stations = await getAllStations();
      setAllStations(stations);
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
      <Seo title="Service Points" description="Service Points" />
      <h1 className="text-xl text-green-700 mb-2">Service Points</h1>
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
        <Link to="new-station" className="text-blue-600 ml-4">
          <span className="text-xl">+</span> Add Station
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
              <th>Service Point</th>
              <th>Location</th>
              <th>Station Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allStations.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-red-600">
                  No Stations found
                </td>
              </tr>
            ) : (
              allStations.map((station, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{station.name}</td>
                  <td>{station.location}</td>
                  <td>{station.status.toLowerCase()}</td>
                  <td>
                    <Link
                      to={`${station.id}/details`}
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

export default ManageStations;
