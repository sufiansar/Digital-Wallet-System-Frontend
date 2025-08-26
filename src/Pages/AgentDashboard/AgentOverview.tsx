"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetOverviewQuery } from "@/Redux/features/Wallet/wallet.api";
import Loading from "@/utils/Loading";
import { format } from "date-fns";

export default function AgentOverview() {
  const { data, isLoading, isError } = useGetOverviewQuery(undefined);

  if (isLoading)
    return (
      <p className="flex justify-center items-center h-32">
        <Loading />
      </p>
    );

  if (isError) return <p>Failed to fetch wallet overview.</p>;

  const transactions = data?.data?.recentTransactions || [];
  const balance = data?.data?.balance || 0;

  const cashIn = transactions
    .filter((item: any) => item.type === "deposit" || item.type === "cash-in")
    .reduce((acc: number, item: any) => acc + item.amount, 0);

  const cashOut = transactions
    .filter(
      (item: any) => item.type === "withdrawal" || item.type === "cash-out"
    )
    .reduce((acc: number, item: any) => acc + item.amount, 0);

  return (
    <div className="grid gap-6">
      {/* Wallet Balance */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>Wallet Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">৳ {balance}</p>
        </CardContent>
      </Card>

      {/* Cash-in / Cash-out Summary */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>Cash Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <div className="text-green-600 font-semibold">
              Cash In: ৳ {cashIn}
            </div>
            <div className="text-red-600 font-semibold">
              Cash Out: ৳ {cashOut}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length ? (
            <ul className="space-y-2">
              {transactions.map((item: any) => (
                <li
                  key={item._id}
                  className="flex justify-between bg-muted p-2 rounded"
                >
                  <div>
                    <span className="capitalize">
                      {item.type.replace("-", " ")}
                    </span>{" "}
                    {item.sender === item.receiver
                      ? ""
                      : item.sender === data.userId
                      ? "→ " + item.receiver?.name
                      : "← " + item.sender?.name}
                  </div>
                  <div>৳ {item.amount}</div>
                  <div className="text-xs text-gray-500">
                    {format(new Date(item.createdAt), "dd MMM yyyy")}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No recent activity.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
