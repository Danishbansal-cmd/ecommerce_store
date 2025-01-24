import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

function CommonUserForm({
  errors,
  setErrors,
  formElements,
  onSubmit,
  btnText,
  formData,
  setFormData,
  haveResetPasswordButton,
  customFormHeight,
  showPolicySection,
  isSubmitted,
}) {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const togglePasswordVisibility = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };

  const types = {
    INPUT: "input",
    TEXTAREA: "textarea",
    SELECT: "select",
  };

  // Function to validate input
  const validateInput = (name, value, inputName) => {
    let error = "";
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (inputName === "email") {
      // Check if it's an email
      if (!emailRegex.test(value)) {
        error = "Invalid email address";
      }
    } else if (inputName === "username") {
      // Check if it's empty or contains '@'
      if (!value) {
        error = "This field is required";
      } else if (value.includes("@")) {
        error = "Username cannot contain '@'";
      }
    } else if (inputName !== "password") {
      if (value.includes("@")) {
        // Check if it's an email
        if (!emailRegex.test(value)) {
          error = "Invalid email address";
        }
      }
      // Check if it's empty
      if (!value) {
        error = "This field is required";
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  function getInputComponentType(getItem) {
    let element = null;
    const value = formData[getItem.name] || "";

    switch (getItem.componentType) {
      case types.INPUT:
        element = (
          <input
            id={getItem.name}
            value={value}
            placeholder={getItem.placeholder}
            type={
              getItem.inputType === "password"
                ? isVisiblePassword
                  ? "text"
                  : "password"
                : getItem.inputType
            }
            name={getItem.name}
            onChange={(event) => {
              setFormData({ ...formData, [getItem.name]: event.target.value });
              validateInput(getItem.name, event.target.value, getItem.name);
            }}
            className="w-full bg-backgroundMain-light py-2 text-colorText-light 
            autofill:bg-backgroundMain-light autofill:text-colorText-light 
            focus:outline-none placeholder:text-colorText-light"
          />
        );
        break;
      case types.SELECT:
        element = (
          <Select
            value={value}
            onValueChange={(value) =>
              setFormData({ ...formData, [getItem.name]: value })
            }
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  getItem.name.charAt(0).toUpperCase() + getItem.name.slice(1)
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>
                  {getItem.name.charAt(0).toUpperCase() + getItem.name.slice(1)}
                </SelectLabel>
                {getItem.options && getItem.options.length > 0
                  ? getItem.options.map((optionItem) => (
                      <SelectItem
                        key={optionItem.id}
                        value={optionItem._id || optionItem.id}
                      >
                        {optionItem.label}
                      </SelectItem>
                    ))
                  : null}
              </SelectGroup>
            </SelectContent>
          </Select>
        );
        break;
    }
    return element;
  }
  return (
    <div className="w-full mt-5">
      <form action="" onSubmit={onSubmit}>
        <div
          className={`flex flex-col 
      ${customFormHeight || ""}`}
          style={{
            height: customFormHeight ? `${customFormHeight}px` : undefined,
          }}
        >
          {formElements.map((item) => (
            <div className="flex flex-col items-start" key={item.name}>
              <label className="text-sm text-colorText-light font-bold">
                {item.label}
              </label>
              <div className="flex w-full">
                {/* For the icon */}
                <div className="bg-backgroundMain-light min-w-12 flex items-center justify-center ">
                  <item.iconProperty className="text-colorText-light text-2xl" />
                </div>

                {getInputComponentType(item)}

                {/* Password visible button */}
                {item.name === "password" && (
                  <div
                    className="bg-backgroundMain-light min-w-12 flex items-center justify-center"
                    onClick={togglePasswordVisibility} // Toggle visibility on click
                  >
                    <div
                      className={`min-w-8 min-h-8 flex items-center justify-center rounded-full cursor-pointer 
                         hover:bg-gray-300`}
                    >
                      {isVisiblePassword ? (
                        <IoMdEye className="text-xl" />
                      ) : (
                        <IoMdEyeOff className="text-xl" />
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/* for error display in red color */}
              {item.name !== "password" && (
                <span className="text-xs text-red-500">
                  {errors[item.name] || "\u00A0"}
                </span>
              )}
            </div>
          ))}
          {haveResetPasswordButton ? (
            <div className="flex items-center justify-end gap-2 text-sm mt-1">
              <Link
                className="text-gray-500 cursor-pointer"
                to="/send-reset-password-email"
              >
                Forgot Password?
              </Link>
            </div>
          ) : null}
        </div>

        {/* Submit Button */}
        <div className="h-32 flex flex-col justify-end">
          {/* for error display in red color */}
          {errors["registerError"] && (
            <div className="bg-red-100 border-red-500 border-l-4 mb-1 flex items-center pl-2">
              <span className="text-xs text-red-500">
                {errors["registerError"]}
              </span>
            </div>
          )}

          {/* Agree to Policy sections */}
          {showPolicySection && (
            <span className="text-xs">
              By Continuing, I agree to the{" "}
              <Link to="/terms-of-use">Terms of Use</Link> &{" "}
              <Link to="/privacy-policy">Privacy Policy</Link>
            </span>
          )}

          {/* Button to do the action */}
          <button
            disabled={isSubmitted}
            type="submit"
            className="border-none focus:outline-none hover:shadow-custom w-full bg-colorSecondary-light rounded-none text-white font-bold"
          >
            {!isSubmitted ? (
              btnText
            ) : (
              <div className="flex justify-center items-center bg-transparent">
                {/* or border-8 */}
                <div className="w-6 h-6 border-6 border-transparent border-t-2 border-b-2 border-t-white border-b-white rounded-full animate-spin"></div>
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommonUserForm;
