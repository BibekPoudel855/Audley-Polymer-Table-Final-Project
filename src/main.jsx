import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TableOneLayout from "./layouts/TableOneLayout.jsx";
import TablesPage from "./components/tables/consumption/Table/Table.jsx";
import TableOneContextProvider from "./contexts/TableOneContextProvider";
import TableTwoContextProvider from "./contexts/TableTwoContextProvider";
import TableThreeContextProvider from "./contexts/TableThreeContextProvider";
import TableTwoLayout from "./layouts/TableTwoLayout";
import TableThreeLayout from "./layouts/TableThreeLayout.jsx";
import TableThreePage from "./components/tables/production/Table/Table3.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import Table from "./components/common/table-two/Table/Table.jsx";
import Reports from "./components/Report/ReportList/Reports.jsx";
import ReportsContextProvider from "./contexts/ReportsContextProvider.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "consumption",
        element: <TableOneLayout />,
        children: [
          {
            index: true,
            element: <TablesPage />,
          },
        ],
      },
      {
        path: "table2",
        element: <TableTwoLayout />,
        children: [
          {
            index: true,
            element: <Table />,
          },
        ],
      },
      {
        path: "production",
        element: <TableThreeLayout />,
        children: [
          {
            index: true,
            element: <TableThreePage />,
          },
        ],
      },
      {
        path: "reports",
        element: <Reports />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReportsContextProvider>
      <TableOneContextProvider>
        <TableTwoContextProvider>
          <TableThreeContextProvider>
            <RouterProvider router={router} />
          </TableThreeContextProvider>
        </TableTwoContextProvider>
      </TableOneContextProvider>
    </ReportsContextProvider>
  </StrictMode>
);
