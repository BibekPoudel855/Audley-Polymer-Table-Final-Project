import { useTableThreeContext } from "../../../../contexts/ProductionTableContextProvider.jsx";
import HeaderCompanyList from "../../consumption/Header/HeaderCompanyDetail.jsx";
import HeaderInput from "./HeaderInput.jsx";
import ProductEmptyMessage from "./ProductEmptyMessage.jsx";
function Header() {
  const { selectedProducts } = useTableThreeContext();

  return (
    <>
      <HeaderCompanyList />
      <HeaderInput />
      {selectedProducts.length === 0 && <ProductEmptyMessage />}
    </>
  );
}
export default Header;
