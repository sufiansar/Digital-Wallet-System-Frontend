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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useDepositMoneyMutation } from "@/Redux/features/Wallet/wallet.api";
import { ArrowDownToLine, Phone, DollarSign, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const depositSchema = z.object({
  receiverPhone: z.string().min(11, "Phone number must be at least 11 digits"),
  amount: z
    .number({ message: "Amount must be a number" })
    .min(1, "Amount must be at least 1"),
});

type DepositFormType = z.infer<typeof depositSchema>;

export default function DepositForm() {
  const navigate = useNavigate();
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
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Deposit Money</h1>
          <p className="text-muted-foreground">Add funds to your wallet</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg rounded-2xl border-border bg-card">
          <CardHeader className="border-b border-border/50">
            <CardTitle className="text-xl font-semibold text-card-foreground flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <ArrowDownToLine className="h-5 w-5" />
              </div>
              Deposit Details
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
                      <FormLabel className="text-foreground">
                        Receiver Phone
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="tel"
                            inputMode="numeric"
                            placeholder="01XXXXXXXXX"
                            className="pl-10 bg-background border-input"
                            {...field}
                          />
                        </div>
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
                      <FormLabel className="text-foreground">Amount</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="number"
                            min={1}
                            placeholder="Enter amount"
                            className="pl-10 bg-background border-input"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </div>
                      </FormControl>
                      <FormDescription className="text-muted-foreground">
                        Enter the amount you want to deposit
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4 space-y-3">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center gap-2"
                  >
                    <ArrowDownToLine className="h-4 w-4" />
                    {isLoading ? "Processing..." : "Deposit"}
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
          <CardContent className="pt-6">
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <span className="text-primary font-semibold">•</span>
                Verify the receiver's phone number before proceeding
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary font-semibold">•</span>
                Minimum deposit amount is ৳1
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary font-semibold">•</span>
                Deposits are processed instantly
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
