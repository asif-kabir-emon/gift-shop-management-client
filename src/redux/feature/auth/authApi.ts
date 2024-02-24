import { baseApi } from "../../api/baseApi";

const AuthApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                body: userInfo,
            }),
        }),
        register: builder.mutation({
            query: (userInfo) => ({
                url: "/user/create-user",
                method: "POST",
                body: userInfo,
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = AuthApi;
