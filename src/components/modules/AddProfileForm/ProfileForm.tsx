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
import {
  useChangePasswordMutation,
  useGetUserInfoQuery,
} from "@/Redux/features/auth/auth.api";
import { toast } from "sonner";
import Loading from "@/utils/Loading";
import { useState } from "react";
import Password from "@/components/ui/Password";

const profileSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
});

const passwordSchema = z.object({
  oldPassword: z.string().min(6, "Old password is required"),
  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .refine(
      (val) =>
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(
          val
        ),
      "Password must include letters, numbers, and a special character"
    ),
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

export function ProfileCard() {
  const [updateProfile, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [changePasswordMutation, { isLoading: isChanging }] =
    useChangePasswordMutation();
  const { data: userData } = useGetUserInfoQuery(undefined);

  const [openProfile, setOpenProfile] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "", phone: "" },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { oldPassword: "", newPassword: "" },
  });

  const handleProfileSubmit = async (values: ProfileFormValues) => {
    const payload = Object.fromEntries(
      Object.entries(values).filter(([_, v]) => v !== "")
    );
    try {
      await updateProfile(payload).unwrap();
      toast.success("Profile updated successfully");
      profileForm.reset();
      setOpenProfile(false);
    } catch {
      toast.error("Failed to update profile");
    }
  };

  const handlePasswordSubmit = async (values: PasswordFormValues) => {
    try {
      await changePasswordMutation(values).unwrap();
      toast.success("Password changed successfully");
      passwordForm.reset();
      setOpenPassword(false);
    } catch {
      toast.error("Failed to change password");
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

      <Dialog open={openProfile} onOpenChange={setOpenProfile}>
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
            <Form {...profileForm}>
              <form
                onSubmit={profileForm.handleSubmit(handleProfileSubmit)}
                className="space-y-3"
              >
                <FormField
                  control={profileForm.control}
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
                <FormField
                  control={profileForm.control}
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
                <Button type="submit" className="w-full" disabled={isUpdating}>
                  {isUpdating ? "Updating..." : "Save Changes"}
                </Button>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={openPassword} onOpenChange={setOpenPassword}>
        <DialogTrigger asChild>
          <Button variant="secondary" className="w-full">
            Change Password
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          {isChanging ? (
            <p className="flex justify-center items-center h-32">
              <Loading />
            </p>
          ) : (
            <Form {...passwordForm}>
              <form
                onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
                className="space-y-3"
              >
                <FormField
                  control={passwordForm.control}
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Old Password</FormLabel>
                      <FormControl>
                        <Password {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Password {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isChanging}>
                  {isChanging ? "Changing..." : "Change Password"}
                </Button>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
