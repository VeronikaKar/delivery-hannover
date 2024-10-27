import { $authHost, $host } from "./index";
import jwtDecode from "jwt-decode";

export const registration = async (email, password, name, surname, role) => {
  try {
    const { data } = await $host.post("api/user/registration", {
      email,
      password,
      name,
      surname,
      role,
    });
    console.log(data);
    localStorage.setItem("token", data.token);
    return { token: jwtDecode(data.token) };
  } catch (e) {
    console.error("Registration failed:", e);
    throw e;
  }
};

export const login = async (email, password) => {
  try {
    const { data } = await $host.post("api/user/login", { email, password });
    localStorage.setItem("token", data.token);
    return { token: jwtDecode(data.token) };
  } catch (e) {
    console.error("Login failed:", e);
    throw e;
  }
};
export const check = async () => {
  try {
    const { data } = await $authHost.get("api/user/auth");
    localStorage.setItem("token", data.token);
    return { token: jwtDecode(data.token) };
  } catch (e) {
    console.error("Token validation failed:", e);
    localStorage.removeItem("token");
    throw e;
  }
};
export const getUser = async (params) => {
  try {
    const { data } = await $host.get(`api/user/${params || ""}`);
    return { data };
  } catch (e) {
    console.error("Failed to fetch user data:", e);
    throw e;
  }
};
