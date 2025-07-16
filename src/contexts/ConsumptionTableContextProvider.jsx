import { createContext, useContext, useMemo, useRef, useState } from "react";

import { useMainContext } from "./MainContext";

// data and functions to be shared across components
// data structure for table data
// {
//   id: number;
//   itemName: string;
//   fValues: {
//     [key]: string;
//   };
// }
const LOCAL_STORAGE_KEY = "tableData";
const LOCAL_STORAGE_TIMING_KEY = "timingData";

// const DEFAULT_DATA = [];
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

// / ///  component which provides data to its children// / ///
function ConsumptionTableContextProvider({ children }) {
  const { productData } = useMainContext();
  //
  const DEFAULT_DATA = useMemo(() => {
    if (!productData || productData.length === 0) {
      return [];
    }
    return productData
      .filter((product) => product.waste === false)
      .map((product) => {
        return {
          id: product.id,
          itemName: product.name,
          fValues: { F1: "" },
        };
      });
  }, [productData]);
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
export default ConsumptionTableContextProvider;
export { useTableOneContext };
