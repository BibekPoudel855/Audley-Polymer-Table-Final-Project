import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";

function FilterReport({ date, setDate, shift, setShift, currentLiveReport }) {
  const handleDateChange = (e) => {
    setDate(e);
  };
  const handleShiftChange = (e) => {
    setShift(e.target.value);
  };

  return (
    <div className="p-4 bg-gray-100 shadow-md rounded-lg">
      <h1 className="text-xl font-semibold flex items-center gap-2 mb-4">
        <FiFilter className="text-[#01ABEF]" />
        Filter Reports
      </h1>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 w-full">
        <div
          className={`flex flex-col sm:flex-row sm:items-center mb-4 md:w-[40%] gap-4 ${
            currentLiveReport ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <label className="text-gray-700">Date:</label>
          <NepaliDatePicker
            inputClassName="form-control outline-0"
            className="border border-gray-300 p-2 rounded-md w-[100%]"
            value={date}
            onChange={handleDateChange}
            options={{ calendarLocale: "ne", valueLocale: "en" }}
          />
        </div>
        <div className={`${currentLiveReport ? "opacity-50" : ""}flex flex-col sm:flex-row sm:items-center mb-4 sm:w-[40%] gap-4`}>
          <label className="text-gray-700">Shift:</label>
          <select
            className={`border border-gray-300 p-2 rounded-md w-[100%] ${currentLiveReport ? "opacity-50" : ""}`}
            onChange={handleShiftChange}
            value={shift}
            disabled={currentLiveReport}
          >
            <option value="all">All</option>
            <option value="day">Day</option>
            <option value="night">Night</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default FilterReport;
