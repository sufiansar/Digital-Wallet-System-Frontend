import { useState } from "react";
import { toast } from "sonner";
import { useCreateBlogMutation } from "@/Redux/features/blog/blog.api";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface CreateBlogProps {
  onSuccess?: () => void;
}

const CreateBlog: React.FC<CreateBlogProps> = ({ onSuccess }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [published, setPublished] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [createBlog, { isLoading }] = useCreateBlogMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a cover image");
      return;
    }

    const payload = {
      title,
      content,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      published,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));
    formData.append("coverImage", file);

    try {
      await createBlog(formData).unwrap();
      toast.success("Blog created successfully!");

      // reset form
      setTitle("");
      setContent("");
      setTags("");
      setPublished(false);
      setFile(null);

      onSuccess && onSuccess();
    } catch (err: any) {
      toast.error(err?.data?.message || "Error creating blog");
    }
  };

  return (
    <Card className="dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl">Create Blog</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="published"
              checked={published}
              onCheckedChange={(checked) => setPublished(Boolean(checked))}
            />
            <Label htmlFor="published">Published</Label>
          </div>

          <div>
            <Label htmlFor="coverImage">Cover Image</Label>
            <Input
              id="coverImage"
              type="file"
              accept="image/*"
              onChange={(e) => {
                e.target.files && setFile(e.target.files[0]);
              }}
              required
            />
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Blog"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateBlog;
