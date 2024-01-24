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

        //<------------------------QUERIES---------------------------->
        //GET USER/BIO
        getUser: builder.query({
            query: () => ({
                url: "/api/bio",
                method: "GET",
            }),
            providesTags: ["Me"]
        }),
        //GET PIANO POLICY
        getPianoPolicy: builder.query({
            query: () => ({
                url: "/api/policy/piano",
                method: "GET",
            }),
            providesTags: ["Policy"]
        }),
        //GET VOICE POLICY
        getVoicePolicy: builder.query({
            query: () => ({
                url: "/api/policy/voice",
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
            query: ({id, username, password, email, phone}) => ({
                url: `/auth/account/${id}/edit`,
                method: "PATCH",
                body: {username, password, email, phone},
            }),
            invalidatesTags: ["Me"]
        }),
        //PATCH BIO
        patchBio: builder.mutation({
            query: ({id, about}) => ({
                url: `/auth/bio/${id}/edit`,
                method: "PATCH",
                body: {about},
            }),
            invalidatesTags: ["Me"]
        }),
        //PATCH PIANO POLICY
        patchPiano: builder.mutation({
            query: ({rate30, rate45, school, summer, cm}) => ({
                url: "/auth/policy/piano/edit",
                method: "PATCH",
                body: {rate30, rate45, school, summer, cm}
            }),
            invalidatesTags: ["Policy"]
        }),
        //PATCH VOICE POLICY
        patchVoice: builder.mutation({
            query: ({rate30, rate45, school, summer, cm}) => ({
                url: "/auth/policy/voice/edit",
                method: "PATCH",
                body: {rate30, rate45, school, summer, cm}
            }),
            invalidatesTags: ["Policy"]
        }),
        //PATCH DATE
        patchDate: builder.mutation({
            query: ({id, year, month, day, about}) => ({
                url: `/auth/dates/edit/${id}`,
                method: "PATCH",
                body: {year, month, day, about}
            }),
        }),
    }),
})

export default api;

export const {
    //QUERIES
    useGetUserQuery,
    useGetPianoPolicyQuery,
    useGetVoicePolicyQuery,
    useGetDatesQuery,
    //MUTATIONS
    useLoginMutation,
    useLogoutMutation,
    usePostDateMutation,
    useDeleteDateMutation,
    //PATCH
    usePatchUserMutation,
    usePatchBioMutation,
    usePatchPianoMutation,
    usePatchVoiceMutation,
    usePatchDateMutation
} = api