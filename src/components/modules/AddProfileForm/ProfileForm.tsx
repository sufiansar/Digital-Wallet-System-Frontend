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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useUpdateUserMutation } from "@/Redux/features/user/user.api";
import {
  useChangePasswordMutation,
  useGetUserInfoQuery,
} from "@/Redux/features/auth/auth.api";
import { toast } from "sonner";
import Loading from "@/utils/Loading";
import { useState } from "react";
import Password from "@/components/ui/Password";
import {
  User,
  Mail,
  Phone,
  Shield,
  Edit,
  Key,
  Crown,
  UserCog,
} from "lucide-react";

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

  const getRoleBadge = (role: string) => {
    if (role === "ADMIN") {
      return (
        <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 font-medium flex items-center gap-1 w-fit">
          <Crown className="h-3 w-3" />
          {role}
        </Badge>
      );
    }
    if (role === "AGENT") {
      return (
        <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 font-medium flex items-center gap-1 w-fit">
          <UserCog className="h-3 w-3" />
          {role}
        </Badge>
      );
    }
    return (
      <Badge
        variant="outline"
        className="font-medium flex items-center gap-1 w-fit"
      >
        <User className="h-3 w-3" />
        {role}
      </Badge>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="bg-card border-border">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-xl text-foreground">
            Profile Information
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {/* Profile Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-border">
              <User className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium text-foreground">
                  {userData?.data?.name || "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 pb-3 border-b border-border">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-foreground break-all">
                  {userData?.data?.email || "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 pb-3 border-b border-border">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium text-foreground">
                  {userData?.data?.phone || "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 pb-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Role</p>
                {getRoleBadge(userData?.data?.role)}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Dialog open={openProfile} onOpenChange={setOpenProfile}>
              <DialogTrigger asChild>
                <Button className="flex-1 gap-2">
                  <Edit className="h-4 w-4" />
                  Update Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-card border-border">
                <DialogHeader>
                  <DialogTitle className="text-foreground">
                    Update Your Information
                  </DialogTitle>
                </DialogHeader>
                {isUpdating ? (
                  <div className="flex justify-center items-center h-32">
                    <Loading />
                  </div>
                ) : (
                  <Form {...profileForm}>
                    <form
                      onSubmit={profileForm.handleSubmit(handleProfileSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={profileForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">
                              Full Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your name"
                                {...field}
                                className="bg-background border-border"
                              />
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
                            <FormLabel className="text-foreground">
                              Phone Number
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your phone number"
                                {...field}
                                className="bg-background border-border"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isUpdating}
                      >
                        {isUpdating ? "Updating..." : "Save Changes"}
                      </Button>
                    </form>
                  </Form>
                )}
              </DialogContent>
            </Dialog>

            <Dialog open={openPassword} onOpenChange={setOpenPassword}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="flex-1 gap-2 border-border"
                >
                  <Key className="h-4 w-4" />
                  Change Password
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-card border-border">
                <DialogHeader>
                  <DialogTitle className="text-foreground">
                    Change Password
                  </DialogTitle>
                </DialogHeader>
                {isChanging ? (
                  <div className="flex justify-center items-center h-32">
                    <Loading />
                  </div>
                ) : (
                  <Form {...passwordForm}>
                    <form
                      onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={passwordForm.control}
                        name="oldPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">
                              Old Password
                            </FormLabel>
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
                            <FormLabel className="text-foreground">
                              New Password
                            </FormLabel>
                            <FormControl>
                              <Password {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isChanging}
                      >
                        {isChanging ? "Changing..." : "Change Password"}
                      </Button>
                    </form>
                  </Form>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
