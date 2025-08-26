import type {
  ITransactionQuery,
  ITransactionResponse,
} from "@/components/types/transActionTypes";
import { baseApi } from "@/Redux/baseApi";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyTransactions: builder.query<ITransactionResponse, ITransactionQuery>({
      query: ({ page = 1, limit = 6, type, startDate, endDate }) => ({
        url: "/transaction/my",
        method: "GET",
        params: {
          page,
          limit,
          ...(type ? { type } : {}),
          ...(startDate ? { startDate } : {}),
          ...(endDate ? { endDate } : {}),
        },
      }),
      providesTags: ["TRANSACTIONS"],
    }),
  }),
});

export const { useGetMyTransactionsQuery } = transactionApi;
