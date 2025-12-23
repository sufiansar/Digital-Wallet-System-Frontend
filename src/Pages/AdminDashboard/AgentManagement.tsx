"use client";

import { useState } from "react";
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  useApproveAgentMutation,
  useGetAllAgentsQuery,
  useSuspendAgentMutation,
} from "@/Redux/features/user/user.api";
import Loading from "@/utils/Loading";
import { toast } from "sonner";
import {
  UserCheck,
  UserX,
  Shield,
  ShieldAlert,
  Phone,
  User,
  CheckCircle,
  XCircle,
  Users,
} from "lucide-react";

const AgentManagement = () => {
  const { data: agents, isLoading } = useGetAllAgentsQuery(undefined);
  const [approveAgent] = useApproveAgentMutation();
  const [suspendAgent] = useSuspendAgentMutation();
  const [loadingAgentId, setLoadingAgentId] = useState<string | null>(null);

  const handleApprove = async (id: string) => {
    setLoadingAgentId(id);
    try {
      await approveAgent({ id }).unwrap();
      toast.success("Agent approved successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to approve agent");
    } finally {
      setLoadingAgentId(null);
    }
  };

  const handleSuspend = async (id: string) => {
    setLoadingAgentId(id);
    try {
      await suspendAgent({ id }).unwrap();
      toast.success("Agent suspended successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to suspend agent");
    } finally {
      setLoadingAgentId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { icon: any; className: string }> = {
      ACTIVE: {
        icon: UserCheck,
        className:
          "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 hover:bg-green-500/20",
      },
      INACTIVE: {
        icon: UserX,
        className:
          "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/20",
      },
      BLOCKED: {
        icon: ShieldAlert,
        className:
          "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 hover:bg-red-500/20",
      },
    };

    const config = statusConfig[status] || {
      icon: User,
      className: "bg-muted",
    };
    const Icon = config.icon;

    return (
      <Badge
        className={`${config.className} font-medium flex items-center gap-1 w-fit`}
      >
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (!agents?.data || agents.data.length === 0) {
    return (
      <div className="p-6 min-h-screen bg-background">
        <Card className="max-w-2xl mx-auto border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl text-foreground">
                  Manage Agents
                </CardTitle>
                <CardDescription>No agents found in the system</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Shield className="h-16 w-16 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground text-lg">
                No agents available to display
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const activeAgents = agents.data.filter(
    (a: any) => a.isActive === "ACTIVE"
  ).length;
  const inactiveAgents = agents.data.filter(
    (a: any) => a.isActive === "INACTIVE"
  ).length;
  const blockedAgents = agents.data.filter(
    (a: any) => a.isActive === "BLOCKED"
  ).length;

  return (
    <div className="p-6 min-h-screen bg-background space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
              <Shield className="h-6 w-6 text-white" />
            </div>
            Manage Agents
          </h1>
          <p className="text-muted-foreground">
            Review and manage agent approvals and status
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Agents
                </p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {agents.data.length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
                <Users className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active Agents
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
                  {activeAgents}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                <UserCheck className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Pending Approval
                </p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">
                  {inactiveAgents}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-500">
                <UserX className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Suspended
                </p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">
                  {blockedAgents}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-red-500 to-rose-500">
                <ShieldAlert className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agents Table */}
      <Card className="bg-card border-border shadow-lg">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-foreground font-semibold">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Name
                    </div>
                  </TableHead>
                  <TableHead className="text-foreground font-semibold">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone
                    </div>
                  </TableHead>
                  <TableHead className="text-foreground font-semibold">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Status
                    </div>
                  </TableHead>
                  <TableHead className="text-right text-foreground font-semibold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents.data.map((agent: any) => (
                  <TableRow
                    key={agent?._id}
                    className="border-border hover:bg-accent/50 transition-colors"
                  >
                    <TableCell className="font-medium text-foreground">
                      {agent?.name || "N/A"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {agent?.phone || "N/A"}
                    </TableCell>
                    <TableCell>{getStatusBadge(agent?.isActive)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        {agent?.isActive === "INACTIVE" ? (
                          <Button
                            onClick={() => handleApprove(agent._id)}
                            size="sm"
                            disabled={loadingAgentId === agent._id}
                            className="gap-2 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
                          >
                            {loadingAgentId === agent._id ? (
                              <>
                                <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                Approving...
                              </>
                            ) : (
                              <>
                                <CheckCircle className="h-3 w-3" />
                                Approve
                              </>
                            )}
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleSuspend(agent._id)}
                            size="sm"
                            variant="destructive"
                            disabled={loadingAgentId === agent._id}
                            className="gap-2"
                          >
                            {loadingAgentId === agent._id ? (
                              <>
                                <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                Suspending...
                              </>
                            ) : (
                              <>
                                <XCircle className="h-3 w-3" />
                                Suspend
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentManagement;
