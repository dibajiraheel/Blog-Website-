import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Button} from '../components/'
import { useNavigate } from 'react-router-dom'
import appwriteAuth from '../appwrite/appwriteAuth'
import { Link } from 'react-router-dom'
import { Logout } from '../store/authSlice'
import { ClearAllData } from '../store/dataSlice'

const Navbar = () => {
    
    const authStatus = useSelector((state) => state.authStore.authStatus)
    const [dropDown, setDropDown] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const navItems = [
        {
            'name': 'Home',
            'slug': '/home',
            'disabled': !authStatus
        },
        {
            'name': 'Add Post',
            'slug': '/postform',
            'disabled': !authStatus
        },
        {
            'name': 'Login',
            'slug': '/login',
            'disabled': authStatus
        },
        {
            'name': 'Logout',
            'slug': '/login',
            'disabled': !authStatus
        },
        {
            'name': 'Signup',
            'slug': '/signup',
            'disabled': authStatus
        },
    ]

    const handleClick = (e) => {
        const caller = e.target.innerHTML
        if (caller == 'Home') navigate('/home')
        else if (caller == 'Add Post') navigate('/postform')
        else if (caller == 'Signup') navigate('/signup')
        else if (caller == 'Login') navigate('/login')
        else if (caller == 'Logout') {
            appwriteAuth.Logout()
            .then((response) => {
                console.log(response);
                dispatch(Logout())
                dispatch(ClearAllData())
                navigate('/login')
            })
            .catch((response) => {
                console.log(response);
            })
        }   
    }

    const handleDropdownClick = (e) => {
        const caller = e.target.id
        if (caller == 'home') navigate('/home')
        else if (caller == 'add post') navigate('/postform')
        else if (caller == 'signup') navigate('/signup')
        else if (caller == 'login') navigate('/login')
        else if (caller == 'logout') {
            appwriteAuth.Logout()
            .then((response) => {
                console.log(response);
                dispatch(Logout())
                dispatch(ClearAllData())
                navigate('/login')
            })
            .catch((response) => {
                console.log(response);
            })
        }   
    }


    const openDropdown = () => {
        setDropDown((prevState) => !prevState)
    }
  
    return (
    <div>
        <nav className='flex flex-row justify-between items-center w-full border-b-2 border-purple-500 '>
            <div>
                <Link to='/home'>
                    <img className='mx-5 my-3 h-16 w-16 rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS62PVN-BibYo0ra1gRjl8OOCDbESMRX5Tmjg&s" alt="Logo" />
                </Link>
            </div>

            <div className='lg:hidden mx-5'>
                <button onClick={openDropdown} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-3 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><svg className=" h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={dropDown ? 'M1 5l4-4 4 4' : `m1 1 4 4 4-4`}/>
                </svg>
                </button>
            </div>


            <span className='hidden lg:flex flex-row justify-center items-center w-full gap-x-5'>
                {navItems.map((navItem) => {
                    var bgColorLight = ''
                    var bgColorDark = ''
                    var bgColorMedium = ''
                    if (navItem.name == 'Home'){
                        bgColorLight = 'bg-blue-500'
                        bgColorMedium = 'bg-blue-600'
                        bgColorDark = 'bg-blue-700'
                    } 
                    else if (navItem.name == 'Add Post') {
                        bgColorLight = 'bg-yellow-500'
                        bgColorMedium = 'bg-yellow-600'
                        bgColorDark = 'bg-yellow-700'
                    } 
                    else if (navItem.name == 'Logout') {
                        bgColorLight = 'bg-red-500'
                        bgColorMedium = 'bg-red-600'
                        bgColorDark = 'bg-red-700'
                    }
                    else if (navItem.name == 'Login' || navItem.name == 'Signup') {
                        bgColorLight = 'bg-yellow-500'
                        bgColorMedium = 'bg-yellow-600'
                        bgColorDark = 'bg-yellow-700'
                    }
                    if (navItem.disabled) return
                    else{
                        return(
                        <div key={navItem.name}>
                            <Button bgColorLight={bgColorLight} bgColorMedium={bgColorMedium} bgColorDark={bgColorDark} handleClick={handleClick} label={navItem.name} className={(navItem.name == 'Logout' ? 'bg-pink-600 hover:bg-pink-800' : '')} />
                        </div>
                )}})}
            </span>
        </nav>

        {/* <!-- Dropdown menu --> */}
        <div className={`z-10 ${dropDown ? '' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 overla`}>
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
        <li>
            <Link id='home' onClick={handleDropdownClick} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Home</Link>
        </li>
        <li>
            <Link id='add post' onClick={handleDropdownClick} to="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Add Post</Link>
        </li>
        <li>
            <Link id='logout' onClick={handleDropdownClick} to="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logout</Link>
        </li>
        </ul>
        </div>
    </div>
  )
}

export default Navbar