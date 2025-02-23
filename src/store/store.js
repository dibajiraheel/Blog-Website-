import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'
import dataSlice from './dataSlice'
import prevPathSlice from './previousPathSlice'

const store = configureStore({
    reducer: {'authStore': authSlice, 'dataStore': dataSlice, 'prevPath': prevPathSlice}
})

export default store




