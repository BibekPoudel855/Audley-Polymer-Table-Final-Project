import { useState } from "react";
import { useReportContext } from "../../contexts/ReportsContextProvider.jsx";
import FilterReport from "./Filter/FilterReport.jsx";
import Heading from "./Heading/Heading.jsx";
import ProductNotFoundErr from "../../common/NotFoundError/ProductNotFoundErr.jsx";
import ReportList from "./ReportComponents/ReportList.jsx";

function Report() {
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
        <ProductNotFoundErr />
      ) : (
        <ReportList date={date} shift={shift} />
      )}
    </div>
  );
}
export default Report;
