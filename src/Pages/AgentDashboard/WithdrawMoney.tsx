import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWithdrawMoneyMutation } from "@/Redux/features/Wallet/wallet.api";

export default function WithdrawMoney() {
  const [amount, setAmount] = useState<number | "">("");
  const [withdrawMoney, { isLoading }] = useWithdrawMoneyMutation();

  const handleWithdraw = async () => {
    if (!amount || amount <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    try {
      await withdrawMoney({ amount: Number(amount) }).unwrap();
      toast.success("Withdrawal successful");
      setAmount("");
    } catch (err: any) {
      toast.error(err?.data?.message || "Withdrawal failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Withdraw Money</h2>
      <Input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value ? Number(e.target.value) : "")
        }
        className="mb-4"
      />
      <Button onClick={handleWithdraw} disabled={isLoading}>
        {isLoading ? "Processing..." : "Withdraw"}
      </Button>
    </div>
  );
}
