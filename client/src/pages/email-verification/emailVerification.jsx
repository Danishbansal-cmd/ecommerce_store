import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifyEmail } from '@/store/authslice';

function EmailVerification() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [verified, setVerified] = useState('Not Verified');

    const tokenData = {};
    useEffect(() => {
        const getTokenParams = new URLSearchParams(location.search);

        for (const[key, value] of getTokenParams.entries()){
            tokenData[key] = value;
        }
        dispatch(verifyEmail({token : tokenData['token']})).then((data) => {
          console.log(data,'data')
          if(data?.payload?.success){
            setVerified(data?.payload?.message);
          }else {
            setVerified(data?.payload?.message);
          }
        })
    },[dispatch,location]);

    console.log('token data:', tokenData);
  return (
    <div className='w-full h-screen'>
      <div className='flex'>{verified}
      </div>
    </div>
  );
};

export default EmailVerification;