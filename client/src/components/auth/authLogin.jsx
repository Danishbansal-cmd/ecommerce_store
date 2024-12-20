import CommonForm from '@/common/commonForm';
import { loginFormElements } from '@/config';
import { useToast } from '@/hooks/use-toast';
import { loginUser } from '@/store/authslice';
import { getAllRoles, getRole } from '@/store/rolesSlice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const initialState = {
  usernameOrEmail: '',
  password: ''
}
function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const btnText = 'Login';
  const { toast } = useToast();
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      console.log(data, 'data login')
      if (data?.payload?.success) {

        // get the specific role and permissions
        // associated to it
        // stored in redux(specificRole)
        dispatch(getRole({ role: data?.payload?.data.role }))
        setFormData(initialState);
        toast({
          title: data?.payload?.message
        });
      } else {
        toast({
          variant: "destructive",
          title: data?.payload?.message
        })
      }
    })
  }



  const formElements = loginFormElements;
  return (
    <div className='flex w-1/2 items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
      <div className='flex flex-col items-center min-w-80'>
        <h2 className='text-black font-extrabold text-2xl'>Sign in to your account!</h2>
        <p className='text-black'>Don't have an account? <Link to='/register'>Register</Link></p>
        <CommonForm formElements={formElements} formData={formData} setFormData={setFormData} onSubmit={onSubmit} btnText={btnText} haveResetPasswordButton={true}/>
      </div>
    </div>)
};

export default AuthLogin;