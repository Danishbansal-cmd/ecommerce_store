import React, { useEffect, useRef } from 'react';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import { File, UploadIcon, X } from 'lucide-react';
import axios from 'axios';
import { Label } from '../ui/label';

function ProductImageUpload({ imageFile, setImageFile, imageLoadingState, setImageLoadingState, uploadedImageUrl, setUploadedImageUrl, currentEditedId }) {
    const inputRef = useRef(null);

    function handleFileChange(event) {
        console.log(event.target.files?.[0], 'handleFileChange');
        const selectedFile = event.target.files?.[0];
        if(selectedFile) setImageFile(selectedFile);
        console.log(imageFile,'imageFile')
        console.log(uploadedImageUrl,'uploadedImageUrl')
    }

    function handleClose() {
        setImageFile(null);
        setUploadedImageUrl(null);
        if(inputRef.current.value) inputRef.current.value = '';
    }

    async function uploadToCloudinary() {
        setImageLoadingState(true);

        const formData = new FormData();
        formData.append('uploaded_file',imageFile);

        for (let [key, value] of formData) {
            console.log(`${key}: ${value}`);
            console.log('formData')
          }

        const result = await axios.post('http://localhost:5000/api/v1/product/upload', formData);
        console.log(result,'After uploading result');
        console.log(result.data.data.url,'After uploading result');
        if(result?.data?.success){
            setUploadedImageUrl(result?.data?.data?.url);
        }

        setImageLoadingState(false);
    }

    useEffect(() => {
        // work only if the imageFile is not empty and uploadedImageUrl is 
        // empty(means: url is not set)
        if (imageFile != null && !uploadedImageUrl) {
            uploadToCloudinary()
        };
    }, [imageFile]);

    console.log(imageFile, 'imageFile');
    console.log(imageLoadingState, 'setImageLoadingState');
    return (
        <div>
            <div className='w-full px-6 mt-5'>
                <div className='flex flex-col'>
                <Label className='mb-1.5'>Upload Image</Label>
                    <div className='bg-gray-200 rounded h-28'>
                    <input className='hidden' ref={inputRef} disabled={imageFile} onChange={handleFileChange} type='file' id='productImage' />
                        {imageFile ? imageLoadingState ? <Skeleton className='flex w-full h-full bg-gray-800'></Skeleton> :
                            <div className='flex flex-col w-full h-full py-2 px-2 gap-2'>
                                <div className='flex items-center justify-end'>
                                    <Button onClick={handleClose}>
                                        <X />
                                    </Button>
                                </div>
                                <div className='flex flex-col items-center justify-center items-center'>
                                    <File />
                                    <span>{imageFile?.name}</span>
                                </div>
                            </div>
                            : <div className='px-2 py-2 h-full'>
                                <Label htmlFor="productImage" className='flex flex-col gap-2 items-center justify-center h-full'>
                                    <UploadIcon />
                                    <span>Select the desired file</span>
                                </Label>
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductImageUpload;