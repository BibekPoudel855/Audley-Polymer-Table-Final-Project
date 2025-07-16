import { Outlet } from "react-router-dom";
import Nav from "../components/nav/Nav";
import { Toaster } from "react-hot-toast";
function MainLayout() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <header className="w-full bg-white shadow-md">
        <Nav />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
