import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="w-full h-screen">
      <nav>
        <div className="bg-colorMain-light w-full h-navigation flex items-center justify-center">
          {/* main div that contains all the navigation items */}
          <div className="container mx-auto xl:w-[1280px]">
            <div>
              {/* Company Logo goes here */}
              <div>
                <Link to="/">
                  <img
                    src="/images/logo-no-background.png"
                    alt="Logo"
                    className="w-40"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div>not found</div>
    </div>
  );
}

export default NotFound;
