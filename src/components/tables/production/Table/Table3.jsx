import { FiTrash2 } from "react-icons/fi";
import { useTableThreeContext } from "../../../../contexts/ProductionTableContextProvider.jsx";
import TableHeaderTitle from "./TableHeader/TableHeaderTitle.jsx";
import TableHeader from "./TableHeader/TableHeader.jsx";
import TableReset from "../Footer/TableReset.jsx";
import TableStatistics from "../Footer/TableStatistics.jsx";

function Table3() {
  const {
    selectedProducts,
    tableData,
    handleDeleteProduct,
    handleAddNewRow,
    updateTableData,
  } = useTableThreeContext();

  return (
    <>
      {/* main table  */}
      <TableHeaderTitle />
      <div className="table-container lg:w-full px-4">
        <table className="overflow-hidden border-sky-200 shadow-md rounded-b lg:w-full">
          <TableHeader />
          <tbody>
            {tableData.map((data, index) => {
              return (
                <tr
                  key={data.id}
                  className="border-b border-sky-100 p-2 font-medium text-slate-700"
                >
                  <td className="text-center w-[10%]">{data.id}</td>
                  <td className="p-1.5 w-[60%]">
                    <select
                      value={data.item}
                      className={`w-full px-0 py-2 border rounded  ${data.item ? "border-0" : "border-1 border-gray-300"}`}
                      onChange={(e) => {
                        updateTableData(data, e.target.value, "products");
                      }}
                    >
                      <option value="">Select</option>
                      {selectedProducts.length > 0 &&
                        selectedProducts.map((product) => {
                          return (
                            <option
                              key={product.label}
                              value={product.value}
                              title={product.label}
                            >
                              {product.label.length > 20
                                ? `${product.label.substring(0, 20)}...`
                                : product.label}
                            </option>
                          );
                        })}
                    </select>
                  </td>
                  <td className="p-2 w-[20%]">
                    <input
                      type="number"
                      placeholder="K.G."
                      className={`w-full px-1 py-2 rounded  ${data.weight ? "border-0 " : "border-1 border-gray-300" }`}
                      onChange={(e) => {
                        updateTableData(data, e.target.value, "weight");
                      }}
                      value={data.weight ? data.weight : ""}
                    />
                  </td>
                  <td className="px-2 py-4 flex justify-center items-center ">
                    <button
                      disabled={index !== tableData.length - 1}
                      onClick={() => {
                        handleDeleteProduct(data.id);
                      }}
                      className={`transition ${
                        index !== tableData.length - 1
                          ? "cursor-not-allowed "
                          : "cursor-pointer hover:scale-110"
                      }`}
                    >
                      <FiTrash2
                        className={`transition text-xl ${
                          index !== tableData.length - 1
                            ? "text-gray-300"
                            : "text-red-500 hover:text-red-600"
                        }`}
                      />
                    </button>
                  </td>
                </tr>
              );
            })}

            <tr>
              <td colSpan={4} className="p-4">
                {" "}
                <button
                  className="bg-[#01ABEF] text-white px-4 py-2 rounded hover:bg-[#0189CC] transition"
                  onClick={() => {
                    handleAddNewRow();
                  }}
                >
                  + Add Row
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <TableStatistics />

        <TableReset />
      </div>
    </>
  );
}
export default Table3;
