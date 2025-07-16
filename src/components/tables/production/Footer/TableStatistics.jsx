import { useTableThreeContext } from "../../../../contexts/ProductionTableContextProvider.jsx";

function TableStatistics() {
  const { getStatisticsData } = useTableThreeContext();
  const { totalWeight, totalItems, totalDefects, totalDefectsWeight } =
    getStatisticsData();
  return (
    <div className="border border-gray-200 rounded-2xl p-4 my-4 ">
      <div className=" text-center border-b border-gray-200 pb-2">
        <h1 className="text-xl font-semibold">Statistics Summary</h1>
      </div>
      <div className="flex flex-col gap-2 mt-2 text-gray-700">
        <div className="flex justify-between items-center w-full">
          <p>Total Items:</p>
          <span>{(totalItems - totalDefects)}</span>
        </div>
        <div className="flex justify-between items-center w-full">
          <p>Total Weight:</p>
          <span>{(totalWeight - totalDefectsWeight) ? (totalWeight - totalDefectsWeight) + " KG" : "0"}</span>
        </div>
        <div className="flex justify-between items-center w-full text-red-500">
          <p>Defect Items:</p>
          <span>{totalDefects}</span>
        </div>
        <div className="flex justify-between items-center w-full text-red-500">
          <p>Total Defect Weight:</p>
          <span>{totalDefectsWeight ? totalDefectsWeight + " KG" : "0"}</span>
        </div>

        <div className="flex flex-col gap-2 mt-4 border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center w-full font-semibold ">
            <p>Grand Total Items:</p>
            <span>{(totalItems)}</span>
          </div>

          <div className="flex justify-between items-center w-full font-semibold ">
            <p>Grand Total Weight:</p>
            <span>{(totalWeight)} KG</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableStatistics;
