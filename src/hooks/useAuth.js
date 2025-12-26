import useSWR from "swr";

import clienteAxios from "../config/axios";

export const useAuth = ({ middleware, url }) => {
  const token = localStorage.getItem("AUTH_TOKEN");
  const {
    data: user,
    error,
    mutate,
  } = useSWR("/api/user", () =>
    clienteAxios("/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.data)
      .catch((error) => {
        throw Error(error?.response?.data?.errors);
      })
  );

  const login = async (datos, setErrores) => {
    try {
      const { data } = await clienteAxios.post("/api/login", datos);
      localStorage.setItem("AUTH_TOKEN", data.token);
      setErrores([]);
      await mutate();
    } catch (error) {
      if (error?.response?.data?.errors) {
        setErrores(Object.values(error?.response?.data?.errors));
      } else {
        setErrores(["Hubo un error al crear la cuenta. Intenta más tarde."]);
      }
    }
  };

  const registro = () => {};

  const logout = () => {};

  console.log(user);
  console.log(error);

  return {
    login,
    registro,
    logout,
  };
};
