import axiosInstance from "@/common/axiosInstance";
import React, { useEffect, useState } from "react";
import { BsBarChartLineFill } from "react-icons/bs";
import { FaSort, FaStar } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { Link } from "react-router-dom";

function AdminDashboard() {
  // for icons and its style
  const iconStyleHeading = { fontSize: "3.5em" };
  // for other icons
  const iconStyleOther = { fontSize: "1.5em" };

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
    <div>
      {/* Heading for the content */}
      <div className="flex items-center">
        <GoHome style={iconStyleHeading} />
        <span className="pl-2 text-3xl font-semibold">Dashboard</span>
      </div>

      {/* for spacing */}
      <div className="h-[8px]"></div>

      {/* Dashboard Order Statistics */}
      <section>
        <div className="bg-white h-[350px] px-10 py-8 shadow-custom">
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
                      #{" "}
                      <FaSort className="text-colorSort-light cursor-pointer" />
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
                    <tr
                      key={index}
                      className="h-[50px] hover:bg-gray-200 text-colorSecondary-light"
                    >
                      <td className="p-2 pl-7 text-left text-colorTextSecondary-light font-bold">
                        {index + 1}
                      </td>
                      <td className="p-2 text-left">{status.orderStatus}</td>
                      <td className="p-2 text-right pr-7">
                        {status.totalOrders}
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

      {/* for spacing between two sections*/}
      <div className="h-[40px]"></div>

      {/* Yearly Statistics */}
      <section>
        <div className="bg-white h-[250px] px-10 py-8 shadow-custom">
          <div className="flex flex-col">
            {/* Show the upperline and all */}
            <div className="flex  justify-between items-center">
              <span>Total Earnings : </span>
              <div className="flex items-center">
                <span className="font-bold text-xl pr-4">
                  Yearly Statistics
                </span>
                <BsBarChartLineFill style={iconStyleOther} />
              </div>
            </div>
            {/* Upper Section : [for showing the chart] */}
            <div className="bg-gray-200 w-full flex-1 mt-4">
              Chart would go here
            </div>
          </div>
        </div>
      </section>

      {/* for spacing between two sections*/}
      <div className="h-[40px]"></div>

      {/*  */}
      <section>
        <div className="flex gap-10">
          {/* top selling items */}
          <div className="bg-white h-[550px] shadow-customSection flex-1">
            <div className="flex items-center justify-between px-10 py-8 border-b-[1px] border-gray-300">
              {/* heading */}
              <div className="flex items-center">
              <BsBarChartLineFill style={iconStyleOther}/>
                <span className="font-bold text-xl pl-4">
                  Top Selling Items
                </span>
              </div>
              {/* View all Button */}
              <div>
                <Link to=''>View All</Link>
              </div>
            </div>
          </div>
          {/* top rated items */}
          <div className="bg-white h-[550px] shadow-customSection flex-1">
          <div className="flex items-center justify-between px-10 py-8 border-b-[1px] border-gray-300">
              {/* heading */}
              <div className="flex items-center">
              <FaStar style={iconStyleOther}/>
                <span className="font-bold text-xl pl-4">
                  Top Rated Items
                </span>
              </div>
              {/* View all Button */}
              <div>
                <Link to=''>View All</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}

export default AdminDashboard;
