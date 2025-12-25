"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

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

import { useAddMoneyMutation } from "@/Redux/features/Wallet/wallet.api";
import { Wallet, Phone, DollarSign, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const addMoneySchema = z.object({
  receiverPhone: z.string().min(1, "Receiver phone is required"),
  amount: z
    .number({ message: "Amount must be a number" })
    .min(1, "Amount must be at least 1"),
});

type AddMoneyFormValues = z.infer<typeof addMoneySchema>;

export default function AddMoney() {
  const [addMoney, { isLoading }] = useAddMoneyMutation();
  const navigate = useNavigate();

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
      const res = await addMoney(payload).unwrap();
      toast.success(res?.message || "Money added successfully!");
      form.reset();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add money");
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
          <h1 className="text-3xl font-bold">Add Money</h1>
          <p className="text-muted-foreground">
            Add balance to a wallet securely
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg rounded-2xl border-border bg-card">
          <CardHeader className="border-b border-border/50">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Wallet className="h-5 w-5" />
              </div>
              Add Money Details
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-6">
            <Form {...form}>
              <div className="space-y-6">
                {/* Receiver Phone */}
                <FormField
                  control={form.control}
                  name="receiverPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Receiver Phone</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Enter receiver phone number"
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
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="number"
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
                        Enter the amount you want to add
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Actions */}
                <div className="pt-4 space-y-3">
                  <Button
                    onClick={form.handleSubmit(onSubmit)}
                    className="w-full flex items-center gap-2"
                    disabled={isLoading}
                  >
                    <Wallet className="h-4 w-4" />
                    {isLoading ? "Processing..." : "Add Money"}
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
              </div>
            </Form>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 border-border bg-card">
          <CardContent className="pt-6">
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <span className="text-primary font-semibold">•</span>
                Ensure the receiver phone number is correct
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary font-semibold">•</span>
                Minimum amount is 1 BDT
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary font-semibold">•</span>
                Balance updates instantly after success
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
