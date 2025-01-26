import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleLeft, FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { MdOutlineSearch } from "react-icons/md";
import { adminSidebarElements } from "@/config";

function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMenuItems, setFilteredMenuItems] = useState(adminSidebarElements);

  // Debounce search functionality
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    setTimeout(() => {
      const filteredItems = adminSidebarElements.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredMenuItems(filteredItems);
    }, 1200); // Debounce delay
  };

  return (
    <div
      className={`xs:h-28 md:h-full bg-colorSecondary-light ${
        isCollapsed ? "md:w-20" : "md:w-[300px]"
      } transition-all duration-300 w-24 relative top-0 left-0 z-50`}
    >
      {/* Sidebar Header */}
      <div
        className={`h-28 bg-white flex items-center ${
          isCollapsed ? "justify-center" : "justify-between"
        } xs:hidden md:flex px-2`}
      >
        {/* Company Logo goes here */}
        <div>
          <Link to="/admin/dashboard">
            <img
              src="/images/logo-no-background.png"
              alt="Logo"
              className={`transition-all duration-300 ${
                isCollapsed ? "opacity-0 w-0" : "opacity-100 w-44"
              }`}
            />
          </Link>
        </div>

        {/* Collapse Button */}
        <div
          className="flex w-10 items-center justify-center cursor-pointer"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <FaAngleLeft
            style={{
              color: "#A27E7E",
              fontSize: "1.6rem",
              transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s",
            }}
          />
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div
        className={`h-28 flex xs:flex md:hidden items-center justify-center bg-white`}
      >
        <FaBars
          className="text-2xl cursor-pointer"
          onClick={() => setIsMobileMenuOpen(true)}
        />
      </div>

      {/* Sidebar Content */}
      <div
        className={`xs:fixed md:relative inset-0 z-50 transition-transform transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 bg-black md:bg-transparent flex-col flex`}
      >
        {/* Header Bar with Company Logo and Close Button */}
        <div className="h-28 items-center justify-between px-4 bg-black xs:flex md:hidden">
          {/* Company Logo */}
          <div>
            <Link to="/admin/dashboard">
              <img
                src="/images/logo-no-background.png"
                alt="Logo"
                className={`transition-all duration-300 opacity-100 w-44`}
              />
            </Link>
          </div>

          {/* Close Button */}
          <IoClose
            className="text-2xl text-white cursor-pointer"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </div>

        {/* Horizontal bar below the head bar */}
        <div className="border-b border-white xs:block md:hidden"></div>

        {/* Menu Content */}
        <div className="flex flex-col items-start space-y-0 px-2 pt-4 text-white">
          {/* Search Input */}
          <div className="relative w-full mb-4">
            {/* Search Icon */}
            <MdOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-3xl" />
            <input
              type="text"
              placeholder="Search for Sections..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-12 py-3 border border-white text-white 
              placeholder-gray-400 bg-transparent focus:outline-none
              placeholder:text-white"
            />
          </div>

          <ul className="w-full">
          {filteredMenuItems.map((section, index) => (
          <li key={index} className="mb-6">
            {/* Optional Heading */}
            {section.heading && (
              <div className="text-lg text-left font-bold text-colorText-light uppercase mb-2">
                {section.heading}
              </div>
            )}

            {/* Top-level item */}
            <div className="flex items-center space-x-2 mb-2">
              {section.icon && (
                <span className="text-lg">
                  {/* {React.createElement(section.icon)} */}
                  {<section.icon className="text-2xl"/>}
                </span>
              )}
              <span className="font-semibold">{section.name}</span>
            </div>

            {/* Nested items */}
            {section.items && (
              <ul className="pl-6 space-y-2">
                {section.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="hover:text-gray-400 cursor-pointer text-sm"
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
