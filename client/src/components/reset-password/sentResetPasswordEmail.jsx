import React from "react";
import { Link } from "react-router-dom";

function SentResetPasswordEmail() {
  return (
    <div className="flex w-1/2 items-center justify-center sm:px-6 lg:px-8 bg-backgroundMain-light">
      <div className="flex flex-col w-88 bg-white px-8 py-4 text-left text-gray-700">
        <h2 className="font-bold text-2xl">Reset Password Email Sent!</h2>
        <div className="text-gray-700 mt-4">
          <p className="mt-2">
            A reset password email has been sent to{" "}
            <span className="font-semibold">your registered email address</span>
            . Please check your inbox (and spam folder) to proceed with
            resetting your password.
          </p>
          <ul className="mt-2 list-disc pl-5">
            <li>
              This link is valid for{" "}
              <span className="font-semibold">24 hours</span>.
            </li>
            <li>
              If you didn’t receive the email, you can resend the <Link to='/send-reset-password-email' className='text-colorText-light font-bold'>reset password email</Link>.
            </li>
            <li>
              Make sure to use the link to reset your password and secure your
              account.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SentResetPasswordEmail;
