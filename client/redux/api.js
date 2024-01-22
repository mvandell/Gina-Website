import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const backendURL = "/";

const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: backendURL,

        prepareHeaders: (headers, {getState}) => {
            const token = getState().auth.token
            if (token) {
                headers.set("Authorization", `Bearer ${token}`)
            }
            return headers
        },
    }),

    tagTypes: ["Me", "Dates", "Policy", "Merit"],
    //unique

    endpoints: (builder) => ({

        //LOGIN
        login: builder.mutation({
            query: (user) => ({
                url: "/auth/login",
                method: "POST",
                body: user,
            }),
            providesTags: ["Me"]
        }),

        
    })
})