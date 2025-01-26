import React from "react";
import { BsPerson } from "react-icons/bs";
import { Link } from "react-router-dom";

function AdminNavigation() {
  // for icons and its style
  const iconStyle = { color: "white", fontSize: "1.5em" };

  return (
    <div className="flex-1 h-full ">
      <nav>
        <div className="bg-colorMain-light w-full h-28">
            <div className="flex items-center justify-end h-full px-8">
                {/* for profile button */}
                <div className="flex gap-4 items-center justify-end">
                  {/* for profile only */}
                  <div className="relative group w-28 h-28 bg-colorSecondary-light flex flex-col items-center justify-center cursor-pointer">
                    <BsPerson style={iconStyle} />
                    <span className="text-white font-bold text-sm">
                      Profile
                    </span>

                    {/* Dropdown Box */}
                    <div
                      className="absolute z-10 top-full right-0 w-72 bg-white shadow-custom p-2 opacity-0
                        pointer-events-none 
                        group-hover:opacity-100 group-hover:pointer-events-auto
                        transition-all duration-200 ease-in-out
                        px-4 py-4"
                    >
                      {/* Message */}
                      <div className="mb-2 text-gray-700 text-sm text-left">
                        <p className="font-bold ">Welcome</p>
                        <p>To access account and manage orders</p>
                      </div>

                      {/* LOGIN / SIGNUP Button */}
                      <div className="mb-4 flex justify-start">
                        <Link
                          to="/login"
                          className="mt-2 px-4 py-2 border border-colorMain-light text-colorSecondary-light font-bold rounded-none text-sm bg-transparent hover:border-colorSecondary-light hover:text-colorSecondary-light transition-all"
                        >
                          LOGIN / SIGNUP
                        </Link>
                      </div>

                      {/* Horizontal Line */}
                      <div className="border-t border-gray-300 my-3"></div>

                      {/* Dropdown List */}
                      <ul className="text-left text-gray-700 text-sm">
                        <li className="py-1 px-2 hover:font-bold cursor-pointer rounded">
                          Orders
                        </li>
                        <li className="py-1 px-2 hover:font-bold cursor-pointer rounded">
                          Contact Us
                        </li>
                        <li className="py-1 px-2 hover:font-bold cursor-pointer rounded">
                          Saved Cards
                        </li>
                        <li className="py-1 px-2 hover:font-bold cursor-pointer rounded">
                          Saved Addresses
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default AdminNavigation;
