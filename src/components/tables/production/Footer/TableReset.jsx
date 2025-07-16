import { FiSave, FiTrash2 } from "react-icons/fi";
import { useTableThreeContext } from "../../../../contexts/ProductionTableContextProvider.jsx";
import toast from "react-hot-toast";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
function TableReset() {
  const {
    handleSaveAllData,
    DEFAULT_TABLE_DATA,
    setTableData,
    setSelectedProducts,
    setShift,
    setDate,
  } = useTableThreeContext();
  return (
    <div className="flex justify-between items-center p-4">
      <button
        className="bg-gradient-to-r from-[#01ABEF] to-[#33BEFF] hover:from-[#0189CC] hover:to-[#01ABEF] text-white px-4 md:px-6 py-2 md:py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 text-sm"
        onClick={() => {
          handleSaveAllData();
        }}
      >
        <FiSave className="text-base md:text-lg" />
        <span className="hidden sm:inline">Save All Data</span>
        <span className="sm:hidden">Save</span>
      </button>
      <button
        className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 text-sm md:text-base"
        onClick={() => {
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
                setTableData(DEFAULT_TABLE_DATA);
                setSelectedProducts([]);
                setShift("N/A");
                setDate(null);
                toast.success("Data has been reset successfully");
              } else {
                toast.error("Reset cancelled");
              }
            })
            .catch((error) => {
              console.log(error);

              toast.error("An error occurred while resetting data");
            });
        }}
      >
        <FiTrash2 className="text-base md:text-lg" />
        <span className="hidden sm:inline">Reset All Data</span>
        <span className="sm:hidden">Reset</span>
      </button>
    </div>
  );
}

export default TableReset;
