import React from 'react'

const Button = ({
    label = '',
    className = '',
    type,
    handleClick,
    id = null,
    disable = false,
    bgColorLight,
    bgColorDark,
    bgColorMedium,
    ...props
}) => {
  return (
    <button type={type} disabled={disable} id={id} onClick={handleClick} className={`my-5 mx-auto relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all ${bgColorLight} rounded-md group`}>
      <span className={`absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out ${bgColorDark} rounded group-hover:-mr-4 group-hover:-mt-4`}>
        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
      </span>
      <span className={`absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-${bgColorMedium} rounded group-hover:-ml-4 group-hover:-mb-4`}>
        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" />
      </span>
      <span className={`absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full ${bgColorMedium} rounded-md group-hover:translate-x-0`} />
      <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">{label}</span>
    </button>
    // <div>
    //     <button disabled={disable} id={id} onClick={handleClick} className={`my-5 px-3 py-1 text-xl border rounded-2xl border-blue-800 bg-blue-400 hover:bg-blue-600 italic ${className}`}>{label}</button>
    // </div>
  )
}

export default Button