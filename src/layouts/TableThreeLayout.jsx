import { Outlet } from "react-router-dom";
import TableThreeContextProvider from "../contexts/TableThreeContextProvider";
import Header from "../components/tables/table-three/Header/Header";
import { Toaster } from "react-hot-toast";

function TableThreeLayout() {
  return (
    <div className="lg:w-[50%] lg:mx-auto">
      <TableThreeContextProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <Header />
        <Outlet />
      </TableThreeContextProvider>
    </div>
  );
}
export default TableThreeLayout;
