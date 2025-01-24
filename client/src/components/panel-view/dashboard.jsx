import { addEmployeeElements} from '@/config';
import { getAllDepartments } from '@/store/departmentSlice';
import { getAllRoles } from '@/store/rolesSlice';
import { LogOut, Plus, ShoppingCart, User } from 'lucide-react';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import CommonForm from '@/common/commonForm';
import { createUserByAdmin, logoutUser } from '@/store/authslice';
import { useToast } from '@/hooks/use-toast';
import RoleBasedAccess from '../role-based/roleBasedAccess';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import AllEmployees from './allemployees';
import AllUsers from './allusers';
import AllProducts from './products';
import { getAllProduct } from '@/store/productSlice';
import ProductTile from './product-tile';
import { Checkbox } from '../ui/checkbox';
import Filters from './filters';
import NavigationBar from '@/components/frontend-user-view/navigation';

const initialState = {
  firstname: '',
  lastname: '',
  email: '',
  phonenumber: 0,
  status: '',
  username: '',
  password: '',
  roleId: '',
  departmentId: ''
}


function PanelDashboard({ userRole }) {
  const [openAddEmployeeDialog, setOpenAddEmployeeDialog] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const btnText = 'Add Employee';
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [addEmployeeStateElements, setAddEmployeestateElements] = useState(addEmployeeElements);

  function onSubmit(event) {
    event.preventDefault();

    // create user by admin only
    dispatch(createUserByAdmin(formData)).then((data) => {
      console.log(data, 'data response')
      if (data?.payload?.success) {
        //resets the form to empty all fields
        setFormData(initialState);
        setOpenAddEmployeeDialog(false);
        toast({
          title: data?.payload?.message
        })
      } else {
        toast({
          title: data?.payload?.message,
          variant: 'destructive'
        })
      }
    }).catch((error) => console.error('Error:', error));
  }

  useEffect(() => {
    dispatch(getAllRoles()).then((data) => {
      console.log(data?.payload?.data, 'getallroles data?.payload?.data');
      // removing the duplicates from the list(addEmployeeStateElements)
      // and adding the couple of items in it
      setAddEmployeestateElements((prevElements) => ([...new Set([...prevElements, { name: 'roleId', componentType: 'select', label: 'Choose Role for Employee', options: data?.payload?.data.map((item) => ({ id: item.role, _id: item._id, label: item.role.charAt(0).toUpperCase() + item.role.slice(1) })) },
      ].map((object) => JSON.stringify(object)))].map((stringObject) => JSON.parse(stringObject))));
    });
    dispatch(getAllDepartments()).then((data) => {
      console.log(data?.payload?.data, 'department data?.payload?.data');
      // removing the duplicates from the list(addEmployeeStateElements)
      // and adding the couple of items in it
      setAddEmployeestateElements((prevElements) => ([...new Set([...prevElements, { name: 'departmentId', componentType: 'select', label: 'Choose Department for Employee', options: data?.payload?.data.map((item) => ({ id: item.department, _id: item._id, label: item.department.charAt(0).toUpperCase() + item.department.slice(1) })) },
      ].map((object) => JSON.stringify(object)))].map((stringObject) => JSON.parse(stringObject))));
    });
  }, [dispatch]);


  function isFormValid() {
    return Object.keys(formData).map((key) => typeof (formData[key]) === 'string' ? formData[key] !== '' : formData[key] !== 0).every((item) => item);
  }

  function addEmployeeComponent(userRole){
    return (<RoleBasedAccess allowedRoles={['admin']} userRole={userRole}>
      <div className=''>
        <div onClick={() => { setOpenAddEmployeeDialog(true) }} className='flex items-center justify-center w-8 h-8 bg-white rounded-md border border-black cursor-pointer'>
          <Plus />
        </div>
      </div>
    </RoleBasedAccess>);
  }

  console.log(addEmployeeStateElements, 'addEmployeeStateElements')
  return (
    <Fragment>
      <NavigationBar additionalComponent={addEmployeeComponent}/>
      
      {/* rolebasedaccess is used only in places where the access needs only for the admin */}
      <RoleBasedAccess allowedRoles={['admin']} userRole={userRole}>
        {/* a sheet or div that would open when admin or employee user tries to add the new employee */}
        <Sheet open={openAddEmployeeDialog} onOpenChange={() => { setOpenAddEmployeeDialog(false) }}>
          <SheetContent className='overflow-auto' side='right'>
            <SheetHeader>
              <SheetTitle>Add Employee</SheetTitle>
            </SheetHeader>
            <div className='py-6'>
              <CommonForm formData={formData} setFormData={setFormData} formElements={addEmployeeStateElements} onSubmit={onSubmit} btnText={btnText} btnDisabled={!isFormValid()} />
            </div>
          </SheetContent>
        </Sheet>
      </RoleBasedAccess>
        <div className='flex h-screen w-full bg-gray-200' >
          <div className='w-full px-6 py-4'>
            <div className='flex flex-col items-start justify-center'>
              <div className='w-full bg-white'>
                <Tabs className='w-full'>
                  <TabsList>
                    <TabsTrigger value='personalinfo'>Personal Information</TabsTrigger>
                    <TabsTrigger value='users'>Users</TabsTrigger>
                    <TabsTrigger value='employees'>Employees</TabsTrigger>
                    <TabsTrigger value='products'>Products</TabsTrigger>
                    <TabsTrigger value='training'>Training</TabsTrigger>
                    <TabsTrigger value='payroll'>Payroll</TabsTrigger>
                    <TabsTrigger value='finance'>Finance</TabsTrigger>
                  </TabsList>
                  <TabsContent value='personalinfo'>

                  </TabsContent>
                  <TabsContent value='employees'>
                    <AllEmployees />
                  </TabsContent>
                  <TabsContent value='users'>
                    <AllUsers userRole={userRole} />
                  </TabsContent>
                  <TabsContent value='products'>
                    <AllProducts userRole={userRole} />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
    </Fragment>
  );
};

export default PanelDashboard;