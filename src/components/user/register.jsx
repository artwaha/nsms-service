import React, { useEffect, useState } from "react";
import Seo from "../../layout/seo";
import { register } from "../../services/user-service";
import { useNavigate } from "react-router-dom";
import { getAllRoles, getAllStations } from "../../services/system-config-service";

const Register = () => {
  const navigate = useNavigate();
  const [allRoles, setAllRoles] = useState([]);
  const [allStations, setAllStations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    station: "",
    role: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const roles = await getAllRoles();
      const stations = await getAllStations();
      setAllRoles(roles);
      setAllStations(stations);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log({ [name]: value });
    setformData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleRetry = () => {
    setErrorMessage(null);
    fetchData();
  };

  const isValidRole = (role) => {
    return role && role !== "-";
  };

  const isValidStation = (station, role) => {
    return role === "4" ? station && station !== "-" : true;
  };

  const validateFormData = (form) => {
    if (!isValidRole(form.role)) {
      alert("Role is required");
    } else if (!isValidStation(form.station, form.role)) {
      alert("Station is required!");
    } else if (form.name == "") {
      alert("Name is required");
    } else if (form.password == "") {
      alert("Password is required");
    } else if (form.email == "") {
      alert("Email is required");
    } else {
      // Common logic for both cases
      form.role = parseInt(form.role, 10);
      if (form.role === 4) {
        form.station = parseInt(form.station, 10);
        return form;
      } else {
        delete form.station;
        return form;
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const validatedFormData = validateFormData(formData);

      if (validatedFormData !== undefined) {
        await register(formData);
        alert("User Saved");
        navigate("/users");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCancel = () => {
    navigate("/users");
  };

  return (
    <div>
      <Seo description="New User" title="New User" />
      <h1 className="text-xl text-green-700 mb-2">New User</h1>
      {isLoading ? (
        <div>Loading User Roles...</div>
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
            <label className=" font-semibold">Name: </label>
            <input
              type="text"
              name="name"
              className="outline-none border p-1  mb-2 mt-2 w-fit"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className=" font-semibold">Email: </label>
            <input
              type="email"
              name="email"
              className="outline-none border p-1  mb-2 w-fit"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className=" font-semibold">Password: </label>
            <input
              type="password"
              name="password"
              className="border p-1 outline-none  w-fit mb-2"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className=" font-semibold">Role: </label>
            <select
              name="role"
              className="border p-1 outline-none  w-fit mb-2"
              onChange={handleChange}
            >
              <option value="-">-</option>
              {allRoles.map((role, index) => (
                <option key={index} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          {formData.role == "4" && (
            <div>
              <label className=" font-semibold">Station: </label>
              <select
                name="station"
                className="border p-1 outline-none w-fit mb-2"
                onChange={handleChange}
              >
                <option value="-">-</option>
                {allStations.map((station, index) => (
                  <option key={index} value={station.id}>
                    {station.name}
                  </option>
                ))}
              </select>
            </div>
          )}

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

export default Register;
