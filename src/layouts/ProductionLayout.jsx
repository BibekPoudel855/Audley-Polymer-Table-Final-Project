import { Outlet } from "react-router-dom";
import ProductionTableContextProvider from "../contexts/ProductionTableContextProvider.jsx";
import Header from "../components/tables/production/Header/Header";

function ProductionLayout() {
  return (
    <div className="lg:w-[50%] lg:mx-auto">
      <ProductionTableContextProvider>
        <Header />
        <Outlet />
      </ProductionTableContextProvider>
    </div>
  );
}
export default ProductionLayout;
