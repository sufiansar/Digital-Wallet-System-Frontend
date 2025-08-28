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
import { useGetAllTransactionsQuery } from "@/Redux/features/Transaction/transaction.api";
import type { ITransaction } from "@/components/types/transActionTypes";

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

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">Transactions</h2>

      <div className="flex flex-wrap gap-4 items-center">
        <Input
          placeholder="Search by type/status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64"
        />

        <Select
          onValueChange={(v) => setStatus(v === "all" ? "" : v)}
          value={status || "all"}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="reversed">Reversed</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(v) => setType(v === "all" ? "" : v)}
          value={type || "all"}
        >
          <SelectTrigger className="w-40">
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

        <Input
          type="number"
          placeholder="Min Amount"
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value)}
          className="w-32"
        />
        <Input
          type="number"
          placeholder="Max Amount"
          value={maxAmount}
          onChange={(e) => setMaxAmount(e.target.value)}
          className="w-32"
        />

        <Button onClick={() => setPage(1)}>Apply</Button>
      </div>

      {/* Transactions Table */}
      <div className="border rounded-xl shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Sender</TableHead>
              <TableHead>Receiver</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : transactions.length > 0 ? (
              transactions.map((t) => (
                <TableRow key={t._id}>
                  <TableCell>{t.type}</TableCell>
                  <TableCell>{t.status}</TableCell>
                  <TableCell>${t.amount}</TableCell>
                  <TableCell>{t.sender || "-"}</TableCell>
                  <TableCell>{t.receiver || "-"}</TableCell>
                  <TableCell>
                    {new Date(t.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <Button variant="outline" onClick={handlePrev} disabled={page === 1}>
          Previous
        </Button>
        <span>
          Page {meta?.page} of {meta?.totalPage}
        </span>
        <Button
          variant="outline"
          onClick={handleNext}
          disabled={page === meta?.totalPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
