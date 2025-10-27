import Categoria from "./Categoria";
import { categorias } from "../data/categorias";

export default function Sidebar() {
  return (
    <aside className="md:w-72">
      <div className="p-4">
        <img className="w-40" src="img/logo.svg" alt="Imagen Logo" />
      </div>
      <div className="mt-10">
        {categorias.map(categoria => (
          <Categoria
            categoria={categoria}
            key={categoria.id}
          
          />
        ))}
      </div>
      <div className="my-5 px-5">
        <button 
          type="button"
          className="text-center bg-red-500 w-full hover:bg-red-600   p-3 font-bold text-white rounded truncate"
          >
          Cancelar Orden
        </button>
      </div>
    </aside>
  );
}
