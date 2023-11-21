import React, { useEffect, useState } from "react";
import Seo from "../../layout/seo";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDetails, updateUserDetails } from "../../services/user-service";
import { getAllRoles, getAllStations } from "../../services/system-config-service";

const UserDetails = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [initialUserDetails, setInitialUserDetails] = useState({});
  const [dirtyFields, setDirtyFields] = useState({});
  const [allRoles, setAllRoles] = useState([]);
  const [allStations, setAllStations] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Update dirtyFields whenever userDetails changes
    const changes = Object.keys(userDetails).reduce((result, key) => {
      if (userDetails[key] !== initialUserDetails[key]) {
        result[key] = userDetails[key];
      }
      return result;
    }, {});
    setDirtyFields(changes);
  }, [userDetails, initialUserDetails]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getUserDetails(userId);
      const roles = await getAllRoles();
      const stations = await getAllStations();
      setUserDetails(response);
      setAllRoles(roles);
      setAllStations(stations);
      setInitialUserDetails(response);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!Object.keys(dirtyFields).length) {
        alert("Unable to save changes, nothing changed!");
      } else {
        if (!isValidStation(dirtyFields.station, dirtyFields.role)) {
          alert("Station is required!");
        } else if (dirtyFields.name == "") {
          alert("Name is Required");
        } else if (dirtyFields.email == "") {
          alert("Email is Required");
        } else {
          // const response = updateUserDetails(userId, dirtyFields);
          if (dirtyFields.role) {
            dirtyFields.role = allRoles.find(
              (role) => role.name == dirtyFields.role
            ).id;
          }

          if (dirtyFields.station) {
            dirtyFields.station = allStations.find(
              (station) => station.name == dirtyFields.station
            ).id;
          }

          // console.log(dirtyFields);
          await updateUserDetails(userId, dirtyFields);
          fetchData();
          alert("User Details Updated");
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCancel = () => {
    navigate("/users");
  };

  const handleRetry = () => {
    setErrorMessage(null);
    fetchData();
  };

  const isValidStation = (station, role) => {
    return role == "Service Point Advisor" ? station && station !== "-" : true;
  };

  return (
    <div>
      <Seo description="User Details" title="User Details" />
      <h1 className="text-xl text-green-700 mb-2">User Details</h1>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : errorMessage ? (
        <div className="text-red-600">
          {errorMessage}
          <button onClick={handleRetry} className="text-blue-600 ml-2">
            Retry
          </button>
        </div>
      ) : Object.keys(userDetails).length === 0 ? (
        <h1 className="text-red-600">User Details Not found</h1>
      ) : (
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div>
            <label className=" font-semibold">Name: </label>
            <input
              defaultValue={userDetails.name}
              type="text"
              name="name"
              className="outline-none border p-1 mb-2 mt-2 w-fit"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className=" font-semibold">Email: </label>
            <input
              defaultValue={userDetails.email}
              type="email"
              name="email"
              className="outline-none border p-1  mb-2 w-fit"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className=" font-semibold">Role: </label>
            <select
              defaultValue={userDetails.role}
              name="role"
              className="border p-1 outline-none  w-fit mb-2"
              onChange={handleChange}
            >
              {allRoles.map((role, index) => (
                <option key={index} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          {userDetails.role === "Service Point Advisor" && (
            <div>
              <label className=" font-semibold">Station: </label>
              <select
                defaultValue={userDetails.station}
                name="station"
                className="border p-1 outline-none  w-fit mb-2"
                onChange={handleChange}
              >
                {allStations.map((station, index) => (
                  <option key={index} value={station.name}>
                    {station.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className=" font-semibold">Registered: </label>
            <input
              readOnly
              defaultValue={userDetails.registered}
              name="registered"
              className="border p-1 outline-none  w-fit mb-2"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className=" font-semibold">last LogIn: </label>
            <input
              readOnly
              defaultValue={userDetails.lastLogIn}
              name="lastLogIn"
              className="border p-1 outline-none  w-fit mb-2"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className=" font-semibold">User Status: </label>
            <select
              defaultValue={userDetails.status}
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

export default UserDetails;
