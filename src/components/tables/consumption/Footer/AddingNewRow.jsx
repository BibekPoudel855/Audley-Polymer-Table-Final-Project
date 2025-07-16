import { useEffect, useState } from "react";
import { useTableOneContext } from "../../../../contexts/ConsumptionTableContextProvider.jsx";
import { toast } from "react-hot-toast";
function AddingNewRow() {
  const {
    tableData,
    setTableData,
    addingNewRowData,
    setAddingNewRowData,
    addingRowActive,
    setAddingRowActive,
    inputAddingRowItemNameREF,
    currentColumnName,
  } = useTableOneContext();

  useEffect(() => {
    if (addingRowActive) {
      inputAddingRowItemNameREF.current.focus();
    }
  }, [addingRowActive]);

  const handleEnterKeyNewRow = () => {
    if (addingNewRowData.itemName.trim() === "") {
      toast.error("Please enter item name", {
        id: "item-name-warning",
        duration: 1000,
      });
      return;
    }
    const newRow = {
      id: tableData.length + 1,
      itemName: addingNewRowData.itemName,
      fValues: { ...addingNewRowData.fValue },
    };
    setTableData((prev) => [...prev, newRow]);
    setAddingNewRowData({ itemName: "", fValue: { [currentColumnName]: "" } });
    setAddingRowActive(false);
    toast.success("New row added successfully", {
      id: "new-row-added",
      duration: 1000,
    });
  };

  const handleAddingRowOnChange = (e) => {
    const { value } = e.target;
    if (e.target.id == "itemName") {
      setAddingNewRowData((prev) => ({ ...prev, itemName: value }));
    }
    if (e.target.id == "fValue") {
      setAddingNewRowData((prev) => ({
        ...prev,
        fValue: { ...prev.fValue, [currentColumnName]: value },
      }));
    }
  };

  return (
    <>
      {addingRowActive && (
        <tr className="bg-sky-50">
          <td className="border border-sky-300 px-4 py-2 w-[10%]">
            {tableData.length + 1}
          </td>
          <td className="border border-sky-300 px-4 py-2 w-[60%]">
            <input
              type="text"
              className="w-full rounded px-2 py-1"
              placeholder="Enter Item Name"
              id="itemName"
              onChange={handleAddingRowOnChange}
              ref={inputAddingRowItemNameREF}
              onKeyDown={(e) => e.key === "Enter" && handleEnterKeyNewRow()}
            />
          </td>
          <td className="border border-sky-300 px-4 py-2 w-[30%]">
            <input
              type="text"
              id="fValue"
              className="w-full rounded px-2 py-1"
              value={addingNewRowData.fValue[currentColumnName] || ""}
              placeholder={currentColumnName}
              onChange={handleAddingRowOnChange}
              onKeyDown={(e) => e.key === "Enter" && handleEnterKeyNewRow()}
            />
          </td>
        </tr>
      )}
    </>
  );
}

export default AddingNewRow;
