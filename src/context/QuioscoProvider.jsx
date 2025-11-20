import { createContext, useState,useEffect } from "react";
import { toast } from "react-toastify";
import { categorias as categoriasDB } from "../data/categorias";

const QuioscoContext = createContext();
const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState(categoriasDB);
  const [categoriaActual, setCategoriaActual] = useState(categorias[0]);
  const [modal, setModal] = useState(false);
  const [producto, setProducto] = useState({});
  const [pedido, setPedido] = useState([]);
  const [total, setTotal] = useState(0);


  useEffect(() => {
    const nuevoTotal = pedido.reduce(
      (total, producto) => total + producto.cantidad * producto.precio,
      0
    );
    setTotal(nuevoTotal);
  }, [pedido]);



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
      if (currentPedido.some((pedidoState) => pedidoState.id === producto.id)) {
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

  const handleEditarCantidad = (id) => {
   
    const productoActualizar = pedido.filter((producto) => producto.id === id)[0];
    setProducto(productoActualizar);
    setModal(!modal);
  };


  const handleEliminarProductoPedido = (id) => {
    const pedidoActualizado = pedido.filter((producto) => producto.id !== id);
    setPedido(pedidoActualizado);
    toast.success("Producto Eliminado Correctamente");
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
        handleEditarCantidad,
        handleEliminarProductoPedido,
        total,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };

export default QuioscoContext;
