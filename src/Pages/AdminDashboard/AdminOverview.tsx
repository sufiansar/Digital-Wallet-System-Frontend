"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetUserStatsQuery } from "@/Redux/features/stats/stats.api";
import Loading from "@/utils/Loading";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface WalletRole {
  _id: string;
  count: number;
}

// interface OverviewStats {
//   totalWallets: number;
//   fundedWallets: number;
//   emptyWallets: number;
//   walletsByRole: WalletRole[];
//   totalUsers: number;
//   totalAgents: number;
//   totalActiveUsers: number;
//   totalInActiveUsers: number;
//   totalBlockedUsers: number;
//   newUsersInLast7Days: number;
//   newUsersInLast30Days: number;
//   totalTransactions: number;
//   totalTransactionVolume: number;
// }

export default function OverviewDashboard() {
  const { data: stats, isLoading, isError } = useGetUserStatsQuery(undefined);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64">
        <Loading />
      </div>
    );
  if (isError || !stats)
    return <p className="text-center mt-10">Error loading stats.</p>;

  // Prepare data for Bar Chart
  const walletRoleData =
    stats?.data?.walletsByRole?.map((w: WalletRole) => ({
      role: w._id,
      wallets: w.count,
    })) || [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Admin Overview Dashboard
      </h1>

      {/* Wallet Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Wallets</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {stats?.data?.totalWallets}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Funded Wallets</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {stats?.data?.fundedWallets}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Empty Wallets</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {stats?.data?.emptyWallets}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {stats?.data?.totalUsers}
          </CardContent>
        </Card>
      </div>

      {/* Wallets by Role Bar Chart */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Wallets by Role</CardTitle>
        </CardHeader>
        <CardContent>
          {walletRoleData.length === 0 ? (
            <p className="text-center text-gray-500">
              No wallet role data available.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={walletRoleData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="role" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="wallets" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* User Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {stats?.data?.totalActiveUsers}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Inactive Users</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {stats?.data?.totalInActiveUsers}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Blocked Users</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {stats?.data?.totalBlockedUsers}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>New Users Last 7 Days</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {stats?.data?.newUsersInLast7Days}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>New Users Last 30 Days</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {stats?.data?.newUsersInLast30Days}
          </CardContent>
        </Card>
      </div>

      {/* Transaction Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Transactions</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {stats?.data?.totalTransactions}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Transaction Volume</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {stats?.data?.totalTransactionVolume}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
