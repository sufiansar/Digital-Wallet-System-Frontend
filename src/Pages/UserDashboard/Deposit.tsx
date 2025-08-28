"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useDepositMoneyMutation } from "@/Redux/features/Wallet/wallet.api";

const depositSchema = z.object({
  receiverPhone: z.string().min(11, "Phone number must be at least 11 digits"),
  amount: z
    .number({ message: "Amount must be a number" })
    .min(1, "Amount must be at least 1"),
});

type DepositFormType = z.infer<typeof depositSchema>;

export default function DepositForm() {
  const form = useForm<DepositFormType>({
    resolver: zodResolver(depositSchema),
    defaultValues: {
      receiverPhone: "",
      amount: 0,
    },
  });

  const [depositMoney, { isLoading }] = useDepositMoneyMutation();

  const onSubmit = async (values: DepositFormType) => {
    try {
      const res = await depositMoney(values).unwrap();
      toast.success(`Deposit successful! Amount: ${res.depositedAmount}`);
      form.reset();
    } catch (err: any) {
      toast.error("Failed to deposit money");
    }
  };

  return (
    <div className="w-full px-4">
      <div className="max-w-md mx-auto bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-gray-200 dark:border-neutral-800 p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
          Deposit Money
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Receiver Phone */}
            <FormField
              control={form.control}
              name="receiverPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Receiver Phone
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      inputMode="numeric"
                      placeholder="01XXXXXXXXX"
                      {...field}
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage className="text-xs mt-1 text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Amount
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      placeholder="Enter amount"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage className="text-xs mt-1 text-red-500" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 font-medium"
            >
              {isLoading ? "Processing..." : "Deposit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
