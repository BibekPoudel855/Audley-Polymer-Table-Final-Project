import { useEffect } from "react";
import { useTableTwoContext } from "../../../../contexts/TableTwoContextProvider.jsx";
import TableControls from "../components/controls/TableControls.jsx";
import NavigationControls from "../components/controls/NavigationControls.jsx";
import TableHeader from "../components/table/TableHeader.jsx";
import TableRow from "../components/table/TableRow.jsx";
import AddingRow from "../components/table/AddingRow.jsx";

function Table() {
  const { tableData, currentColumnIDX, setCurrentColumnName, columnNames } =
    useTableTwoContext();

  // Table actions and effects (previously in useTableActions hook)
  useEffect(() => {
    localStorage.setItem("tableData2nd", JSON.stringify(tableData));
  }, [tableData]);

  useEffect(() => {
    const currentColumnName = columnNames[currentColumnIDX];
    setCurrentColumnName(currentColumnName);
  }, [columnNames, currentColumnIDX, setCurrentColumnName]);

  return (
    <div className="max-h-screen overflow-auto px-4">
      <div className="max-w-4xl mx-auto">
        <TableControls />

        <div className="bg-white rounded-lg shadow-sm  overflow-hidden mb-30">
          <table className="w-full">
            <TableHeader />
            <tbody>
              {tableData.map((data, index) => (
                <TableRow key={data.ID} data={data} index={index} />
              ))}
              <AddingRow />
            </tbody>
          </table>
        </div>

        <NavigationControls />
      </div>
    </div>
  );
}

export default Table;
