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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useAddMoneyMutation } from "@/Redux/features/Wallet/wallet.api";
import { Wallet, Phone, DollarSign, ArrowDownLeft } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md bg-card border-border shadow-lg">
        <CardHeader className="border-b border-border text-center">
          <div className="flex justify-center mb-3">
            <div className="p-3 rounded-full bg-green-500/10">
              <Wallet className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <CardTitle className="text-2xl text-foreground">
            Add Money to Wallet
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter the receiver's phone and amount to add money safely
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="receiverPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      Receiver Phone
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter user phone"
                        {...field}
                        className="bg-background border-border focus:ring-2 focus:ring-primary/20"
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
                    <FormLabel className="text-foreground flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      Amount (BDT)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="bg-background border-border focus:ring-2 focus:ring-primary/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Processing...
                  </>
                ) : (
                  <>
                    <ArrowDownLeft className="h-4 w-4" />
                    Add Money
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
