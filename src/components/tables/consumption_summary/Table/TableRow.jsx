function TableRow({ data, index }) {
  return (
    <tr
      className={`hover:bg-sky-50 ${
        index % 2 === 0 ? "bg-white" : "bg-sky-25"
      } transition-colors`}
    >
      <td className="border-b border-sky-200 px-2 py-4 text-slate-700 font-medium text-center">
        {data.ID}
      </td>
      <td className="border-b border-sky-200 px-2 py-4 text-center">
        Calcium Carbonate
      </td>
      <td className="border-b border-sky-200 px-2 py-4 text-center">100</td>
    </tr>
  );
}
export default TableRow;
