"use client";

import { useState } from "react";
import { format } from "date-fns";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Send,
  Upload,
  Download,
  Percent,
  Activity,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useGetMyTransactionsQuery } from "@/Redux/features/Transaction/transaction.api";
import type { TTransactionType } from "@/components/types/transActionTypes";
import Loading from "@/utils/Loading";

export default function TransactionHistory() {
  const [page, setPage] = useState(1);
  const [type, setType] = useState<TTransactionType | undefined>(undefined);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  const { data, isLoading } = useGetMyTransactionsQuery({
    page,
    limit: 5,
    type,
    startDate: startDate ? format(startDate, "yyyy-MM-dd") : undefined,
    endDate: endDate ? format(endDate, "yyyy-MM-dd") : undefined,
  });

  const transactions = data?.data || [];
  const meta = data?.meta || { totalPage: 1, page: 1 };

  const handlePrev = () => page > 1 && setPage(page - 1);
  const handleNext = () => page < meta.totalPage && setPage(page + 1);

  /* ---------- Badge ---------- */
  const getTypeBadge = (type: string) => {
    const config: Record<string, { icon: any; className: string }> = {
      sendmoney: {
        icon: Send,
        className: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      },
      "cash-in": {
        icon: ArrowDownLeft,
        className: "bg-green-500/10 text-green-600 border-green-500/20",
      },
      "cash-out": {
        icon: ArrowUpRight,
        className: "bg-orange-500/10 text-orange-600 border-orange-500/20",
      },
      withdrawal: {
        icon: Upload,
        className: "bg-purple-500/10 text-purple-600 border-purple-500/20",
      },
      deposit: {
        icon: Download,
        className: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
      },
      commission: {
        icon: Percent,
        className: "bg-pink-500/10 text-pink-600 border-pink-500/20",
      },
    };

    const item = config[type] || {
      icon: Activity,
      className: "bg-muted",
    };

    const Icon = item.icon;

    return (
      <Badge className={`${item.className} flex items-center gap-1 capitalize`}>
        <Icon className="h-3 w-3" />
        {type.replace("-", " ")}
      </Badge>
    );
  };

  const totalAmount = transactions.reduce(
    (sum: number, t: any) => sum + (t.amount || 0),
    0
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500">
          <Wallet className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Transaction History</h1>
          <p className="text-muted-foreground">
            View and track your wallet transactions
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Transactions</p>
            <p className="text-2xl font-bold">{transactions.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Amount</p>
            <p className="text-2xl font-bold">
              ৳ {totalAmount.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Current Page</p>
            <p className="text-2xl font-bold">{meta.page}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter your transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-end">
            <div className="w-40">
              <label className="text-sm mb-1 block">Type</label>
              <Select
                value={type ?? "all"}
                onValueChange={(v) =>
                  setType(v === "all" ? undefined : (v as TTransactionType))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="cash-in">Cash In</SelectItem>
                  <SelectItem value="cash-out">Cash Out</SelectItem>
                  <SelectItem value="sendmoney">Send Money</SelectItem>
                  <SelectItem value="withdrawal">Withdrawal</SelectItem>
                  <SelectItem value="deposit">Deposit</SelectItem>
                  <SelectItem value="commission">Commission</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm mb-1 block">Start Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[160px] justify-start">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "dd MMM yyyy") : "Pick date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="text-sm mb-1 block">End Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[160px] justify-start">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "dd MMM yyyy") : "Pick date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center">
                    <Loading />
                  </TableCell>
                </TableRow>
              ) : transactions.length ? (
                transactions.map((t: any) => (
                  <TableRow key={t._id}>
                    <TableCell>{getTypeBadge(t.type)}</TableCell>
                    <TableCell className="font-semibold">
                      ৳ {t.amount}
                    </TableCell>
                    <TableCell>{t.sender || "-"}</TableCell>
                    <TableCell>{t.receiver || "-"}</TableCell>
                    <TableCell>
                      {format(new Date(t.createdAt), "dd MMM yyyy")}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center">
                    No transactions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {meta.totalPage > 1 && (
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={handlePrev} disabled={page === 1}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {meta.page} of {meta.totalPage}
          </span>
          <Button
            variant="outline"
            onClick={handleNext}
            disabled={page === meta.totalPage}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}
