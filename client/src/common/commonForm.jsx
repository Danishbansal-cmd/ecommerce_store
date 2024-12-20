import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';
import { Link } from 'react-router-dom';

function CommonForm({ formElements, onSubmit, btnText, formData, setFormData, btnDisabled, haveResetPasswordButton, customFormHeight }) {

  const types = {
    INPUT: 'input',
    TEXTAREA: 'textarea',
    SELECT: 'select',
  }

  function getInputComponentType(getItem) {
    let element = null;
    const value = formData[getItem.name] || '';

    switch (getItem.componentType) {
      case types.INPUT:
        element = (
          <Input id={getItem.name} value={value} placeholder={getItem.placeholder} type={getItem.inputType} name={getItem.name} onChange={(event) => setFormData({ ...formData, [getItem.name]: event.target.value })} />
        );
        break;
      case types.SELECT:
        element = (
          <Select value={value} onValueChange={(value) => setFormData({ ...formData, [getItem.name]: value })}>
            <SelectTrigger>
              <SelectValue placeholder={getItem.name.charAt(0).toUpperCase() + getItem.name.slice(1)} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{getItem.name.charAt(0).toUpperCase() + getItem.name.slice(1)}</SelectLabel>
                {getItem.options && getItem.options.length > 0 ? getItem.options.map((optionItem) => (<SelectItem key={optionItem.id} value={optionItem._id || optionItem.id}>{optionItem.label}</SelectItem>)) : null}
              </SelectGroup>
            </SelectContent>
          </Select>
        );
        break;
    }
    return element;
  }
  return <div className='w-full px-6 mt-5'>
    <form action="" onSubmit={onSubmit}>
      <div className={`flex flex-col gap-3 
      overflow-y-auto scroll-smooth 
      [&::-webkit-scrollbar-track]:rounded-full 
      [&::-webkit-scrollbar-thumb]:rounded-full 
      [&::-webkit-scrollbar]:w-2 
      [&::-webkit-scrollbar-track]:bg-gray-100 
      [&::-webkit-scrollbar-thumb]:bg-gray-300 
      dark:[&::-webkit-scrollbar-track]:bg-neutral-700 
      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 
      scroll-margin-4
      px-2 py-1
      ${customFormHeight ? '' : 'h-80'}`} 
      style={{height : customFormHeight ? `${customFormHeight}px` : undefined}}>
        {formElements.map((item) => (<div className='flex flex-col items-start' key={item.name}>
          <Label className='mb-1.5'>{item.label}</Label>
          {getInputComponentType(item)}
        </div>))}
        {haveResetPasswordButton ? 
        <div className='flex items-center justify-start gap-2' >
          <span className='text-xs'>Forgot Password?</span>
          <Link className='text-xs text-gray-500 cursor-pointer hover:text-[#646cfc]' to='/reset-password'>Reset Password</Link>
        </div> : 
        null}

      </div>
      <Button disabled={btnDisabled} type="submit" className='w-full mt-3'>{btnText}</Button>
    </form>
  </div>
};

export default CommonForm;