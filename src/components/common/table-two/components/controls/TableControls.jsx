import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import toast from "react-hot-toast";
import { useTableTwoContext } from "../../../../../contexts/TableTwoContextProvider.jsx";

function TableControls() {
  const { addingNewRow, setAddingNewRow, setTableData, DEFAULT_DATA } =
    useTableTwoContext();

  const handleReset = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Are you sure?",
      text: "This will reset all data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FB2C36",
      cancelButtonColor: "#01ABEF",
      confirmButtonText: "Reset ",
      cancelButtonText: "No, cancel!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          setTableData(DEFAULT_DATA);
          toast.success("Data has been reset successfully");
        } else {
          toast.error("Reset cancelled");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while resetting data");
      });
  };

  return (
    <div className="flex justify-between items-center mb-4 bg-sky-100 p-4 rounded shadow">
      {addingNewRow ? (
        <button
          className="bg-slate-500 hover:bg-slate-600 text-white px-6 py-2 rounded-lg transition-all duration-200 font-medium shadow"
          onClick={() => setAddingNewRow(false)}
        >
          Cancel
        </button>
      ) : (
        <button
          className="bg-[#01ABEF] hover:bg-[#0189CC] text-white px-6 py-2 rounded-lg transition-all duration-200 font-medium shadow"
          onClick={() => {
            setAddingNewRow(true);
          }}
        >
          Add Row
        </button>
      )}
      <button
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-all duration-200 font-medium shadow-sm"
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
}

export default TableControls;
