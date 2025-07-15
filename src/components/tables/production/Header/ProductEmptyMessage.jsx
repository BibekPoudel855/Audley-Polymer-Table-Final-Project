import { FiPackage } from "react-icons/fi";

function ProductEmptyMessage() {
  return (
    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 m-4 flex items-center gap-2">
      <div className="bg-orange-200 p-2 rounded-full">
        <FiPackage className="text-orange-600 text-lg" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-orange-800">
          No Products Selected
        </h3>
        <p className="text-sm text-orange-600">
          Please go to the configuration section to select products for data
          entry.
        </p>
      </div>
    </div>
  );
}

export default ProductEmptyMessage;
