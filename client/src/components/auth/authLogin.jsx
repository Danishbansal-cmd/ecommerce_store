import CommonUserForm from '@/common/commonUserForm';
import { loginFormElements } from '@/config';
import { useToast } from '@/hooks/use-toast';
import { loginUser } from '@/store/authslice';
import { getRole } from '@/store/rolesSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  const { isLoading } = useSelector(state => state.auth); // ✅ Get isLoading state

  function onSubmit(e) {
    e.preventDefault();

    setErrors({}); // Reset all errors
    setIsSubmitted(true); // Start the spinner

    dispatch(loginUser(formData)).then((data) => {
      console.log(data, "loginUser data login");
    
      if (data?.payload?.success) {
        console.log('come here')
        dispatch(getRole({ role: data?.payload?.data.role }))
          .catch((error) => {
            console.error("Error during get role:", error);
          });
    
        setFormData(initialState);
        toast({ title: data?.payload?.message });
      } else {
        console.log("Login Error Payload:", data?.payload?.message); // ✅ Debugging
        setErrors((prevErrors) => ({
          ...prevErrors,
          errors: data?.payload?.message || "Something went wrong",
        }));
        setIsSubmitted(false); // Stop spinner after success or failure
      }
    }).catch((error) => {
      console.error("Error during login:", error);
    });
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
        isSubmitted={isSubmitted || isLoading} // ✅ Keep form disabled while loading
        />
      </div>
    </div>)
};

export default AuthLogin;