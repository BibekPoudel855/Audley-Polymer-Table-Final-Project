function Header() {
  return (
    <div className="text-center md:text-left mt-8 leading-4">
      <h1 className="text-3xl font-bold text-slate-800 mb-4">
        Welcome to Audley Polymers{" "}
      </h1>
      <div className="flex flex-col md:flex-row gap-6 md:gap-0 w-full items-center justify-between">
        <p className="text-slate-600 text-[18px]">
          Manage your daily data efficiently.
        </p>
        <div className="flex items-center gap-2  bg-gray-100 px-3 py-2 rounded-full">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          Server Online
        </div>
      </div>
    </div>
  );
}
export default Header;
