import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken
        },
        logOut: (state, action)=>{
            state.token = null
        }
    }
})

export const { setCredentials, logOut } = authSlice.actions

const authReducer = authSlice.reducer
export default authReducer

export const selectCurrentToken = (state) => state.auth.token
