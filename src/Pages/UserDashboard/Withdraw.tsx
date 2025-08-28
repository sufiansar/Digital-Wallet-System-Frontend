import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWithdrawMoneyMutation } from "@/Redux/features/Wallet/wallet.api";
import { Loader2, Phone, CreditCard } from "lucide-react";

export default function Withdraw() {
  const [amount, setAmount] = useState<number | "">("");
  const [receiverPhone, setReceiverPhone] = useState<string>("");
  const [withdrawMoney, { isLoading }] = useWithdrawMoneyMutation();

  const handleWithdraw = async () => {
    if (!amount || amount <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    if (!receiverPhone) {
      toast.error("Enter receiver phone number");
      return;
    }

    try {
      await withdrawMoney({ amount: Number(amount), receiverPhone }).unwrap();
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
    <div className="w-full px-4 sm:px-0 sm:max-w-md mx-auto mt-16">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Withdraw Money
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
          Enter the amount and receiver phone to withdraw money.
        </p>

        <div className="space-y-4">
          <div className="relative">
            <Phone className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Receiver Phone"
              value={receiverPhone}
              onChange={(e) => setReceiverPhone(e.target.value)}
              className="pl-10 border-gray-300 dark:border-gray-700"
            />
          </div>

          <div className="relative">
            <CreditCard className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value ? Number(e.target.value) : "")
              }
              className="pl-10 border-gray-300 dark:border-gray-700"
            />
          </div>
        </div>

        <Button
          onClick={handleWithdraw}
          disabled={isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center justify-center gap-2"
        >
          {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
          {isLoading ? "Processing..." : "Withdraw"}
        </Button>
      </div>
    </div>
  );
}
