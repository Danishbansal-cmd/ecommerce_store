import axiosInstance from "@/common/axiosInstance";
import React, { useEffect, useState } from "react";
import {
  AiOutlineDown,
  AiOutlineDownload,
  AiOutlineSearch,
} from "react-icons/ai";
import { FaSort } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { TfiLayoutColumn3 } from "react-icons/tfi";

function AdminOrdersAll() {
  // for icons and its style
  const iconStyleHeading = { fontSize: "3.5em" };

  const [orderDetails, setOrderDetails] = useState(null);
  const [errors, setErrors] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState(null);

  // to show the column option dialog
  const [isColumnOptionsOpen, setIsColumnOptionsOpen] = useState(false);

  useEffect(() => {
    const fetchOrderAll = async () => {
      const response = await axiosInstance.get("/order/getall", {
        withCredentials: true,
        validateStatus: () => true, // ✅ Allows all status codes
      });

      if (response.status === 200) {
        setOrderDetails(response.data);
      } else {
        setErrors(response.data.message || "Something went wrong"); // ✅ Handle other statuses
      }
      return response.data;
    };
    fetchOrderAll(); // Extract all orders from the backend

    // setOrderDetails([
    //   {
    //     _id: "ORD123",
    //     createdAt: "2024-02-18",
    //     // user: { username: "John Doe", email: "john@example.com" },
    //     totalAmount: 150,
    //     // paymentInfo: { method: "Credit Card", status: "Completed" },
    //     orderStatus: "Shipped",
    //   },
    //   {
    //     _id: "ORD456",
    //     createdAt: "2024-02-19",
    //     // user: { username: "Jane Smith", email: "jane@example.com" },
    //     totalAmount: 200,
    //     // paymentInfo: { method: "PayPal", status: "Pending" },
    //     orderStatus: "Pending",
    //   },
    // ]);
  }, []); // Runs only once when the component mounts

  // ✅ Extract column names only after `orderDetails` is fetched
  useEffect(() => {
    if (orderDetails && orderDetails.length > 0) {
      const firstOrder = orderDetails[0];
      const extractedData = {};

      Object.keys(firstOrder).forEach((key) => {
        extractedData[key] = true;
      });

      setVisibleColumns(extractedData);
    }
  }, [orderDetails]); // ✅ Runs only when `orderDetails` is updated

  const toggleColumn = (column) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  console.log("orderDetails", orderDetails);
  console.log("visible Columns", visibleColumns);

  return (
    <div>
      {/* Heading for the content */}
      <div className="flex items-center">
        <IoCartOutline style={iconStyleHeading} />
        <span className="pl-2 text-3xl font-semibold">All Orders</span>
      </div>

      {/* for spacing */}
      <div className="h-[8px]"></div>

      {/* Dashboard Order Statistics */}
      <section>
        <div className="bg-white h-[350px]shadow-custom">
          {/* For Header Row */}
          <div className="flex items-center justify-between px-8 py-4">
            {/* search box for orders */}
            <div className="">
              {/* for search box */}
              <div className="flex items-center w-72 bg-backgroundMain-light gap-4 h-12 px-4">
                <AiOutlineSearch
                  style={{ color: "#FFA27F", fontSize: "2rem" }}
                />
                <input
                  placeholder="Ex : Search for Orders"
                  className="w-full bg-transparent text-colorSecondary-light focus:outline-none placeholder:text-colorSecondary-light placeholder:text-lg"
                />
              </div>
            </div>

            {/* Export and Column buttons */}
            <div className="flex gap-6">
              {/* Export Button */}
              <div>
                <button
                  className="flex items-center bg-transparent h-12 px-4 border-2 border-backgroundMain-light text-colorSecondary-light 
                rounded-none font-semibold gap-2 focus:outline focus:outline-2 focus:outline-black focus:outline-offset-0"
                >
                  <AiOutlineDownload className="text-2xl" />
                  <span>Export</span>
                  <AiOutlineDown className="text-xl ml-3" />
                </button>
              </div>
              {/* Column Button */}
              <div className="relative">
                <button
                  className="flex items-center bg-transparent h-12 px-4 border-2 border-backgroundMain-light text-colorSecondary-light 
                  rounded-none font-semibold gap-2 focus:outline focus:outline-2 focus:outline-black focus:outline-offset-0"
                  onClick={() => setIsColumnOptionsOpen(!isColumnOptionsOpen)}
                >
                  <TfiLayoutColumn3 className="text-2xl" />
                  <span>Column</span>
                </button>

                {/* Popout Div (Toggled on Click of Column Button) */}
                {/* To select the columns that admins want to make it visible */}
                {isColumnOptionsOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white shadow-custom p-4 z-10">
                    <p className="text-gray-700 font-bold text-left">
                      Select Columns
                    </p>
                    <ul className="mt-2 space-y-2">
                      {visibleColumns &&
                        Object.keys(visibleColumns).map((columnName) => {
                          return (
                            <li className="flex items-center justify-between">
                              <label htmlFor="orderId">{columnName}</label>
                              <input
                                type="checkbox"
                                id="orderId"
                                className="ml-2"
                                checked={visibleColumns[columnName]}
                                onChange={() => {
                                  toggleColumn(columnName);
                                }}
                              />
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* for spacing */}
          <div className="h-[24px]"></div>

          {/*  */}
          <div>
            <table className="w-full table-auto">
              <thead className="text-colorTextSecondary-light h-[50px]">
                <tr className="bg-gray-100">
                  <th className="p-2 pl-7 text-left">
                    <div className="inline-flex items-center gap-1">
                      #
                      <FaSort className="text-colorSort-light cursor-pointer" />
                    </div>
                  </th>
                  {visibleColumns &&
                    Object.keys(visibleColumns).map((columnName) => {
                      return visibleColumns[columnName] ? (
                        <th className="p-2 text-left" key={columnName}>
                          <div className="inline-flex items-center gap-1">
                            {columnName}
                            <FaSort className="text-colorSort-light cursor-pointer" />
                          </div>
                        </th>
                      ) : null;
                    })}
                    <th className="p-2 text-right pr-7">
                    <div className="inline-flex items-center gap-1">
                      Actions
                      <FaSort className="text-colorSort-light cursor-pointer" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderDetails && orderDetails.length > 0 ? (
                  orderDetails.map((order, index) => (
                    <tr
                      key={index}
                      className="h-[50px] hover:bg-gray-200 text-colorSecondary-light"
                    >
                      <td className="p-2 pl-7 text-left text-colorTextSecondary-light font-bold">
                        {index + 1}
                      </td>
                      {visibleColumns &&
                        Object.keys(visibleColumns).map(
                          (columnName) =>
                            visibleColumns[columnName] && (
                              <td key={columnName} className="p-2 text-left">
                                {order[columnName]}
                              </td>
                            )
                      )}
                      <td className="p-2 text-right pr-7">
                                adsf
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="h-[50px] hover:bg-gray-200  text-colorSecondary-light w-full">
                    <td className="p-2 pl-7 text-left text-colorTextSecondary-light font-bold">
                      0
                    </td>
                    <td className="p-2 text-left">No Status</td>
                    <td className="p-2 text-right pr-7">No Orders Yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminOrdersAll;
