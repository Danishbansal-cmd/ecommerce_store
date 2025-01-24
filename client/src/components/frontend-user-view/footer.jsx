import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();
  const listItemClasses = "text-colorText-light font-normal";
  return (
    <div className="bg-backgroundSecondary-light w-full">
      <div className="container mx-auto xl:w-[1100px] py-32">
        <div className="flex flex-col items-start justify-between">
          {/* image & (quick links and legal) */}
          <div className="flex justify-between w-full">
            {/* image and its sub-heading */}
            <div className="text-left text-xl text-colorText-light">
              <Link to="/">
                <img
                  src="/images/logo-no-background.png"
                  alt="Online Store"
                  className="w-60"
                />
              </Link>
              <p className="mt-4 ">
                A place to shop, a place to save, <br />a place you’ll love.{" "}
              </p>
            </div>
            {/* quick links and legal */}
            <div className="text-colorText-light text-sm text-left">
              <div className="grid grid-cols-2 gap-8">
                {/* Quick Links Column */}
                <div>
                  <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                  <ul className="space-y-2 text-colorText-light  font-light">
                    <li>
                      <Link to="/" className={listItemClasses}>
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link to="/" className={listItemClasses}>
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Legal Column */}
                <div>
                  <h3 className="text-lg font-bold mb-4">Legal</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>
                      <Link to="/terms-of-use" className={listItemClasses}>
                        Terms of Use
                      </Link>
                    </li>
                    <li>
                      <Link to="/privacy-policy" className={listItemClasses}>
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link to="/shipping-policy" className={listItemClasses}>
                        Shipping Policy
                      </Link>
                    </li>
                    <li>
                      <Link to="/cancellation-policy" className={listItemClasses}>
                        Cancellation Policy
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <br />
          <hr className="border-t border-backgroundSecondaryBorder-light w-full" />
          <br />
          {/* address and cin number */}
          <div className="flex justify-between w-full">
            <div className="text-left text-colorText-light text-sm">
              <h3 className="font-bold">Registered Office Address</h3>
              <p>
                #32806,
                <br />
                Street Number 4, <br />
                Paras Ram Nagar, Bathinda, <br />
                Near Paani Waali Tanki, <br />
                Punjab – 151001, India <br />
              </p>
            </div>
            <div className="flex flex-col items-left justify-end text-left text-colorText-light text-sm">
              <p>
                <span className="font-bold">CIN:</span> U72589KA2007PBC058659
              </p>
              <p>
                <span className="font-bold">Telephone: </span>
                <Link>+91 8968-444-720</Link>
              </p>
            </div>
          </div>
          <br />
          <hr className="border-t border-backgroundSecondaryBorder-light w-full" />
          <br />
          {/* little history */}
          <div className="text-left text-colorText-light text-sm">
            <h3 className="font-bold">HISTORY OF ECOMMERCE</h3>
            <p>
              Becoming India’s no. 1 fashion destination is not an easy feat.
              Sincere efforts, digital enhancements and a team of dedicated
              personnel with an equally loyal customer base have made Ecommerce
              the online platform that it is today. The original B2B venture for
              personalized gifts was conceived in 2007 but transitioned into a
              full-fledged ecommerce giant within a span of just a few years. By
              2012, Myntra had introduced 350 Indian and international brands to
              its platform, and this has only grown in number each passing year.
              Today Myntra sits on top of the online fashion game with an
              astounding social media following, a loyalty program dedicated to
              its customers, and tempting, hard-to-say-no-to deals.
            </p>
            <br />
            <p>
              The Ecommerce shopping app came into existence in the year 2015 to
              further encourage customers’ shopping sprees. Download the app on
              your Android or IOS device this very minute to experience fashion
              like never before
            </p>
          </div>
          <br />
          <hr className="border-t border-backgroundSecondaryBorder-light w-full" />
          <br />
          {/* convenience */}
          <div className="text-left text-colorText-light text-sm">
            <h3 className="font-bold">
              SHOP ONLINE AT ECOMMERCE WITH COMPLETE CONVENIENCE
            </h3>
            <p>
              Another reason why Ecommerce is the best of all online stores is
              the complete convenience that it offers. You can view your
              favourite brands with price options for different products in one
              place. A user-friendly interface will guide you through your
              selection process. Comprehensive size charts, product information
              and high-resolution images help you make the best buying
              decisions. You also have the freedom to choose your payment
              options, be it card or cash-on-delivery. The 14-day returns policy
              gives you more power as a buyer. Additionally, the try-and-buy
              option for select products takes customer-friendliness to the next
              level.
            </p>
          </div>
          <br />
          <hr className="border-t border-backgroundSecondaryBorder-light w-full" />
          <br />
          <div className="text-left text-colorText-light text-sm">
            © {currentYear} www.ecommerce.com. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
