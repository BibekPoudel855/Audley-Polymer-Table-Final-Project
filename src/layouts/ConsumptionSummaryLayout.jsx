import { Outlet } from "react-router-dom";
import Header from "../components/tables/consumption_summary/Header/Header";
import ConsumptionReportContext from "../contexts/ConsumptionReportContext.jsx";
function ConsumptionSummaryLayout() {
  return (
    <ConsumptionReportContext>
      <div className="w-[100vw] md:w-[70vw] lg:w-[40vw] md:mx-auto lg:mx-auto lg:py-5">
        <header>
          <Header />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </ConsumptionReportContext>
  );
}
export default ConsumptionSummaryLayout;
