import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useReportContext } from "./ReportsContextProvider";
import { useMainContext } from "./MainContext";

const DEFAULT_TABLE_DATA = [
  {
    id: 1,
    item: "",
    weight: "",
  },
];

const TableThreeContext = createContext();

// custom hook to use the context
function useTableThreeContext() {
  return useContext(TableThreeContext);
}
// context provider component
function ProductionTableContextProvider({ children }) {
  const { productData, loading: productLoading } = useMainContext();

  //   to prevent calculation on every execute
  const allProducts = useMemo(() => {
    if (!productData || productData.length === 0) {
      return [];
    }
    return productData.map((product) => ({
      id: product.id,
      value: product.name,
      label: product.name,
      waste: product.waste,
    }));
  }, [productData]);

  const { saveReport } = useReportContext();
  const [shift, setShift] = useState();
  const [date, setDate] = useState();

  const [selectedProducts, setSelectedProducts] = useState([]);

  const [tableData, setTableData] = useState(DEFAULT_TABLE_DATA);


  const handleDeleteProduct = (id) => {
    setTableData((prevData) => prevData.filter((data) => data.id !== id));
    toast.success("Product deleted successfully!");
  };

  const changeProductSelection = (product, e) => {
    setSelectedProducts((prev) => {
      if (e.target.checked) {
        return [...prev, product];
      } else {
        return prev.filter((p) => {
          return p.value !== product.value;
        });
      }
    });
  };

  const handleAddNewRow = () => {
    let isAddRowAllowed = true;
    tableData.forEach((data) => {
      if (!data.item || !data.weight) {
        isAddRowAllowed = false;
      }
    });
    if (!isAddRowAllowed) {
      toast.error("Please fill all fields before adding a new row.", {
        duration: 1500,
        id: "add-row-error",
      });
      return;
    }
    setTableData((prevData) => [
      ...prevData,
      {
        id: prevData.length + 1,
        item: "",
        weight: "",
      },
    ]);
    toast.success("New row added successfully!");
  };

  const updateTableData = (data, value, columnName) => {
    /// limit weight and weight decimal places
    if (columnName === "weight") {
      // Validate weight input
      let parts = value.split(".");
      if (parts[0].length > 5) {
        toast.error("Weight Limit", {
          id: "weight-error",
          duration: 1000,
        });
        return;
      }
      if (parts.length == 2) {
        if (parts[1].length > 3) {
          toast.error("Decimal Limit 3", {
            id: "weight-error",
            duration: 1000,
          });
          return;
        }
      }
    }
    setTableData((prevData) => {
      if (columnName === "products") {
        return prevData.map((row) => {
          if (row.id === data.id) {
            return {
              ...row,
              item: value,
            };
          }
          return row;
        });
      }
      if (columnName === "weight") {
        return prevData.map((row) => {
          if (row.id === data.id) {
            return {
              ...row,
              weight: value,
            };
          }
          return row;
        });
      }
    });
  };

  const getStatisticsData = () => {
    let totalWeight = 0;
    let totalDefects = 0;
    let totalDefectsWeight = 0;

    // finding total weight and total items
    const totalItems = tableData.length;
    tableData.forEach((item) => {
      if (item.weight) {
        totalWeight += parseFloat(item.weight);
      }
    });
    // finding total defects and total defects weight
    tableData.forEach((item) => {
      allProducts.forEach((productName) => {
        if (item.item === productName.value) {
          if (productName.waste) {
            totalDefects++;
            totalDefectsWeight += parseFloat(item.weight);
          }
        }
      });
    });

    return {
      totalWeight,
      totalItems,
      totalDefects,
      totalDefectsWeight,
    };
  };

  const handleSaveAllData = () => {
    if (shift == "N/A" || date == "N/A") {
      toast.error("Please select shift and date before saving.", {
        duration: 1500,
        id: "save-error",
      });
      return;
    }
    if (tableData.length === 0) {
      toast.error("No data to save!", {
        duration: 1500,
        id: "save-error",
      });
      return;
    }

    const allData = {
      exportInfo: {
        exportDate: new Date().toLocaleDateString(),
        exportTime: new Date().toLocaleTimeString(),
      },
      headerData: {
        date: date || "Not selected",
        shift: shift || "Not selected",
      },
      tableData: tableData || [],
    };
    saveReport(allData, "Table Three Data");

    toast.success("Data saved successfully!", {
      duration: 1500,
      id: "save-success",
    });
  };

  return (
    <TableThreeContext.Provider
      value={{
        shift,
        setShift,
        date,
        setDate,
        DEFAULT_TABLE_DATA,
        allProducts,
        tableData,
        setTableData,
        changeProductSelection,
        selectedProducts,
        setSelectedProducts,
        handleDeleteProduct,
        handleAddNewRow,
        updateTableData,
        getStatisticsData,
        handleSaveAllData,
      }}
    >
      {children}
    </TableThreeContext.Provider>
  );
}

export default ProductionTableContextProvider;
export { useTableThreeContext };
