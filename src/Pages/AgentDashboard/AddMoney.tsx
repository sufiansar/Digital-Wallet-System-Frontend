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

import { useAddMoneyMutation } from "@/Redux/features/Wallet/wallet.api";

// Zod schema without preprocess
const addMoneySchema = z.object({
  receiverPhone: z.string().min(1, "Receiver phone is required"),
  amount: z
    .number({ message: "Amount must be a number" })
    .min(1, "Amount must be at least 1"),
});

type AddMoneyFormValues = z.infer<typeof addMoneySchema>;

export function AddMoney() {
  const [addMoney, { isLoading }] = useAddMoneyMutation();

  const form = useForm<AddMoneyFormValues>({
    resolver: zodResolver(addMoneySchema),
    defaultValues: {
      receiverPhone: "",
      amount: 0,
    },
  });

  const onSubmit = async (values: AddMoneyFormValues) => {
    try {
      // convert amount to number before sending
      const payload = { ...values, amount: Number(values.amount) };
      await addMoney(payload).unwrap();
      toast.success("Money added successfully!");
      form.reset();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add money");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-md mx-auto space-y-4"
      >
        {/* Receiver Phone */}
        <FormField
          control={form.control}
          name="receiverPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Receiver Phone</FormLabel>
              <FormControl>
                <Input placeholder="Enter user phone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Amount */}
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
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Processing..." : "Add Money"}
        </Button>
      </form>
    </Form>
  );
}
