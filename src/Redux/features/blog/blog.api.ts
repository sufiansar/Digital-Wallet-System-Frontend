import { baseApi } from "@/Redux/baseApi";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: () => ({
        url: "/blog",
        method: "GET",
      }),
      providesTags: ["BLOGS"],
    }),

    getBlogById: builder.query({
      query: (id: string) => ({
        url: `/blog/${id}`,
        method: "GET",
      }),
      providesTags: ["BLOGS"],
    }),

    createBlog: builder.mutation({
      query: (formData: FormData) => ({
        url: "/blog",
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["BLOGS"],
    }),

    updateBlog: builder.mutation({
      query: ({ id, data }: { id: string; data: FormData | object }) => ({
        url: `/blog/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["BLOGS"],
    }),

    deleteBlog: builder.mutation({
      query: (id: string) => ({
        url: `/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BLOGS"],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
