import axiosInstance from "@/common/axiosInstance";
import React, { useEffect, useState } from "react";
import { BsBarChartLineFill, BsFileBarGraphFill } from "react-icons/bs";
import { FaSort } from "react-icons/fa";
import { GoHome } from "react-icons/go";

function AdminDashboard() {
  // for icons and its style
  const iconStyleHeading = { fontSize: "3.5em" };
  // for other icons
  const iconStyleOther = { fontSize: "1.8em" };

  const [orderStatusDetails, setOrderStatusDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderStatusAll = async () => {
      try {
        const response = await axiosInstance.get("/order/status/getall", {
          withCredentials: true,
          validateStatus: () => true, // ✅ Allows all status codes
        });

        if (response.status === 200) {
          setOrderStatusDetails(response.data); // ✅ Set data for success response
        } else {
          setError(response.data.message || "Something went wrong"); // ✅ Handle other statuses
        }
      } catch (err) {
        setError(err.message || "Network error occurred"); // ✅ Catch network errors
      }
    };

    fetchOrderStatusAll();
  }, []); // ✅ Runs only once when the component mounts

  console.log("Order Status details: ", orderStatusDetails);

  return (
    <div className="">
      {/* Heading for the content */}
      <div className="flex items-center">
        <GoHome style={iconStyleHeading} />
        <span className="pl-2 text-3xl font-bold">Dashboard</span>
      </div>

      {/* for spacing */}
      <div className="h-[8px]"></div>

      {/*  */}
      <div className="bg-white h-[350px] px-10 py-8">
        <div className="w-full flex items-center">
          <BsBarChartLineFill style={iconStyleOther} />
          <span className="pl-2 text-xl font-bold">
            Dashboard Order Statistics
          </span>
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
                    # <FaSort className="text-colorSort-light cursor-pointer" />
                  </div>
                </th>
                <th className="p-2 text-left">
                  <div className="inline-flex items-center gap-1">
                    Order Status{" "}
                    <FaSort className="text-colorSort-light cursor-pointer" />
                  </div>
                </th>
                <th className="p-2 pr-7 text-right">
                  <div className="inline-flex items-center gap-1">
                    Number of Orders{" "}
                    <FaSort className="text-colorSort-light cursor-pointer" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {orderStatusDetails && orderStatusDetails.length > 0 ? (
                orderStatusDetails.map((status, index) => (
                  <tr key={index} className="h-[50px] hover:bg-gray-200 text-colorSecondary-light">
                    <td className="p-2 pl-7 text-left text-colorTextSecondary-light font-bold">{index + 1}</td>
                    <td className="p-2 text-left">{status.orderStatus}</td>
                    <td className="p-2 text-right pr-7">
                      {status.totalOrders}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="h-[50px] hover:bg-gray-200  text-colorSecondary-light w-full">
                  <td className="p-2 pl-7 text-left text-colorTextSecondary-light font-bold">0</td>
                  <td className="p-2 text-left">No Status</td>
                    <td className="p-2 text-right pr-7">No Orders Yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
