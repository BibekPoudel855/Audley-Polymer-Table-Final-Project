import { FiDownload, FiTrash, FiTrash2 } from "react-icons/fi";
import { LuEye, LuArrowLeft } from "react-icons/lu";
import { useReportContext } from "../../../contexts/ReportsContextProvider";
import { useState } from "react";

function ReportList() {
  const { savedReports, deleteReport } = useReportContext();
  const [currentLiveReport, setCurrentLiveReport] = useState(null);

  const handleCurrentViewReport = (report) => {
    setCurrentLiveReport(report);
  };

  const handleBackToList = () => {
    setCurrentLiveReport(null);
  };

  const handleDeleteReport = (id) => {
    deleteReport(id);
  };

  const handleDownloadReport = (report) => {
    const jsonData = JSON.stringify(report);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `report_${report.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getReportTitle = (type) => {
    switch (type) {
      case "Table One Data":
        return "Raw Material Consumption";
      case "Table Three Data":
        return "Production Output Data";
      default:
        return "Report";
    }
  };

  const renderTableData = (data, tableType) => {
    if (tableType === "Table One Data") {
      return (
        <div>
          <table className="w-full border border-gray-300 bg-white">
            <thead>
              <tr className="bg-blue-50">
                <th className="border border-gray-300 px-4 py-3  font-semibold">
                  Item Name
                </th>
                <th className="border border-gray-300 px-4 py-3  font-semibold">
                  F1
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">
                    {item.itemName || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-3">
                    {console.log(item.fValues)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (tableType === "Table Three Data") {
      return (
        <div>
          <table className="w-full border border-gray-300 bg-white">
            <thead>
              <tr className="bg-green-50">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                  ID
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                  Item
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                  Weight
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="text-center">
                    {item.id || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    {item.item || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    {item.weight || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  };

  if (currentLiveReport) {
    return (
      <div className="w-[90vw] mx-auto my-6">
        <div className="flex items-center justify-between mb-6 p-2">
          <button
            onClick={handleBackToList}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            <LuArrowLeft size={25} />
          </button>
          <h1 className="text-[20px] font-bold text-gray-800">
            {getReportTitle(currentLiveReport.tableType)}
          </h1>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          {renderTableData(
            currentLiveReport.data.tableData,
            currentLiveReport.tableType
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-[90vw] mx-auto my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {savedReports.map((report) => {
        console.log(report);

        return (
          <div
            key={report.id}
            className="bg-gray-100 shadow-md rounded-lg p-6 mb-6"
          >
            <div className="flex items-center bg my-1">
              <h1 className="text-lg font-semibold">
                {getReportTitle(report.tableType)}
              </h1>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span>Date:</span>
                <span>{report.data?.headerData?.date || "N/A"}</span>
              </div>
              <div className="flex items-center justify-between mb-1">
                <span>Shift:</span>
                <span>{report.data?.headerData?.shift || "N/A"}</span>
              </div>
              <div className="flex items-center justify-between mb-1">
                <span>Items:</span>
                <span>{report.data?.tableData?.length}</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <button
                className="w-[50%] flex items-center justify-center gap-2 bg-[#01ABEF] text-white text-1xl px-4 py-2 rounded hover:bg-[#21AAFF] transition-all duration-200"
                onClick={() => handleCurrentViewReport(report)}
              >
                <LuEye /> Report
              </button>
              <button
                className="flex items-center bg-gray-500 text-white text-2xl px-4 py-2 rounded hover:bg-gray-600 transition-all duration-200"
                onClick={() => handleDownloadReport(report)}
              >
                <FiDownload />
              </button>
              <button
                className="flex items-center bg-red-500 text-white text-2xl px-4 py-2 rounded hover:bg-red-600 transition-all duration-200"
                onClick={() => handleDeleteReport(report.id)}
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ReportList;
