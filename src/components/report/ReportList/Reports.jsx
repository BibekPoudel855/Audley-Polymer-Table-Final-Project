import { useState } from "react";
import { useReportContext } from "../../../contexts/ReportsContextProvider.jsx";
import FilterReport from "../Filter/FilterReport.jsx";
import Heading from "../Heading/Heading.jsx";
import ReportError from "../ReportError/ReportError.jsx";
import ReportList from "./ReportList.jsx";

function Reports() {
  const { savedReports } = useReportContext();
  const [date, setDate] = useState();
  const [shift, setShift] = useState("all");
  return (
    <div className=" w-[90vw] mx-auto">
      <Heading />
      <FilterReport
        date={date}
        setDate={setDate}
        shift={shift}
        setShift={setShift}
      />
      {savedReports.length === 0 ? (
        <ReportError />
      ) : (
        <ReportList date={date} shift={shift} />
      )}
    </div>
  );
}
export default Reports;
