import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useGetOverviewQuery } from "@/Redux/features/Wallet/wallet.api";
import Loading from "@/utils/Loading";
import { TransactionsPieChart } from "@/components/modules/TransAcionPieChart/TransactionPieChart";

export default function OverView() {
  const { data, isLoading, isError } = useGetOverviewQuery(undefined);
  const navigate = useNavigate();

  if (isLoading)
    return (
      <p className="flex justify-center items-center h-32">
        <Loading />
      </p>
    );
  if (isError) return <p>Failed to fetch wallet overview.</p>;

  const transactions = data?.data?.recentTransactions || [];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>Wallet Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">৳ {data?.data?.balance}</p>
        </CardContent>
      </Card>

      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button onClick={() => navigate("/user/send-money")}>
            Send Money
          </Button>
          <Button onClick={() => navigate("/user/withdraw")}>Withdraw</Button>
          <Button onClick={() => navigate("/user/deposit")}>Deposit</Button>
          <Button onClick={() => navigate("/user/transactions")}>
            History
          </Button>
        </CardContent>
      </Card>

      <TransactionsPieChart transactions={transactions} />

      <Card className="shadow-lg rounded-2xl md:col-span-2">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
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
