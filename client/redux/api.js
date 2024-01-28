import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendURL = "/";

const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: backendURL,

        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
            if (token) {
                headers.set("Authorization", `Bearer ${token}`)
            }
            return headers
        },
    }),

    tagTypes: ["Me", "Dates", "Policy", "Merit", "About"],
    //unique

    endpoints: (builder) => ({

        //<------------------------QUERIES---------------------------->
        //GET USER
        getUser: builder.query({
            query: () => ({
                url: "/api/user",
                method: "GET",
            }),
            providesTags: ["Me"]
        }),
        //GET BIO
        getBio: builder.query({
            query: () => ({
                url: "/api/about",
                method: "GET",
            }),
            providesTags: ["About"]
        }),
        //GET POLICY
        getPolicy: builder.query({
            query: () => ({
                url: "/api/policy",
                method: "GET",
            }),
            providesTags: ["Policy"]
        }),
        //GET DATES
        getDates: builder.query({
            query: () => ({
                url: "/api/dates",
                method: "GET",
            }),
            providesTags: ["Dates"]
        }),

        //<-----------------------MUTATIONS------------------------------>
        //LOGIN
        login: builder.mutation({
            query: (user) => ({
                url: "/auth/login",
                method: "POST",
                body: user,
            }),
            providesTags: ["Me"]
        }),
        //LOGOUT
        logout: builder.mutation({
            queryFn: () => ({
                data: {}
            }),
            invalidatesTags: ["Me"]
        }),
        //ADD NEW DATE
        postDate: builder.mutation({
            query: (date) => ({
                url: "/auth/dates",
                method: "POST",
                body: date,
            }),
            invalidatesTags: ["Dates"]
        }),
        //ADD ABOUT PARAGRAPH
        postBio: builder.mutation({
            query: (paragraph) => ({
                url: "/auth/about/add",
                method: "POST",
                body: paragraph,
            }),
            invalidatesTags: ["About"]
        }),
        //DELETE DATE
        deleteDate: builder.mutation({
            query: (id) => ({
                url: `/auth/dates/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Dates"]
        }),
        //<--------------PATCH-------------->
        //PATCH USER
        patchUser: builder.mutation({
            query: ({ id, username, password, email, phone }) => ({
                url: `/auth/account/${id}/edit`,
                method: "PATCH",
                body: { username, password, email, phone },
            }),
            invalidatesTags: ["Me"]
        }),
        //PATCH BIO
        patchBio: builder.mutation({
            query: ({ id, paragraph }) => ({
                url: `/auth/about/${id}/edit`,
                method: "PATCH",
                body: { paragraph },
            }),
            invalidatesTags: ["Me"]
        }),
        //PATCH POLICY
        patchPolicy: builder.mutation({
            query: ({ id, instrument, heading, content }) => ({
                url: `/auth/policy/${id}/edit`,
                method: "PATCH",
                body: { instrument, heading, content }
            }),
            invalidatesTags: ["Policy"]
        }),
        //PATCH DATE
        patchDate: builder.mutation({
            query: ({ id, year, month, day, about }) => ({
                url: `/auth/dates/edit/${id}`,
                method: "PATCH",
                body: { year, month, day, about }
            }),
        }),
    }),
})

export default api;

export const {
    //QUERIES
    useGetUserQuery,
    useGetBioQuery,
    useGetPolicyQuery,
    useGetDatesQuery,
    //MUTATIONS
    useLoginMutation,
    useLogoutMutation,
    usePostDateMutation,
    usePostBioMutation,
    useDeleteDateMutation,
    //PATCH
    usePatchUserMutation,
    usePatchBioMutation,
    usePatchPolicyMutation,
    usePatchDateMutation
} = api