import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useTableOneContext } from "../../../../contexts/ConsumptionTableContextProvider.jsx";
import toast from "react-hot-toast";
import { LuDot } from "react-icons/lu";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import { FiSave } from "react-icons/fi";
import { useReportContext } from "../../../../contexts/ReportsContextProvider.jsx";

function HeaderInput() {
  const { saveReport } = useReportContext();
  const { tableData, timingData, setHeaderComplete } = useTableOneContext();
  const [date, setDate] = useState();
  const [shift, setShift] = useState("");
  const inputTextStyles =
    "border border-sky-300 rounded p-2 w-full focus:border-[#01ABEF] focus:ring-1 focus:ring-[#01ABEF] outline-none";

  const [expanded, setExpanded] = useState(false);
  const { register, handleSubmit } = useForm();

  // Simple form data tracking
  const [thickness, setThickness] = useState("");
  const [operator, setOperator] = useState("");
  const [mixtureOperator, setMixtureOperator] = useState("");

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

  useEffect(() => {
    const isComplete =
      date && shift && thickness && operator && mixtureOperator;
    setHeaderComplete(isComplete);
  }, [date, shift, thickness, operator, mixtureOperator, setHeaderComplete]);

  const exportData = (data) => {
    if (!date || !shift || !thickness || !operator || !mixtureOperator) {
      toast.error("Please fill all required fields", {
        duration: 1500,
        id: "validation-error",
      });
      return;
    }
    if (!tableData || tableData.length === 0) {
      toast.error("Table data is empty", {
        duration: 1500,
        id: "validation-error",
      });
      return;
    }

    // chhecking if any row has empty value or not
    let hasEmptyData = false;

    tableData.forEach((row) => {
      if (hasEmptyData) return;

      const fieldValues = Object.values(row.fValues || {});

      fieldValues.forEach((value) => {
        if (!value || value.trim() === "") {
          hasEmptyData = true;
        }
      });
    });

    if (hasEmptyData) {
      toast.error("Please fill all table data", {
        duration: 1500,
        id: "validation-error",
      });
      return;
    }

    // Save data
    try {
      const allData = {
        exportInfo: {
          exportDate: new Date().toLocaleDateString(),
          exportTime: new Date().toLocaleTimeString(),
        },
        headerData: {
          date: formatDisplayDate(date),
          shift: shift,
          thickness: thickness,
          operator: operator,
          mixtureOperator: mixtureOperator,
        },
        tableData: tableData,
        timingData: timingData,
      };

      // Save report to context
      const reportId = saveReport(allData, "Table One Data");

      toast.success("Report saved successfully!", {
        duration: 2000,
      });
    } catch (error) {
      toast.error("Save failed");
    }
  };

  const labelStyles = "text-sm font-semibold text-slate-700 mb-2";

  const formatDisplayDate = (dateValue) => {
    if (!dateValue) return "N/A";
    if (dateValue.format) {
      return dateValue.format();
    }
    return dateValue.toString();
  };

  return (
    <div className="p-4 w-[100%]">
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
        <div className="w-[100%] bg-sky-50 py-4 rounded shadow-inner lg:p-0">
          <form
            onSubmit={handleSubmit(exportData)}
            noValidate
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4"
          >
            <label className="flex flex-col">
              <span className={labelStyles}>
                DATE: <span className="text-red-500">*</span>
              </span>
              <NepaliDatePicker
                inputClassName="form-control outline-0"
                className="border border-sky-300 rounded-md p-2 outline-0"
                value={date}
                onChange={(value) => setDate(value)}
                options={{ calenderLocale: "ne", valueLocale: "en" }}
              />
            </label>

            <div className="flex flex-col">
              <label className={labelStyles}>
                Shift: <span className="text-red-500">*</span>
              </label>
              <select
                className="border border-sky-300 rounded p-2 w-full focus:border-[#01ABEF] focus:ring-1 focus:ring-[#01ABEF] outline-none"
                onChange={(e) => setShift(e.target.value)}
              >
                <option value="">Select Shift</option>
                <option value="day">Day</option>
                <option value="night">Night</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className={labelStyles}>
                THICKNESS: (MM) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                className={inputTextStyles}
                placeholder="Enter thickness in mm"
                value={thickness}
                onChange={(e) => setThickness(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className={labelStyles}>
                <span>
                  OPERATOR: <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                className={inputTextStyles}
                placeholder="Enter operator name"
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className={labelStyles}>
                <span>
                  MIXTURE OPERATOR: <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                className={inputTextStyles}
                placeholder="Enter mixture operator name"
                value={mixtureOperator}
                onChange={(e) => setMixtureOperator(e.target.value)}
              />
            </div>
            <div className="md:col-span-2 lg:col-span-3 flex gap-4 justify-end">
              <button
                type="button"
                className="bg-slate-300 hover:bg-slate-400 text-slate-700 px-6 py-2 rounded-lg transition-all duration-200"
                onClick={() => setExpanded(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-gradient-to-r from-[#01ABEF] to-[#33BEFF] hover:from-[#0189CC] hover:to-[#01ABEF] text-white px-4 md:px-6 py-2 md:py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 text-sm md:text-base"
              >
                <FiSave className="text-base md:text-lg" />
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default HeaderInput;
