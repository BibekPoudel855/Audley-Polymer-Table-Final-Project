import { MdKeyboardArrowDown } from "react-icons/md";
import { LuDot } from "react-icons/lu";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTableThreeContext } from "../../../../contexts/ProductionTableContextProvider.jsx";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import { FiSave } from "react-icons/fi";

function HeaderInput() {
  const {
    allProducts,
    changeProductSelection,
    selectedProducts,
    date,
    setDate,
    shift,
    setShift,
    handleSaveAllData,
  } = useTableThreeContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const { register, handleSubmit } = useForm();

  const labelStyles = "text-sm font-semibold text-slate-700 mb-2";

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

  const onSubmit = (data) => {
    setIsExpanded(false);
  };

  return (
    <>
      <div className="p-4 m-4 bg-gradient-to-r from-sky-100 to-sky-50 rounded-lg shadow-sm ">
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
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? "Hide Configurations" : "Show Configurations"}
            <MdKeyboardArrowDown
              className={`text-white text-[19px]  transition-transform duration-300 ${
                isExpanded ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className=" flex flex-col gap-4 p-4 m-4 bg-gradient-to-r from-sky-50 to-sky-25 rounded-lg shadow-sm">

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <label className={labelStyles}>
                DATE <span className="text-red-500 ">*</span>
              </label>

              <NepaliDatePicker
                inputClassName="form-control outline-0"
                className="border border-sky-300 rounded-md p-2 outline-0"
                value={date}
                onChange={(value) => setDate(value)}
                options={{ calenderLocale: "ne", valueLocale: "en" }}
              />
            </div>
            <div className="flex flex-col">
              <label className={`${labelStyles} mt-2`}>
                SHIFT <span className="text-red-500">*</span>
              </label>
              <select
                className="border border-sky-300 rounded-md p-2"
                {...register("shift", { required: true })}
                value={shift}
                onChange={(e) => {
                  setShift(e.target.value);
                }}
              >
                <option value="">Select Shift</option>
                <option value="day">Day</option>
                <option value="night">Night</option>
              </select>
            </div>
            <div className="flex flex-col ">
              <label className={`${labelStyles} mt-2`}>
                PRODUCTS <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-4 bg-white rounded border-2 border-sky-200 shadow-lg ">
                {allProducts.map((product) => (
                  <label
                    key={product.value}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      value={product.value}
                      checked={selectedProducts.some((p) => {
                        return p.value === product.value;
                      })}
                      className="w-4 h-4 text-[#01ABEF] rounded focus:ring-[#01ABEF]"
                      onChange={(e) => {
                        changeProductSelection(product, e);
                      }}
                    />
                    <span className="text-sm font-medium text-slate-700">
                      {product.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4 mt-4">
              <button
                className="bg-gradient-to-r from-[#01ABEF] to-[#33BEFF] hover:from-[#0189CC] hover:to-[#01ABEF] text-white px-4 md:px-6 py-2 md:py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex justify-center items-center gap-2 text-sm"
                type="button"
                onClick={() => {
                  setIsExpanded(false);
                }}
              >
                <FiSave className="text-base md:text-lg" />
                Save Configurations
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
export default HeaderInput;
