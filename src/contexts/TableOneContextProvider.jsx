import { createContext, useContext, useRef, useState } from "react";

// data and functions to be shared across components
const LOCAL_STORAGE_KEY = "tableData";
const LOCAL_STORAGE_TIMING_KEY = "timingData";
const DEFAULT_DATA = [
  { id: 1, itemName: "Calc Carbon", fValues: { F1: "" } },
  { id: 2, itemName: "PVC Powder", fValues: { F1: "" } },
  { id: 3, itemName: "Calcite", fValues: { F1: "" } },
  { id: 4, itemName: "Titanium Dioxide", fValues: { F1: "" } },
  { id: 5, itemName: "Zinc Stearate", fValues: { F1: "" } },
  { id: 6, itemName: "Calcium Stearate", fValues: { F1: "" } },
  { id: 7, itemName: "Paraffin Wax", fValues: { F1: "" } },
  { id: 8, itemName: "PE Wax", fValues: { F1: "" } },
  { id: 9, itemName: "Talc", fValues: { F1: "" } },
  { id: 10, itemName: "Barium Sulphate", fValues: { F1: "" } },
  { id: 11, itemName: "Stearic Acid", fValues: { F1: "" } },
  { id: 12, itemName: "Antimony Trioxide", fValues: { F1: "" } },
  { id: 13, itemName: "Zinc Oxide", fValues: { F1: "" } },
  { id: 14, itemName: "Titanium Dioxide", fValues: { F1: "" } },
  { id: 15, itemName: "Calcium ", fValues: { F1: "" } },
  { id: 16, itemName: "Sodium Bicarbonate", fValues: { F1: "" } },
  { id: 17, itemName: "Sodium Sulphate", fValues: { F1: "" } },
  { id: 18, itemName: "Sodium Chloride", fValues: { F1: "" } },
  { id: 19, itemName: "Sodium ", fValues: { F1: "" } },
  { id: 20, itemName: "Sodium Phosphate", fValues: { F1: "" } },
  { id: 21, itemName: "Sodium Sulphite", fValues: { F1: "" } },
  { id: 22, itemName: "Sodium Nitrate", fValues: { F1: "" } },
  { id: 23, itemName: "Sodium Acetate", fValues: { F1: "" } },
  { id: 24, itemName: "Sodium Citrate", fValues: { F1: "" } },
  { id: 25, itemName: "Sodium Benzoate", fValues: { F1: "" } },
  { id: 26, itemName: "Sodium Bicarbonate", fValues: { F1: "" } },
  { id: 27, itemName: "Sodium Sulphate", fValues: { F1: "" } },
  { id: 28, itemName: "Sodium Chloride", fValues: { F1: "" } },
  { id: 29, itemName: "Sodium ", fValues: { F1: "" } },
  { id: 30, itemName: "Sodium Phosphate", fValues: { F1: "" } },
];
const DEFAULT_TIMING_DATA = {
  F1: {
    start: "",
    release: "",
  },
};
// creating context and using it by custom hook in the component
const TableOneDataContext = createContext(null);
const useTableOneContext = () => {
  return useContext(TableOneDataContext);
};

// component which provides data to its children
function TableOneContextProvider({ children }) {
  // ref of input field for adding new row item name
  const inputAddingRowItemNameREF = useRef();

  // state variables to manage table data
  const [tableData, setTableData] = useState(() => {
    const savedDataLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedDataLocalStorage) {
      return JSON.parse(savedDataLocalStorage);
    }
    return DEFAULT_DATA;
  });

  // state variable to manage timing data
  const [timingData, setTimingData] = useState(() => {
    const saveTimingDataLocalStorage = localStorage.getItem(
      LOCAL_STORAGE_TIMING_KEY
    );
    if (saveTimingDataLocalStorage) {
      return JSON.parse(saveTimingDataLocalStorage);
    } else {
      return DEFAULT_TIMING_DATA;
    }
  });
  // state variable to manage adding new row data
  const [addingNewRowData, setAddingNewRowData] = useState({
    itemName: "",
    fValue: {
      1: "",
    },
  });
  // state variable to manage current column index
  const [currentColumnIndex, setCurrentColumnIndex] = useState(0);
  const [addingRowActive, setAddingRowActive] = useState(false);

  // finding column name
  const columnNames =
    tableData.length > 0 ? Object.keys(tableData[0].fValues) : "F1";
  const currentColumnName = columnNames[currentColumnIndex];

  return (
    <TableOneDataContext.Provider
      value={{
        timingData,
        setTimingData,
        LOCAL_STORAGE_TIMING_KEY,
        LOCAL_STORAGE_KEY,
        DEFAULT_DATA,
        DEFAULT_TIMING_DATA,
        tableData,
        setTableData,
        inputAddingRowItemNameREF,
        addingNewRowData,
        setAddingNewRowData,
        currentColumnIndex,
        setCurrentColumnIndex,
        addingRowActive,
        setAddingRowActive,
        currentColumnName,
        columnNames,
      }}
    >
      {children}
    </TableOneDataContext.Provider>
  );
}
export default TableOneContextProvider;
export { useTableOneContext };
