"use client";

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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useUpdateUserMutation } from "@/Redux/features/user/user.api";
import { toast } from "sonner";
import Loading from "@/utils/Loading";
import { useGetUserInfoQuery } from "@/Redux/features/auth/auth.api";
import { useState } from "react";

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

export function ProfileCard() {
  const [updateProfile, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [open, setOpen] = useState(false);
  const { data: userData } = useGetUserInfoQuery(undefined);

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
      setOpen(false);
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 space-y-4">
      <h2 className="text-xl font-semibold">Profile Information</h2>
      <div className="space-y-1">
        <p>
          <strong>Name:</strong> {userData?.data?.name}
        </p>
        <p>
          <strong>Email:</strong> {userData?.data?.email}
        </p>
        <p>
          <strong>Phone:</strong> {userData?.data?.phone}
        </p>
        <p>
          <strong>Role:</strong> {userData?.data?.role}
        </p>
      </div>

      {/* Update Button + Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-full">Update Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Your Information</DialogTitle>
          </DialogHeader>

          {isUpdating ? (
            <p className="flex justify-center items-center h-32">
              <Loading />
            </p>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
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
                        <Input
                          type="password"
                          placeholder="New Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isUpdating} className="w-full">
                  {isUpdating ? "Updating..." : "Save Changes"}
                </Button>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
