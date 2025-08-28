import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWithdrawMoneyMutation } from "@/Redux/features/Wallet/wallet.api";
import { Loader2 } from "lucide-react";

export default function Withdraw() {
  const [amount, setAmount] = useState<number | "">("");
  const [withdrawMoney, { isLoading }] = useWithdrawMoneyMutation();

  const handleWithdraw = async () => {
    if (!amount || amount <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    try {
      await withdrawMoney({ amount: Number(amount) }).unwrap();
      toast.success(`Successfully withdrew ${amount} BDT`);
      setAmount("");
    } catch (err: any) {
      toast.error(err?.data?.message || "Withdrawal failed");
    }
  };

  return (
    <div className="w-full px-4 sm:px-0 sm:max-w-md mx-auto mt-12">
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 space-y-5">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center">Withdraw Money</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Enter the amount you want to withdraw from your wallet.
        </p>

        {/* Input */}
        <Input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value ? Number(e.target.value) : "")
          }
        />

        {/* Submit Button */}
        <Button
          onClick={handleWithdraw}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Processing..." : "Withdraw"}
        </Button>
      </div>
    </div>
  );
}
