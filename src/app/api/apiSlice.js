import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "./auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:3000", //just this if not using authentication
  credentials: "include",
  prepareHeaders: (headers, api) => {
    const { getState } = api;
    const token = getState().auth.token;
    if (token) headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  //consele.log(args) //request url, method, body
  //console.log(api) //signal, dispatch, getState()
  //console.log(extraOptions) //custom like {shout: true}

  let result = await baseQuery(args, api, extraOptions);

  // If you want, handle other status codes, too
  if (result?.error?.status === 403) {
    console.log("sending refresh token");

    //send refresh token get new access token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult?.data) {
      //store the new token
      api.dispatch(setCredentials({ ...refreshResult.data }));

      //retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your login has expired";
      }
      return refreshResult;
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Note", "User"],
  endpoints: (builder) => ({}),
});
