import React, { useEffect, useState } from 'react';
import Filters from '../panel-view/filters';
import ProductTile from '../panel-view/product-tile';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '@/store/productSlice';


function FrontEndUserContent() {
  const { productList } = useSelector(state => state.products);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});

  useEffect(() => {
    // dispatch actions to get all the products
    dispatch(getAllProduct());
  }, [dispatch])

  function handleFilter(secitonId, sectionName){
    console.log(secitonId,sectionName,'secitonId,sectionName');

    if(Object.keys(filters).indexOf(secitonId) === -1){
      setFilters((filters) => ({
        ...filters,
        [secitonId] : [sectionName]
      }))
    }else {
      const indexOfSectionName = filters[secitonId].indexOf(sectionName);
      if(indexOfSectionName === -1){
        setFilters((filters) => ({
          ...filters,
          ...filters[secitonId].push(sectionName)
        }))
      }else {
        setFilters((filters) => ({
          ...filters,
          ...filters[secitonId].splice(indexOfSectionName,1)
        }))
        
      }
    }

    console.log(filters,'this filter')
  }
  return (
    <div className='flex'>
      <Filters filters={filters} handleFilter={handleFilter}/>
      <div className='bg-gray-300 h-full px-4 py-2'>
        <div className='bg-white'>
          <div className='grid w-full grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {
              productList && productList.length > 0 ? productList.map((productItem) =>
                (<ProductTile productItem={productItem} key={productItem._id} />)
              ) : null
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontEndUserContent;