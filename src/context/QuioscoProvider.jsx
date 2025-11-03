import { createContext, useState } from "react";
import { categorias as categoriasDB } from "../data/categorias";

const QuioscoContext = createContext();
const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState(categoriasDB);
  const [categoriaActual, setCategoriaActual] = useState(categorias[0]);

  const handlleClickCategoria = (id) => {
   
    const categoria = categorias.filter( cat => cat.id === id )[0];
    setCategoriaActual(categoria);
    
  };

  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        handlleClickCategoria,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };

export default QuioscoContext;
