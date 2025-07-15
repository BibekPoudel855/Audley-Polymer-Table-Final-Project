import { useReportContext } from "../../contexts/ReportsContextProvider";
import FilterReport from "./Filter/FilterReport";
import Heading from "./Heading/Heading";
import ReportError from "./ReportError/ReportError";
import ReportList from "./ReportList/ReportList";

function Reports() {
  const { savedReports } = useReportContext();
  return (
    <div className=" w-[90vw] mx-auto">
      <Heading />
      <FilterReport />
      {savedReports.length === 0 ? <ReportError /> : <ReportList />}
    </div>
  );
}
export default Reports;
