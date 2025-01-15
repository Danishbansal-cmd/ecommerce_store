import CommonForm from '@/common/commonForm';
import { sendResetPasswordEmailElements } from '@/config';
import { useToast } from '@/hooks/use-toast';
import { sendPasswordResetEmail } from '@/store/authslice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const initialState = {
    email : ''
}

function SendResetPasswordEmailForm() {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const { toast } = useToast();
    const btnText = 'Send Password Reset Email';

    function isFormValid() {
        return Object.keys(formData).map((formKey) => formData[formKey] !== '').every((item) => item);
    }

    function handleOnsubmit(event) {
        // prevent the default action by the form
        event.preventDefault();

        console.log(formData,'while submitting password reset email formData')
        dispatch(sendPasswordResetEmail(formData)).then((data) => {
            console.log(data,'password reset email data')
            if(data?.payload?.success){
                setFormData(initialState);
                toast({
                    title : data?.payload?.message
                });
            }else {
                toast({
                    variant : 'destructive',
                    title : data?.payload?.message
                });
            }
        })
        .catch((error) => {
            console.log('error while sending data',error)
            toast({
                variant : 'destructive',
                title : error
            });
        });
    }
    return (
        <div className='flex w-1/2 items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
            <div className='flex flex-col items-center min-w-80'>
                <h2 className='text-black font-extrabold text-2xl'>Send Reset Password Email</h2>
                <p className='text-black'>Want to Login! <Link to='/login'>Login</Link></p>
                <CommonForm btnText={btnText} btnDisabled={!isFormValid()} formData={formData} setFormData={setFormData} onSubmit={handleOnsubmit} formElements={sendResetPasswordEmailElements} customFormHeight={80}/>
            </div>
        </div>
    );
};

export default SendResetPasswordEmailForm;