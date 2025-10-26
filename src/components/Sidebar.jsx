import { categorias } from "../data/categorias";

export default function Sidebar() {
  return (
    <aside className="md:w-72">
      <div className="p-4">
        <img className="w-40" src="img/logo.svg" alt="" />
      </div>
      <div className="mt-10">
        {categorias.map(categoria => (
          <p>{categoria.nombre}</p>
        ))}
         

      </div>
    </aside>
  );
}
