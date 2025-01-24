import React from "react";

function BgImageBox({imageUrl, title}) {
  return (
      <section className="relative h-[400px] flex items-center bg-fixed bg-center bg-cover" style={{ backgroundImage: `url(${imageUrl})` }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-65"></div>

        {/* Content */}
        <div className="relative container mx-auto flex flex-col text-center">
          <h1 className="text-white font-bold text-4xl md:text-4xl lg:text-5xl">
            {title}
          </h1>
        </div>
      </section>
  );
}

export default BgImageBox;
