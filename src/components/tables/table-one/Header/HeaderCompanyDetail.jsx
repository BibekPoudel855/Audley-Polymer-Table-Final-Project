import { MdFactory } from "react-icons/md";

function HeaderCompanyList() {
  return (
    <div className="m-4">
      <div className="flex items-center gap-3 bg-white shadow border rounded border-[#01ABEF] w-full p-4">
        <div className="bg-gradient-to-r from-[#01ABEF] to-[#33BEFF] p-4 rounded-full">
          <MdFactory className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col justify-evenly text-left">
          <h1 className="text-lg font-bold text-slate-800">
            AUDLEY POLYMERS PVT LTD
          </h1>
          <span className="text-slate-500 text-[12px]">
            RATNANAGAR, CHITWAN, NEPAL
          </span>
          <h2 className="text-sm text-[#01ABEF] font-semibold">
            RAW MATERIALS CONSUMPTION LIST
          </h2>
        </div>
      </div>
    </div>
  );
}
export default HeaderCompanyList;
