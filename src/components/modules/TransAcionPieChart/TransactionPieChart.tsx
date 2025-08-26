"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const COLORS = ["#2563eb", "#16a34a", "#16a34a", "#dc2626"];

export function TransactionsPieChart({
  transactions,
}: {
  transactions: any[];
}) {
  const totals: Record<string, number> = {};
  transactions.forEach((tx) => {
    totals[tx.type] = (totals[tx.type] || 0) + tx.amount;
  });

  const data = Object.keys(totals).map((key) => ({
    name: key,
    value: totals[key],
  }));

  return (
    <Card className="shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle>Transaction Amounts by Type</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={90}
              fill="#8884d8"
              dataKey="value"
              label={(entry) => `${entry.name}: ৳${entry.value}`}
            >
              {data.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `৳ ${value}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
