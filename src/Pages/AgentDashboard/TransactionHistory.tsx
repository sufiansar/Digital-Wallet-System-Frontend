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
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  console.log(transactions);
  const meta = data?.meta || { totalPage: 1, page: 1 };

  const handlePrev = () => page > 1 && setPage(page - 1);
  const handleNext = () => page < meta.totalPage && setPage(page + 1);

  return (
    <Card className="p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4">Transaction History</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 items-end">
        {/* Transaction Type */}
        <div>
          <label className="text-sm block mb-1">Type</label>
          <Select
            onValueChange={(val) =>
              setType(val === "all" ? undefined : (val as TTransactionType))
            }
            value={type ?? "all"}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Types" />
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

        {/* Start Date */}
        <div>
          <label className="text-sm block mb-1">Start Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[180px] justify-start text-left font-normal"
              >
                {startDate ? format(startDate, "dd MMM yyyy") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* End Date */}
        <div>
          <label className="text-sm block mb-1">End Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[180px] justify-start text-left font-normal"
              >
                {endDate ? format(endDate, "dd MMM yyyy") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center">
                  <Loading />
                </TableCell>
              </TableRow>
            ) : transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500">
                  No transactions found
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((item: any) => (
                <TableRow key={item._id}>
                  <TableCell>
                    {format(new Date(item.createdAt), "dd MMM yyyy")}
                  </TableCell>
                  <TableCell className="capitalize">{item.type}</TableCell>
                  <TableCell>৳ {item.amount}</TableCell>
                  <TableCell>{item?.sender || "-"}</TableCell>
                  <TableCell>{item.receiver || "-"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <Button variant="outline" onClick={handlePrev} disabled={page === 1}>
          Previous
        </Button>
        <span>
          Page {meta.page} of {meta.totalPage}
        </span>
        <Button
          variant="outline"
          onClick={handleNext}
          disabled={page === meta.totalPage}
        >
          Next
        </Button>
      </div>
    </Card>
  );
}
