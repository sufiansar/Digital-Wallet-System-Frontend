"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetUserStatsQuery } from "@/Redux/features/stats/stats.api";
import Loading from "@/utils/Loading";
import {
  Wallet,
  Users,
  TrendingUp,
  Activity,
  UserCheck,
  UserX,
  Shield,
  Calendar,
  CreditCard,
  DollarSign,
} from "lucide-react";

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

const StatCard = ({ title, value, icon: Icon, gradient }: any) => (
  <Card className="relative overflow-hidden bg-card border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
    <div
      className={`absolute inset-0 opacity-5 bg-gradient-to-br ${gradient}`}
    />
    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
      <div
        className={`p-2 rounded-lg bg-gradient-to-br ${gradient} group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="h-4 w-4 text-white" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold text-foreground tracking-tight">
        {value?.toLocaleString() || 0}
      </div>
    </CardContent>
  </Card>
);

export default function OverviewDashboard() {
  const { data: stats, isLoading, isError } = useGetUserStatsQuery(undefined);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64">
        <Loading />
      </div>
    );
  if (isError || !stats)
    return (
      <p className="text-center mt-10 text-destructive">Error loading stats.</p>
    );

  const walletRoleData =
    stats?.data?.walletsByRole?.map((w: WalletRole) => ({
      role: w._id,
      wallets: w.count,
    })) || [];

  return (
    <div className="min-h-screen bg-background p-6 space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-2 py-6">
        <h1 className="text-4xl font-extrabold text-foreground-50 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Admin Overview Dashboard
        </h1>
        <p className="text-muted-foreground text-sm">
          Comprehensive analytics and statistics at a glance
        </p>
      </div>

      {/* Wallet Stats Section */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Wallet className="h-5 w-5 text-primary" />
          Wallet Analytics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Wallets"
            value={stats?.data?.totalWallets}
            icon={Wallet}
            gradient="from-blue-500 to-cyan-500"
          />
          <StatCard
            title="Funded Wallets"
            value={stats?.data?.fundedWallets}
            icon={TrendingUp}
            gradient="from-green-500 to-emerald-500"
          />
          <StatCard
            title="Empty Wallets"
            value={stats?.data?.emptyWallets}
            icon={Activity}
            gradient="from-orange-500 to-amber-500"
          />
          <StatCard
            title="Total Users"
            value={stats?.data?.totalUsers}
            icon={Users}
            gradient="from-purple-500 to-pink-500"
          />
        </div>
      </div>

      {/* Wallets by Role Chart */}
      <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="border-b border-border/50">
          <CardTitle className="text-card-foreground flex items-center gap-2">
            <BarChart className="h-5 w-5 text-primary" />
            Wallets Distribution by Role
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {walletRoleData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Activity className="h-12 w-12 text-muted-foreground/30 mb-3" />
              <p className="text-center text-muted-foreground">
                No wallet role data available.
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={walletRoleData}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-border/30"
                />
                <XAxis
                  dataKey="role"
                  className="text-muted-foreground text-xs"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis
                  className="text-muted-foreground text-xs"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                    color: "hsl(var(--card-foreground))",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  cursor={{ fill: "hsl(var(--accent))" }}
                />
                <Bar
                  dataKey="wallets"
                  fill="url(#barGradient)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* User Stats Section */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          User Metrics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <StatCard
            title="Active Users"
            value={stats?.data?.totalActiveUsers}
            icon={UserCheck}
            gradient="from-green-500 to-teal-500"
          />
          <StatCard
            title="Inactive Users"
            value={stats?.data?.totalInActiveUsers}
            icon={UserX}
            gradient="from-gray-500 to-slate-500"
          />
          <StatCard
            title="Blocked Users"
            value={stats?.data?.totalBlockedUsers}
            icon={Shield}
            gradient="from-red-500 to-rose-500"
          />
          <StatCard
            title="New Users (7 Days)"
            value={stats?.data?.newUsersInLast7Days}
            icon={Calendar}
            gradient="from-blue-500 to-indigo-500"
          />
          <StatCard
            title="New Users (30 Days)"
            value={stats?.data?.newUsersInLast30Days}
            icon={Calendar}
            gradient="from-violet-500 to-purple-500"
          />
        </div>
      </div>

      {/* Transaction Stats Section */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          Transaction Overview
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StatCard
            title="Total Transactions"
            value={stats?.data?.totalTransactions}
            icon={CreditCard}
            gradient="from-cyan-500 to-blue-500"
          />
          <StatCard
            title="Total Transaction Volume"
            value={stats?.data?.totalTransactionVolume}
            icon={DollarSign}
            gradient="from-emerald-500 to-green-500"
          />
        </div>
      </div>
    </div>
  );
}
