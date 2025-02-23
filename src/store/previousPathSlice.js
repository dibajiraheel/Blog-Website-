import { createSlice } from "@reduxjs/toolkit";



const prevPath = createSlice({
    name: 'prevPath',
    initialState: '',
    reducers: {
        'StorePrevPath': (state, action) => {
            localStorage.setItem('prevPath', String(action.payload))
            return action.payload
        },
        'ClearPrevPath': (state, action) => {
            localStorage.clear()
            return state = ''
        }
    }
})

export const {StorePrevPath, ClearPrevPath} = prevPath.actions

export default prevPath.reducer







