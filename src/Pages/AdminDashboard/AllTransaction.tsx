"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetAllTransactionsQuery } from "@/Redux/features/Transaction/transaction.api";
import type { ITransaction } from "@/components/types/transActionTypes";
import {
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  RefreshCw,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Calendar,
  DollarSign,
  TrendingUp,
  Activity,
  Send,
  Download,
  Upload,
  Percent,
} from "lucide-react";

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [filters, setFilters] = useState({});

  useEffect(() => {
    setFilters({
      search,
      status,
      type,
      minAmount,
      maxAmount,
      page,
      limit: 6,
    });
  }, [search, status, type, minAmount, maxAmount, page]);

  const { data, isLoading } = useGetAllTransactionsQuery(filters, {
    refetchOnMountOrArgChange: true,
  });

  const transactions: ITransaction[] = data?.data?.transactions || [];
  const meta = data?.data?.meta;
  const handlePrev = () => page > 1 && setPage(page - 1);
  const handleNext = () => page < meta?.totalPage && setPage(page + 1);

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { className: string }> = {
      pending: {
        className:
          "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/20",
      },
      completed: {
        className:
          "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 hover:bg-green-500/20",
      },
      reversed: {
        className:
          "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 hover:bg-red-500/20",
      },
    };

    const config = statusConfig[status.toLowerCase()] || {
      className: "bg-muted",
    };

    return (
      <Badge className={`${config.className} font-medium capitalize`}>
        {status}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const typeConfig: Record<string, { icon: any; className: string }> = {
      sendmoney: {
        icon: Send,
        className:
          "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
      },
      "cash-in": {
        icon: ArrowDownLeft,
        className:
          "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
      },
      "cash-out": {
        icon: ArrowUpRight,
        className:
          "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
      },
      withdrawal: {
        icon: Upload,
        className:
          "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
      },
      deposit: {
        icon: Download,
        className:
          "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
      },
      commission: {
        icon: Percent,
        className:
          "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
      },
    };

    const config = typeConfig[type.toLowerCase()] || {
      icon: Activity,
      className: "bg-muted",
    };
    const Icon = config.icon;

    return (
      <Badge
        className={`${config.className} font-medium capitalize flex items-center gap-1 w-fit`}
      >
        <Icon className="h-3 w-3" />
        {type.replace("-", " ")}
      </Badge>
    );
  };

  // Calculate stats
  const totalAmount = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);
  const completedTransactions = transactions.filter(
    (t) => t.status === "completed"
  ).length;
  const pendingTransactions = transactions.filter(
    (t) => t.status === "pending"
  ).length;

  return (
    <div className="p-6 min-h-screen bg-background space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            Transactions
          </h1>
          <p className="text-muted-foreground">
            Monitor and manage all transaction activities
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
                  Total Transactions
                </p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {transactions.length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                <Activity className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Completed
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                  {completedTransactions}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Pending
                </p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">
                  {pendingTransactions}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-500">
                <RefreshCw className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Amount
                </p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  ${totalAmount.toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters Section */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            Filters
          </CardTitle>
          <CardDescription>Search and filter transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by type/status..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 bg-background border-border"
                />
              </div>
            </div>

            <div className="w-40">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Status
              </label>
              <Select
                onValueChange={(v) => setStatus(v === "all" ? "" : v)}
                value={status || "all"}
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="reversed">Reversed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-40">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Type
              </label>
              <Select
                onValueChange={(v) => setType(v === "all" ? "" : v)}
                value={type || "all"}
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="sendmoney">Send Money</SelectItem>
                  <SelectItem value="cash-in">Cash In</SelectItem>
                  <SelectItem value="cash-out">Cash Out</SelectItem>
                  <SelectItem value="withdrawal">Withdrawal</SelectItem>
                  <SelectItem value="deposit">Deposit</SelectItem>
                  <SelectItem value="commission">Commission</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-32">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Min Amount
              </label>
              <Input
                type="number"
                placeholder="Min"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
                className="bg-background border-border"
              />
            </div>

            <div className="w-32">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Max Amount
              </label>
              <Input
                type="number"
                placeholder="Max"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
                className="bg-background border-border"
              />
            </div>

            <Button onClick={() => setPage(1)} className="gap-2">
              <Filter className="h-4 w-4" />
              Apply
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="bg-card border-border shadow-lg">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-foreground font-semibold">
                    Type
                  </TableHead>
                  <TableHead className="text-foreground font-semibold">
                    Status
                  </TableHead>
                  <TableHead className="text-foreground font-semibold">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Amount
                    </div>
                  </TableHead>
                  <TableHead className="text-foreground font-semibold">
                    Sender
                  </TableHead>
                  <TableHead className="text-foreground font-semibold">
                    Receiver
                  </TableHead>
                  <TableHead className="text-foreground font-semibold">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Date
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12">
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                        <p className="text-muted-foreground">
                          Loading transactions...
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : transactions.length > 0 ? (
                  transactions.map((t) => (
                    <TableRow
                      key={t._id}
                      className="border-border hover:bg-accent/50 transition-colors"
                    >
                      <TableCell>{getTypeBadge(t.type)}</TableCell>
                      <TableCell>{getStatusBadge(t.status)}</TableCell>
                      <TableCell className="font-semibold text-foreground">
                        ${t.amount?.toLocaleString() || 0}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {t.sender || "-"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {t.receiver || "-"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(t.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12">
                      <div className="flex flex-col items-center gap-3">
                        <Wallet className="h-16 w-16 text-muted-foreground/30" />
                        <p className="text-muted-foreground text-lg">
                          No transactions found
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Try adjusting your filters
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      {meta && meta.totalPage > 1 && (
        <Card className="bg-card border-border">
          <CardContent className="py-4">
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={page === 1}
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Page{" "}
                  <span className="font-semibold text-foreground">
                    {meta?.page}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-foreground">
                    {meta?.totalPage}
                  </span>
                </span>
              </div>
              <Button
                variant="outline"
                onClick={handleNext}
                disabled={page === meta?.totalPage}
                className="gap-2"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
