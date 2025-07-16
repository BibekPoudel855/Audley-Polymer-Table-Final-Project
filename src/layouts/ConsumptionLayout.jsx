import Header from "../components/tables/consumption/Header/Header.jsx";
import { Outlet } from "react-router-dom";
function ConsumptionLayout() {
  return (
    <div className="w-full lg:w-[40%] mx-auto">
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default ConsumptionLayout;
