import { useTableThreeContext } from "../../../contexts/ProductionTableContextProvider.jsx";

function ProductionTableReport({ data }) {
  const { allProducts } = useTableThreeContext();

  const checkProductWaste = (itemValue) => {
    const product = allProducts.find((p) => {
      if (p.value === itemValue) {
        return true;
      }
    });

    return product && product.waste;
  };

  function calculateTotalWeight(data) {
    let total = 0;
    data.forEach((item) => {
      console.log(item);
      total += parseFloat(item.weight) || 0;
    });
    return total;
  }
  return (
    <>
      <div className="flex gap-2 items-center mb-2">
        <div className="flex gap-2 items-center mb-2">
          <div className="h-2 w-2 bg-red-500"></div>
          <span>Waste</span>
        </div>
        <div className="flex gap-2 items-center mb-2 ">
          <div className="h-2 w-2 bg-gray-300"></div>
          <span>Non-Waste</span>
        </div>
      </div>
      <div className="overflow-x-auto w-[90vw]">
        <table className="w-full border border-gray-300 bg-white">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                ID
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                Item
              </th>
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                Weight
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              const isWaste = checkProductWaste(item.item);
              return (
                <tr
                  key={item.id}
                  className={`${
                    isWaste ? "bg-red-50 hover:bg-red-100" : "bg-gray-50"
                  }`}
                >
                  <td className="text-center border border-gray-300">
                    {item.id || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    {item.item || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    {item.weight || "N/A"}
                  </td>
                </tr>
              );
            })}
            <tr>
              <td
                colSpan={2}
                className="border border-gray-300 px-4 py-3 text-center"
              >
                Total
              </td>
              <td className="border border-gray-300 px-4 py-3 text-center">
                {calculateTotalWeight(data)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProductionTableReport;
