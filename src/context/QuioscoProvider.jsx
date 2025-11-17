import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { categorias as categoriasDB } from "../data/categorias";

const QuioscoContext = createContext();
const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState(categoriasDB);
  const [categoriaActual, setCategoriaActual] = useState(categorias[0]);
  const [modal, setModal] = useState(false);
  const [producto, setProducto] = useState({});
  const [pedido, setPedido] = useState([]);

  const handleClickCategoria = (id) => {
    const categoria = categorias.filter((cat) => cat.id === id)[0];
    setCategoriaActual(categoria);
  };

  const handleClickModal = () => {
    setModal(!modal);
  };

  const handleSetProducto = (producto) => {
    setProducto(producto);
  };

  const handleAgregarPedido = ({ categoria_id, ...producto }) => {
    setPedido((currentPedido) => {
      if (
        currentPedido.some((pedidoState) => pedidoState.id === producto.id)
      ) {
        const pedidoActualizado = currentPedido.map((pedidoState) =>
          pedidoState.id === producto.id ? producto : pedidoState
        );
        toast.success("Producto Actualizado Correctamente");
        return pedidoActualizado;
      } else {
        toast.success("Producto Agregado Correctamente");
        return [...currentPedido, producto];
      }
    });
  };

  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        modal,
        handleClickModal,
        producto,
        handleSetProducto,
        pedido,
        handleAgregarPedido,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };

export default QuioscoContext;
