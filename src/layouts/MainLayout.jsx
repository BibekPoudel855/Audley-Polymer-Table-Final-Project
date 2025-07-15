import { Outlet } from "react-router-dom";
import Nav from "../components/nav/Nav";

function MainLayout() {
  return (
    <>
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
