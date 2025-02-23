import React from 'react'

const Select = ({
    label,
    options,
    onChange,
    className='',
    ...props
}) => {
  return (
    <div>
        {label &&<label className='px-5 text-lg italic text-pink-400'>{label}</label>}
        <select onChange={onChange} className={`my-5 text-2xl italic border border-blue-800 px-3 py-1 rounded-2xl focus:border-green-800 outline-none bg-transparent ${className}`}>
            {options.map((option) => (
                <option key={option} className='bg-black' value={option}>{option}</option>
            ))}
        </select>
    </div>
  )
}

export default Select