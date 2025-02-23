import React from 'react'

const Input = ({
    id,
    label = '',
    type,
    className = '',
    value,
    onChange,
    readOnly = false,
    ...props
}) => {
  return (
    <div className='w-full'>

        <label htmlFor="UserEmail" className="block overflow-hidden rounded-md border border-white px-3 py-2 shadow-xs focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600" >
          <span className="text-xs font-medium"> {label} </span>
          <input type={type?type:'text'} id={id} placeholder={type == 'email' ? "anthony@rhcp.com" : ''} className="mt-1 w-full border-none p-0 focus:border-transparent focus:ring-0 focus:outline-hidden sm:text-sm" value={value} onChange={onChange}/>
        </label>

        {/* {label &&<label className='px-5 text-lg italic text-pink-400'>{label}</label>}
        <input readOnly={readOnly} type={type?type:'text'} name="" id={id} className={`my-5 text-2xl italic border border-blue-800 px-3 py-1 rounded-2xl focus:border-green-800 outline-none bg-transparent ${className}`} value={value} onChange={onChange}/> */}
    </div>
  )
}

export default Input