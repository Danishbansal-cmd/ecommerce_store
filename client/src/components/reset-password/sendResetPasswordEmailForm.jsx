import CommonUserForm from '@/common/commonUserForm';
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
    const [errors, setErrors] = useState({});
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
        <div className='flex w-1/2 items-center justify-center sm:px-6 lg:px-8 bg-backgroundMain-light'>
          <div className='flex flex-col w-88 bg-white px-8 py-4 text-left text-gray-700'>
            <h2 className='font-bold text-2xl'>Send Reset Password Email</h2>
            <p className='text-sm text-colorText-light block'>
              <span>Want to Login!  </span>
              <Link to='/login' className='text-gray-500 font-bold'>Login</Link>
            </p>
            <CommonUserForm formElements={sendResetPasswordEmailElements} errors={errors} setErrors={setErrors} formData={formData} setFormData={setFormData} onSubmit={handleOnsubmit} btnText={btnText} haveResetPasswordButton={false}/>
          </div>
        </div>)
};

export default SendResetPasswordEmailForm;