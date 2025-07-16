import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ConsumptionLayout from "./layouts/ConsumptionLayout.jsx";
import TablesPage from "./components/tables/consumption/Table/Table.jsx";
import ConsumptionTableContextProvider from "./contexts/ConsumptionTableContextProvider.jsx";
import ConsumptionReportContext from "./contexts/ConsumptionReportContext.jsx";
import ProductionTableContextProvider from "./contexts/ProductionTableContextProvider.jsx";
import ConsumptionSummaryLayout from "./layouts/ConsumptionSummaryLayout.jsx";
import ProductionLayout from "./layouts/ProductionLayout.jsx";
import TableThreePage from "./components/tables/production/Table/Table3.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import Table from "./components/tables/consumption_summary/Table/Table.jsx";
import Report from "./components/report/Report.jsx";
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
        element: <ConsumptionLayout />,
        children: [
          {
            index: true,
            element: <TablesPage />,
          },
        ],
      },
      {
        path: "consumption-summary",
        element: <ConsumptionSummaryLayout />,
        children: [
          {
            index: true,
            element: <Table />,
          },
        ],
      },
      {
        path: "production",
        element: <ProductionLayout />,
        children: [
          {
            index: true,
            element: <TableThreePage />,
          },
        ],
      },
      {
        path: "reports",
        element: <Report />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReportsContextProvider>
      <ConsumptionTableContextProvider>
        <ConsumptionReportContext>
          <ProductionTableContextProvider>
          
            <RouterProvider router={router} />
          </ProductionTableContextProvider>
        </ConsumptionReportContext>
      </ConsumptionTableContextProvider>
    </ReportsContextProvider>
  </StrictMode>
);
