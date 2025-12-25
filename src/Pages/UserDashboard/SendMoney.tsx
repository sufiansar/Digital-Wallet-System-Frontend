"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

import { useSendMoneyMutation } from "@/Redux/features/Wallet/wallet.api";
import { Send, Phone, DollarSign, FileText, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const SendMoneySchema = z.object({
  receiverPhone: z.string().min(3, { message: "Receiver phone is required." }),
  amount: z
    .number({ message: "Amount is required." })
    .positive("Amount must be greater than 0"),
  note: z.string().optional(),
});

type SendMoneyType = z.infer<typeof SendMoneySchema>;

export default function SendMoney() {
  const [sendMoney, { isLoading }] = useSendMoneyMutation();
  const navigate = useNavigate();

  const form = useForm<SendMoneyType>({
    resolver: zodResolver(SendMoneySchema),
    defaultValues: {
      receiverPhone: "",
      amount: 0,
      note: "",
    },
  });

  async function onSubmit(values: SendMoneyType) {
    try {
      const res = await sendMoney(values).unwrap();
      console.log(res);
      toast.success(res?.message || "Money sent successfully!");
      form.reset();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to send money");
    }
  }

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
          <h1 className="text-3xl font-bold">Send Money</h1>
          <p className="text-muted-foreground">
            Transfer funds to another user
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg rounded-2xl border-border bg-card">
          <CardHeader className="border-b border-border/50">
            <CardTitle className="text-xl font-semibold text-card-foreground flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Send className="h-5 w-5" />
              </div>
              Transfer Details
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
                      <FormLabel className="text-foreground">
                        Receiver Phone
                      </FormLabel>
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
                      <FormLabel className="text-foreground">Amount</FormLabel>
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
                        Enter the amount you want to send
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Note */}
                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Note (optional)
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Add a note"
                            className="pl-10 bg-background border-input"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormDescription className="text-muted-foreground">
                        You can leave this empty if not needed
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-4 space-y-3">
                  <Button
                    onClick={form.handleSubmit(onSubmit)}
                    className="w-full flex items-center gap-2"
                    disabled={isLoading}
                  >
                    <Send className="h-4 w-4" />
                    {isLoading ? "Sending..." : "Send Money"}
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
                Make sure the receiver's phone number is correct
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary font-semibold">•</span>
                Double-check the amount before sending
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary font-semibold">•</span>
                Transactions are processed instantly
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
