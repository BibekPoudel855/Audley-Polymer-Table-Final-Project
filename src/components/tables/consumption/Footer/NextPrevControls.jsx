import { toast } from "react-hot-toast";
import { useTableOneContext } from "../../../../contexts/ConsumptionTableContextProvider.jsx";

function NextPrevControls() {
  // Importing context values
  const {
    currentColumnIndex,
    setCurrentColumnIndex,
    currentColumnName,
    columnNames,
    tableData,
    timingData,
    setTableData,
    setTimingData,
  } = useTableOneContext();

  // Function to handle previous button click
  const handlePrevButtonClick = () => {
    if (currentColumnIndex > 0) {
      setCurrentColumnIndex(currentColumnIndex - 1);
    }
    if (currentColumnIndex == 0) {
      toast.error("You are in first column", {
        id: "first-column-warning",
        duration: 1000,
      });
    }
  };

  // functon to check if current column is empty
  const isCurrentColumnEmpty = () => {
    console.log(tableData);
    console.log(timingData);
    console.log(currentColumnName);

    let isEmpty = false;
    tableData.forEach((element) => {
      if (element.fValues[currentColumnName] == "") {
        isEmpty = true;
      }
    });
    if (
      timingData[currentColumnName].start == "" &&
      timingData[currentColumnName].release == ""
    ) {
      isEmpty = true;
    }
    return isEmpty;
  };

  // Function to handle next button click
  const handleNextButtonClick = () => {
    if (isCurrentColumnEmpty()) {
      toast.error("Please fill the current column before proceeding", {
        id: "empty-column-warning",
        duration: 1000,
      });
      return;
    }
    if (currentColumnIndex + 1 == columnNames.length) {
      const newColumnName = `F${columnNames.length + 1}`;
      const updatedData = tableData.map((row) => {
        return {
          ...row,
          fValues: {
            ...row.fValues,
            [newColumnName]: "",
          },
        };
      });
      setTableData(updatedData);
      setTimingData((prev) => {
        return {
          ...prev,
          [newColumnName]: {
            start: "",
            release: "",
          },
        };
      });
    }

    setCurrentColumnIndex(currentColumnIndex + 1);
  };

  return (
    <div className="fixed lg:relative bottom-0 left-0 bg-sky-100 text-white w-full flex justify-between items-center mt-4 p-4">
      <div className="flex justify-between items-center w-full ">
        <button
          className={`${
            currentColumnIndex == 0
              ? "bg-slate-400 hover:bg-slate-500 cursor-not-allowed"
              : "bg-[#01ABEF] hover:bg-[#0189CC]"
          } px-4 py-2 rounded transition`}
          onClick={handlePrevButtonClick}
        >
          ← Prev
        </button>
        <span className="text-lg text-slate-800 font-normal">
          ({currentColumnIndex + 1} of {columnNames.length})
        </span>
        <button
          className="bg-[#01ABEF] hover:bg-[#0189CC] px-4 py-2 rounded transition"
          onClick={handleNextButtonClick}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default NextPrevControls;
