import { baseApi } from "@/Redux/baseApi";

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserStats: builder.query({
      query: () => ({
        url: "/stats/user-stats",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserStatsQuery } = statsApi;
