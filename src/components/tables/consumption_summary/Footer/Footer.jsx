import { useTableTwoContext } from "../../../../contexts/ConsumptionReportContext";

function Footer() {
  const {
    currentColumnName,
    setCurrentColumnName,
    currentColumnIDX,
    setCurrentColumnIDX,
    columnNames,
  } = useTableTwoContext();
  const handleNextPage = () => {
    if (currentColumnIDX < columnNames.length - 1) {
      setCurrentColumnIDX(currentColumnIDX + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentColumnIDX > 0) {
      setCurrentColumnIDX(currentColumnIDX - 1);
    }
  };
  return (
    <div className="w-full fixed bottom-1 left-0 lg:static px-2  sm:px-4 py-4">
      <div className="flex justify-between items-center bg-gray-100 p-4 rounded w-[90vw] lg:w-[60vw] mx-auto">
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded"
          onClick={handlePrevPage}
        >
          Prev
        </button>
        <p>
          {currentColumnIDX + 1} of {columnNames.length}
        </p>
        <button
          className="px-4 py-2 bg-[#01ABEF] text-white rounded"
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Footer;
