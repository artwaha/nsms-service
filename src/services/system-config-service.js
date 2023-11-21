import axios from "axios";
const BASE_URL = "http://localhost:8080/api/v1/system-config";

export const getAllStations = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/stations`);
    return response.data;
  } catch (error) {
    throw new Error("Unable to fetch stations");
  }
};

export const addStation = async (newStation) => {
  try {
    const response = await axios.post(`${BASE_URL}/stations`, newStation);
    return response.data;
  } catch (error) {
    console.error({ layer: "SYSTEM-CONFIG-SERVICE", error: error.message });
    return {};
  }
};

export const getAllRoles = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/roles`);
    return response.data;
  } catch (error) {
    throw new Error("Unable to fetch roles");
  }
};

export const addRole = async (newRole) => {
  try {
    const response = await axios.post(`${BASE_URL}/roles`, newRole);
    return response.data;
  } catch (error) {
    throw new Error("Unable to Add role");
  }
};

export const addLocation = async (newLocation) => {
  try {
    const response = await axios.post(`${BASE_URL}/locations`, newLocation);
    return response.data;
  } catch (error) {
    throw new Error("Unable to Add Location");
  }
};

export const addPackagingMaterials = async (newPackagingMaterial) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/packaging-materials`,
      newPackagingMaterial
    );
    return response.data;
  } catch (error) {
    console.error({ layer: "SYSTEM-CONFIG-SERVICE", error: error.message });
    return {};
  }
};

export const getAllLocations = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/locations`);
    return response.data;
  } catch (error) {
    throw new Error("Unable to fetch all Locations");
  }
};

export const getLocationDetails = async (locationId) => {
  try {
    const response = await axios.get(`${BASE_URL}/locations/${locationId}`);
    return response.data;
  } catch (error) {
    throw new Error("Unable to fetch Location Details");
  }
};

export const getStationDetails = async (stationId) => {
  try {
    const response = await axios.get(`${BASE_URL}/stations/${stationId}`);
    return response.data;
  } catch (error) {
    console.error({ layer: "SYSTEM-CONFIG-SERVICE", error: error.message });
    return {};
  }
};

export const getAllPackagingMaterials = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/packaging-materials`);
    return response.data;
  } catch (error) {
    console.error({ layer: "SYSTEM-CONFIG-SERVICE", error: error.message });
    return [];
  }
};

export const deleteRoles = async (rolesToDelete) => {
  try {
    const response = await axios.delete(`${BASE_URL}/roles/delete`, {
      data: rolesToDelete,
    });
    return response.data;
  } catch (error) {
    throw new Error("Unable to Delete given roles");
  }
};

export const deletePackagingMaterial = async (packagingMaterialId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/packaging-materials/${packagingMaterialId}/delete`
    );
    return response.data;
  } catch (error) {
    console.error({ layer: "SYSTEM-CONFIG-SERVICE", error: error.message });
    return "Failure";
  }
};

export const deleteStation = async (stationId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/stations/${stationId}/delete`
    );
    return response.data;
  } catch (error) {
    console.error({ layer: "SYSTEM-CONFIG-SERVICE", error: error.message });
    return "Failure";
  }
};

export const deleteLocation = async (locationId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/locations/${locationId}/delete`
    );
    return response.data;
  } catch (error) {
    throw new Error("Unable to delete location");
  }
};

export const getPackagingMaterialDetails = async (packagingMaterialId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/packaging-materials/${packagingMaterialId}`
    );
    return response.data;
  } catch (error) {
    console.error({ layer: "SYSTEM-CONFIG-SERVICE", error: error.message });
    return {};
  }
};

export const updatePackagingMaterialDetails = async (packagingMaterial) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/packaging-materials/update`,
      packagingMaterial
    );
    return response.data;
  } catch (error) {
    console.error({ layer: "USER-SERVICE", error: error.message });
    return {};
  }
};

export const updateLocation = async (location) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/locations/update`,
      location
    );
    return response.data;
  } catch (error) {
    throw new Error("Unable to update Location");
  }
};
export const updateStation = async (station) => {
  try {
    const response = await axios.patch(`${BASE_URL}/stations/update`, station);
    return response.data;
  } catch (error) {
    console.error({ layer: "SYSTEM-CONFIG-SERVICE", error: error.message });
    return {};
  }
};
