import CommonForm from '@/common/commonForm';
import { registerFormElements } from '@/config';
import { useToast } from '@/hooks/use-toast';
import { registerUser, sendEmailVerificationLink } from '@/store/authslice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { Button } from '../ui/button';

const initialState = {
  username: '',
  email: '',
  password: ''
}

function AuthRegister() {
  const btnText = 'Register';
  const [formData, setFormData] = useState(initialState);
  const [showEmailVerificationDialog, setShowEmailVerificationDialog] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(e) {
    e.preventDefault();
    console.log(formData, 'sending formData')
    dispatch(registerUser(formData)).then((data) => {
      console.log(data, 'data response')
      if (data?.payload?.success) {
        //resets the form to empty all fields
        setFormData(initialState);
        toast({
          title: data?.payload?.message
        });

        // send the Verfication Email
        dispatch(sendEmailVerificationLink({ email: formData['email'] })).then((data) => {
          console.log(data, "Verification email after registration data");
          console.log(data?.payload, "data?.payload?");
          console.log(data?.payload?.success, "data?.payload?.data?.success");
          if (data?.payload?.success) {
            console.log("set true");
            toast({
              title: data?.payload?.message
            });
          }
        })
      } else {
        toast({
          title: data?.payload?.message
        })
      }
    })
  }

  const formElements = registerFormElements;
  return (
    <div className='flex w-1/2 items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
      <div className='flex flex-col items-center min-w-80'>
        <h2 className='text-black font-extrabold text-2xl'>Create new account!</h2>
        <p className='text-black'>Already have an account! <Link to='/login'>Login</Link></p>
        <CommonForm formElements={formElements} formData={formData} setFormData={setFormData} onSubmit={onSubmit} btnText={btnText} />
      </div>
    </div>
  );
};

export default AuthRegister;