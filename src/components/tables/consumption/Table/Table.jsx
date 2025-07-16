import { useEffect } from "react";
import { useTableOneContext } from "../../../../contexts/ConsumptionTableContextProvider.jsx";
import NextPrevControls from "../Footer/NextPrevControls.jsx";
import AddResetControlSection from "../Footer/AddResetControls.jsx";
import AddingNewRow from "../Footer/AddingNewRow.jsx";
import TableHeader from "./TableHeader/TableHeader.jsx";

function Table() {
  // Importing context values
  const {
    timingData,
    LOCAL_STORAGE_TIMING_KEY,
    LOCAL_STORAGE_KEY,
    tableData,
    setTableData,
    currentColumnName,
  } = useTableOneContext();

  // Effect to set  data  localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tableData));
  }, [tableData]);

  // Effect to set timing data  localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_TIMING_KEY, JSON.stringify(timingData));
  }, [timingData]);

  // Handle input change for table data
  const handleInputChange = (rowId, e) => {
    const updatedData = tableData.map((row) => {
      if (rowId == row.id) {
        return {
          ...row,
          fValues: {
            ...row.fValues,
            [currentColumnName]: e.target.value,
          },
        };
      }
      return row;
    });
    setTableData(updatedData);
  };

  // Handle input change for item name
  const handleItemNameInputChange = (rowId, e) => {
    const updatedData = tableData.map((item) => {
      if (item.id === rowId) {
        return {
          ...item,
          itemName: e.target.value,
        };
      }
      return item;
    });
    setTableData(updatedData);
  };

  const totalCurrentColumnValue = () => {
    let total = 0;
    tableData.forEach((row) => {
      let value = parseFloat(row.fValues[currentColumnName]);
      if (!isNaN(value)) {
        total += value;
      }
    });
    return total;
  };

  // Render  table
  return (
    <div>
      <div className="p-4 overflow-y-auto">
        <div className="overflow-y-auto max-h-[85vh] mb-20 lg:mb-8">
          <table className="w-full">
            {/* timing  */}
            <TableHeader />

            <tbody>
              {tableData.map((row, index) => (
                <tr
                  key={row.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-sky-50"
                  } hover:bg-sky-100 transition-colors border-b border-sky-100`}
                >
                  <td className="px-4 py-2 w-[10%] text-center font-medium text-slate-700">
                    {row.id}
                  </td>
                  <td className="px-4 py-2 w-[60%]">
                    <input
                      type="text"
                      className={`w-full rounded px-3 py-2 text-ellipsis ${row.itemName ? "border-0" : "border-1 border-gray-300"}`}
                      value={row.itemName}
                      onChange={(e) => handleItemNameInputChange(row.id, e)}
                    />
                  </td>
                  <td className="px-4 py-2 w-[30%]">
                    <input
                      type="number"
                      className={`w-full rounded px-3 py-2  text-ellipsis ${row.fValues[currentColumnName] ? "border-0" : "border-1 border-gray-300"}`}
                      value={row.fValues[currentColumnName] || ""}
                      onChange={(e) => handleInputChange(row.id, e)}
                    />
                  </td>
                </tr>
              ))}
              {/* Adding new row section */}
              <AddingNewRow />
              <tr className="bg-gradient-to-r from-[#01ABEF] to-[#33BEFF]">
                <td
                  colSpan="2"
                  className="px-4 py-3 text-center text-white font-semibold"
                >
                  <span className="text-sm">Total {currentColumnName}</span>
                </td>
                <td className="px-4 py-3 text-left text-white font-medium">
                  {totalCurrentColumnValue()}
                </td>
              </tr>
            </tbody>
          </table>
          <AddResetControlSection />
        </div>
        <NextPrevControls />
      </div>
    </div>
  );
}
export default Table;
