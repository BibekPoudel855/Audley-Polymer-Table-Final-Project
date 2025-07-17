import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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

const DEFAULT_TIMING_DATA = {
  F1: {
    start: "",
    release: "",
  },
};
// creating context
const TableOneDataContext = createContext(null);
// custom hook to use the context
const useTableOneContext = () => {
  return useContext(TableOneDataContext);
};

// / ///  component which provides data to its children// / ///
function ConsumptionTableContextProvider({ children }) {
  const { productData, loading: productLoading } = useMainContext();
  // to prevent calculation on every execution
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
  const [tableData, setTableData] = useState([]);

  // ref of input field for adding new row item name
  const inputAddingRowItemNameREF = useRef();

  // setting initial table data
  useEffect(() => {
    if (productLoading) return;
    setTableData(DEFAULT_DATA);
  }, [DEFAULT_DATA, productLoading]);

  // setting table data when tabledata is empty
  // useEffect(() => {
  //   if (!productLoading && DEFAULT_DATA.length > 0 && tableData.length === 0) {
  //     setTableData(DEFAULT_DATA);
  //   }
  // }, [DEFAULT_DATA, productLoading, tableData.length]);

  const [timingData, setTimingData] = useState(DEFAULT_TIMING_DATA);

  // variable to manage adding new row data
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
        DEFAULT_TIMING_DATA,
        tableData,
        setTableData,
        loading: productLoading,
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
