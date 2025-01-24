import Footer from "@/components/frontend-user-view/footer";
import NavigationBar from "@/components/frontend-user-view/navigation";
import BgImageBox from "@/components/legal/bgImageBox";
import React from "react";

function ShippingPolicy() {
  return (
    <div className="w-full h-screen overflow-y-auto">
      <NavigationBar />
      <div className="bg-backgroundMain-light w-full text-colorText-light">
      <BgImageBox imageUrl="/images/terms-of-use-edited.jpg" title="Shipping Policy" />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ShippingPolicy;
