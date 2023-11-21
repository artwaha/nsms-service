import React, { useEffect, useState } from "react";
import Seo from "../../layout/seo";
import { Link, useNavigate } from "react-router-dom";
import { getAllUsers } from "../../services/user-service";

const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const users = await getAllUsers();
      setAllUsers(users);
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Seo description="Manage Users" title="Manage Users" />
      <h1 className="text-xl text-green-700 mb-2">Manage Users</h1>
      <div className="flex items-center mb-4">
        <div>
          <label className=" font-semibold">Search: </label>
          <input
            type="search"
            name="search"
            placeholder="type to search..."
            className="outline-none border p-1  w-fit"
          />
        </div>
        <Link to="new-user" className="text-blue-600 ml-4">
          <span className="text-xl">+</span> Add User
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
              <th>Name</th>
              <th>Role</th>
              <th>Station</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-red-600">
                  No Users found
                </td>
              </tr>
            ) : (
              allUsers.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>{user.station}</td>
                  <td>{user.status}</td>
                  <td>
                    <Link to={`${user.id}/details`} className="text-blue-600 ">
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

export default ManageUsers;
