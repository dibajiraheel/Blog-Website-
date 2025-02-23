import {React, useState, useEffect } from 'react'
import {useForm, Controller} from 'react-hook-form'
import { Button, Input } from '../components'
import {useDispatch} from 'react-redux'
import { Login as AuthLogin, Logout as AuthLogout } from '../store/authSlice'
import appwriteAuth from '../appwrite/appwriteAuth'
import UpdateStore from '../store/updateStore'
import {useNavigate, Link} from 'react-router-dom'
import { StorePrevPath, ClearPrevPath } from '../store/previousPathSlice'


const Login = () => {

    const {control, handleSubmit, setValue} = useForm()
    const dispatch = useDispatch()
    const [isSubmitting, setisSubmitting] = useState(false)
    const navigate = useNavigate()

    const handleLogin = (data) => {
        console.log(data);
        setisSubmitting(true)
         appwriteAuth.Login({'email':data.email, 'password':data.password})
        .then((response) => {
            setValue('email', '')
            setValue('password', '')
            if (response) {
                console.log('Login Response', response);
                dispatch(AuthLogin(response))
                dispatch(StorePrevPath('/login'))
                UpdateStore(dispatch, '/login')
                console.log('Navigating to home');
                
                navigate('/home')
            }
            setisSubmitting(false)
        })
        
    }

    return (
        <div className='flex flex-col justify-center items-center gap-y-5'>

            <div className='border-b-4 flex flex-col justify-center items-center gap-y-10 px-5 py-2'>
                
                <h1 className='text-3xl font-bold'>Login</h1>
                <h2 className='text-center self-end'>Don't have an account ? <Link className='underline italic text-blue-600' to='/signup'>Signup</Link></h2>
            
            </div>

            <div className='lg:w-1/2'>
                
                <form onSubmit={handleSubmit(handleLogin)} className={`flex flex-col justify-center items-center ${isSubmitting ? 'pointer-events-none' : ''} border border-green-400 rounded-2xl gap-y-10 px-3 py-5`}>
                    
                    <Controller name='email' control={control} defaultValue=''
                    render={({field}) => (
                        <Input label='Email' type='email' value={field.value} onChange={field.onChange}/>
                    )}>
                    </Controller>

                    <Controller name='password' control={control} defaultValue=''
                    render={({field}) => (
                        <Input label='Password' type='password' value={field.value} onChange={field.onChange} />
                    )}>
                    </Controller>

                    <Button disable={isSubmitting ? true : false } bgColorLight={'bg-green-500'} bgColorMedium={'bg-green-600'} bgColorDark={'bg-green-700'} label={isSubmitting ? 'Submitting' : 'Login'} className='mx-auto'/>
                
                </form>          
            
            </div>
            
        </div>
    )
}

export default Login