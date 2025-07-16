function ProductionTableReport({data}) {
  return (
    <>
      {" "}
      <div>
        <table className="w-full border border-gray-300 bg-white">
          <thead>
            <tr className="bg-green-50">
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
            {data.map((item) => (
              <tr key={item.id}>
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
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProductionTableReport;
