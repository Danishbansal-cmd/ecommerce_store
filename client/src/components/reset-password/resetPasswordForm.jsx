import CommonForm from '@/common/commonForm';
import CommonUserForm from '@/common/commonUserForm';
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
    const [errors, setErrors] = useState({});
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
        <div className='flex w-1/2 items-center justify-center sm:px-6 lg:px-8 bg-backgroundMain-light'>
          <div className='flex flex-col w-88 bg-white px-8 py-4 text-left text-gray-700'>
            <h2 className='font-bold text-2xl'>Reset Your Password</h2>
            <CommonUserForm formElements={resetPasswordElements} errors={errors} setErrors={setErrors} formData={formData} setFormData={setFormData} onSubmit={handleOnSubmit} btnText={btnText} haveResetPasswordButton={false}/>
          </div>
        </div>)
};

export default ResetPasswordForm;