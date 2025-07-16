import { FiPackage } from "react-icons/fi";
import { useTableTwoContext } from "../../../../contexts/ConsumptionReportContext.jsx";
function TableHeader() {
  const { currentColumnName } = useTableTwoContext();

  return (
    <thead>
      <tr>
        <th
          colSpan={3}
          className="bg-gradient-to-r from-[#01ABEF] to-[#33BEFF] border border-[#01ABEF] text-white px-4 py-4 font-bold text-lg text-left"
        >
          <span className="flex items-center gap-2 sm:gap-4 text-left">
            <span className="border-2 rounded-full p-2 bg-white">
              <FiPackage className="text-lg sm:text-xl md:text-2xl flex-shrink-0 text-[#01ABEF]" />
            </span>
            <span className="text-sm sm:text-base md:text-lg">
              Consumption Summary
            </span>
          </span>
        </th>
      </tr>
      <tr>
        <th className="p-2 w-[15%] sm:w-[10%] text-center font-semibold bg-[#01ABEF] border-b text-white border-[#0189cc]">
          ID
        </th>
        <th className="p-2 w-[55%] sm:w-[60%] text-center font-semibold bg-[#01ABEF] border-b text-white border-[#0189cc]">
          Product
        </th>
        <th className="p-2 w-[30%] text-center font-semibold bg-[#01ABEF] border-b text-white border-[#0189cc]">
          {currentColumnName}
        </th>
      </tr>
    </thead>
  );
}

export default TableHeader;
