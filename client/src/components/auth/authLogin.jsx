import CommonUserForm from '@/common/commonUserForm';
import { loginFormElements } from '@/config';
import { useToast } from '@/hooks/use-toast';
import { loginUser } from '@/store/authslice';
import { getRole } from '@/store/rolesSlice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const initialState = {
  usernameOrEmail: '',
  password: ''
}

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dispatch = useDispatch();
  const btnText = 'Login';
  const { toast } = useToast();
  const formElements = loginFormElements;

  function onSubmit(e) {
    e.preventDefault();

    setErrors({}); // Reset all errors
    // Start the spinner
    setIsSubmitted(true);

    dispatch(loginUser(formData)).then((data) => {
      console.log(data, 'loginUser data login')
      if (data?.payload?.success) {
        // get the specific role and permissions
        // associated to it
        // stored in redux(specificRole)
        dispatch(getRole({ role: data?.payload?.data.role }))
        .catch((error) => {
          console.error('Error during get role:', error);
          setIsSubmitted(false); // Ensure spinner stops even on failure
        })
        setFormData(initialState);
        toast({
          title: data?.payload?.message
        });

        // Stop the spinner after email verification completes
        setIsSubmitted(false);
      } else if(data?.payload?.success === false) {
        setErrors((prevErrors) => ({ ...prevErrors, 'errors': data?.payload?.message }));
        setIsSubmitted(false); // Ensure spinner stops even on failure
      }
    }).catch((error) => {
      console.error('Error during login:', error);
      setIsSubmitted(false); // Ensure spinner stops even on failure
    })
  }

  return (
    <div className='flex w-1/2 items-center justify-center sm:px-6 lg:px-8 bg-backgroundMain-light'>
      <div className='flex flex-col w-88 bg-white px-8 py-4 text-left text-gray-700'>
        <h2 className='font-bold text-2xl'>Sign in to your account!</h2>
        <p className='text-sm text-colorText-light block'>
          <span>Don't have an account?  </span>
          {/* <br /> */}
          <Link to='/register' className='text-gray-500 font-bold'>Register Yourself</Link>
        </p>
        <CommonUserForm formElements={formElements} 
        errors={errors} setErrors={setErrors} 
        formData={formData} setFormData={setFormData} 
        onSubmit={onSubmit} btnText={btnText} 
        haveResetPasswordButton={true} 
        showPolicySection={true}
        isSubmitted={isSubmitted}/>
      </div>
    </div>)
};

export default AuthLogin;