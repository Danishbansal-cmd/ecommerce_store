import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductsPage = () => {
  const { query } = useParams(); // Get search term from URL
  const location = useLocation(); // Get query parameters like ?category=electronics
  const allProducts = useSelector((state) => state.products.items); // Get all products from Redux store
  const [filteredProducts, setFilteredProducts] = useState([]);

//   useEffect(() => {
//     // Get query params as an object
//     const searchParams = new URLSearchParams(location.search);
//     const category = searchParams.get("category"); // e.g., "electronics"
//     const priceRange = searchParams.get("price"); // e.g., "100-500"

//     let searchResults = allProducts;

//     // Filter by product name
//     if (query) {
//       searchResults = searchResults.filter((product) =>
//         product.name.toLowerCase().includes(query.toLowerCase())
//       );
//     }

//     // Filter by category
//     if (category) {
//       searchResults = searchResults.filter((product) =>
//         product.category.toLowerCase() === category.toLowerCase()
//       );
//     }

//     // Filter by price range (assuming format "min-max")
//     if (priceRange) {
//       const [min, max] = priceRange.split("-").map(Number);
//       searchResults = searchResults.filter(
//         (product) => product.price >= min && product.price <= max
//       );
//     }

//     setFilteredProducts(searchResults);
//   }, [query, location.search, allProducts]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        Search Results for: "{query}"
      </h2>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border p-4 shadow-lg rounded-lg">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md" />
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products found for "{query}"</p>
      )}
    </div>
  );
};

export default ProductsPage;
