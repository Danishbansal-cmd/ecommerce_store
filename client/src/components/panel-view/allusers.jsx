import { deleteUser, getAllUsers } from '@/store/authslice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Checkbox } from '../ui/checkbox';
import { toast, useToast } from '@/hooks/use-toast';

function AllUsers() {
    const dispatch = useDispatch();
    const [selectUserList, setSelectUserList] = useState([]);
    const { allUserList, user } = useSelector(state => state.auth);
    const [openDeleteDialog,setOpenDeleteDialog] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch])

    function handleSelect(currentUser) {
        const currentUserId = currentUser._id;
        setSelectUserList((prevElements) => {
            const updatedList = [...prevElements];
            const indexOfUserFromList = updatedList.indexOf(currentUserId);
            if (indexOfUserFromList > -1) {
                updatedList.splice(indexOfUserFromList, 1);
            } else {
                updatedList.push(currentUserId);
            }

            // it is the most updated list
            // console.log('updated list', updatedList)
            return updatedList;
        });

        // although it is working fine
        // consoling the list here, would not give you the updated list
        // console.log('selectUserList', selectUserList);

    }

    function deleteUserByIds() {
        console.log('entered')
        setSelectUserList((prevElements) => {
            const list = [...prevElements];
            if (list.length === 0) {
                toast({
                    title: 'deleted or select users'
                });
            } else {
                setSelectUserList((prevElements) => {
                    const newList = [...prevElements];
                    const currentUser = newList[0];
                    dispatch(deleteUser({ userId: currentUser }))
                    newList.splice(0, 1);
                    return newList;
                });
                deleteUserByIds();
            }
            console.log(list,'updated deleted list');
            return list;
        });

        // to update the list after the delete function is called
        console.log('i am runeed deleteuserbyids')
        dispatch(getAllUsers());
        setOpenDeleteDialog(false);
    }



    console.log(allUserList, 'allUserList')
    console.log(user, 'user?._id')
    return (
        <div>
            <Card>
                <CardHeader className='flex items-start justify-center'>
                    <CardTitle>Users</CardTitle>
                    <CardDescription>List of all kind of users.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <div>
                            <div className='flex gap-2 items-center justify-start mb-3'>
                                <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
                                    <DialogTrigger asChild>
                                        <Button className='h-auto' variant='ouline'>
                                            <span className='text-white text-xs'>Delete User</span>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Delete User</DialogTitle>
                                            <DialogDescription>
                                                Are you sure you want to delete the user?
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <Button type="submit" onClick={() => { deleteUserByIds() }}>Yes</Button>
                                            <DialogClose asChild>
                                                <Button type="submit">Close</Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <div><Button className='h-auto' variant='ouline'><span className='text-white text-xs'>Edit User</span></Button></div>
                            </div>
                        </div>
                        <div className='grid grid-cols-[120px_150px_150px_80px] gap-4 place-items-start font-extrabold'>
                            <div>USERNAME</div>
                            <div>EMAIL</div>
                            <div>PASSWORD</div>
                            <div>ROLE</div>
                        </div>
                        <div className='h-96 overflow-scroll'>
                            {allUserList && allUserList.length > 0 ? allUserList.map((item) => (<div className='grid grid-cols-[120px_150px_150px_80px_auto] gap-4 place-items-start text-xs text-gray-900 h-[24px]' key={item._id}>
                                <div>{item.username}</div>
                                <div>{item.email}</div>
                                <div className='text-wrap overflow-hidden w-full'>{item.password}</div>
                                <div>{item.role}</div>
                                <div><Checkbox checked={selectUserList.includes(item._id)} onCheckedChange={() => handleSelect(item)} className='bg-transparent py-2 px-3 border-black border-2' /></div>
                            </div>)) : null}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AllUsers;