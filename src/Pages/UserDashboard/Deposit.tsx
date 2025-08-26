"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useDepositMoneyMutation } from "@/Redux/features/Wallet/wallet.api";

const depositSchema = z.object({
  receiverPhone: z.string().min(11, "Enter a valid phone number"),
  amount: z
    .number({ message: "Amount must be a number" })
    .min(1, "Amount must be at least 1"),
});

type DepositFormType = z.infer<typeof depositSchema>;

export default function DepositForm() {
  const form = useForm<DepositFormType>({
    resolver: zodResolver(depositSchema),
    defaultValues: { receiverPhone: "", amount: 0 },
  });

  const [depositMoney] = useDepositMoneyMutation();

  const onSubmit = async (data: DepositFormType) => {
    try {
      const res = await depositMoney(data).unwrap();
      toast.success(`Deposit successful! Amount: ${res.depositedAmount}`);
      form.reset();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to deposit money");
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
          name="receiverPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Receiver Phone</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter receiver phone"
                  {...field}
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
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter amount" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Deposit Money
        </Button>
      </form>
    </Form>
  );
}
