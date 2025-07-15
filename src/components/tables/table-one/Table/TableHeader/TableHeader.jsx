import { useTableOneContext } from "../../../../../contexts/TableOneContextProvider.jsx";

function TableHeader() {
  // Importing context values
  const { timingData, currentColumnName, currentColumnIndex, setTimingData } =
    useTableOneContext();

  // Handle input change for timing data
  const handleTimingDataChange = (e) => {
    const { id, value } = e.target;
    console.log(id, value);
    setTimingData((prev) => {
      console.log(prev);
      return {
        ...prev,
        [currentColumnName]: {
          ...prev[currentColumnName],
          [id]: value,
        },
      };
    });
  };

  return (
    <>
      <thead>
        <tr>
          <th
            colSpan={2}
            rowSpan={3}
            className=" border border-[#0189CC] px-2 py-2 w-[60%] text-center text-[#01ABEF]  font-semibold"
          >
            Timing
          </th>
          <th className="border border-[#0189CC] px-4 py-2 text-center w-[40%] text-[#01ABEF]   font-semibold">
            {currentColumnIndex + 1}
          </th>
        </tr>

        <tr>
          <td className="bg-white border border-sky-300 px-2 py-1 w-[40%]">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-[#01ABEF]">Start</label>
              <input
                type="time"
                placeholder="Start"
                id="start"
                className="w-full rounded px-1 py-1 border border-sky-300 text-sm focus:border-[#01ABEF] focus:ring-1 focus:ring-[#01ABEF] outline-none"
                value={timingData[currentColumnName]?.start || ""}
                onChange={handleTimingDataChange}
              />
            </div>
          </td>
        </tr>

        <tr>
          <td className="bg-white border border-sky-300 px-2 py-1 w-[40%]">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-[#01ABEF]">
                Release
              </label>
              <input
                type="time"
                placeholder="Release"
                id="release"
                className="w-full rounded p-1 border border-sky-300 text-sm focus:border-[#01ABEF] focus:ring-1 focus:ring-[#01ABEF] outline-none"
                value={timingData[currentColumnName]?.release || ""}
                onChange={handleTimingDataChange}
              />
            </div>
          </td>
        </tr>

        {/* main table header  */}
        <tr className="bg-[#01ABEF] sticky top-0 z-10">
          <th className="bg-[#01ABEF] border border-[#0189CC] px-4 py-2 w-[10%] text-white font-semibold">
            ID
          </th>
          <th className="bg-[#01ABEF] border border-[#0189CC] px-4 py-2 w-[50%] text-white font-semibold">
            Item Name
          </th>
          <th className="bg-[#01ABEF] border border-[#0189CC] px-4 py-2 w-[40%] text-white font-semibold">{`F${
            currentColumnIndex + 1
          }`}</th>
        </tr>
      </thead>
    </>
  );
}

export default TableHeader;
