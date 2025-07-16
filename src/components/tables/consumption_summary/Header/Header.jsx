import { FiFilter } from "react-icons/fi";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import { useState } from "react";

function Header() {
  const [date, setDate] = useState();

  const handleDateChange = (value) => {
    setDate(value);
  };

  return (
    <header className="bg-gray-100 text-black p-4 flex flex-col sm:flex-row items-start justify-between w-[90vw] lg:w-[60vw] mx-auto my-4 rounded-md shadow-md">
      <h1 className="flex gap-2 items-center text-[20px] font-semibold mb-4 sm:mb-0">
        <FiFilter size={20} className="text-[#03ABEE]" /> Filter Reports
      </h1>
      <div className="flex flex-col sm:flex-row sm:items-center mb-4 w-[100%] md:w-[40%] gap-4">
        <label className="text-gray-700">Date:</label>
        <NepaliDatePicker
          inputClassName="form-control outline-0 w-[100%]"
          className="border border-gray-300 p-2 rounded-md w-[100%]"
          value={date}
          onChange={handleDateChange}
          options={{ calenderLocale: "ne", valueLocale: "en" }}
        />
      </div>
    </header>
  );
}

export default Header;
