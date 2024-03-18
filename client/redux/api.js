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

    tagTypes: ["Me", "Dates", "Policy", "About"],
    //unique

    endpoints: (builder) => ({

        //<------------------------QUERIES---------------------------->
        //GET USER
        getUser: builder.query({
            query: () => ({
                url: "/api/user",
                method: "GET",
            }),
        }),
        //GET USER ACCOUNT
        getAccount: builder.query({
            query: () => ({
                url: "/auth/account",
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
        //GET SINGLE BIO
        getSingleBio: builder.query({
            query: (id) => ({
                url: `/api/about/${id}`,
                method: "GET",
            }),
            providesTags: ["About"]
        }),
        //GET POLICY
        getPianoPolicy: builder.query({
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
        //GET SINGLE DATE
        getSingleDate: builder.query({
            query: (id) => ({
                url: `/api/dates/${id}`,
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
        //ADD POLICY HEADING
        postPolicy: builder.mutation({
            query: (policy) => ({
                url: "/auth/policy/add",
                method: "POST",
                body: policy,
            }),
            invalidatesTags: ["Policy"]
        }),
        //ADD POLICY CONTENT
        postPolicyContent: builder.mutation({
            query: (policy) => ({
                url: "/auth/policy/content/add",
                method: "POST",
                body: policy,
            }),
            invalidatesTags: ["Policy"]
        }),
        //DELETE POLICY
        deletePolicy: builder.mutation({
            query: (id) => ({
                url: `/auth/policy/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Policy"]
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
        //PATCH POLICY HEADING
        patchPolicy: builder.mutation({
            query: ({ id, heading }) => ({
                url: `/auth/policy/${id}/edit`,
                method: "PATCH",
                body: { heading }
            }),
            invalidatesTags: ["Policy"]
        }),
         //PATCH POLICY CONTENT
         patchPolicyContent: builder.mutation({
            query: ({ id, headingId, content }) => ({
                url: `/auth/policy/content/${id}/edit`,
                method: "PATCH",
                body: { headingId, content }
            }),
            invalidatesTags: ["Policy"]
        }),
        //PATCH DATE
        patchDate: builder.mutation({
            query: ({ id, start, end, title, allDay }) => ({
                url: `/auth/dates/edit/${id}`,
                method: "PATCH",
                body: { start, end, title, allDay }
            }),
            invalidatesTags: ["Dates"]
        }),
    }),
})

export default api;

export const {
    //QUERIES
    useGetUserQuery,
    useGetAccountQuery,
    useGetBioQuery,
    useGetSingleBioQuery,
    useGetPianoPolicyQuery,
    useGetVoicePolicyQuery,
    useGetDatesQuery,
    useGetSingleDateQuery,
    //MUTATIONS
    useLoginMutation,
    useLogoutMutation,
    usePostDateMutation,
    usePostBioMutation,
    usePostPolicyMutation,
    usePostPolicyContentMutation,
    useDeletePolicyMutation,
    useDeleteDateMutation,
    //PATCH
    usePatchUserMutation,
    usePatchBioMutation,
    usePatchPolicyMutation,
    usePatchPolicyContentMutation,
    usePatchDateMutation
} = api