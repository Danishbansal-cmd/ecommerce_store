import React from "react";
import young_man_image from "../../assets/images/young_man.png";
import { Link } from "react-router-dom";

function MainSideBar() {
  return (
    <div className="relative flex flex-col items-start justify-center bg-colorSecondary-light w-1/2 px-24 py-12">
      {/* Content Section */}
      <div className="flex flex-col items-start gap-2 z-20">
        <Link to="/">
          <img
            src="/images/logo-no-background.png"
            alt="Online Store"
            className="w-52"
          />
        </Link>
        <p className="text-white text-sm font-bold">
          A place to shop, a place to save, a place you’ll love.
        </p>
      </div>

      <div className="text-start text-white mt-40 z-20">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to ECOMMERCE
        </h1>
        <h2 className="text-xl font-bold tracking-tight m-0">PLACE TO SHOP</h2>
        <img src={young_man_image} className="mt-8 w-80" alt="Young Man" />
      </div>
    </div>
  );
}

export default MainSideBar;
