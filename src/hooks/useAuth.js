import clienteAxios from "../config/axios";

export const useAuth = ({ middleware, url }) => {
  const login = async (datos, setErrores) => {
    try {
      const { data } = await clienteAxios.post("/api/login", datos);
      localStorage.setItem("AUTH_TOKEN", data.token);
      setErrores([]);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrores(Object.values(error.response.data.errors));
      } else {
        setErrores(["Hubo un error al crear la cuenta. Intenta más tarde."]);
      }
    }
  };

  const registro = () => {};

  const logout = () => {};

  return {
    login,
    registro,
    logout,
  };
};
