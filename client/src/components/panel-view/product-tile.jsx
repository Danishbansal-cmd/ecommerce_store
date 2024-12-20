import React from 'react';

function ProductTile({ productItem, additionalComponent}) {
  return (
    <div className='flex flex-col w-30 px-3 py-4 bg-gray-200 rounded h-fit'>
      <img className='w-full h-30 object-cover rounded' src={productItem.image} alt={productItem.name} />
      <span>{productItem.name}</span>
      <div className='mt-2 flex justify-between'>
        <span className={`${productItem.saleprice < productItem.price ? 'line-through' : ' '} `}>${productItem.price}</span>
        <span className={`${productItem.saleprice > productItem.price ? 'line-through' : ' '} `}>${productItem.saleprice}</span>
      </div>
      {additionalComponent && additionalComponent(productItem)}
    </div>
  );
};

export default ProductTile;