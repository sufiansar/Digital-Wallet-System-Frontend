import { baseApi } from "@/Redux/baseApi";

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserStats: builder.query({
      query: () => ({
        url: "/stats/user-stats",
        method: "GET",
      }),
    }),

    getWalletStats: builder.query({
      query: () => ({
        url: "/stats/wallet-stats",
        method: "GET",
      }),
    }),

    getTransactionStats: builder.query({
      query: () => ({
        url: "/stats/transaction-stats",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetUserStatsQuery,
  useGetWalletStatsQuery,
  useGetTransactionStatsQuery,
} = statsApi;
