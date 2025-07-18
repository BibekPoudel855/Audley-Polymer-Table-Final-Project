import { FiClock, FiPackage, FiTable } from "react-icons/fi";
import { GiBrokenPottery } from "react-icons/gi";
import { useMainContext } from "../../../contexts/MainContext.jsx";
function AllSummaryDetail() {
  const { productData } = useMainContext();

  const totalWaste = productData.filter((product) => product.waste).length;
  const totalRawMaterials = productData.filter(
    (product) => product.raw_material
  ).length;
  const totalNonRawMaterials = productData.length - totalRawMaterials;
  const stats = [
    {
      id: 1,
      title: "Raw Materials",
      value: totalRawMaterials,
      icon: <FiPackage className="text-green-600" size={24} />,
    },
    // {
    //   id: 2,
    //   title: "Non Raw Materials",
    //   value: totalNonRawMaterials,
    //   icon: <FiPackage className="text-green-600" size={24} />,
    // },
    {
      id: 3,
      title: "Waste Products",
      value: totalWaste,
      icon: <GiBrokenPottery className="text-red-600" size={24} />,
    },
    {
      id: 4,
      title: "Total Products",
      value: productData.length,
      icon: <FiPackage className="text-green-600" size={24} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
      {stats.map((stat) => {
        return (
          <div
            key={stat.id}
            className="bg-gray-100 rounded-2xl p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex flex-col items-center">
              <div
                className={`bg-white w-10 h-10 rounded flex items-center justify-center`}
              >
                {stat.icon}
              </div>
              <div className="mt-2 text-center">
                <span className="font-bold text-2xl  ">{stat.value}</span>
                <div className="text-gray-600">{stat.title}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AllSummaryDetail;
