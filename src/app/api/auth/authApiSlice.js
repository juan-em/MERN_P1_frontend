import { apiSlice } from "../apiSlice";
import { logOut, setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>( {
        login: builder.mutation({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: {...credentials}
            }),
            // async onQueryStarted (arg, { dispatch, queryFulfilled}) {
            //     try {
            //         const {accessToken} = await queryFulfilled
            //         dispatch(setCredentials({ accessToken }))
            //     } catch (err) {
            //         console.log(err)
            //     }
            // }
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST'
            }),
            async onQueryStarted (arg, { dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled
                    console.log(data)
                    dispatch(logOut())
                    dispatch(apiSlice.util.resetApiState()) //for clearing all because we are logout
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET'
            })
        })
    })
})

export const {
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation
} = authApiSlice