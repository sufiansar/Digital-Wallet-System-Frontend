"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useWithdrawMoneyMutation } from "@/Redux/features/Wallet/wallet.api";
import { ArrowLeft, CreditCard, Phone, Download, Loader2 } from "lucide-react";

const WithdrawSchema = z.object({
  receiverPhone: z
    .string()
    .min(1, { message: "Receiver phone is required." })
    .regex(/^01[3-9]\d{8}$/, {
      message: "Enter a valid Bangladeshi phone number.",
    }),
  amount: z
    .number({ message: "Amount is required." })
    .positive("Amount must be greater than 0")
    .min(10, "Minimum withdrawal amount is 10 BDT")
    .max(50000, "Maximum withdrawal amount is 50,000 BDT"),
});

type WithdrawType = z.infer<typeof WithdrawSchema>;

export default function Withdraw() {
  const [withdrawMoney, { isLoading }] = useWithdrawMoneyMutation();
  const navigate = useNavigate();

  const form = useForm<WithdrawType>({
    resolver: zodResolver(WithdrawSchema),
    defaultValues: {
      receiverPhone: "",
      amount: 0,
    },
  });

  async function onSubmit(values: WithdrawType) {
    try {
      await withdrawMoney({
        amount: values.amount,
        receiverPhone: values.receiverPhone,
      }).unwrap();

      toast.success(
        `Successfully transferred ${values.amount} BDT to ${values.receiverPhone}`
      );
      form.reset();
    } catch (err: any) {
      toast.error(err?.data?.message || "Transfer failed");
    }
  }

  return (
    <div className="space-y-6 p-6 min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-full hover:bg-accent"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Withdraw Money</h1>
          <p className="text-muted-foreground">
            Transfer funds from your wallet to another account
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Main Withdrawal Card */}
        <Card className="shadow-xl rounded-2xl border-border bg-card">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Download className="h-5 w-5" />
              </div>
              Withdrawal Details
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Receiver Phone */}
                <FormField
                  control={form.control}
                  name="receiverPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Receiver Phone Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="01712345678"
                            className="pl-10 bg-background border-input"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Enter the recipient's Bangladeshi mobile number
                      </FormDescription>
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
                      <FormLabel>Withdrawal Amount</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="number"
                            placeholder="Enter amount in BDT"
                            className="pl-10 bg-background border-input"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Minimum: 10 BDT, Maximum: 50,000 BDT
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Action Buttons */}
                <div className="pt-4 space-y-3">
                  <Button
                    type="submit"
                    className="w-full flex items-center gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4" />
                        Withdraw Money
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => form.reset()}
                    disabled={isLoading}
                  >
                    Clear Form
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Important Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>• Withdrawals are processed within 2–4 hours on business days</p>
            <p>• Ensure the receiver phone number is correct</p>
            <p>• Transaction fees may apply</p>
            <p>• Daily withdrawal limit is 50,000 BDT</p>

            {/* Quick Amount Buttons */}
            <div className="pt-4">
              <p className="font-medium text-foreground mb-3">
                Quick Withdrawal Amounts
              </p>
              <div className="flex flex-wrap gap-2">
                {[100, 500, 1000, 2000, 5000].map((amount) => (
                  <Button
                    key={amount}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => form.setValue("amount", amount)}
                  >
                    {amount} BDT
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
