import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useUpdateUserMutation } from "@/Redux/features/user/user.api";
import { toast } from "sonner";
import Loading from "@/utils/Loading";

const profileSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  password: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(
          val
        ),
      "Password must be at least 6 characters and include letters, numbers, and a special character"
    ),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const [updateProfile, { isLoading: isUpdating }] = useUpdateUserMutation();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (values: ProfileFormValues) => {
    const payload = Object.fromEntries(
      Object.entries(values).filter(([_, v]) => v !== "")
    );

    try {
      await updateProfile(payload).unwrap();
      toast.success("Profile updated successfully");
      form.reset();
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  if (isUpdating)
    return (
      <p className="flex justify-center items-center h-32">
        <Loading />
      </p>
    );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 max-w-md mx-auto"
      >
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Phone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password </FormLabel>
              <FormControl>
                <Input type="password" placeholder="New Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isUpdating} className="w-full">
          {isUpdating ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </Form>
  );
}
