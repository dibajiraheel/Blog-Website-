import {React, useState, useEffect } from 'react'
import {useForm, useController, Controller} from 'react-hook-form'
import { Button, Input } from '../components'
import {useDispatch} from 'react-redux'
import { Login as AuthLogin, Logout as AuthLogout } from '../store/authSlice'
import appwriteAuth from '../appwrite/appwriteAuth'
import {useNavigate, Link} from 'react-router-dom'

const Signup = () => {

    const {control, handleSubmit, setValue} = useForm()
    const dispatch = useDispatch()
    const [isSubmitting, setisSubmitting] = useState(false)
    const navigate = useNavigate()

    const handleSignup = (data) => {
        console.log(data);
        setisSubmitting(true);
        
        appwriteAuth.SignUp({'email':data.email, 'password':data.password})
        .then((response) => {
            console.log('SignUp Response', response);
            setValue('email', '')
            setValue('password', '')
            if (response){
                appwriteAuth.GetUser().then((response) => {
                    console.log('Get User Response', response);
                    if (response.$id) {
                        appwriteAuth.Logout()
                        .then((response) => {
                            console.log('Logout Response', response);
                            if (response) {
                                dispatch(AuthLogout())
                                appwriteAuth.Login({'email':data.email, 'password':data.password})
                                .then((response) => {
                                    console.log('Login Response', response);
                                    dispatch(AuthLogin(response))
                                    console.log('Navigating to home after logging out and loggin in again');
                                    navigate('/home')
                                    
                                })
                            }
                        })
                    }
                    else {
                        appwriteAuth.Login({'email':data.email, 'password':data.password})
                        .then((response) => {
                            console.log('Login with Getting User', response);
                            dispatch(AuthLogin(response))
                        })
                        .then(() => {
                            console.log('Navigating to home');
                            navigate('/home')
                        })
                    }
                })
            }
            setisSubmitting(false)
        })
        
        
        
    }

    return (
        <div className='flex flex-col justify-center items-center gap-y-5'>

            <div className='border-b-4 flex flex-col justify-center items-center gap-y-10 px-5 py-2'>
                
                <h1 className='text-3xl font-bold'>Sign Up</h1>
                <h2 className='text-center self-end'>Already have an account ? <Link className='underline italic text-blue-600' to='/login'>Login</Link></h2>
            
            </div>

            <div className='lg:w-1/2'>
            
                <form onSubmit={handleSubmit(handleSignup)} className={`flex flex-col py-5 justify-center items-center ${isSubmitting ? 'pointer-events-none' : ''} border border-yellow-400 rounded-2xl gap-y-10 px-3`}>
                    <Controller name='email' control={control} defaultValue=''
                    render={({field}) => (
                        <Input  id='email' label='Email' type='email' value={field.value} onChange={field.onChange} />
                    )}>
                    </Controller>

                    <Controller name='password' control={control} defaultValue=''
                    render={({field}) => (
                        <Input id='password' label='Password' type='password' value={field.value} onChange={field.onChange} />
                    )}>
                    </Controller>

                    <Button disable={isSubmitting ? true : false } bgColorLight={'bg-yellow-500'} bgColorMedium={'bg-yellow-600'} bgColorDark={'bg-yellow-700'} label={isSubmitting ? 'Submitting' : 'Signup'} className='mx-auto'/>
                </form>          
            
            </div>
            
        </div>
    )
}

export default Signup