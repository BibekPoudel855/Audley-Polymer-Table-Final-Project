import { useState } from "react";
import { BiSolidReport } from "react-icons/bi";
import { FiHome, FiMenu, FiSettings, FiTable } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { id: 1, icon: <FiHome size={20} />, label: "Dashboard", path: "/" },
    {
      id: 2,
      icon: <FiTable size={20} />,
      label: "Raw Material Consumption",
      path: "/consumption",
    },
    {
      id: 4,
      icon: <FiTable size={20} />,
      label: "Production Output",
      path: "/production",
    },
    {
      id: 5,
      icon: <BiSolidReport size={22} />,
      label: "Reports",
      path: "/reports",
    },
    {
      id: 6,
      icon: <FiSettings size={20} />,
      label: "Settings",
      path: "/settings",
    },
  ];

  return (
    <>
      <nav
        className={`w-[90vw] mx-auto flex items-center justify-between py-2 md:hidden`}
      >
        <Link to={"/"}>
          <img
            src="https://audleypolymers.com/wp-content/uploads/2024/10/Audley-Polymer-Logo.png"
            alt="logo"
            className="h-5 rounded-full mr-4"
          />
        </Link>
        <FiMenu
          className={`text-[#01ABEF] text-2xl ${isOpen ? "hidden" : "block"}`}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
      </nav>
      {isOpen && (
        <div className="fixed top-0 right-0 w-full h-full bg-white rounded z-100">
          <div className="w-[90vw] mx-auto ">
            <div className="flex items-center justify-between border-b border-gray-200 w-[90vw] mx-auto py-2">
              <Link to={"/"}>
                <img
                  src="https://audleypolymers.com/wp-content/uploads/2024/10/Audley-Polymer-Logo.png"
                  alt="logo"
                  className="h-5 rounded-full mr-4"
                />
              </Link>
              <RxCross2
                className={`text-[#01ABEF] text-2xl ${
                  isOpen ? "block" : "hidden"
                } md:hidden`}
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              />
            </div>
            <ul>
              {navItems.map((item) => (
                <li key={item.id} onClick={() => setIsOpen(false)}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-4 hover:bg-gray-100`}
                  >
                    <span
                      className={`${
                        location.pathname === item.path
                          ? "text-[#01ABEF]"
                          : "text-gray-600"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span
                      className={`ml-2 ${
                        location.pathname === item.path
                          ? "text-[#01ABEF]"
                          : "text-gray-600"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-b border-gray-200">
              <Link
                to={"/"}
                className="flex items-center gap-2  p-4 text-red-500 hover:bg-red-600"
              >
                <IoIosLogOut className="text-[22px]" />
                Logout
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Nav;
