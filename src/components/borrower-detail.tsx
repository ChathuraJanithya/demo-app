"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  AlertTriangle,
  Phone,
  Mail,
  FileText,
  Building,
  CreditCard,
} from "lucide-react";

import { api } from "@/lib/api";
import { RoleGuard } from "./role-guard";
import { useAppStore } from "@/lib/store";

export function BorrowerDetail() {
  const { activeBorrower } = useAppStore();
  const [loading, setLoading] = useState<string | null>(null);

  if (!activeBorrower) {
    return (
      <Card className="h-fit">
        <CardContent className="flex items-center justify-center py-12">
          <p className="text-gray-500">Select a borrower to view details</p>
        </CardContent>
      </Card>
    );
  }

  const handleAction = async (
    action: string,
    apiCall: () => Promise<unknown>
  ) => {
    setLoading(action);
    try {
      const result = await apiCall();
      console.log(`${action} completed:`, result);
    } catch (error) {
      console.error(`${action} failed:`, error);
    } finally {
      setLoading(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "in review":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{activeBorrower.name}</CardTitle>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {activeBorrower.email}
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {activeBorrower.phone}
                </div>
              </div>
            </div>
            <div className="text-right">
              <Badge className={getStatusColor(activeBorrower.status)}>
                {activeBorrower.status}
              </Badge>
              <p className="text-2xl font-bold mt-2">
                ${activeBorrower.loan_amount?.toLocaleString()}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* AI Explainability */}
      <Card>
        <CardHeader>
          <CardTitle>AI Explainability</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="ai-flags">
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Risk Factors Detected ({activeBorrower.ai_flags?.length || 0})
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  {activeBorrower.ai_flags?.map((flag, index) => (
                    <Alert key={index} className="border-red-200">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <AlertDescription className="text-red-700">
                        {flag}
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex gap-3 mt-6">
            <Button
              variant="outline"
              disabled={loading === "documents"}
              onClick={() =>
                handleAction("documents", () =>
                  api.requestDocuments(activeBorrower.id)
                )
              }
            >
              <FileText className="h-4 w-4 mr-2" />
              {loading === "documents" ? "Requesting..." : "Request Documents"}
            </Button>

            <RoleGuard adminOnly>
              <Button
                variant="outline"
                disabled={loading === "valuer"}
                onClick={() =>
                  handleAction("valuer", () =>
                    api.sendToValuer(activeBorrower.id)
                  )
                }
              >
                <Building className="h-4 w-4 mr-2" />
                {loading === "valuer" ? "Sending..." : "Send to Valuer"}
              </Button>
            </RoleGuard>

            <RoleGuard adminOnly>
              <Button
                disabled={loading === "approve"}
                onClick={() =>
                  handleAction("approve", () =>
                    api.approveLoan(activeBorrower.id)
                  )
                }
              >
                {loading === "approve" ? "Approving..." : "Approve"}
              </Button>
            </RoleGuard>
          </div>
        </CardContent>
      </Card>

      {/* Loan Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Loan Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Employment</h4>
              <p className="text-gray-600">{activeBorrower.employment}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Income</h4>
              <p className="text-gray-600">
                ${activeBorrower.income?.toLocaleString()}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Existing Loan
              </h4>
              <p className="text-gray-600">
                ${activeBorrower.existing_loan?.toLocaleString()}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Credit Score</h4>
              <p className="text-gray-600 flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                {activeBorrower.credit_score}
              </p>
            </div>
            <div className="col-span-2">
              <h4 className="font-semibold text-gray-900 mb-2">
                Source of Funds
              </h4>
              <p className="text-gray-600">{activeBorrower.source_of_funds}</p>
            </div>
          </div>

          {activeBorrower.risk_signal && (
            <Alert className="mt-6 border-orange-200">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <AlertDescription className="text-orange-700">
                <strong>Risk Signal:</strong> {activeBorrower.risk_signal}
              </AlertDescription>
            </Alert>
          )}

          <RoleGuard adminOnly>
            <div className="mt-6">
              <Button
                className="w-full"
                size="lg"
                disabled={loading === "escalate"}
                onClick={() =>
                  handleAction("escalate", () =>
                    api.escalateToCommittee(activeBorrower.id)
                  )
                }
              >
                {loading === "escalate"
                  ? "Escalating..."
                  : "Escalate to Credit Committee"}
              </Button>
            </div>
          </RoleGuard>
        </CardContent>
      </Card>
    </div>
  );
}
