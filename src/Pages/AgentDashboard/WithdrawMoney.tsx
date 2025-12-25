"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useWithdrawMoneyMutation } from "@/Redux/features/Wallet/wallet.api";
import { ArrowLeft, CreditCard, Phone, Download, Loader2 } from "lucide-react";

export default function WithdrawMoney() {
  const [amount, setAmount] = useState<number | "">("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [withdrawMoney, { isLoading }] = useWithdrawMoneyMutation();
  const navigate = useNavigate();

  const handleWithdraw = async () => {
    if (!receiverPhone) {
      toast.error("Enter receiver phone number");
      return;
    }

    if (!amount || amount <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    try {
      await withdrawMoney({
        amount: Number(amount),
        receiverPhone,
      }).unwrap();

      toast.success(
        `Successfully transferred ${amount} BDT to ${receiverPhone}`
      );
      setAmount("");
      setReceiverPhone("");
    } catch (err: any) {
      toast.error(err?.data?.message || "Transfer failed");
    }
  };

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
            Transfer funds from your wallet
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Main Card */}
        <Card className="shadow-xl rounded-2xl border-border bg-card">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Download className="h-5 w-5" />
              </div>
              Withdrawal Details
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-6 space-y-6">
            {/* Receiver Phone */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Receiver Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="01712345678"
                  value={receiverPhone}
                  onChange={(e) => setReceiverPhone(e.target.value)}
                  className="pl-10 bg-background border-input"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Enter the recipient's mobile number
              </p>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Withdrawal Amount</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  placeholder="Enter amount in BDT"
                  value={amount}
                  onChange={(e) =>
                    setAmount(e.target.value ? Number(e.target.value) : "")
                  }
                  className="pl-10 bg-background border-input"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Minimum withdrawal amount may apply
              </p>
            </div>

            {/* Actions */}
            <div className="pt-4 space-y-3">
              <Button
                onClick={handleWithdraw}
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
                onClick={() => {
                  setAmount("");
                  setReceiverPhone("");
                }}
                disabled={isLoading}
              >
                Clear Form
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Important Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Ensure the receiver phone number is correct</p>
            <p>• Withdrawals may take some time to process</p>
            <p>• Transaction fees may apply</p>
            <p>• Daily limits are enforced</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
