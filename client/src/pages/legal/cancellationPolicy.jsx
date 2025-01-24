import Footer from "@/components/frontend-user-view/footer";
import NavigationBar from "@/components/frontend-user-view/navigation";
import BgImageBox from "@/components/legal/bgImageBox";
import React from "react";

function CancellationPolicy() {
  return (
    <div className="w-full h-screen overflow-y-auto">
      <NavigationBar />
      <div className="bg-backgroundMain-light h-full w-full  overflow-y-auto text-colorText-light">
        <BgImageBox
          imageUrl="/images/terms-of-use-edited.jpg"
          title="Cancellation Policy"
        />
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
}

export default CancellationPolicy;
