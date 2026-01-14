import { useEffect } from "react";

import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";

export const useAuth = ({ middleware, url }) => {
  const token = localStorage.getItem("AUTH_TOKEN");
  const navigate = useNavigate();
  const {
    data: user,
    error,
    mutate,
  } = useSWR(token ? "/api/user" : null, () =>
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

  const registro = async (datos, setErrores) => {
    try {
      const { data } = await clienteAxios.post("/api/registro", datos);
      localStorage.setItem("AUTH_TOKEN", data.token);
      setErrores([]);
      await mutate();
      navigate(url);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrores(Object.values(error.response.data.errors));
      } else {
        setErrores(["Hubo un error al crear la cuenta. Intenta más tarde."]);
      }
    }
  };

  const logout = async () => {
    try {
      await clienteAxios.post("/api/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      localStorage.removeItem("AUTH_TOKEN");
      await mutate(undefined, { revalidate: false });
      navigate("/auth/login");
    }
  };

  useEffect(() => {
    if (middleware === "guest" && url && user) {
      navigate(url);
    }
    if (middleware === "guest" && user && user.admin) {
      navigate("/admin");
    }

    if (middleware === "admin" && user && !user.admin) {
      navigate("/");
    }
    if (middleware === "auth" && !user) {
      navigate("/auth/login");
    }
  }, [user, error]);

  return {
    login,
    registro,
    logout,
    user,
    error,
  };
};
