"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loading from "@/utils/Loading";
import { useGetOverviewQuery } from "@/Redux/features/Wallet/wallet.api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { useGetUserStatsQuery } from "@/Redux/features/stats/stats.api";

const COLORS = ["#2563eb", "#16a34a", "#16a34a", "#dc2626"];

export default function AdminOverview() {
  const {
    data: userStats,
    isLoading: loadingUsers,
    isError: userError,
  } = useGetUserStatsQuery(undefined);

  console.log(userStats);
  const {
    data: walletOverview,
    isLoading: loadingWallet,
    isError: walletError,
  } = useGetOverviewQuery(undefined);

  if (loadingUsers || loadingWallet)
    return (
      <p className="flex justify-center items-center h-32">
        <Loading />
      </p>
    );
  if (userError || walletError) return <p>Failed to load dashboard data.</p>;

  // Prepare Pie Chart Data (Users by Role)
  const userRolesData =
    userStats?.usersByRole?.map((r: any) => ({
      name: r._id,
      value: r.count,
    })) || [];

  const transactionData = [
    {
      name: "Wallet",
      count: walletOverview?.data?.recentTransactions?.length || 0,
      volume:
        walletOverview?.data?.recentTransactions?.reduce(
          (acc: number, tx: any) => acc + tx.amount,
          0
        ) || 0,
    },
  ];
  console.log(transactionData);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Total Users */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{userStats?.totalUsers}</p>
        </CardContent>
      </Card>

      {/* Active Users */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>Active Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{userStats?.totalActiveUsers}</p>
        </CardContent>
      </Card>

      {/* Blocked Users */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>Blocked Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{userStats?.totalBlockedUsers}</p>
        </CardContent>
      </Card>

      {/* User Roles Pie Chart */}
      <Card className="shadow-lg rounded-2xl md:col-span-2">
        <CardHeader>
          <CardTitle>Users by Role</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={userRolesData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={(entry) => `${entry.name}: ${entry.value}`}
              >
                {userRolesData.map((_entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Transactions Bar Chart */}
      <Card className="shadow-lg rounded-2xl md:col-span-2">
        <CardHeader>
          <CardTitle>Transactions Overview</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={transactionData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value: number) => `৳ ${value}`} />
              <Legend />
              <Bar dataKey="count" fill="#2563eb" name="Transaction Count" />
              <Bar dataKey="volume" fill="#16a34a" name="Transaction Volume" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="shadow-lg rounded-2xl md:col-span-3">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {walletOverview?.data?.recentTransactions?.length ? (
            <table className="w-full table-auto border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border p-2">Type</th>
                  <th className="border p-2">From</th>
                  <th className="border p-2">To</th>
                  <th className="border p-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {walletOverview?.data?.recentTransactions?.map((tx: any) => (
                  <tr key={tx._id}>
                    <td className="border p-2">{tx.type}</td>
                    <td className="border p-2">{tx.sender}</td>
                    <td className="border p-2">{tx.receiver}</td>
                    <td className="border p-2">৳ {tx.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No recent transactions.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
