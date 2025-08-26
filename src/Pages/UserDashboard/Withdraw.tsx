"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useWithdrawMoneyMutation } from "@/Redux/features/Wallet/wallet.api";
import Loading from "@/utils/Loading";

// Zod schema with number preprocessing
const withdrawSchema = z.object({
  amount: z.preprocess(
    (val) => Number(val),
    z
      .number({ message: "Amount is required" })
      .min(1, "Amount must be at least 1")
  ),
});

type WithdrawFormValues = z.infer<typeof withdrawSchema>;

export function Withdraw() {
  const [withdrawMoney, { isLoading }] = useWithdrawMoneyMutation();

  const form = useForm({
    resolver: zodResolver(withdrawSchema),
    defaultValues: {
      amount: 0,
    },
  });
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loading />
      </div>
    );
  }

  const onSubmit = async (values: WithdrawFormValues) => {
    try {
      await withdrawMoney(values).unwrap();
      toast.success("Money withdrawn successfully!");
      form.reset();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to withdraw money");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-md mx-auto space-y-4"
      >
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  {...field}
                  value={field.value === undefined ? "" : Number(field.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Processing..." : "Withdraw Money"}
        </Button>
      </form>
    </Form>
  );
}
