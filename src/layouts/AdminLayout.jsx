import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="md:flex md:min-h-screen">
      <AdminSidebar />
      <main className="flex-1 h-screen overflow-y-scroll bg-gray-100 p-10">
        <Outlet />
      </main>
    </div>
  );
}
