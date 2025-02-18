import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaAngleLeft, FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { MdOutlineSearch } from "react-icons/md";
import { adminSidebarElements } from "@/config";

function SidebarSearch({ searchTerm, setSearchTerm, setFilteredMenuItems }) {
  // Debounce search functionality
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    setTimeout(() => {
      const filteredItems = adminSidebarElements.filter((section) =>
        // Filter through sections with subheading
        section.subheading.some(
          (subItem) =>
            subItem.name.toLowerCase().includes(value.toLowerCase()) ||
            // Filter through items of subheading
            (subItem.items &&
              subItem.items.some((item) =>
                item.name.toLowerCase().includes(value.toLowerCase())
              ))
        )
      );
      setFilteredMenuItems(filteredItems);
    }, 200); //Debounce delay
  };

  return (
    <div className="w-full xs:bg-black md:bg-colorSecondary-light sticky top-0 z-10 py-2 pt-4">
      <div className="relative w-full max-w-4xl mx-auto">
        {/* Search Icon */}
        <MdOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-3xl" />
        <input
          type="text"
          placeholder="Search for Sections..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full pl-12 h-12 border border-white text-white 
      placeholder-gray-400 bg-transparent focus:outline-none
      placeholder:text-white"
        />
      </div>
    </div>
  );
}

function SidebarMenuList({ filteredMenuItems }) {
  const location = useLocation(); // ✅ Get the current URL
  const currentPath = location.pathname.toLowerCase(); // Convert to lowercase for comparison

  return (
    <div className="w-full">
      <ul className="w-full">
        {filteredMenuItems.map((section, index) => (
          <li key={index}>
            {/* Optional Heading */}
            {section.heading && (
              <div className="text-lg text-left font-bold text-colorText-light uppercase h-12 pl-4 flex items-center mt-2">
                {section.heading}
              </div>
            )}

            {/* Subheadings */}
            {section.subheading &&
              section.subheading.map((sub, idx) => {
                // ✅ Check if current menu item matches the URL
                const isActive = currentPath.includes(sub.name.toLowerCase());

                return (
                  <div key={idx}>
                    {/* Top-level item */}
                    <div className={`flex items-center space-x-2 h-12 pl-4 ${
                        isActive ? "bg-backgroundSecondary-light" : "" // ✅ Apply background color if active
                      }`}>
                      {sub.icon && (
                        <span className="text-lg">
                          <sub.icon className="text-2xl" />
                        </span>
                      )}
                      <span className="font-semibold">{sub.name}</span>
                    </div>

                    {/* Nested items */}
                    {sub.items && (
                      <ul className="pl-12">
                        {sub.items.map((item, itemIdx) => (
                          <li
                            key={itemIdx}
                            className="h-12 font-bold flex items-center justify-between hover:text-gray-400 cursor-pointer text-sm pr-4"
                          >
                            {/* Disc and Name */}
                            <div className="flex items-center space-x-2">
                              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                              <span>{item.name}</span>
                            </div>

                            {/* Dash */}
                            <span className="text-white font-bold">-</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileViewSidebar({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  searchTerm,
  setSearchTerm,
  filteredMenuItems,
  setFilteredMenuItems,
}) {
  return (
    <div
      className={`fixed inset-0 z-50 transition-transform transform duration-300 ease-in-out ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      } bg-black flex-col flex h-full`}
    >
      {/* Header Bar with Company Logo and Close Button */}
      <div className="h-28 items-center justify-between px-4 bg-black flex">
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
      <div className="border-b border-white block"></div>

      {/* Menu Content */}
      <div
        className="flex flex-col items-start space-y-0 
      px-2 text-white
      overflow-y-scroll 
        max-h-[calc(100vh-112px)]
        [&::-webkit-scrollbar-track]:rounded-full 
    [&::-webkit-scrollbar-thumb]:rounded-full 
    [&::-webkit-scrollbar]:w-0.5 
    [&::-webkit-scrollbar-track]:bg-transparent 
    [&::-webkit-scrollbar-thumb]:bg-gray-200"
      >
        {/* Search Input */}
        <SidebarSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setFilteredMenuItems={setFilteredMenuItems}
        />

        <div className="w-full">
          <SidebarMenuList filteredMenuItems={filteredMenuItems} />
        </div>
      </div>
    </div>
  );
}

function DesktopViewSidebar({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  searchTerm,
  setSearchTerm,
  filteredMenuItems,
  setFilteredMenuItems,
}) {
  return (
    <div
      className={`relative inset-0 z-50 transition-transform transform duration-300 ease-in-out ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      } translate-x-0 bg-black bg-transparent flex-col flex h-full`}
    >
      {/* Menu Content */}
      <div
        className="flex flex-col items-start space-y-0 
      px-2 text-white
      overflow-y-scroll 
        max-h-[calc(100vh-112px)]
        [&::-webkit-scrollbar-track]:rounded-full 
    [&::-webkit-scrollbar-thumb]:rounded-full 
    [&::-webkit-scrollbar]:w-0.5 
    [&::-webkit-scrollbar-track]:bg-transparent 
    [&::-webkit-scrollbar-thumb]:bg-gray-200"
      >
        {/* Search Input */}
        <SidebarSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setFilteredMenuItems={setFilteredMenuItems}
        />

        <div className="w-full">
          <SidebarMenuList filteredMenuItems={filteredMenuItems} />
        </div>
      </div>
    </div>
  );
}

function AdminSidebar() {
  const [width, setWidth] = useState(window.innerWidth);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMenuItems, setFilteredMenuItems] =
    useState(adminSidebarElements);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`xs:h-28 md:h-full bg-colorSecondary-light ${
        isCollapsed ? "md:w-20" : "md:w-[300px]"
      } transition-all duration-100 w-24 relative top-0 left-0 z-50`}
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

      {/* Mobile Menu */}
      <div className="md:hidden">
        <MobileViewSidebar
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredMenuItems={filteredMenuItems}
          setFilteredMenuItems={setFilteredMenuItems}
        />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:block">
        <DesktopViewSidebar
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredMenuItems={filteredMenuItems}
          setFilteredMenuItems={setFilteredMenuItems}
        />
      </div>
    </div>
  );
}

export default AdminSidebar;
