import { baseApi } from "@/Redux/baseApi";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    SendMoney: builder.mutation({
      query: (walletData) => ({
        url: "/wallet/send-money",
        method: "POST",
        data: walletData,
      }),
      invalidatesTags: ["WALLET"],
    }),

    DepositMoney: builder.mutation({
      query: (walletData) => ({
        url: "/wallet/deposit",
        method: "POST",
        data: walletData,
      }),
      invalidatesTags: ["WALLET"],
    }),

    WithdrawMoney: builder.mutation({
      query: (walletData) => ({
        url: "/wallet/withdraw-money",
        method: "POST",
        data: walletData,
      }),
      invalidatesTags: ["WALLET"],
    }),

    AddMoney: builder.mutation({
      query: (walletData) => ({
        url: "/wallet/cash-in",
        method: "POST",
        data: walletData,
      }),
      invalidatesTags: ["WALLET"],
    }),

    getOverview: builder.query({
      query: () => ({
        url: "/wallet/overview",
        method: "GET",
      }),
      providesTags: ["WALLET"],
    }),

    getWalletInfo: builder.query({
      query: () => ({
        url: "/wallet/me",
        method: "GET",
      }),
      providesTags: ["WALLET"],
    }),
  }),
});

export const {
  useSendMoneyMutation,
  useGetWalletInfoQuery,
  useGetOverviewQuery,
  useDepositMoneyMutation,
  useWithdrawMoneyMutation,
  useAddMoneyMutation,
} = walletApi;
