import React from 'react'

function TableHeading({headingData}) {
  return (
    <thead className='bg-gray-500'>
     <tr>
        {headingData.map((name,i)=>(
        <th key={name} className={`text-lg font-semibold  ${i == 0 && "rounded-tl-[13px]"} ${headingData[headingData.length - 1] == name && "rounded-tr-[13px] "}  sm:p-4 p-3 text-white ${i ==0 && "text-start"} lg:text-[18px] md:text-[16px] text-[14px] `}>{name}</th>
        ))}
  </tr>
  </thead>
  )
}

export default TableHeading
