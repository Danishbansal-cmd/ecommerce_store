import React, { useEffect, useState } from "react";
import Filters from "../panel-view/filters";
import ProductTile from "../panel-view/product-tile";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "@/store/productSlice";
import { getAllBanners } from "@/store/bannerSlice";
import { Link } from "react-router-dom";
import couponCornerImage from "../../assets/images/coupons_corner.png";
import { getAllCategories } from "@/store/categorySlice";
import { getAllBrands } from "@/store/brandSlice";

// Move outside component to prevent recreation on each render
const VALID_BANNER_TITLES = ["HomepageMainBanner"];
const DEFAULT_BANNER = {
  targetLink: "/",
  image: {
    url: "https://thumbs.dreamstime.com/b/young-conceptual-image-large-stone-shape-human-brain-conceptual-image-large-stone-shape-110748113.jpg"
  },
  title: "HomepageDefaultBanner"
};

function FrontEndUserContent() {
  const { productList } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});

  // Get All Banners from the redux store that are stored in it
  const { banners } = useSelector((state) => state.banners);
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getAllProduct());

    // run the request to the backend to get all the banners
    // and store it in the redux store
    dispatch(getAllBanners({ bannerType: "Homepage" }))
    // it is used to remove the meta and type from the response
    // and will return the payload data only
    // .unwrap()
    .then((data) => {
        console.log(data, "Banner data frontend user content");
      })
    .catch((error) => {
      console.log(error, "Error in fetching banners");
    });

    // run the request to the backend to get all the categories
    // and store it in the redux store
    dispatch(getAllCategories())
    .then((data) => {
      console.log(data, "Categories data frontend user content");
    })
    .catch((error) => {
      console.log(error, "Error in fetching categories");
    });

    // run the request to the backend to get all the brands
    // and store it in the redux store
    dispatch(getAllBrands())
    .then((data) => {
      console.log(data, "Brands data frontend user content");
    })
    .catch((error) => {
      console.log(error, "Error in fetching brands");
    });
    
  }, [dispatch]);

  function handleFilter(secitonId, sectionName) {
    console.log(secitonId, sectionName, "secitonId,sectionName");

    if (Object.keys(filters).indexOf(secitonId) === -1) {
      setFilters((filters) => ({
        ...filters,
        [secitonId]: [sectionName],
      }));
    } else {
      const indexOfSectionName = filters[secitonId].indexOf(sectionName);
      if (indexOfSectionName === -1) {
        setFilters((filters) => ({
          ...filters,
          ...filters[secitonId].push(sectionName),
        }));
      } else {
        setFilters((filters) => ({
          ...filters,
          ...filters[secitonId].splice(indexOfSectionName, 1),
        }));
      }
    }

    console.log(filters, "this filter");
  }
  return (
    <div className="bg-backgroundMain-light min-h-0 py-8">
      <div className="container mx-auto xl:w-[1280px]">
        <div className="flex flex-col">
          {/* Banner Section */}
          <div className="h-[400px]">
            {(() => {
              const selectedBanner = banners?.length > 0
                ? banners.find(banner => VALID_BANNER_TITLES.includes(banner.title)) || DEFAULT_BANNER
                : DEFAULT_BANNER;
              
              return (
                <Link to={selectedBanner.targetLink}>
                  <img 
                    src={selectedBanner.image.url} 
                    alt={selectedBanner.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = DEFAULT_BANNER.image.url;
                      e.target.alt = DEFAULT_BANNER.title;
                    }}
                  />
                </Link>
              );
            })()}
          </div>

          {/* Coupons Section */}
          <div className="w-full mt-14 flex flex-col">
            {/* Coupon Corner Image */}
            <div className="flex flex-col items-center justify-center h-12">
              <img src={couponCornerImage} alt="coupon corner" />
            </div>

            {/* Coupon Banner Image that contains the major or all coupons */}
            <div>
              {
                banners && banners.length > 0 ? banners
                  .filter(banner => banner.title === "couponsBannerImage")
                  .map((banner) => (
                    <div key={banner._id}>
                      <Link to="/">
                      <img src={banner.image.url} alt={banner.title} />
                      </Link>
                    </div>
                  )) : <div>
                    <div className="w-full h-[120px] bg-gray-300"></div>
                  </div>
              }
            </div>

            {/* Lucrative Coupon Banner Section With Text */}
            <div className="w-full h-[120px] bg-gray-400">
              <div className="w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://t3.ftcdn.net/jpg/03/16/91/28/360_F_316912806_RCeHVmUx5LuBMi7MKYTY5arkE4I0DcpU.jpg')" }}></div>
            </div>
          </div>

          <div>
            <div className="w-full h-[120px] bg-gray-300 mt-16 ">
              <div className="w-full h-full flex items-center justify-center">shop now bg image</div>
            </div>
          </div>

          {/* Category Section */}
          <div>
            <div className="text-2xl font-bold text-left my-3">Shop By Categories</div>
            <div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {
                  categories && categories.length > 0 ? categories.map((category) => 
                    category.showOnHomepage && (
                      <div class="bg-littleSection-light p-2 text-white text-center">
                        <div className="w-full h-[200px] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${category.image.url}')` }}></div>
                        <div className="flex flex-col items-center justify-center my-3">
                          <div className="text-lg capitalize">{category.name}</div>
                          <div className="text-3xl font-bold uppercase">{category.discount} off</div>
                          <div className="text-lg capitalize">Shop Now</div>
                        </div>
                      </div>
                    )
                  ) : null
                }
                {/* dummy category data*/}
                {Array.from({length : 6}).map((_,index) => (
                  <div className="bg-littleSection-light p-2 text-white text-center" key={index}>
                    <div className="w-full h-[200px] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://t3.ftcdn.net/jpg/03/16/91/28/360_F_316912806_RCeHVmUx5LuBMi7MKYTY5arkE4I0DcpU.jpg')" }}></div>
                    <div className="flex flex-col items-center justify-center my-3">
                      <div className="text-lg capitalize">category name</div>
                      <div className="text-3xl font-bold uppercase">40-50% off</div>
                      <div className="text-lg capitalize">shop now</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>


          {/* Brands Section */}
          <div className="mt-10">
            <div className="text-2xl font-bold text-left my-3">Shop By Brands</div>
            <div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {
                  categories && categories.length > 0 ? categories.map((category) => 
                    category.showOnHomepage && (
                      <div class="bg-littleSection-light p-2 text-white text-center">
                        <div className="w-full h-[200px] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${category.image.url}')` }}></div>
                        <div className="flex flex-col items-center justify-center my-3">
                          <div className="text-lg capitalize">{category.name}</div>
                          <div className="text-3xl font-bold uppercase">{category.discount} off</div>
                          <div className="text-lg capitalize">Shop Now</div>
                        </div>
                      </div>
                    )
                  ) : null
                }
                {/* dummy category data*/}
                {Array.from({length : 6}).map((_,index) => (
                  <div className="bg-littleSection-light p-2 text-white text-center" key={index}>
                    <div className="w-full h-[200px] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://t3.ftcdn.net/jpg/03/16/91/28/360_F_316912806_RCeHVmUx5LuBMi7MKYTY5arkE4I0DcpU.jpg')" }}></div>
                    <div className="flex flex-col items-center justify-center my-3">
                      <div className="text-lg capitalize">category name</div>
                      <div className="text-3xl font-bold uppercase">40-50% off</div>
                      <div className="text-lg capitalize">shop now</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
    // <div className='flex'>
    //   <Filters filters={filters} handleFilter={handleFilter}/>
    //   <div className='bg-gray-300 h-full px-4 py-2'>
    //     <div className='bg-white'>
    //       <div className='grid w-full grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
    //         {
    //           productList && productList.length > 0 ? productList.map((productItem) =>
    //             (<ProductTile productItem={productItem} key={productItem._id} />)
    //           ) : null
    //         }
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default FrontEndUserContent;
