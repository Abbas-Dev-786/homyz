import axios from "axios";

const DEFAULT_ERROR_MESSAGE = "Network Error or Something went wrong.";

export const baseURL = import.meta.env.DEV
  ? "http://127.0.0.1:8000/api/v1"
  : "https://homyz-4di8.onrender.com/api/v1";

const customRequest = axios.create({ baseURL });
customRequest.interceptors.request.use((config) => {
  const accessToken = JSON.parse(localStorage.getItem("user"))?.token;

  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return config;
});

export const getProperties = async ({ page, city }) => {
  try {
    const cityQuery = city ? `&city=${city}` : "";

    const res = await customRequest.get(
      `/properties?page=${page}&sort=-price${cityQuery}`
    );
    return res.data;
  } catch (err) {
    const message = err?.response?.data?.message || DEFAULT_ERROR_MESSAGE;
    throw Error(message);
  }
};

export const getCities = async () => {
  try {
    const res = await customRequest.get(`/properties/cities`);
    return res.data.data;
  } catch (err) {
    const message = err?.response?.data?.message || DEFAULT_ERROR_MESSAGE;
    throw Error(message);
  }
};

export const getTop10Properties = async () => {
  try {
    const res = await customRequest.get(`/properties/top10properties`);
    return res.data.data.docs;
  } catch (err) {
    const message = err?.response?.data?.message || DEFAULT_ERROR_MESSAGE;
    throw Error(message);
  }
};

export const getProperty = async ({ queryKey }) => {
  try {
    const res = await customRequest.get(`/properties/${queryKey[1]}`);
    return res.data.data;
  } catch (err) {
    const message = err?.response?.data?.message || DEFAULT_ERROR_MESSAGE;
    throw Error(message);
  }
};

export const registerUser = async (data) => {
  try {
    await customRequest.post(`/auth/register`, data);
  } catch (err) {
    const message = err?.response?.data?.message || DEFAULT_ERROR_MESSAGE;
    throw Error(message);
  }
};

export const LoginUser = async (data) => {
  try {
    const res = await customRequest.post(`/auth/login`, data);
    return res.data.data;
  } catch (err) {
    const message = err?.response?.data?.message || DEFAULT_ERROR_MESSAGE;
    throw Error(message);
  }
};

export const googleAuth = async (code) => {
  try {
    const res = await customRequest.post(`/auth/google`, { code });
    return res.data.data;
  } catch (err) {
    const message = err?.response?.data?.message || DEFAULT_ERROR_MESSAGE;
    throw Error(message);
  }
};

export const verifyEmail = async ({ queryKey }) => {
  try {
    const res = await customRequest.get(`/auth/verifyEmail/${queryKey[1]}`);
    return res.data.message;
  } catch (err) {
    const message = err?.response?.data?.message || DEFAULT_ERROR_MESSAGE;
    throw Error(message);
  }
};

export const forgotPassword = async (data) => {
  try {
    await customRequest.post(`/auth/forgotPassword`, data);
  } catch (err) {
    const message = err?.response?.data?.message || DEFAULT_ERROR_MESSAGE;
    throw Error(message);
  }
};

export const resetPassword = async ({ password, confirmPassword, token }) => {
  try {
    await customRequest.patch(`/auth/resetPassword/${token}`, {
      password,
      confirmPassword,
    });
  } catch (err) {
    const message = err?.response?.data?.message || DEFAULT_ERROR_MESSAGE;
    throw Error(message);
  }
};

export const updatePassword = async ({
  currentPassword,
  password,
  confirmPassword,
}) => {
  try {
    await customRequest.patch(`/auth/updatePassword`, {
      currentPassword,
      password,
      confirmPassword,
    });
  } catch (err) {
    const message = err?.response?.data?.message || DEFAULT_ERROR_MESSAGE;
    throw Error(message);
  }
};

export const createView = async ({ id, startTime }) => {
  try {
    await customRequest.post(`/properties/${id}/views`, { startTime });
  } catch (err) {
    const message =
      err?.response?.data?.message || "Session expired. Please re-login";
    throw Error(message);
  }
};

export const deleteView = async (id) => {
  try {
    await customRequest.delete(`/views/${id}`);
  } catch (err) {
    const message = err?.response?.data?.message || DEFAULT_ERROR_MESSAGE;
    throw Error(message);
  }
};

export const getME = async () => {
  try {
    const res = await customRequest.get(`/users/me`);
    return res.data.data;
  } catch (err) {
    const message = err?.response?.data?.message || DEFAULT_ERROR_MESSAGE;
    throw Error(message);
  }
};

export const updateME = async ({ id, data }) => {
  try {
    const res = await customRequest.patch(`/users/${id}`, data);
    return res.data.data;
  } catch (err) {
    const message = err?.response?.data?.message || DEFAULT_ERROR_MESSAGE;
    throw Error(message);
  }
};

export const getTransactions = async (userID) => {
  try {
    const res = await customRequest.get(`/users/${userID}/transactions`);
    return res.data.data;
  } catch (err) {
    const message = err?.response?.data?.message || DEFAULT_ERROR_MESSAGE;
    throw Error(message);
  }
};
