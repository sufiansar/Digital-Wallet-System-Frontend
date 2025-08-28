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

const SendMoneySchema = z.object({
  receiverPhone: z.string().min(3, { message: "Receiver phone is required." }),
  amount: z
    .number({ message: "Amount is required." })
    .positive("Amount must be greater than 0"),
  note: z.string().optional(),
});

type SendMoneyType = z.infer<typeof SendMoneySchema>;

export default function SendMoney() {
  const [sendMoney] = useSendMoneyMutation();

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
    <div className="max-w-md mx-auto mt-10">
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Send Money</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Receiver Phone */}
              <FormField
                control={form.control}
                name="receiverPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Receiver Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Receiver phone number"
                        {...field}
                      />
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

              {/* Note */}
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Add a note" {...field} />
                    </FormControl>
                    <FormDescription>
                      You can leave this empty if not needed.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Send Money
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
