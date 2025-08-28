import { baseApi } from "@/Redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    UpdateUser: builder.mutation({
      query: (payload) => ({
        url: `/user/profile`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: ["USER"],
    }),
    blockUser: builder.mutation<any, { phone: string }>({
      query: ({ phone }) => ({
        url: `/user/block-user/${phone}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),
    unblockUser: builder.mutation<any, { phone: string }>({
      query: ({ phone }) => ({
        url: `/user/unblock-user/${phone}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),

    approveAgent: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/user/approve-agent/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),
    suspendAgent: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/user/suspend-agent/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),

    getAllAgents: builder.query({
      query: () => ({
        url: "/user/agents",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    getUserAll: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
  }),
});

export const {
  useGetUserAllQuery,
  useUpdateUserMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
  useGetAllAgentsQuery,
  useApproveAgentMutation,
  useSuspendAgentMutation,
} = userApi;
