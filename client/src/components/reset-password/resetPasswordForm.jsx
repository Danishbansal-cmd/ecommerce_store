import CommonForm from '@/common/commonForm';
import { passwordResetEmailElements } from '@/config';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const initialState = {}

function ResetPasswordForm() {
    const [formData, setFormData] = useState(initialState);
    const btnText = 'Send Password Reset Email';

    function isFormValid() {
        return Object.keys(formData).map((formKey) => formData[formKey] !== '').every((item) => item);
    }

    function handleOnsubmit() {

    }
    return (
        <div className='flex w-1/2 items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
            <div className='flex flex-col items-center min-w-80'>
                <h2 className='text-black font-extrabold text-2xl'>Reset Your Pasword</h2>
                <p className='text-black'>Want to Login! <Link to='/login'>Login</Link></p>
                <CommonForm btnText={btnText} btnDisabled={!isFormValid()} formData={formData} setFormData={setFormData} onSubmit={handleOnsubmit} formElements={passwordResetEmailElements} customFormHeight={80}/>
            </div>
        </div>
    );
};

export default ResetPasswordForm;