import React from 'react'
import { Button } from '../components'
import { useNavigate } from 'react-router-dom'

const MainPage = () => {

    const navigate = useNavigate()

    const handleLogin = () => {
        navigate('/login')
    }

    const handleSignup = () => {
        navigate('/signup')
    }

    return (
        <div className='flex flex-col justify-center items-center h-screen gap-10'>
            <h1 className='text-6xl italic font-extrabold'>Welcome to <span className='text-purple-500'>Blog.com</span></h1>
            <div className='flex flex-row gap-10'>
                <Button bgColorLight={'bg-green-500'} bgColorMedium={'bg-green-600'} bgColorDark={'bg-green-700'} className='text-white border-green-950 bg-green-500 hover:bg-green-800 hover:scale-110' label='Login' handleClick={handleLogin} />
                <Button bgColorLight={'bg-yellow-500'} bgColorMedium={'bg-yellow-600'} bgColorDark={'bg-yellow-700'} className='text-white bg-blue-500 hover:bg-blue-800 hover:scale-110' label='Singup' handleClick={handleSignup} />
            </div>
        </div>
    )
}

export default MainPage