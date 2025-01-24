import { registerFormElements } from '@/config';
import { useToast } from '@/hooks/use-toast';
import { registerUser, sendEmailVerificationLink } from '@/store/authslice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import CommonUserForm from '@/common/commonUserForm';

const initialState = {
  username: '',
  email: '',
  password: ''
}

function AuthRegister() {
  const btnText = 'Register';
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [showEmailVerificationDialog, setShowEmailVerificationDialog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();

    setErrors({}); // Reset all errors
    // Start the spinner
    setIsSubmitted(true);

    console.log(formData, 'registerUser sending formData');
    dispatch(registerUser(formData)).then((data) => {
      console.log(data, 'registerUser data response');
      if (data?.payload?.success) {
        //resets the form to empty all fields
        setFormData(initialState);

        // send the Verfication Email
        dispatch(sendEmailVerificationLink({ email: formData['email'] })).then((data) => {
          console.log(data, "Verification email after registration data");
          console.log(data?.payload, "data?.payload?");
          console.log(data?.payload?.success, "data?.payload?.data?.success");
          if (data?.payload?.success) {
            navigate('/sent-email-verification-link');

            // Stop the spinner after email verification completes
            setIsSubmitted(false);
          }
        }).catch((error) => {
          console.error('Error during email verification:', error);
          setIsSubmitted(false); // Ensure spinner stops even on failure
        });
      } else if(data?.payload?.success === false) {
        setErrors((prevErrors) => ({ ...prevErrors, 'errors': data?.payload?.message }));
        setIsSubmitted(false); // Ensure spinner stops even on failure
      }
    }).catch((error) => {
      console.error('Error during registration:', error);
      setIsSubmitted(false); // Stop spinner on error
    });
  }

  const formElements = registerFormElements;
  return (
    <div className='flex w-1/2 items-center justify-center sm:px-6 lg:px-8 bg-backgroundMain-light'>
      <div className='flex flex-col w-88 bg-white px-8 py-4 text-left text-gray-700'>
        <h2 className='font-bold text-2xl'>Create new account!</h2>
        <p className='text-sm text-colorText-light block'>
          <span>Already have an account!  </span>
          {/* <br /> */}
          <Link to='/login' className='text-gray-500 font-bold'>Login</Link>
        </p>
        <CommonUserForm formElements={formElements} 
        errors={errors} setErrors={setErrors} 
        formData={formData} setFormData={setFormData} 
        onSubmit={onSubmit} btnText={btnText} 
        showPolicySection={true}
        isSubmitted={isSubmitted}/>
      </div>
    </div>)
};

export default AuthRegister;