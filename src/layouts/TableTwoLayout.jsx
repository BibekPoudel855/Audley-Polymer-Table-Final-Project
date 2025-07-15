import { Outlet } from "react-router-dom";
import Header from "../components/common/table-two/Header/Header";
import { Toaster } from "react-hot-toast";
import Table from "../components/common/table-two/Table/Table";
import TableTwoContextProvider from "../contexts/TableTwoContextProvider";

function TableTwoLayout() {
  return (
    <TableTwoContextProvider>
      <div className="w-[100vw] md:w-[70vw] lg:w-[40vw] md:mx-auto lg:mx-auto lg:py-5">
        <header>
          <Toaster position="top-right" reverseOrder={false} />
          <Header />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </TableTwoContextProvider>
  );
}
export default TableTwoLayout;
