import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Seo from "../../layout/seo";
import { deleteRoles, getAllRoles } from "../../services/system-config-service";

const ManageRoles = () => {
  const [allRoles, setAllRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const roles = await getAllRoles();
      setAllRoles(roles);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (selectedRoles.length === 0) {
        alert("No Role marked for removal");
      } else {
        await deleteRoles(selectedRoles);
        fetchData();
        unmarkSelectedRoles();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const markRoleForDeletion = (roleId) => {
    setSelectedRoles([...selectedRoles, { id: roleId }]);
    // Refresh the Page
  };
  const unmarkSelectedRoles = () => {
    setSelectedRoles([]);
    if (selectedRoles.length === 0) {
      navigate("/system-config");
    }
  };

  const handleRetry = () => {
    setErrorMessage(null);
    fetchData();
  };

  const isMarkedForDeletion = (roleId) => {
    const selectedRoleIds = selectedRoles.map(
      (selectedRole) => selectedRole.id
    );
    if (selectedRoleIds.includes(roleId)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <Seo title="System Roles" description="System Roles" />
      <h1 className="text-xl text-green-700 mb-2">System Roles</h1>
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
        <Link to="new-role" className="text-blue-600 ml-4">
          <span className="text-xl">+</span> Add Role
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
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allRoles.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-red-600">
                  No Roles found
                </td>
              </tr>
            ) : (
              allRoles.map((role, index) => (
                <tr key={index}>
                  {/* <td>{index + 1}</td> */}
                  <td>{role.id}</td>
                  <td>{role.name}</td>
                  <td>
                    {role.id != 1 &&
                      role.id != 2 &&
                      role.id != 3 &&
                      role.id != 4 && (
                        <input
                          type="button"
                          onClick={() => markRoleForDeletion(role.id)}
                          className={`cursor-pointer ${
                            isMarkedForDeletion(role.id)
                              ? "text-red-600"
                              : "text-blue-600"
                          }  `}
                          value="remove"
                        />
                      )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      <div className=" mt-2">
        <input
          type="button"
          value="Save"
          onClick={handleSave}
          className="border rounded bg-black text-white w-fit cursor-pointer  p-1"
        />
        <input
          onClick={unmarkSelectedRoles}
          type="button"
          value="Cancel"
          className="border rounded bg-black text-white w-fit cursor-pointer p-1 ml-2"
        />
      </div>
    </div>
  );
};

export default ManageRoles;
