import { Outlet } from "react-router-dom";
import Header from "./Header/Header.jsx";
import { Toaster } from "react-hot-toast";
import Table from "./Table/Table.jsx";
import TableTwoContextProvider from "../../../contexts/TableTwoContextProvider.jsx";

function Table2Layout() {
  return (
    <TableTwoContextProvider>
      <div className="w-[100vw] md:w-[70vw] lg:w-[40vw] md:mx-auto lg:mx-auto lg:py-5">
        <header>
          <Toaster position="top-right" reverseOrder={false} />
          <Header />
        </header>
        <main>
          <Table />
        </main>
      </div>
    </TableTwoContextProvider>
  );
}
export default Table2Layout;
