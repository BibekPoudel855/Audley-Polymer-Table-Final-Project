import { useTableOneContext } from "../../../../contexts/ConsumptionTableContextProvider.jsx";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function AddResetControlSection() {
  const {
    addingRowActive,
    setAddingRowActive,
    tableData,
    setTableData,
    DEFAULT_DATA,
    timingData,
    setTimingData,
    DEFAULT_TIMING_DATA,
    setCurrentColumnIndex,
  } = useTableOneContext();

  const resetData = () => {
    if (
      JSON.stringify(tableData) === JSON.stringify(DEFAULT_DATA) &&
      JSON.stringify(timingData) === JSON.stringify(DEFAULT_TIMING_DATA)
    ) {
      toast.error("Data is already reseted", {
        id: "data-reset-warning",
        duration: 1000,
      });
      return;
    }

    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Are you sure?",
      text: "This will reset all data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E7000B",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Reset ",
      cancelButtonText: "No, cancel!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          setTableData(DEFAULT_DATA);
          setCurrentColumnIndex(0);
          setAddingRowActive(false);
          setTimingData(DEFAULT_TIMING_DATA);
          toast.success("Data has been reset successfully");
        } else {
          toast.error("Reset cancelled");
        }
      })
      .catch((error) => {
        console.log(error);

        toast.error("An error occurred while resetting data");
      });
  };

  return (
    <div className="p-4 m-4  flex justify-center items-center mb-4 rounded">
      {/* uncomment this to keep add row button */}
      {/* { addingRowActive ? (
        <button
          className="px-4 py-2 border bg-slate-400 text-white hover:bg-slate-500 rounded transition"
          onClick={() => setAddingRowActive(false)}
        >
          Cancel
        </button>
      ) : (
        <button
          className="px-4 py-2 border bg-[#01ABEF] text-white hover:bg-[#0189CC] rounded transition"
          onClick={() => setAddingRowActive(true)}
        >
          Add Row
        </button>
      )} */}
      <button
        className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 text-sm"
        onClick={resetData}
      >
         <FiTrash2 className="text-base md:text-lg" />
        Reset
      </button>
    </div>
  );
}
export default AddResetControlSection;
