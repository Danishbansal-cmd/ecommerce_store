import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { logoutUser } from '@/store/authslice';
import { LogOut, ShoppingCart, User } from 'lucide-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function NavigationBar({ additionalComponent }) {
  const { user } = useSelector(state => state.auth);
  const { toast } = useToast();
  const dispatch = useDispatch();

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
        <div className='bg-gray-800 w-full h-12 px-8'>
          <div className='flex items-center h-full justify-between'>
            {/* Company Logo goes here */}
            <div>
              <div onClick={() => { }} className='flex gap-2'>
                <ShoppingCart className='text-white' />
                <span className='text-white font-extrabold'>Ecommerce</span>
              </div>
            </div>
            <div className='flex gap-2 items-center justify-end'>
              {additionalComponent && additionalComponent(user?.role)}
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className='cursor-pointer'>
                      <AvatarFallback>{user?.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='cursor-pointer'>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <User />
                        <span>{user?.username.charAt(0).toUpperCase() + user?.username.slice(1)}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut />
                        <span >Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;