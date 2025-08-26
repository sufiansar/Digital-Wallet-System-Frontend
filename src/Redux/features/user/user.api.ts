import { baseApi } from "@/Redux/baseApi";

export const usertApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // SendMoney: builder.mutation({
    //   query: (walletData) => ({
    //     url: "/wallet/send-money",
    //     method: "POST",
    //     data: walletData,
    //   }),
    //   invalidatesTags: ["WALLET"],
    // }),
    UpdateUser: builder.mutation({
      query: (payload) => ({
        url: `/user/profile`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: ["USER"],
    }),

    // getOverview: builder.query({
    //   query: () => ({
    //     url: "/wallet/overview",
    //     method: "GET",
    //   }),
    // }),
  }),
});

export const {
  //   useSendMoneyMutation,
  useUpdateUserMutation,
  //   useGetOverviewQuery,
} = usertApi;
