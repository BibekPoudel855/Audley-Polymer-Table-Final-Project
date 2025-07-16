import { createContext, useContext, useState } from "react";
const TableTwoContext = createContext();

const DEFAULT_DATA = [
  {
    ID: 1,
    Weight_Day: "",
    Weight_Night: "",
    Total: "",
  },
];

// custom hook to use table context
function useTableTwoContext() {
  return useContext(TableTwoContext);
}

function ConsumptionReportContext({ children }) {
  const [tableData, setTableData] = useState(() => {
    const storedData = localStorage.getItem("tableData2nd");
    return storedData ? JSON.parse(storedData) : DEFAULT_DATA;
  });

  const [currentColumnIDX, setCurrentColumnIDX] = useState(0);
  const [currentColumnName, setCurrentColumnName] = useState("");
  const [addingNewRow, setAddingNewRow] = useState(false);
  const [newRowData, setNewRowData] = useState({});
  const columnNames = Object.keys(tableData[0]).filter((columnName) => {
    return columnName !== "ID" && columnName !== "Total";
  });
  return (
    <TableTwoContext.Provider
      value={{
        DEFAULT_DATA,
        tableData,
        setTableData,
        currentColumnIDX,
        setCurrentColumnIDX,
        currentColumnName,
        setCurrentColumnName,
        addingNewRow,
        setAddingNewRow,
        newRowData,
        setNewRowData,
        columnNames,
      }}
    >
      {children}
    </TableTwoContext.Provider>
  );
}

export default ConsumptionReportContext;
export { useTableTwoContext };
