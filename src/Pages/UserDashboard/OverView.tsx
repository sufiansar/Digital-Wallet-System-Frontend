import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useGetOverviewQuery } from "@/Redux/features/Wallet/wallet.api";
import Loading from "@/utils/Loading";
import { TransactionsPieChart } from "@/components/modules/TransAcionPieChart/TransactionPieChart";
import {
  Wallet,
  Send,
  ArrowDownToLine,
  ArrowUpFromLine,
  Clock,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

export default function OverView() {
  const { data, isLoading, isError } = useGetOverviewQuery(undefined);
  const navigate = useNavigate();

  if (isLoading)
    return (
      <p className="flex justify-center items-center h-32">
        <Loading />
      </p>
    );
  if (isError)
    return (
      <p className="text-center text-destructive mt-10">
        Failed to fetch wallet overview.
      </p>
    );

  const transactions = data?.data?.recentTransactions || [];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Wallet Overview</h1>
        <p className="text-muted-foreground">
          Manage your finances at a glance
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Wallet Balance Card */}
        <Card className="shadow-lg rounded-2xl border-border bg-card hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Wallet className="h-4 w-4" />
              </div>
              Wallet Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-primary">
              ৳ {data?.data?.balance?.toLocaleString() || 0}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Available balance
            </p>
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card className="shadow-lg rounded-2xl border-border bg-card hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-card-foreground">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button
              onClick={() => navigate("/user/send-money")}
              className="flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              Send Money
            </Button>
            <Button
              onClick={() => navigate("/user/withdraw")}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowUpFromLine className="h-4 w-4" />
              Withdraw
            </Button>
            <Button
              onClick={() => navigate("/user/deposit")}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowDownToLine className="h-4 w-4" />
              Deposit
            </Button>
            <Button
              onClick={() => navigate("/user/transactions")}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Clock className="h-4 w-4" />
              History
            </Button>
          </CardContent>
        </Card>

        {/* Transaction Pie Chart */}
        <TransactionsPieChart transactions={transactions} />

        {/* Recent Transactions Card */}
        <Card className="shadow-lg rounded-2xl md:col-span-2 border-border bg-card hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Clock className="h-5 w-5 text-primary" />
              Recent Transactions
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
                          <p className="font-medium text-foreground">
                            {tx.type}
                          </p>
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
                        {tx.amount?.toLocaleString()}
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
