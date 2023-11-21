import React, { useEffect, useState } from "react";
import Seo from "../../layout/seo";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteRoles,
  getAllPackagingMaterials,
  getAllRoles,
} from "../../services/system-config-service";

const ManagePackagingMaterials = () => {
  const [allPackagingMaterials, setAllPackagingMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    setIsLoading(true);
    const packagingMaterials = await getAllPackagingMaterials();
    setIsLoading(false);
    setAllPackagingMaterials(packagingMaterials);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCancel = () => {
    navigate("/system-config");
  };

  return (
    <div>
      <Seo title="Packaging Materials" description="Packaging Materials" />
      <h1 className="text-xl text-green-700 mb-2">Packaging Materials</h1>
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
        <Link to="new-packaging-material" className="text-blue-600 ml-4">
          <span className="text-xl">+</span> Add Packaging Material
        </Link>
      </div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <table>
          <thead>
            <tr>
              <th className="text-left">#</th>
              <th>Packaging Material</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allPackagingMaterials.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-red-600">
                  No Packaging Materials found
                </td>
              </tr>
            ) : (
              allPackagingMaterials.map((packagingMaterial, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{packagingMaterial.name}</td>
                  <td>{packagingMaterial.status.toLowerCase()}</td>
                  <td>
                    <Link
                      to={`${packagingMaterial.id}/details`}
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

export default ManagePackagingMaterials;
