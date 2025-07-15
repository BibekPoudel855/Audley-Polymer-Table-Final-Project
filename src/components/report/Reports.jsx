import { useState } from "react";
import { useReportContext } from "../../contexts/ReportsContextProvider";
import FilterReport from "./Filter/FilterReport";
import Heading from "./Heading/Heading";
import ReportError from "./ReportError/ReportError";
import ReportList from "./ReportList/ReportList";

function Reports() {
  const { savedReports } = useReportContext();
  const [date, setDate] = useState();
  const [shift, setShift] = useState("all");
  return (
    <div className=" w-[90vw] mx-auto">
      <Heading />
      <FilterReport date={date} setDate={setDate} shift={shift} setShift={setShift} />
      {savedReports.length === 0 ? <ReportError /> : <ReportList date={date} shift={shift} />}
    </div>
  );
}
export default Reports;
