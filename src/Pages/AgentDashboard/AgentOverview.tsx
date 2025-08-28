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
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Wallet Balance */}
      <Card className="shadow-lg rounded-2xl col-span-1">
        <CardHeader>
          <CardTitle>Wallet Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-primary">৳ {balance}</p>
        </CardContent>
      </Card>

      {/* Transaction Types Chart */}
      <Card className="shadow-lg rounded-2xl col-span-1 md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>Transaction Breakdown</CardTitle>
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
            <p className="text-gray-500">No transaction data for chart.</p>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-lg rounded-2xl col-span-1 md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length ? (
            <ul className="space-y-2">
              {transactions.map((tx: any) => (
                <li
                  key={tx._id}
                  className="flex justify-between bg-muted p-2 rounded"
                >
                  <div>
                    {tx.type}{" "}
                    {tx.sender === tx.receiver
                      ? ""
                      : tx.sender === data.userId
                      ? "→ " + tx.receiver
                      : "← " + tx.sender}
                  </div>
                  <div>৳ {tx.amount}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No recent transactions.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
