function Footer() {
  return (
    <div className="gap-5 flex justify-between items-end p-4 bg-sky-100 border-t overflow-x-hidden">
      <div className="flex flex-col gap-2">
        <input
          type="text"
          className="border-b border-sky-300 bg-transparent px-2 py-1 focus:outline-none focus:border-[#01ABEF] transition-colors"
          placeholder="Signature"
        />
        <span className="text-sm font-medium text-slate-700 whitespace-nowrap">
          FACTORY SUPERVISOR
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          className="border-b border-sky-300 bg-transparent px-2 py-1 focus:outline-none focus:border-[#01ABEF] transition-colors"
          placeholder="Signature"
        />
        <span className="text-sm font-medium text-slate-700 whitespace-nowrap">
          GODOWN SUPERVISOR
        </span>
      </div>
    </div>
  );
}
export default Footer;
