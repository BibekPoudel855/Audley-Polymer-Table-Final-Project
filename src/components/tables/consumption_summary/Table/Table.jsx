import { useEffect } from "react";
import { useTableTwoContext } from "../../../../contexts/ConsumptionReportContext.jsx";
import TableHeader from "./TableHeader.jsx";
import TableRow from "./TableRow.jsx";
import AddingRow from "./AddingRow.jsx";
import Footer from "./../Footer/Footer.jsx";
import ProductNotFoundErr from "./../../../../common/NotFoundError/ProductNotFoundErr.jsx";
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
    <div className="w-full lg:w-[60vw] mx-auto">
      <div className="bg-white rounded-lg shadow overflow-hidden mb-24 lg:mb-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <TableHeader />
            <tbody>
              {/* {tableData.map((data, index) => (
                <TableRow key={data.ID} data={data} index={index} />
              ))} */}
              <AddingRow />
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t bg-gray-50">
          <ProductNotFoundErr />
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Table;
