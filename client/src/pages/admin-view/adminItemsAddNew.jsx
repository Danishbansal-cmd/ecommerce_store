import { LuBox } from "react-icons/lu";
import { BiImageAdd } from "react-icons/bi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useState } from "react";

function AdminItemsAddNew() {
  // for icons and its style
  const iconStyleHeading = { fontSize: "3.5em" };

  return (
    <div>
      {/* Heading for the content */}
      <div className="flex items-center">
        <LuBox style={iconStyleHeading} />
        <span className="pl-2 text-3xl font-semibold">Add New</span>
      </div>

      {/* for spacing */}
      <div className="h-[8px]"></div>

      <div>
        <div className="flex flex-col lg:flex-row gap-3">
          
          <div className="bg-white flex flex-col gap-3 w-full lg:w-1/2">
            <p className="pl-10 py-10 text-left">
              <span className="font-bold text-xl">Item Images</span>
            </p>
            <div className="border border-1 border-gray-200"></div>
            <div className="px-10 py-4">

              <div className="flex flex-col items-start gap-2">
                <InfoIcon Icon={IoIosInformationCircleOutline} mainText="Item Images" tooltipText="Upload up to 6 images (max 100KB each) in 540x720px (3:4 ratio)."/>
                <div className="h-[120px] w-[120px] bg-backgroundMain-light flex justify-center items-center cursor-pointer">
                  <BiImageAdd
                    className={`text-colorText-light`}
                    style={{ fontSize: "5em" }}
                  />
                </div>
              </div>

              {/* for spacing */}
              <div className="h-[32px]"></div>

              <div className="flex flex-col items-start gap-2">
                <InfoIcon Icon={IoIosInformationCircleOutline} mainText="Item Thumbnail" tooltipText="Upload a single image in 315x420px (3:4 ratio) with a maximum file size of 60KB." />
                <div className="h-[120px] w-[120px] bg-backgroundMain-light flex justify-center items-center cursor-pointer">
                  <BiImageAdd
                    className={`text-colorText-light`}
                    style={{ fontSize: "5em" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white flex flex-col gap-3 w-full lg:w-1/2">
            <div>
              <p className="pl-10 py-10 text-left">
                <span className="font-bold text-xl">Item Category Info</span>
              </p>
              <div className="border border-1 border-gray-200"></div>
            </div>
            <div>
              <p className="pl-10 py-10 text-left">
                <span className="font-bold text-xl">Item Category Info</span>
              </p>
              <div className="border border-1 border-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function InfoIcon({Icon, mainText, tooltipText}) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
      <div className="flex items-center justify-center gap-2">
        <span className="font-[600]">{mainText}</span>
        
        <div className="relative flex items-center">
          {/* Icon */}
          <Icon
            className="text-xl text-gray-600 cursor-pointer"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          />

          {/* Tooltip */}
          {showTooltip && (
            <div className="absolute left-6 top-0 bg-gray-800 text-white 
            text-xs rounded-md px-2 py-1 shadow-lg
            w-[100px]">
              {tooltipText}
            </div>
          )}
        </div>

      </div>  
      );
}

export default AdminItemsAddNew;
