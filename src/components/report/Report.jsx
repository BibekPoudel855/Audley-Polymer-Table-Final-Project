import { useState, useEffect } from "react";
import {
  FiCalendar,
  FiEye,
  FiDownload,
  FiFilter,
  FiTable,
  FiClock,
  FiUser,
} from "react-icons/fi";

function Report() {
  const [savedReports, setSavedReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [filterDate, setFilterDate] = useState("");
  const [filterShift, setFilterShift] = useState("");

  // Load saved data from localStorage on component mount
  useEffect(() => {
    loadSavedReports();
  }, []);

  const loadSavedReports = () => {
    const reports = [];

    // Load Table One data
    const tableOneData = localStorage.getItem("tableData");
    const tableOneTimingData = localStorage.getItem("timingData");
    if (tableOneData) {
      try {
        const parsedData = JSON.parse(tableOneData);
        const parsedTimingData = tableOneTimingData
          ? JSON.parse(tableOneTimingData)
          : {};
        reports.push({
          id: "table-one-" + Date.now(),
          type: "Table One",
          title: "Raw Material Consumption",
          date: new Date().toISOString().split("T")[0],
          shift: "Day",
          data: parsedData,
          timingData: parsedTimingData,
          itemCount: parsedData.length,
          lastModified: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Error parsing Table One data:", error);
      }
    }

    // Load Table Two data
    const tableTwoData = localStorage.getItem("tableData2nd");
    if (tableTwoData) {
      try {
        const parsedData = JSON.parse(tableTwoData);
        reports.push({
          id: "table-two-" + Date.now(),
          type: "Table Two",
          title: "Board Weight Data",
          date: new Date().toISOString().split("T")[0],
          shift: "Day",
          data: parsedData,
          itemCount: parsedData.length,
          lastModified: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Error parsing Table Two data:", error);
      }
    }

    // Load Table Three data
    const tableThreeData = localStorage.getItem("table3Data");
    const headerData = localStorage.getItem("headerData");
    if (tableThreeData) {
      try {
        const parsedData = JSON.parse(tableThreeData);
        const parsedHeaderData = headerData ? JSON.parse(headerData) : {};
        reports.push({
          id: "table-three-" + Date.now(),
          type: "Table Three",
          title: "Production Output & Damaged Details",
          date: parsedHeaderData.date || new Date().toISOString().split("T")[0],
          shift: parsedHeaderData.shift || "Day",
          data: parsedData,
          itemCount: parsedData.length,
          lastModified: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Error parsing Table Three data:", error);
      }
    }

    setSavedReports(reports);
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedReport(null);
  };

  const handleDownloadReport = (report) => {
    const dataStr = JSON.stringify(report, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${report.type.replace(" ", "_")}_Report_${
      report.date
    }.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredReports = savedReports.filter((report) => {
    const dateMatch = !filterDate || report.date.includes(filterDate);
    const shiftMatch =
      !filterShift ||
      report.shift.toLowerCase().includes(filterShift.toLowerCase());
    return dateMatch && shiftMatch;
  });

  const renderTableOneData = (data, timingData) => (
    <div className="space-y-6">
      {/* Timing Information */}
      {timingData && Object.keys(timingData).length > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
            <FiClock className="mr-2" />
            Timing Data
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(timingData).map(([key, timing]) => (
              <div key={key} className="bg-white p-3 rounded border">
                <div className="font-medium text-slate-700">{key}</div>
                <div className="text-sm text-slate-600">
                  Start: {timing.start || "N/A"} | Release:{" "}
                  {timing.release || "N/A"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Consumption List */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="bg-gradient-to-r from-[#01ABEF] to-[#33BEFF] p-4">
          <h4 className="font-semibold text-white">
            Raw Material Consumption List
          </h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Item Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Quantity
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr key={item.id || index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{item.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {item.itemName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {Object.values(item.fValues || {})[0] || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTableTwoData = (data) => (
    <div className="bg-white rounded-lg border overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 to-green-600 p-4">
        <h4 className="font-semibold text-white">Board Weight Data</h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Grade A
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Grade A+
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Grade A-
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Rejection
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={item.ID || index} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{item.ID}</td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {item.A || "N/A"}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {item["A+"] || "N/A"}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {item["A-"] || "N/A"}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {item.Rejection || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTableThreeData = (data) => (
    <div className="bg-white rounded-lg border overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4">
        <h4 className="font-semibold text-white">
          Production Output & Damaged Details
        </h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Product Item
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Weight (KG)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={item.id || index} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{item.id}</td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {item.item || "N/A"}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {item.weight || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (showDetails && selectedReport) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">
                  {selectedReport.title}
                </h1>
                <p className="text-slate-600">
                  {selectedReport.type} - Detailed Report
                </p>
              </div>
              <button
                onClick={handleCloseDetails}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Back to Reports
              </button>
            </div>

            {/* report Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <FiCalendar className="text-[#01ABEF]" />
                <div>
                  <div className="text-sm text-gray-600">Date</div>
                  <div className="font-medium">{selectedReport.date}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FiClock className="text-[#01ABEF]" />
                <div>
                  <div className="text-sm text-gray-600">Shift</div>
                  <div className="font-medium">{selectedReport.shift}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FiTable className="text-[#01ABEF]" />
                <div>
                  <div className="text-sm text-gray-600">Total Items</div>
                  <div className="font-medium">{selectedReport.itemCount}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Content */}
          <div className="space-y-6">
            {selectedReport.type === "Table One" &&
              renderTableOneData(
                selectedReport.data,
                selectedReport.timingData
              )}
            {selectedReport.type === "Table Two" &&
              renderTableTwoData(selectedReport.data)}
            {selectedReport.type === "Table Three" &&
              renderTableThreeData(selectedReport.data)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Production Reports
          </h1>
          <p className="text-slate-600">
            View and manage saved production data from all tables
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <FiFilter className="text-[#01ABEF]" />
            <h2 className="text-lg font-semibold text-slate-800">
              Filter Reports
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Date
              </label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#01ABEF]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Shift
              </label>
              <select
                value={filterShift}
                onChange={(e) => setFilterShift(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#01ABEF]"
              >
                <option value="">All Shifts</option>
                <option value="day">Day</option>
                <option value="night">Night</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reports List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredReports.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <FiTable className="mx-auto text-gray-400 text-5xl mb-4" />
              <h3 className="text-lg font-medium text-gray-500 mb-2">
                No Reports Found
              </h3>
              <p className="text-gray-400">
                No saved production data available. Start by entering data in
                the tables.
              </p>
            </div>
          ) : (
            filteredReports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div
                  className={`p-4 ${
                    report.type === "Table One"
                      ? "bg-blue-50"
                      : report.type === "Table Two"
                      ? "bg-green-50"
                      : "bg-purple-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-800">
                      {report.title}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        report.type === "Table One"
                          ? "bg-blue-100 text-blue-800"
                          : report.type === "Table Two"
                          ? "bg-green-100 text-green-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {report.type}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{report.date}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Shift:</span>
                      <span className="font-medium">{report.shift}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Items:</span>
                      <span className="font-medium">{report.itemCount}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewReport(report)}
                      className="flex-1 bg-[#01ABEF] hover:bg-[#0189CC] text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                    >
                      <FiEye size={16} />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => handleDownloadReport(report)}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                    >
                      <FiDownload size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Refresh Button */}
        <div className="mt-8 text-center">
          <button
            onClick={loadSavedReports}
            className="bg-[#01ABEF] hover:bg-[#0189CC] text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Refresh Reports
          </button>
        </div>
      </div>
    </div>
  );
}

export default Report;
