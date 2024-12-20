import React from 'react';
import { Checkbox } from '../ui/checkbox';
import { filterOptions } from '@/config';

function Filters({handleFilter, filters}) {

    return (
        <div className='w-60'>
            <div className=' px-4 py-2'>
                <div className='flex flex-col items-start'>
                    <div className='mb-3'><span className='font-extrabold text-xl'>Filters</span></div>
                    {filterOptions && Object.keys(filterOptions).length > 0 ? Object.keys(filterOptions).map((filterName) =>
                    (
                        <div key={filterName}>
                            <div className='flex items-center'><span className='font-bold text-md'>{filterName}</span></div>
                            <div className='flex flex-col'>{filterOptions[filterName] && filterOptions[filterName].length > 0 ? filterOptions[filterName].map((data) =>
                            (<div className='flex gap-3 items-center' key={data.id} >
                                <Checkbox checked={filters && Object.keys(filters).length > 0 && filters[filterName] && filters[filterName].indexOf(data.id) > -1} onCheckedChange={() => {handleFilter(filterName, data.id)}} className="bg-transparent py-2 px-2" value={data.id} />
                                <span>{data.label}</span>
                            </div>)
                            ) : null}
                            </div>
                        </div>
                    )
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Filters;