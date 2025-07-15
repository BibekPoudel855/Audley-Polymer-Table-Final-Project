import toast from "react-hot-toast";
import { useTableTwoContext } from "../../../../../contexts/TableTwoContextProvider.jsx";

function NavigationControls() {
  const { currentColumnIDX, setCurrentColumnIDX, columnNames } =
    useTableTwoContext();

  const handleNextPage = () => {
    if (currentColumnIDX < columnNames.length - 1) {
      setCurrentColumnIDX(currentColumnIDX + 1);
    } else {
      toast.error("You are already on the last column", {
        id: "last-column-error",
      });
    }
  };

  const handlePreviousPage = () => {
    if (currentColumnIDX > 0) {
      setCurrentColumnIDX(currentColumnIDX - 1);
    } else {
      toast.error("You are already on the first column", {
        id: "first-column-error",
      });
    }
  };

  return (
    <div className="fixed left-0 bottom-0 w-[100vw] bg-white p-4 px-6">
      <div className="flex justify-between items-center w-full">
        <button
          className={`${
            currentColumnIDX === 0
              ? "bg-slate-300 text-slate-500 cursor-not-allowed"
              : "bg-[#01ABEF] hover:bg-[#0189CC] text-white"
          } px-6 py-2 rounded-lg transition-all duration-200 font-medium shadow-sm`}
          onClick={handlePreviousPage}
        >
          Previous
        </button>
        <span className="text-lg text-slate-700 font-semibold bg-sky-100 px-4 py-2 rounded-lg">
          {currentColumnIDX + 1} of {columnNames.length}
        </span>
        <button
          className={`${
            currentColumnIDX === columnNames.length - 1
              ? "bg-slate-300 text-slate-500 cursor-not-allowed"
              : "bg-[#01ABEF] hover:bg-[#0189CC] text-white"
          } px-6 py-2 rounded-lg transition-all duration-200 font-medium shadow-sm`}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default NavigationControls;
