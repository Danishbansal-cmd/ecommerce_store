import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import CommonForm from '@/common/commonForm';
import { addProductElements } from '@/config';
import ProductImageUpload from './productUpload';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, deleteProduct, editProduct, getAllProduct } from '@/store/productSlice';
import { useToast } from '@/hooks/use-toast';
import ProductTile from './product-tile';

const initialState = {
  name: '',
  image: null,
  price: 0,
  saleprice: 0,
  quantity: 0,
  description: '',
  category : '',
  brand : ''
}

function AllProducts({userRole}) {
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [imageFile, setImageFile] = useState(null);
  const [imageLoadingState, setImageLoadingState] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(false);
  const { productList } = useSelector(state => state.products);
  const [currentEditedId,setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const btnText = currentEditedId !== null ? 'Edit Product' : 'Add Product';


  // onsubmit button of the form
  function onSubmit(e) {
    e.preventDefault()

    console.log(formData, 'before submitting formData')

    currentEditedId !== null ? 
    // for editing the product
    dispatch(editProduct({formData : {...formData, image : uploadedImageUrl}, productId : currentEditedId._id}))
    .then((data) => {
      if(data?.payload?.success){
        toast({
          title: data?.payload?.message
        });
        setFormData(initialState);
        setImageFile(null);
        setOpenProductDialog(false);
        dispatch(getAllProduct());
      }else {
        toast({
          variant: "destructive",
          title: data?.payload?.message
        })
      }
    })
    .catch((error) => console.log(error, 'error update product data'))  : 
    // for adding the new product
    dispatch(addProduct({
      ...formData,
      image: uploadedImageUrl
    }))
      .then((data) => {
        if (data?.payload?.success) {
          toast({
            title: data?.payload?.message
          });
          setFormData(initialState);
          setImageFile(null);
          setOpenProductDialog(false);
          dispatch(getAllProduct());
        } else {
          toast({
            variant: "destructive",
            title: data?.payload?.message
          })
        }
      })
      .catch((error) => console.log(error, 'error add product data'));
  }

  function isFormValid() {
    return Object.keys(formData).map((key) => typeof (formData[key]) === 'string' ? formData[key] !== '' : formData[key] !== 0).every((item) => item);
  }

  function deleteProductFunction(currentItem) {
    console.log(currentItem, 'currentItem');
    console.log(currentItem._id, 'currentItem');
    dispatch(deleteProduct({ productId: currentItem._id })).then((data) => {
      console.log(data, 'data deleted');
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message
        })
        dispatch(getAllProduct());
      } else {
        toast({
          variant: "destructive",
          title: data?.payload?.message || 'No message'
        })
      }
    }).catch((error) => console.log(error, "delete error"))
  }

  function editProductFunction(currentItem) {
    console.log(currentItem,'editProductFunction currentItem');

    setFormData({...formData,
      name : currentItem.name,
      description : currentItem.description,
      price : currentItem.price,
      saleprice : currentItem.saleprice,
      quantity : currentItem.quantity,
      category : currentItem.category,
      brand : currentItem.brand
    });
    setCurrentEditedId(currentItem);
    setOpenProductDialog(true);
    setImageFile({name : currentItem.image});
    setUploadedImageUrl(currentItem.image);
  }

  function editAddControls(productItem){
    return (<div className='mt-3 flex flex-col gap-2'>
      <Button onClick={() => { editProductFunction(productItem) }}>
        <span>Edit Product</span>
      </Button>
      <Button className='bg-red-500' onClick={() => deleteProductFunction(productItem)}>
        <span>Delete Product</span>
      </Button>
    </div>);
  }

  useEffect(() => {
    dispatch(getAllProduct())
  }, [dispatch])

  console.log(productList, 'this is the productList')

  return (
    <div className='w-full'>
      <Card className='flex flex-col items-start'>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>List of all products</CardDescription>
        </CardHeader>
        <CardContent className='w-full'>
          <div className='flex flex-col mb-3'>
            <Button className='' onClick={() => {setFormData(initialState); setImageFile(null); setUploadedImageUrl(null); setCurrentEditedId(null); setOpenProductDialog(true); }}>Add Product</Button>
          </div>

          {/* A div where all the listed products will see here */}
          <div className='overflow-auto h-96'>
            <div className='grid w-full grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
              {productList && productList.length > 0 ? productList.map(
                (productItem) => 
                (<ProductTile 
                  key={productItem._id} 
                  productItem={productItem} 
                  additionalComponent={editAddControls}
                  />)
                ) : null}
            </div>
          </div>
        </CardContent>
      </Card>
      <Sheet open={openProductDialog} onOpenChange={setOpenProductDialog}>
        <SheetContent side='right'>
          <SheetHeader>
            <SheetTitle>ADD PRODUCT</SheetTitle>
          </SheetHeader>
          <ProductImageUpload currentEditedId={currentEditedId} imageFile={imageFile} setImageFile={setImageFile} imageLoadingState={imageLoadingState} setImageLoadingState={setImageLoadingState} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} />
          <CommonForm formData={formData} formElements={addProductElements} onSubmit={onSubmit} btnText={btnText} btnDisabled={!isFormValid()} setFormData={setFormData} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AllProducts;