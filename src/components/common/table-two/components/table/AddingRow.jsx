import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useTableTwoContext } from "../../../../../contexts/TableTwoContextProvider.jsx";

function AddingRow() {
  const {
    addingNewRow,
    setAddingNewRow,
    newRowData,
    setNewRowData,
    currentColumnName,
    tableData,
    setTableData,
  } = useTableTwoContext();

  const addingNewRowInputRef = useRef(null);

  useEffect(() => {
    if (addingNewRow) {
      addingNewRowInputRef.current.focus();
    }
  }, [addingNewRow]);

  const handleNewRowInputChange = (columnName, e, rejection = false) => {
    const value = e.target.value;
    if (rejection) {
      setNewRowData((prev) => {
        return {
          ...prev,
          Rejection: value,
        };
      });
    } else {
      setNewRowData((prev) => {
        return {
          ...prev,
          [columnName]: value,
          ID: tableData.length + 1,
        };
      });
    }
  };

  const handleKeyDownEnter = (e) => {
    if (e.key === "Enter") {
      if (!newRowData[currentColumnName] || !newRowData.Rejection) {
        toast.error("Please fill details", {
          id: "empty-row-error",
        });
        return;
      }
      setTableData([...tableData, newRowData]);
      setAddingNewRow(false);
      setNewRowData({});
      toast.success("New row added successfully");
    }
  };

  if (!addingNewRow) return null;

  return (
    <tr className="bg-sky-50">
      <td className="border-b  px-6 py-4 text-center font-bold text-[#01ABEF]">
        {tableData.length + 1}
      </td>
      <td className="border-b  px-6 py-4">
        <input
          type="text"
          className="w-full py-2 px-3 border-1 border-sky-300 outline-0  rounded-md transition-all"
          ref={addingNewRowInputRef}
          placeholder={currentColumnName}
          onChange={(e) => {
            handleNewRowInputChange(currentColumnName, e);
          }}
          onKeyDown={(e) => {
            handleKeyDownEnter(e);
          }}
          value={
            newRowData[currentColumnName] ? newRowData[currentColumnName] : ""
          }
        />
      </td>
      <td className="border-b border-sky-200 px-6 py-4">
        <input
          type="text"
          className="w-full py-2 px-3 border-1 outline-0 border-sky-300 rounded-md transition-all"
          placeholder="Rejection"
          onChange={(e) => {
            handleNewRowInputChange("Rejection", e, true);
          }}
          onKeyDown={(e) => {
            handleKeyDownEnter(e);
          }}
          value={newRowData.Rejection ? newRowData.Rejection : ""}
        />
      </td>
    </tr>
  );
}

export default AddingRow;
