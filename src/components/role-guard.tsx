"use client";

import type React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShieldX } from "lucide-react";
import { User } from "@/types";
import { useAppStore } from "@/lib/store";
import { authService } from "@/lib/auth";

interface RoleGuardProps {
  children: React.ReactNode;
  requiredRole?: User["role"];
  adminOnly?: boolean;
  brokerOnly?: boolean;
  fallback?: React.ReactNode;
}

export function RoleGuard({
  children,
  requiredRole,
  adminOnly = false,
  brokerOnly = false,
  fallback,
}: RoleGuardProps) {
  const { user } = useAppStore();

  // Check access based on props
  let hasAccess = true;

  if (adminOnly && !authService.isAdmin(user)) {
    hasAccess = false;
  } else if (brokerOnly && !authService.isBroker(user)) {
    hasAccess = false;
  } else if (requiredRole && !authService.hasRole(user, requiredRole)) {
    hasAccess = false;
  }

  if (!hasAccess) {
    return (
      fallback || (
        <Alert variant="destructive" className="m-4">
          <ShieldX className="h-4 w-4" />
          <AlertDescription>
            You don&apos;t have permission to access this feature. Required
            role: {requiredRole || (adminOnly ? "Admin" : "Broker")}
          </AlertDescription>
        </Alert>
      )
    );
  }

  return <>{children}</>;
}
