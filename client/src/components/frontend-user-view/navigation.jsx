import { useToast } from '@/hooks/use-toast';
import { logoutUser } from '@/store/authslice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsCart, BsPerson } from "react-icons/bs";
import { MdOutlineSearch } from "react-icons/md";
import { AiOutlineSearch } from 'react-icons/ai';

function NavigationBar({ additionalComponent }) {
  const { user } = useSelector(state => state.auth);
  const { toast } = useToast();
  const dispatch = useDispatch();

  // for icons and its style
  const iconStyle = {color: "white", fontSize: "1.5em"};

  function handleLogout() {
    dispatch(logoutUser()).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message
        })
      }
    })
  }

  return (
    <div>
      <nav>
        <div className='bg-colorMain-light w-full h-navigation'>
          <div className='container mx-auto xl:w-[1280px]'>
            <div className='flex items-center justify-between'>
              {/* Company Logo goes here */}
              <div>
                <Link to='/'>
                  <img src="/images/logo-no-background.png" alt="Logo" className='w-40'/>
                </Link>
              </div>


              <div className='flex gap-10 h-full items-center'>
                {/* for search box */}
                <div className='flex items-center w-96 bg-colorMainShadeDark-light gap-4 h-10 px-4'>
                  <AiOutlineSearch style={{color : "#FFA27F", fontSize : "1.6rem"}}/>
                  <input placeholder="Search for products, brands and more" className='w-full bg-transparent text-colorSecondary-light focus:outline-none placeholder:text-colorSecondary-light'/>
                </div>

                {/* for the rightmost cart and profile buttons */}
                <div className='flex gap-4 items-center justify-end'>
                  {additionalComponent && additionalComponent(user?.role)}

                  {/* for profile only */}
                  <div className='relative group w-24 h-navigation bg-colorSecondary-light flex flex-col items-center justify-center cursor-pointer'>
                    <BsPerson style={iconStyle}/>
                    <span className='text-white font-bold text-sm'>Profile</span>

                    {/* Dropdown Box */}
                    <div className="absolute z-10 top-full left-1/2 -translate-x-1/2 w-72 bg-white shadow-custom p-2 opacity-0
                    pointer-events-none 
                    group-hover:opacity-100 group-hover:pointer-events-auto
                    transition-all duration-200 ease-in-out
                    px-4 py-4">
                      {/* Message */}
                      <div className="mb-2 text-gray-700 text-sm text-left">
                        <p className='font-bold '>Welcome</p>
                        <p>To access account and manage orders</p>
                      </div>

                      {/* LOGIN / SIGNUP Button */}
                      <div className="mb-4 flex justify-start">
                        <Link to='/login' className="mt-2 px-4 py-2 border border-colorMain-light text-colorSecondary-light font-bold rounded-none text-sm bg-transparent hover:border-colorSecondary-light hover:text-colorSecondary-light transition-all">
                          LOGIN / SIGNUP
                        </Link>
                      </div>

                      {/* Horizontal Line */}
                      <div className="border-t border-gray-300 my-3"></div>

                      {/* Dropdown List */}
                      <ul className="text-left text-gray-700 text-sm">
                        <li className="py-1 px-2 hover:font-bold cursor-pointer rounded">Orders</li>
                        <li className="py-1 px-2 hover:font-bold cursor-pointer rounded">Contact Us</li>
                        <li className="py-1 px-2 hover:font-bold cursor-pointer rounded">Saved Cards</li>
                        <li className="py-1 px-2 hover:font-bold cursor-pointer rounded">Saved Addresses</li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* for cart only */}
                  <div className='w-24 h-navigation bg-colorSecondary-light flex flex-col items-center justify-center cursor-pointer'>
                    <div className="flex items-start">
                      <BsCart style={iconStyle}/>
                      <span className='text-cartItem-light font-bold text-sm relative bottom-2'>0</span>
                    </div>
                    <span className='text-white font-bold text-sm'>Cart</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;