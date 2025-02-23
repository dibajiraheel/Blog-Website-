import {React, useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import appwriteAuth from '../appwrite/appwriteAuth'
import { useNavigate, useLocation } from 'react-router-dom'
import { Login as AuthLogin, Logout } from '../store/authSlice'
import { ClearAllData, StoreAllFilesInStore, StoreAllPostsInStore } from '../store/dataSlice'
import { StorePrevPath, ClearPrevPath } from '../store/previousPathSlice'
import UpdateStore from '../store/updateStore'
import { cache } from 'react'
import { Loader } from '../components'

const AuthenticationNotRequired = ({children, authenticationRequired}) => {

    const [loading, setLoading] = useState(true)
    const authStore = useSelector((state) => state.authStore)
    const dataStore = useSelector((state) => state.dataStore)
    const prevPathStore = useSelector((state) => state.prevPath)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const [prevPath, setPrevPath] = useState('')


    useEffect(() => {
        if (prevPathStore != ''){
            setPrevPath(prevPathStore)
            dispatch(StorePrevPath(location.pathname))
        }
        else{
            const localPrevPath = localStorage.getItem('prevPath')
            if (localPrevPath) {
                console.log(typeof(localPrevPath));
                console.log(localPrevPath);
                
                dispatch(StorePrevPath(localPrevPath))
                setPrevPath(localPrevPath)
            }
            dispatch(StorePrevPath(location.pathname))
        }

    }, [])

    useEffect(() => {
        if (prevPath == '/login' || prevPath == '/signup' || prevPath == '/') {
            console.log('Previosu Path is login / signup so setloading false directly');
            
            setLoading(false)
        }
        else {
            console.log('Calling Logout');
            console.log('Prev Pathv =', prevPath);
            
            const userGot = appwriteAuth.GetUser()
            console.log('USER GOT FROM APPWRITE = ', userGot);
            
            if (userGot) {
                userGot.then((response) => {
                    if (response.$id) {
                        appwriteAuth.Logout()
                        .then((response) => {
                            console.log('Logout is called and response is ', response);
                            
                            if (response.message == ''){
                                console.log('called logout, clear data, clear prev path ', response);
                                
                                dispatch(Logout())
                                dispatch(ClearAllData())
                                dispatch(ClearPrevPath())
                                setLoading(false)
                            }
                        })
                    }
                })
                .finally(() => {
                    console.log('reached finally when user is not found in appwrite');
                    setLoading(false)
                })
            }
            
            
        }
    }, [])

    if (loading) {
            return(
                <Loader />
                // <div className='text-6xl italic font-bold underline'>Loading ...... Chill a lil bit !!!</div>
            )
        }
        else {
            return(
                children
            )
        }

}

export default AuthenticationNotRequired