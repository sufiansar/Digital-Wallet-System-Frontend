"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetOverviewQuery } from "@/Redux/features/Wallet/wallet.api";
import Loading from "@/utils/Loading";
import { format } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  Wallet,
  Clock,
  TrendingUp,
  TrendingDown,
  ArrowDownToLine,
} from "lucide-react";

export default function AgentOverview() {
  const { data, isLoading } = useGetOverviewQuery(undefined);

  if (isLoading)
    return (
      <p className="flex justify-center items-center h-32">
        <Loading />
      </p>
    );

  const transactions = data?.data?.recentTransactions || [];
  const balance = data?.data?.balance || 0;

  const chartData = Object.values(
    transactions.reduce((acc: any, item: any) => {
      const date = format(new Date(item.createdAt), "dd MMM");
      if (!acc[date]) {
        acc[date] = {
          date,
          deposit: 0,
          withdrawal: 0,
          cashIn: 0,
          cashOut: 0,
          commission: 0,
        };
      }

      switch (item.type) {
        case "deposit":
          acc[date].deposit += item.amount;
          break;
        case "withdrawal":
          acc[date].withdrawal += item.amount;
          break;
        case "cash-in":
          acc[date].cashIn += item.amount;
          break;
        case "cash-out":
          acc[date].cashOut += item.amount;
          break;
        case "commission":
          acc[date].commission += item.amount;
          break;
        default:
          break;
      }

      return acc;
    }, {})
  );

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Agent Overview</h1>
        <p className="text-muted-foreground">
          Monitor wallet performance and activity
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Wallet Balance */}
        <Card className="shadow-lg rounded-2xl border-border bg-card hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Wallet className="h-4 w-4" />
              </div>
              Wallet Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">
              ৳ {balance.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Available balance
            </p>
          </CardContent>
        </Card>

        {/* Transaction Chart */}
        <Card className="shadow-lg rounded-2xl border-border bg-card md:col-span-2 lg:col-span-3 hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Transaction Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            {chartData.length ? (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="deposit" fill="#3b82f6" name="Deposit" />
                  <Bar dataKey="withdrawal" fill="#f97316" name="Withdrawal" />
                  <Bar dataKey="cashIn" fill="#16a34a" name="Cash In" />
                  <Bar dataKey="cashOut" fill="#dc2626" name="Cash Out" />
                  <Bar dataKey="commission" fill="#eab308" name="Commission" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-muted-foreground">
                No transaction data available.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-lg rounded-2xl border-border bg-card md:col-span-2 lg:col-span-3 hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {transactions.length ? (
              <ul className="space-y-3">
                {transactions.map((tx: any) => {
                  const isSent = tx.sender === data.userId;
                  const isReceived = !isSent && tx.sender !== tx.receiver;

                  return (
                    <li
                      key={tx._id}
                      className="flex items-center justify-between bg-accent/50 p-4 rounded-lg hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-full ${
                            isSent
                              ? "bg-destructive/10 text-destructive"
                              : isReceived
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {isSent ? (
                            <TrendingDown className="h-4 w-4" />
                          ) : isReceived ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <ArrowDownToLine className="h-4 w-4" />
                          )}
                        </div>

                        <div>
                          <p className="font-medium capitalize">{tx.type}</p>
                          <p className="text-sm text-muted-foreground">
                            {tx.sender === tx.receiver
                              ? "Self transaction"
                              : isSent
                              ? `To ${tx.receiver}`
                              : `From ${tx.sender}`}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`text-lg font-semibold ${
                          isSent
                            ? "text-destructive"
                            : isReceived
                            ? "text-primary"
                            : "text-foreground"
                        }`}
                      >
                        {isSent ? "-" : isReceived ? "+" : ""}৳{" "}
                        {tx.amount.toLocaleString()}
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground">No recent transactions.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
