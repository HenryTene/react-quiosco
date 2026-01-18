import useSWR from "swr";
import clienteAxios from "../config/axios";
import Producto from "../components/Producto";

export default function Productos() {
  const token = localStorage.getItem("AUTH_TOKEN");

  const fetcher = () =>
    clienteAxios
      .get("/api/productos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((datos) => datos.data.data);

  const { data, error, isLoading } = useSWR("/api/productos", fetcher, {
    refreshInterval: 1000,
  });

  if (isLoading) {
    return <div>Cargando...</div>;
    console.log(data);
  }

  if (error) {
    return <div>Error al cargar los productos</div>;
    console.log(error);
  }

  return (
    <div>
      {" "}
      <h1 className="text-4xl font-black">Productos</h1>
      <p className="text-2xl my-10 ">Administra la disponibilidad desde aqui</p>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((producto) => (
          <Producto
            key={producto.imagen}
            producto={producto}
            botonDisponible={true}
          />
        ))}
      </div>
    </div>
  );
}
