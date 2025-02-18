import { useLogout } from "@/utils/logout";
import React from "react";
import { BsPerson } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function AdminNavigation() {
  // for icons and its style
  const iconStyle = { color: "white", fontSize: "1.5em" };

  const { user } = useSelector((state) => state.auth);
  const logout = useLogout();

  return (
    <nav>
      <div className="bg-colorMain-light w-full h-28">
        <div className="flex items-center justify-end h-full px-8">
          {/* for profile button */}
          <div className="flex gap-4 items-center justify-end">
            {/* for profile only */}
            <div className="relative group w-28 h-28 bg-colorSecondary-light flex flex-col items-center justify-center cursor-pointer">
              <BsPerson style={iconStyle} />
              <span className="text-white font-bold text-sm">Profile</span>

              {/* Dropdown Box */}
              <div
                className="absolute z-10 top-full right-0 w-72 bg-white shadow-custom p-2 opacity-0
                      pointer-events-none 
                      group-hover:opacity-100 group-hover:pointer-events-auto
                      transition-all duration-200 ease-in-out
                      px-4 py-4"
              >
                {/* if user is logged in */}
                {user && user?.username !== "" ? (
                  // if user is logged in
                  <div>
                    {/* Message */}
                    <div className="text-gray-700 text-sm text-left">
                      <p className="font-bold ">Hello Ecommerce User</p>
                      <p>{user?.username}</p>
                    </div>
                  </div>
                ) : (
                  // otherwise empty
                  <div></div>
                )}

                {/* Horizontal Line */}
                <div className="border-t border-gray-300 my-3"></div>

                {/* edit and logout */}
                <div>
                  <ul className="text-left text-gray-700 text-sm">
                    <li className="py-1 px-2 hover:font-bold cursor-pointer rounded">
                      Edit Profile
                    </li>
                    <li
                      className="py-1 px-2 hover:font-bold cursor-pointer rounded"
                      onClick={() => logout()}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavigation;
