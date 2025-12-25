"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetBlogByIdQuery } from "@/Redux/features/blog/blog.api";
import { useParams } from "react-router";

const BlogDetailsPage = () => {
  const { id } = useParams(); // get blog ID from URL
  const { data: blog, isLoading, isError } = useGetBlogByIdQuery(id!);

  if (isLoading) return <p className="text-center p-6">Loading blog...</p>;
  if (isError || !blog)
    return <p className="text-center p-6 text-red-500">Blog not found</p>;

  return (
    <div className="container mx-auto p-6">
      <Card className="dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl">{blog.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {blog.coverImage && (
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full max-h-96 object-cover rounded"
            />
          )}
          <p className="text-gray-700 dark:text-gray-300">{blog.content}</p>
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {blog.tags.map((tag: string, idx: number) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogDetailsPage;
