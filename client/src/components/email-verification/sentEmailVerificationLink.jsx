import CommonUserForm from "@/common/commonUserForm";
import React from "react";
import { Link } from "react-router-dom";

function SentEmailVerificationLink() {
  return (
    <div className="flex w-1/2 items-center justify-center sm:px-6 lg:px-8 bg-backgroundMain-light">
      <div className="flex flex-col w-88 bg-white px-8 py-4 text-left text-gray-700">
        <h2 className="font-bold text-2xl">Verification Email Sent!</h2>
        <p className="text-sm text-colorText-light block">
          <span>Already have an account! </span>
          {/* <br /> */}
          <Link to="/login" className="text-gray-500 font-bold">
            Login
          </Link>
        </p>
        <div className="text-gray-700 mt-4">
          <p className="mt-1">
            A verification email has been sent to{" "}
            <span className="font-semibold">your registered email address</span>
            . Please check your inbox (and spam folder) to confirm your email.
          </p>
          <ul className="mt-1 list-disc pl-5">
            <li>
              This link is valid for{" "}
              <span className="font-semibold">24 hours</span>.
            </li>
            <li>
              If you didn’t receive the email, you can resend the verification
              email after logging in from the profile section.
            </li>
            <li>
              Make sure to complete the verification process to get verified and
              access all features.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SentEmailVerificationLink;
