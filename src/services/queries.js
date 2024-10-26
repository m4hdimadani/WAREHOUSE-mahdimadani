import api from "../configs/api";
import { useMutation } from "@tanstack/react-query";

const getProducts = (data) => api.get("products", data);

const useNewProducts = () => {
  const mutationFn = (data) => api.post("products", data);
  return useMutation({ mutationFn });
};

export { getProducts, useNewProducts, searchProduct };
