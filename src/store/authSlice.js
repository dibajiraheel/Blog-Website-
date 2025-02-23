import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    'authStatus': false,
    'userData': null
}

const authSlice = createSlice({
    'name': 'authStore',
    initialState,
    reducers: {
        'Login': (state, action) =>{
            console.log('Login called in Store with data = ', action.payload);
            state.authStatus = true
            state.userData = action.payload
            localStorage.setItem('userInfo', JSON.stringify({'authStatus': true, 'userData': action.payload}))
        },
        'Logout': (state, action) =>{
            state.authStatus = false
            state.userData = null
            localStorage.clear()
        }
    }
})

export const{Login, Logout} = authSlice.actions

export default authSlice.reducer


