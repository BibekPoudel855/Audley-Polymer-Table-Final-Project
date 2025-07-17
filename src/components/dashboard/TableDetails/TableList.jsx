import { FiArrowRight, FiTable } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useTableOneContext } from "../../../contexts/ConsumptionTableContextProvider.jsx";
import { useTableThreeContext } from "../../../contexts/ProductionTableContextProvider.jsx";

function TableList() {

  const { tableData } = useTableOneContext();

 
  const { tableData: tableDataThree } = useTableThreeContext();

  const tablesDetails = [
    {
      id: 1,
      title: "Consumption Table",
      description: "Store raw material consumption and timing data",
      path: "/consumption",
      icon: <FiTable className="text-green-600" size={28} />,
      records: tableData?.length || 0,
      lastUpdated: null,
      status: "active",
    },
    {
      id: 2,
      title: "Production Table",
      description: "Store data of production output and damaged details in kg",
      path: "/production",
      icon: <FiTable className="text-green-600" size={28} />,
      records: tableDataThree?.length || 0,
      lastUpdated: null,
      status: "active",
    },

  ];
  return (
    <div className="mt-4 mb-8">
      <h1 className="text-2xl font-bold text-slate-800 my-4 ">
        Production Entry Tables
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tablesDetails.map((table) => {
          return (
            <Link to={table.path} key={table.id}>
              <div className="bg-gray-100 p-4 rounded-2xl hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 bg-white rounded">{table.icon}</div>
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className={`w-2 h-2 ${
                        table.status === "active"
                          ? "bg-green-400"
                          : "bg-red-400"
                      } rounded-full animate-pulse`}
                    ></div>
                    <span>
                      {table.status.charAt(0).toUpperCase() +
                        table.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="mb-3">
                  <h1 className="text-[20px] font-semibold mb-3">
                    {table.title}
                  </h1>
                  <p className="text-sm text-gray-600 leading-5">
                    {table.description}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>{table.records} records</span>
                  <span>{table.lastUpdated}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#01ABEF] font-semibold  ">
                    Open Table{" "}
                  </span>
                  <FiArrowRight className="text-[#01ABEF] text-[20px] font-bold" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
export default TableList;
