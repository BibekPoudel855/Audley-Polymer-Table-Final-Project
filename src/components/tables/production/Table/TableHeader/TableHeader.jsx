import { FiTrash2 } from "react-icons/fi";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th className="p-1.5 w-[10%] text-center font-semibold bg-[#01ABEF] border-b text-white border-[#0189cc]">
          S.N.
        </th>
        <th className="p-2 w-[60%] text-center font-semibold bg-[#01ABEF] border-b text-white border-[#0189CC]">
          Products
        </th>
        <th className="p-2 w-[20%] text-center font-semibold bg-[#01ABEF] border-b text-white border-[#0189CC]">
          Weight
        </th>
        <th className="p-2 w-[10%] text-center font-semibold bg-[#01ABEF] border-b text-white border-[#0189CC]">
          <FiTrash2
            className={`transition text-xl text-white `}
          />
        </th>
      </tr>
    </thead>
  );
}

export default TableHeader;
