"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Users, Settings, BarChart3, Shield } from "lucide-react";

import { RoleGuard } from "./role-guard";

export function AdminPanel() {
  return (
    <RoleGuard adminOnly>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Admin Panel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
            >
              <Users className="h-6 w-6" />
              <span>User Management</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
            >
              <Settings className="h-6 w-6" />
              <span>System Settings</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
            >
              <BarChart3 className="h-6 w-6" />
              <span>Analytics</span>
            </Button>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <span className="text-sm text-blue-800">
              <Badge className="mr-2">Admin Only</Badge>
              These features are only available to administrators.
            </span>
          </div>
        </CardContent>
      </Card>
    </RoleGuard>
  );
}
