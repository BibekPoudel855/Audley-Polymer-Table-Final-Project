import { useTableTwoContext } from "../../../../contexts/ConsumptionReportContext.jsx";

function TableRow({ data, index }) {
  const { currentColumnName, tableData, setTableData } = useTableTwoContext();

  const handleDynamicColumnInputChange = (e, data) => {
    const updatedData = tableData.map((item) => {
      if (item.ID === data.ID) {
        return {
          ...item,
          [currentColumnName]: e.target.value,
        };
      }
      return item;
    });
    setTableData(updatedData);
  };

  const handleRejectionInputChange = (e, data) => {
    const updatedData = tableData.map((item) => {
      if (item.ID === data.ID) {
        return {
          ...item,
          Rejection: e.target.value,
        };
      }
      return item;
    });
    setTableData(updatedData);
  };

  return (
    <tr
      className={`hover:bg-sky-50 ${
        index % 2 === 0 ? "bg-white" : "bg-sky-25"
      } transition-colors`}
    >
      <td className="border-b border-sky-200 px-6 py-4 text-slate-700 font-medium">
        {data.ID}
      </td>
      <td className="border-b border-sky-200 px-6 py-4">
        <input
          type="text"
          className="w-full px-3 py-2 border border-sky-300 rounded-md transition-all outline-0 "
          value={data[currentColumnName] ? data[currentColumnName] : ""}
          onChange={(e) => handleDynamicColumnInputChange(e, data)}
        />
      </td>
      <td className="border-b border-sky-200 px-6 py-4">
        <input
          type="text"
          className="w-full px-3 py-2 border border-sky-300 rounded-md transition-all  outline-0"
          value={data.Rejection ? data.Rejection : ""}
          onChange={(e) => handleRejectionInputChange(e, data)}
        />
      </td>
    </tr>
  );
}

export default TableRow;
