export function useApiFetch<T>() {
  const axios = useNuxtApp().$axios;

  const Api = axios.create({
    baseURL: "https://toko.hermawantan.com/api",
  });
  return Api;
}
