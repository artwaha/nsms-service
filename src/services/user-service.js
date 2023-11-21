import axios from "axios";
const BASE_URL = "http://localhost:8080/api/v1/users";

export const register = async (user) => {
  try {
    const response = await axios.post(BASE_URL, user);
    return response.data;
  } catch (error) {
    throw new Error("Unable to register User");
  }
};

export const login = async (user) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, user);
    return response.data;
  } catch (error) {
    throw new Error("Incorrect Username or password");
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    throw new Error("Failed to Fetch Users");
  }
};

export const getUserDetails = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error("Unable to fetch User details");
  }
};

export const updateUserDetails = async (userId, updatedUserDetails) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/${userId}/update`,
      updatedUserDetails
    );
    return response.data;
  } catch (error) {
    throw new Error("Unable to update User");
  }
};
