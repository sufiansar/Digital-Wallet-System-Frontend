import type { TRole } from "@/components/types/index.type";
import { useGetUserInfoQuery } from "@/Redux/features/auth/auth.api";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole[]) => {
  return function AuthWrapper() {
    const { data, isLoading } = useGetUserInfoQuery(undefined);

    if (!isLoading && !data?.data?.email) {
      return <Navigate to="/login" />;
    }

    if (
      requiredRole &&
      !isLoading &&
      !requiredRole.includes(data?.data?.role)
    ) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component />;
  };
};
