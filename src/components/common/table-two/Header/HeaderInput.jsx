import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useTableTwoContext } from "../../../../contexts/TableTwoContextProvider.jsx";
import toast from "react-hot-toast";
import { LuDot } from "react-icons/lu";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";

function HeaderInput() {
  const { tableData } = useTableTwoContext();
  const inputTextStyles =
    "border border-[#01ABEF] rounded p-2 w-full outline-0";
  const [date, setDate] = useState("");
  const [shift, setShift] = useState("");
  const [expanded, setExpanded] = useState(false);
  const { register, handleSubmit } = useForm();

  const exportData = (data) => {
    const allData = {
      headerData: data,
      tableData: {
        ...tableData,
      },
    };
    try {
      // converting obj to json string
      const jsonData = JSON.stringify(allData);
      // creating download file
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `table_data_${data.date}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Data exported successfully!", {
        id: "export-success",
      });
    } catch (error) {
      toast.error("Export failed");
      return;
    }
  };

  const setupSummaryDetals = [
    {
      id: 1,
      title: "Date",
      value: date ? date : "N/A",
      icon: <LuDot className="text-[#01ABEF] text-4xl animate-pulse" />,
    },
    {
      id: 2,
      title: "Shift",
      value: shift ? shift.toUpperCase() : "N/A",
      icon: <LuDot className="text-[#01ABEF] text-4xl animate-pulse" />,
    },
  ];
  const labelStyles = "text-sm font-semibold text-slate-700 mb-2";
  return (
    <div className="p-4 w-[100%] transition">
      <div className="p-4 bg-gradient-to-r from-sky-100 to-sky-50 rounded-lg shadow-sm ">
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mb-4">
          {setupSummaryDetals.map((item) => {
            return (
              <div
                key={item.id}
                className="flex items-center bg-white rounded-md shadow-md py-2"
              >
                {item.icon}
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-[#01ABEF]">
                    {item.title}
                  </span>
                  <span className="text-sm font-bold text-slate-800">
                    {item.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:flex lg:justify-end lg:items-center ">
          <button
            className="flex justify-center items-center w-full lg:w-[190px] gap-2 bg-gradient-to-r from-[#01ABEF] to-[#33BEFF] hover:from-[#0189CC] hover:to-[#01ABEF] text-white px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-lg"
            onClick={() => {
              setExpanded(!expanded);
            }}
          >
            {expanded ? "Hide Configurations" : "Show Configurations"}
            <MdKeyboardArrowDown
              className={`text-white text-[19px]  transition-transform duration-300 ${
                expanded ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>
      </div>
      {expanded && (
        <div className="w-[100%] bg-sky-50 p-4 rounded shadow-inner lg:p-0 transform">
          <form
            onSubmit={handleSubmit(exportData)}
            noValidate
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-0 lg:p-4"
          >
            <label className="flex flex-col">
              <span className={labelStyles}>DATE: </span>
              <NepaliDatePicker
                inputClassName="form-control outline-0"
                className="border border-sky-300 rounded-md p-2 outline-0"
                value={date}
                onChange={(value) => setDate(value)}
                options={{ calenderLocale: "ne", valueLocale: "en" }}
              />
            </label>

            <div className="flex flex-col">
              <label className={labelStyles}>Shift :</label>
              <select
                className="border border-[#01ABEF] rounded p-2 w-full outline-0"
                {...register("shift")}
                value={shift}
                onChange={(e) => setShift(e.target.value)}
              >
                <option value="">Select Shift</option>
                <option value="day">Day</option>
                <option value="night">Night</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className={labelStyles}>Size:</label>
              <input
                type="text"
                className={inputTextStyles}
                {...register("size")}
              />
            </div>
            <div className="flex flex-col">
              <label className={labelStyles}>Density:</label>
              <input
                type="text"
                className={inputTextStyles}
                {...register("density")}
              />
            </div>
            <div className="flex flex-col">
              <label className={labelStyles}>Min WT. :</label>
              <input
                type="text"
                className={inputTextStyles}
                {...register("minWeight")}
              />
            </div>
            <div className="flex flex-col">
              <label className={labelStyles}>Max. WT. :</label>
              <input
                type="text"
                className={inputTextStyles}
                {...register("maxWeight")}
              />
            </div>

            <div>
              <label className={labelStyles}>
                <span>Standard Weight: </span>
                <input
                  type="text"
                  className={inputTextStyles}
                  {...register("standardWeight")}
                />
              </label>
            </div>

            <div>
              <label className={labelStyles}>
                <span>Standard Thickness: </span>
                <input
                  type="text"
                  className={inputTextStyles}
                  {...register("standardThickness")}
                />
              </label>
            </div>

            <div>
              <label className={labelStyles}>
                <span>Product Type: </span>
                <select
                  {...register("productType")}
                  className="border border-[#01ABEF] rounded p-2 w-full outline-0"
                >
                  <option value="">D/G/S</option>
                  <option value="type1">Color</option>
                  <option value="type2">W/O</option>
                </select>
              </label>
            </div>
            <button
              type="submit"
              className="bg-[#01ABEF] text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              type="button"
              className="bg-slate-300 text-slate-700 px-4 py-2 rounded"
              onClick={() => setExpanded(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
export default HeaderInput;
