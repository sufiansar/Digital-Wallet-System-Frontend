import { baseApi } from "@/Redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: "/user/create-user",
        method: "POST",
        data: userData,
      }),
      invalidatesTags: ["USER"],
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        data: credentials,
       
      }),
      invalidatesTags: ["USER"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),

    sendOtp: builder.mutation({
      query: (email) => ({
        url: "/otp/send",
        method: "POST",
        data: email,
      }),
      invalidatesTags: ["USER"],
    }),
    verifyOtp: builder.mutation({
      query: (otpData) => ({
        url: "/otp/verify",
        method: "POST",
        data: otpData,
      }),
      invalidatesTags: ["USER"],
    }),

    getUserInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useGetUserInfoQuery,
} = authApi;
