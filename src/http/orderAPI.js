import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const deleteOrder = async (id) => {
  const { data } = await $host.delete("api/order/" + id);
  return data;
};

export const createOrder = async (order) => {
  const { data } = await $host.post("api/order/create", order);
  return data;
};

export const createFeedback = async (f) => {
  const { data } = await $host.post("api/order/feedback", f);
  return data;
};

export const getFeedbacks = async () => {
  const { data } = await $host.get("api/order/feedback");
  return data;
};
export const changeOrder = async (order) => {
  const { data } = await $host.put("api/order/", order);
  return data;
};
export const getAllOrders = async (active) => {
  const { data } = await $host.get("api/order/" + active);
  return data;
};
export const getOrders = async (id, active) => {
  const { data } = await $host.get("api/order/" + id + "/" + active);
  return data;
};
export const allOrders = async (active) => {
  const { data } = await $host.get("api/orders/" + active);
  return data;
};

export const getCities = async () => {
  const { data } = await $host.get("api/order/cities");
  return data;
};
