import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Loading from "@/utils/Loading";
import {
  useBlockUserMutation,
  useUnblockUserMutation,
  useGetUserAllQuery,
} from "@/Redux/features/user/user.api";
import type { IUser } from "@/components/types/index.type";
import { toast } from "sonner";
import {
  Users,
  Shield,
  ShieldOff,
  UserCheck,
  UserX,
  Calendar,
  Phone,
  User,
  Crown,
} from "lucide-react";

export default function ManageUsers() {
  const { data: users, isLoading } = useGetUserAllQuery(undefined);
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  const handleBlockUnblock = async (user: IUser) => {
    const currentStatus = user.isActive;
    if (user.role === "ADMIN") {
      toast.error("You cannot block or unblock an admin user");
      return;
    }
    setLoadingUserId(user?._id || null);
    try {
      if (currentStatus === "ACTIVE") {
        await blockUser({ phone: user.phone });
        toast.success(
          `User ${user.phone} status changed from ${currentStatus} to BLOCKED`
        );
      } else {
        await unblockUser({ phone: user.phone });
        toast.success(
          `User ${user.phone} status changed from BLOCKED to ${currentStatus}`
        );
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoadingUserId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<
      string,
      { variant: any; icon: any; className: string }
    > = {
      ACTIVE: {
        variant: "default" as const,
        icon: UserCheck,
        className:
          "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 hover:bg-green-500/20",
      },
      INACTIVE: {
        variant: "secondary" as const,
        icon: UserX,
        className:
          "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/20",
      },
      BLOCKED: {
        variant: "destructive" as const,
        icon: Shield,
        className:
          "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 hover:bg-red-500/20",
      },
    };

    const config = variants[status] || {
      variant: "outline" as const,
      icon: User,
      className: "",
    };
    const Icon = config.icon;

    return (
      <Badge
        variant={config.variant}
        className={`${config.className} font-medium flex items-center gap-1 w-fit`}
      >
        <Icon className="h-3 w-3" />
        {status || "UNKNOWN"}
      </Badge>
    );
  };

  const getRoleBadge = (role: string) => {
    if (role === "ADMIN") {
      return (
        <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 hover:bg-purple-500/20 font-medium flex items-center gap-1 w-fit">
          <Crown className="h-3 w-3" />
          {role}
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="font-medium">
        {role || "N/A"}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (!users?.data || users.data.length === 0) {
    return (
      <div className="p-6 min-h-screen bg-background">
        <Card className="max-w-2xl mx-auto border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl text-foreground">
                  Manage Users
                </CardTitle>
                <CardDescription>No users found in the system</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Users className="h-16 w-16 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground text-lg">
                No users available to display
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const activeUsers = users.data.filter(
    (u: IUser) => u.isActive === "ACTIVE"
  ).length;
  const blockedUsers = users.data.filter(
    (u: IUser) => u.isActive === "BLOCKED"
  ).length;
  const inactiveUsers = users.data.filter(
    (u: IUser) => u.isActive === "INACTIVE"
  ).length;

  return (
    <div className="p-6 min-h-screen bg-background space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
              <Users className="h-6 w-6 text-white" />
            </div>
            Manage Users
          </h1>
          <p className="text-muted-foreground">
            View and manage all registered users in the system
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Users
                </p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {users.data.length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                <Users className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active Users
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                  {activeUsers}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                <UserCheck className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Inactive Users
                </p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">
                  {inactiveUsers}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-500">
                <UserX className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Blocked Users
                </p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">
                  {blockedUsers}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-red-500 to-rose-500">
                <Shield className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="bg-card border-border shadow-lg">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-foreground font-semibold">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Name
                    </div>
                  </TableHead>
                  <TableHead className="text-foreground font-semibold">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone
                    </div>
                  </TableHead>
                  <TableHead className="text-foreground font-semibold">
                    <div className="flex items-center gap-2">
                      <Crown className="h-4 w-4" />
                      Role
                    </div>
                  </TableHead>
                  <TableHead className="text-foreground font-semibold">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Status
                    </div>
                  </TableHead>
                  <TableHead className="text-foreground font-semibold">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Joined
                    </div>
                  </TableHead>
                  <TableHead className="text-foreground font-semibold">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.data.map((user: IUser) => (
                  <TableRow
                    key={user._id}
                    className="border-border hover:bg-accent/50 transition-colors"
                  >
                    <TableCell className="font-medium text-foreground">
                      {user.name || "N/A"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.phone || "N/A"}
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>
                      {getStatusBadge(user.isActive || "UNKNOWN")}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant={
                          user.isActive === "BLOCKED"
                            ? "outline"
                            : "destructive"
                        }
                        onClick={() => handleBlockUnblock(user)}
                        disabled={
                          loadingUserId === user._id ||
                          !user.phone ||
                          (user.isActive !== "ACTIVE" &&
                            user.isActive !== "BLOCKED")
                        }
                        className={`gap-2 ${
                          user.isActive === "BLOCKED"
                            ? "hover:bg-green-500/10 hover:text-green-600 dark:hover:text-green-400 hover:border-green-500/50"
                            : ""
                        }`}
                      >
                        {loadingUserId === user._id ? (
                          <>
                            <div className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            Updating...
                          </>
                        ) : user.isActive === "BLOCKED" ? (
                          <>
                            <ShieldOff className="h-3 w-3" />
                            Unblock
                          </>
                        ) : user.isActive === "ACTIVE" ? (
                          <>
                            <Shield className="h-3 w-3" />
                            Block
                          </>
                        ) : (
                          "N/A"
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
