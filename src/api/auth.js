import axios from "axios";

export const login = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`Login failed: ${error.response.data.error}`);
    } else {
      throw new Error("Login failed: Network Error");
    }
  }
};

export const register = async (name, email, password) => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`Registration failed: ${error.response.data.error}`);
    } else {
      throw new Error("Registration failed: Network Error");
    }
  }
};
