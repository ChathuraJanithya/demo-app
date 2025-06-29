"use client";

import { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Phone, Mail, MessageCircle, CheckCircle2, Circle } from "lucide-react";

import { api } from "@/lib/api";
import { RoleGuard } from "./role-guard";
import { authService } from "@/lib/auth";
import { useAppStore } from "@/lib/store";

export function BrokerOverview() {
  const { brokerInfo, workflowSteps, setBrokerInfo, setWorkflowSteps, user } =
    useAppStore();
  const [aiAssistantEnabled, setAiAssistantEnabled] = useState(false);

  useEffect(() => {
    const loadBrokerData = async () => {
      try {
        const [broker, workflow] = await Promise.all([
          api.getBrokerInfo(),
          api.getWorkflowSteps(),
        ]);
        setBrokerInfo(broker);
        setWorkflowSteps(workflow);
      } catch (error) {
        console.error("Failed to load broker data:", error);
      }
    };
    loadBrokerData();
  }, [setBrokerInfo, setWorkflowSteps]);

  if (!brokerInfo) {
    return (
      <Card className="h-fit">
        <CardContent className="flex items-center justify-center py-12">
          <p className="text-gray-500">Loading broker information...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Broker Info */}
      <Card>
        <CardHeader>
          <CardTitle>
            {authService.isAdmin(user) ? "Broker Overview" : "My Overview"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              {authService.isBroker(user) ? user?.name : brokerInfo.name}
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {brokerInfo.deals}
              </p>
              <p className="text-sm text-gray-600">Deals</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {brokerInfo.approval_rate}
              </p>
              <p className="text-sm text-gray-600">Approval Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                ${brokerInfo.pending.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </div>

          <RoleGuard brokerOnly>
            <div className="flex gap-2 ">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Support
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent"
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat
              </Button>
            </div>
          </RoleGuard>

          <RoleGuard adminOnly>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Broker
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent"
              >
                <Mail className="h-4 w-4 mr-2" />
                Email Broker
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </Button>
            </div>
          </RoleGuard>
        </CardContent>
      </Card>

      {/* Onboarding Workflow */}
      <Card>
        <CardHeader>
          <CardTitle>Onboarding Workflow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {workflowSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs font-semibold">
                  {index + 1}
                </div>
                <div className="flex items-center gap-2 flex-1">
                  {index < 3 ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <Circle className="h-4 w-4 text-gray-400" />
                  )}
                  <span
                    className={`text-sm ${
                      index < 3 ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {step}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Assistant Toggle */}
      <Card>
        <CardHeader>
          <CardTitle>AI Assistant</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="ai-assistant" className="text-sm font-medium">
                E Ardsassist
              </Label>
              <p className="text-xs text-gray-500 mt-1">
                Enable AI-powered assistance for loan processing
              </p>
            </div>
            <Switch
              id="ai-assistant"
              checked={aiAssistantEnabled}
              onCheckedChange={setAiAssistantEnabled}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
