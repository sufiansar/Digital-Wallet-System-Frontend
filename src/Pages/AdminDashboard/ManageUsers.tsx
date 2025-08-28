
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
import Loading from "@/utils/Loading";
import {
  useBlockUserMutation,
  useUnblockUserMutation,
  useGetUserAllQuery,
} from "@/Redux/features/user/user.api";
import type { IUser } from "@/components/types/index.type";
import { toast } from "sonner";

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

  if (isLoading) return <Loading />;

  if (!users?.data || users.data.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
        <p>No users found.</p>
      </div>
    );
  }

  if (isLoading) return <Loading />;

  if (!users?.data || users.data.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
        <p>No users found.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.data.map((user: IUser) => (
            <TableRow key={user._id}>
              <TableCell>{user.name || "N/A"}</TableCell>
              <TableCell>{user.phone || "N/A"}</TableCell>
              <TableCell>{user.role || "N/A"}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded text-white font-medium ${
                    user.isActive === "BLOCKED"
                      ? "bg-red-500"
                      : user.isActive === "INACTIVE"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                >
                  {user.isActive || "UNKNOWN"}
                </span>
              </TableCell>
              <TableCell>
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant={
                    user.isActive === "BLOCKED" ? "secondary" : "destructive"
                  }
                  onClick={() => handleBlockUnblock(user)}
                  disabled={
                    loadingUserId === user._id ||
                    !user.phone ||
                    (user.isActive !== "ACTIVE" && user.isActive !== "BLOCKED")
                  }
                >
                  {loadingUserId === user._id
                    ? "Updating..."
                    : user.isActive === "BLOCKED"
                    ? "Unblock"
                    : user.isActive === "ACTIVE"
                    ? "Block"
                    : "N/A"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
