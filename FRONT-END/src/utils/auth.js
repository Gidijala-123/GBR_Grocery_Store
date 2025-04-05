// Path: FRONT-END/src/utils/auth.js

/**
 * Manages authentication tokens and headers
 */

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
    // Apply to all axios requests
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const getAuthToken = () => {
  return localStorage.getItem("token");
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

export const logout = () => {
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
  window.location.href = "/login"; // Redirect to login page
};

export const verifyToken = async () => {
  try {
    const token = getAuthToken();
    if (!token) return false;

    const response = await axios.get("/api/auth/verify", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.valid;
  } catch (error) {
    return false;
  }
};
