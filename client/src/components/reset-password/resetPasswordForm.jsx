import CommonForm from '@/common/commonForm';
import { resetPasswordElements } from '@/config';
import { useToast } from '@/hooks/use-toast';
import { resetPassword } from '@/store/authslice';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const initialState = {
    password: '',
    confirmpassword : ''
}

function ResetPasswordForm() {
    const [formData, setFormData] = useState(initialState);
    const { toast } = useToast();
    const {userId, token} = useParams();
    const btnText = 'Reset Password';
    const dispatch = useDispatch();

    function isFormValid() {
        return Object.keys(formData).map((formKey) => formData[formKey] !== '').every((item) => item);
    }

    function handleOnSubmit(event) {
        event.preventDefault();

        // dynamically getting the passwords to check if they match
        if(formData[Object.keys(formData)[0]] === formData[Object.keys(formData)[1]]){
            dispatch(resetPassword({userId, token, password : formData['password']})).then((data) => {
                if(data?.payload?.success){
                    setFormData(initialState);
                    toast({
                        title : data?.payload?.message
                    })
                }else {
                    toast({
                        variant : 'destructive',
                        title : data?.payload?.message
                    })
                }
            }).catch((error) => {
                toast({
                    variant : 'destructive',
                    title : error
                })
            });
        }else {
            toast({
                variant : 'destructive',
                title : 'Password does not match'
            })
        }
    }

    useEffect(() => {
    }, [dispatch]);

    return (
        <div className='flex w-1/2 items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
            <div className='flex flex-col items-center min-w-80'>
                <h2 className='text-black font-extrabold text-2xl'>Reset Your Password</h2>
                <CommonForm btnText={btnText} btnDisabled={!isFormValid()} formData={formData} setFormData={setFormData} onSubmit={handleOnSubmit} formElements={resetPasswordElements} customFormHeight={160} />
            </div>
        </div>
    );
};

export default ResetPasswordForm;