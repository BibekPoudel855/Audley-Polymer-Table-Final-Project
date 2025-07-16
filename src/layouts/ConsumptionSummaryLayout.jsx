import { Outlet } from "react-router-dom";
import Header from "../components/tables/consumption_summary/Header/Header";
import ConsumptionReportContext from "../contexts/ConsumptionReportContext.jsx";
function ConsumptionSummaryLayout() {
  return (
    <ConsumptionReportContext>
      <div className="min-h-screen bg-gray-50">
        <div className="w-full max-w-6xl mx-auto px-4 py-6">
          <header className="mb-6">
            <Header />
          </header>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </ConsumptionReportContext>
  );
}
export default ConsumptionSummaryLayout;
