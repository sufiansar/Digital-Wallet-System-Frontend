"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
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

import { useAddMoneyMutation } from "@/Redux/features/Wallet/wallet.api";

const addMoneySchema = z.object({
  receiverPhone: z.string().min(1, "Receiver phone is required"),
  amount: z
    .number({ message: "Amount must be a number" })
    .min(1, "Amount must be at least 1"),
});

type AddMoneyFormValues = z.infer<typeof addMoneySchema>;

export default function AddMoney() {
  const [addMoney, { isLoading }] = useAddMoneyMutation();

  const form = useForm<AddMoneyFormValues>({
    resolver: zodResolver(addMoneySchema),
    defaultValues: {
      receiverPhone: "",
      amount: 0,
    },
  });

  const onSubmit: SubmitHandler<AddMoneyFormValues> = async (values) => {
    try {
      const payload = { ...values, amount: Number(values.amount) };
      await addMoney(payload).unwrap();
      toast.success("Money added successfully!");
      form.reset();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add money");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Add Money to Wallet
          </h2>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
            Enter the receiver's phone and amount to add money safely.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="receiverPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    Receiver Phone
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter user phone"
                      {...field}
                      className="focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    Amount (BDT)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="focus:ring-2 focus:ring-green-400 dark:focus:ring-green-500 transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 text-foreground font-semibold bg-muted-foreground-900 shadow-md hover:foreground-600 hover:to-muted-700 transition-all rounded-lg"
            >
              {isLoading ? "Processing..." : "Add Money"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
