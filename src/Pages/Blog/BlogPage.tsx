import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetAllBlogsQuery } from "@/Redux/features/blog/blog.api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, Eye, ChevronDown, ChevronUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const BlogListPage = () => {
  const { data: blogs, isLoading } = useGetAllBlogsQuery({});
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  const [expandedBlogs, setExpandedBlogs] = useState<Set<string>>(new Set());

  const toggleExpand = (blogId: string) => {
    const newExpanded = new Set(expandedBlogs);
    if (newExpanded.has(blogId)) {
      newExpanded.delete(blogId);
    } else {
      newExpanded.add(blogId);
    }
    setExpandedBlogs(newExpanded);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br  ">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Blog Articles
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Discover insightful articles and stories from our community
          </p>
        </div>

        {blogs?.data?.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="text-muted-foreground mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Articles Yet
              </h3>
              <p className="text-muted-foreground">
                Be the first to share your thoughts and stories!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs?.data?.map((blog: any) => (
              <Card
                key={blog._id}
                className="backdrop-blur-sm border hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden group"
              >
                {blog.coverImage && (
                  <div className="relative overflow-hidden">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                )}

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg md:text-xl font-bold line-clamp-2">
                    {blog.title}
                  </CardTitle>

                  <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" />
                      <span>
                        {formatDate(blog.createdAt || blog.updatedAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{getReadingTime(blog.content)} min read</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {blog.tags?.map((tag: string, index: number) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <p
                      className={`text-muted-foreground transition-all duration-300 ${
                        expandedBlogs.has(blog._id)
                          ? "line-clamp-none"
                          : "line-clamp-3"
                      }`}
                    >
                      {blog.content}
                    </p>
                    {blog.content.length > 150 && (
                      <Button
                        variant="link"
                        className="p-0 h-auto mt-2"
                        onClick={() => toggleExpand(blog._id)}
                      >
                        {expandedBlogs.has(blog._id) ? (
                          <>
                            <ChevronUp className="h-4 w-4 mr-1" />
                            Show Less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4 mr-1" />
                            Read More
                          </>
                        )}
                      </Button>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => setSelectedBlog(blog)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Details Dialog */}
      <Dialog
        open={!!selectedBlog}
        onOpenChange={(open) => !open && setSelectedBlog(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedBlog && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {selectedBlog.title}
                </DialogTitle>
                <DialogDescription className="flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    {formatDate(
                      selectedBlog.createdAt || selectedBlog.updatedAt
                    )}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {getReadingTime(selectedBlog.content)} min read
                  </span>
                </DialogDescription>
              </DialogHeader>

              {selectedBlog.coverImage && (
                <div className="relative mt-4">
                  <img
                    src={selectedBlog.coverImage}
                    alt={selectedBlog.title}
                    className="w-full h-64 md:h-80 object-cover rounded-lg"
                  />
                </div>
              )}

              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedBlog.tags?.map((tag: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-foreground">
                    Content
                  </h4>
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="whitespace-pre-wrap leading-relaxed text-foreground">
                      {selectedBlog.content}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedBlog(null)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogListPage;
