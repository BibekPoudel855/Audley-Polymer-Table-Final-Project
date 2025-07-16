function ConsumptionTableReport({ data }) {
  const getColumnNames = () => {
    if (!data || data.length === 0) return [];

    const allColumns = [];
    data.forEach((item) => {
      if (item.fValues) {
        Object.keys(item.fValues).forEach((column) => {
          if (!allColumns.includes(column)) {
            allColumns.push(column);
          }
        });
      }
    });

    return allColumns;
  };

  const columnNames = getColumnNames();

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 bg-white">
          <thead>
            <tr className="bg-blue-50">
              <th className="border border-gray-300 px-4 py-3 font-semibold text-left">
                ID
              </th>
              <th className="border border-gray-300 px-4 py-3 font-semibold text-left">
                Item Name
              </th>
              {columnNames.map((columnName) => {
                return (
                  <th
                    key={columnName}
                    className="border border-gray-300 px-4 py-3 font-semibold text-center"
                  >
                    {columnName}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              console.log(item);

              return (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    {item.id || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-3">
                    {item.itemName || "N/A"}
                  </td>
                  {columnNames.map((columnName) => {
                    console.log(columnName);

                    return (
                      <td
                        key={columnName}
                        className="border border-gray-300 px-4 py-3 text-center"
                      >
                        {item.fValues?.[columnName] || "N/A"}
                      </td>
                    );
                  })}
                </tr>
              );
            })}

            {/* Total data row */}
            <tr className="bg-blue-100 font-semibold">
              <td className="border border-gray-300 px-4 py-3 text-center"></td>
              <td className="border border-gray-300 px-4 py-3">Total</td>
              {columnNames.map((columnName) => {
                const total = data.reduce((sum, item) => {
                  const value = parseFloat(item.fValues?.[columnName] || 0);
                  return sum + (isNaN(value) ? 0 : value);
                }, 0);

                return (
                  <td
                    key={columnName}
                    className="border border-gray-300 px-4 py-3 text-center"
                  >
                    {total.toFixed(2)}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ConsumptionTableReport;
