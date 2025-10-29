export default function Producto({ producto }) {
  const { nombre, imagen, precio } = producto;
  return (
    <div className="border p-3 shadow bg-white ">
      <img 
            alt={`imagen ${nombre}`}
            className="w-full"
            src={`/img/${imagen}.jpg`}  
     />
     <div className="p-5">
        <h3 className="text-2xl font-bold">{nombre}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500 ">${precio}</p>

     </div>
    </div>
  );
}
