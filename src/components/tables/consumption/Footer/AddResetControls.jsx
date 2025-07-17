import { useTableOneContext } from "../../../../contexts/ConsumptionTableContextProvider.jsx";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function AddResetControlSection() {
  const {
    setAddingRowActive,
    setTableData,
    DEFAULT_DATA,
    setTimingData,
    DEFAULT_TIMING_DATA,
    setCurrentColumnIndex,
    setAddingNewRowData,
  } = useTableOneContext();

  const resetData = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Are you sure?",
      text: "This will reset all table data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E7000B",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Reset",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Reset all data to default state
        setTableData(DEFAULT_DATA);
        setCurrentColumnIndex(0);
        setAddingRowActive(false);
        setTimingData(DEFAULT_TIMING_DATA);
        setAddingNewRowData({
          itemName: "",
          fValue: { 1: "" },
        });

        toast.success("Data reset successfully!", {
          duration: 2000,
          id: "reset-success",
        });
      }
    });
  };

  return (
    <div className="p-4 m-4  flex justify-center items-center mb-4 rounded">
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
