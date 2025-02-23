import {React, useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import appwriteAuth from '../appwrite/appwriteAuth'
import { useNavigate, useLocation } from 'react-router-dom'
import { Login as AuthLogin, Login, Logout } from '../store/authSlice'
import { ClearAllData, StoreAllFilesInStore, StoreAllPostsInStore } from '../store/dataSlice'
import { StorePrevPath, ClearPrevPath } from '../store/previousPathSlice'
import UpdateStore from '../store/updateStore'
import { Loader } from '../components'

const AuthenticationRequired = ({children, authenticationRequired}) => {
    
    const [loading, setLoading] = useState(true)
    const authStore = useSelector((state) => state.authStore)
    const dataStore = useSelector((state) => state.dataStore)
    const prevPathStore = useSelector((state) => state.prevPath)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const [prevPath, setPrevPath] = useState('')


    const CheckAuthentication = () => {
        console.log('CHeck authentication called');
        
        if (authStore.authStatus && authStore.userData.$id) return true
        else {
            const localAuth = JSON.parse(localStorage.getItem('userInfo'))
            console.log('authentication not found in store localAuth is fetching and got', localAuth)
            if (localAuth){
                if (localAuth.authStatus && localAuth.userData) dispatch(Login(localAuth.userData))
                return true
            }
            else {
                appwriteAuth.GetUser()
                .then((response) => {
                    if (response.$id) {
                        console.log('Local Auth is also not found so get user from appwrite and dispatch login', response);
                        
                        dispatch(Login(response))
                        return true
                    }
                    else return false
                })
            }
        }
    }

    const CheckData = () => {
        console.log('CHECK DATA CALLED');
        
        if (dataStore.allPosts.totalPosts == null || dataStore.allFiles.totoalFiles == null) {
            UpdateStore(dispatch, location.pathname)
            return true
        }
        return true
    }

    useEffect(() => {
        if (prevPathStore != ''){
            setPrevPath(prevPathStore)
            dispatch(StorePrevPath(location.pathname))
            console.log('In first use effect on ', location.pathname, 'page prevPath != "" called');
            
        }
        else{
            const localPrevPath = localStorage.getItem('prevPath')
            console.log('In first use effect on ', location.pathname, 'page prevPath == "" called and localPrevPath found = ', localPrevPath);
            if (localPrevPath) {
                const allPosts = localStorage.getItem('allPosts')
                const allFiles = localStorage.getItem('allFiles')
                dispatch(StorePrevPath(localPrevPath))
                dispatch(StoreAllPostsInStore(JSON.parse(allPosts)))
                dispatch(StoreAllFilesInStore(JSON.parse(allFiles)))
                
                setPrevPath(localPrevPath)
                dispatch(StorePrevPath(location.pathname))
            }
            else {
                console.log('In first use effect on ', location.pathname, 'page prevPath == "" and local prevPath not found so nagiating to login page called');
                navigate('/login')
            }
        }
    }, [])

    useEffect(() => {
            console.log('AUthentication wala effect called');
            if (CheckAuthentication()){
                if (CheckData()) setLoading(false)
                else navigate('/login')
            } 
            else navigate('/login')
    }, [])

    if (loading) {
        return(
            <Loader />
            //<div className='text-6xl italic font-bold underline'>Loading ...... Chill a lil bit !!!</div>
        )
    }
    else {
        return(
            children
        )
    }

}

export default AuthenticationRequired