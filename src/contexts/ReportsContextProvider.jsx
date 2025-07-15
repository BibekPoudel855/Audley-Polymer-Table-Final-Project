import React, { createContext, useContext, useEffect, useState } from "react";

const ReportContext = createContext();

// custom hook to use the ReportContext
const useReportContext = () => {
  return useContext(ReportContext);
};

function ReportsContextProvider({ children }) {
  const [savedReports, setSavedReports] = useState(() => {
    const savedReportLocal = localStorage.getItem("savedReports");
    if (savedReportLocal) {
      return JSON.parse(savedReportLocal);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("savedReports", JSON.stringify(savedReports));
  }, [savedReports]);

  // method to generate a unique report ID
  const generateReportId = () => {
    return Date.now().toString() + Math.random();
  };

  // functiuon to save report
  const saveReport = (reportData, tableType) => {
    const newReport = {
      id: generateReportId(),
      tableType: tableType,
      data: reportData,
    };

    setSavedReports((prevReports) => [newReport, ...prevReports]);
    return newReport.id;
  };

  // function to delete report data
  const deleteReport = (reportId) => {
    setSavedReports((prevReports) =>
      prevReports.filter((report) => report.id !== reportId)
    );
  };

  // function to get reports by table type
  const getReportsByTableType = (tableType) => {
    return savedReports.filter((report) => report.tableType === tableType);
  };

  // function to clear all reports
  const clearAllReports = () => {
    setSavedReports([]);
    localStorage.removeItem("savedReports");
  };

  return (
    <ReportContext.Provider
      value={{
        savedReports,
        setSavedReports,
        saveReport,
        deleteReport,
        getReportsByTableType,
        clearAllReports,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
}

export default ReportsContextProvider;
export { useReportContext };
