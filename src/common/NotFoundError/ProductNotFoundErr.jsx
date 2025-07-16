import { FiTable } from "react-icons/fi";

function ProductNotFoundErr() {
  return (
    <div className="flex flex-col items-center justify-center gap-1 h-[30vh]  md:h-[40vh] lg:h-[60vh] p-8 bg-white border border-gray-200 rounded-lg shadow-md my-8">
      <FiTable size={80} className="text-gray-400" />
      <h2 className="text-lg font-semibold text-gray-700">Data Not Found</h2>
      <p className="text-gray-600 text-center">
        An error occurred while generating the report.
      </p>
    </div>
  );
}

export default ProductNotFoundErr;
