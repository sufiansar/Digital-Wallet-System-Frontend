"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useApproveAgentMutation,
  useGetAllAgentsQuery,
  useSuspendAgentMutation,
} from "@/Redux/features/user/user.api";
import Loading from "@/utils/Loading";
import { toast } from "sonner";

const AgentManagement = () => {
  const { data: agents, isLoading } = useGetAllAgentsQuery(undefined);

  const [approveAgent] = useApproveAgentMutation();
  const [suspendAgent] = useSuspendAgentMutation();

  const handleApprove = async (id: string) => {
    try {
      await approveAgent({ id }).unwrap();
      toast.success("Agent approved successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to approve agent");
    }
  };

  const handleSuspend = async (id: string) => {
    try {
      await suspendAgent({ id }).unwrap();
      toast.success("Agent suspended successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to suspend agent");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Manage Agents</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {agents?.data?.map((agent: any) => (
            <TableRow key={agent?._id}>
              <TableCell>{agent?.name}</TableCell>
              <TableCell>{agent?.phone}</TableCell>
              <TableCell>{agent?.isActive}</TableCell>
              <TableCell className="flex gap-2 justify-end">
                {agent?.isActive === "INACTIVE" ? (
                  <Button onClick={() => handleApprove(agent._id)} size="sm">
                    Approve
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleSuspend(agent._id)}
                    size="sm"
                    variant="destructive"
                  >
                    Suspend
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AgentManagement;
