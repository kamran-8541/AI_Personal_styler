import React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const navItems = [
    { label: "Home", to: "/", exact: true },
    { label: "Explore", to: "/explore" },
    { label: "About Us", to: "/about" },
    { label: "Blog", to: "/blog" },
  ];

  const isActive = (item) => {
    if (item.exact) {
      return location.pathname === item.to;
    }
    return location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/"); 
  };

  return (
    <nav className="flex justify-between bg-[#f2f2f2] shadow-[0_4px_40px_0_rgba(255,255,255,0.15)] items-center px-10 py-6 text-black">
      <div className="flex justify-center items-center gap-[50px]">
        <h1 className="text-3xl font-extrabold">SnapStyle</h1>
        <ul className="flex space-x-8 text-xl mt-2">
          {navItems.map((item) => {
            const active = isActive(item);
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="inline-flex flex-col items-start transition-all duration-300 hover:text-black"
                >
                  <span className={active ? "font-bold text-black" : "font-medium text-black"}>
                    {item.label}
                  </span>
                  <span
                    className={`mt-1 h-[3px] rounded-full transition-all duration-300 ${
                      active ? "w-full bg-black" : "w-0"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {!token ? (
        <button
          className="flex bg-black items-center gap-2 cursor-pointer border px-5 py-2 rounded-full hover:text-purple-600 transition-all duration-300"
          onClick={() => navigate("/login")}
        >
          <AiOutlineLogin className="text-lg text-white" />
          <p className="text-white">Log In</p>
        </button>
      ) : (
        <button
          className="flex bg-black items-center gap-2 border cursor-pointer px-5 py-2 rounded-full hover:text-purple-600 transition-all duration-300"
          onClick={handleLogout}
        >
          <AiOutlineLogout className="text-lg text-white" />
          <p className="text-white">Logout</p>
        </button>
      )}
    </nav>
  );
};
