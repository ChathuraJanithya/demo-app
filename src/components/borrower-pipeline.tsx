"use client";

import { useEffect } from "react";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { api } from "@/lib/api";
import { Borrower } from "@/types";
import { useAppStore } from "@/lib/store";

function BorrowerCard({
  borrower,
  isActive,
  onClick,
}: {
  borrower: Borrower;
  isActive: boolean;
  onClick: () => void;
}) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "in review":
        return "bg-yellow-100 text-yellow-800";
      case "renew":
        return "bg-green-100 text-green-800";
      case "approved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div
      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
        isActive
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 hover:border-gray-300"
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-900">{borrower.name}</h3>
        <Badge className={getStatusColor(borrower.status)}>
          {borrower.status}
        </Badge>
      </div>
      <p className="text-sm text-gray-600 mb-2">{borrower.loan_type}</p>
      <p className="text-lg font-bold text-right">
        ${borrower.amount.toLocaleString()}
      </p>
    </div>
  );
}

export function BorrowerPipeline() {
  const {
    borrowers,
    activeTab,
    activeBorrower,
    setActiveTab,
    setActiveBorrower,
    setBorrowers,
  } = useAppStore();

  useEffect(() => {
    const loadBorrowers = async () => {
      try {
        const data = await api.getBorrowerPipeline();
        setBorrowers(data);
        // Set first borrower as active if none selected
        if (!activeBorrower && data.new.length > 0) {
          setActiveBorrower(data.new[0]);
        }
      } catch (error) {
        console.error("Failed to load borrowers:", error);
      }
    };
    loadBorrowers();
  }, [setBorrowers, activeBorrower, setActiveBorrower]);

  const currentBorrowers = borrowers[activeTab] || [];

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Borrower Pipeline</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as any)}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="new">New ({borrowers.new.length})</TabsTrigger>
            <TabsTrigger value="in_review">
              In Review ({borrowers.in_review.length})
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved ({borrowers.approved.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="space-y-3 mt-4">
            {borrowers.new.map((borrower: Borrower) => (
              <BorrowerCard
                key={borrower.id}
                borrower={borrower}
                isActive={activeBorrower?.id === borrower.id}
                onClick={() => setActiveBorrower(borrower)}
              />
            ))}
          </TabsContent>

          <TabsContent value="in_review" className="space-y-3 mt-4">
            {borrowers.in_review.map((borrower: Borrower) => (
              <BorrowerCard
                key={borrower.id}
                borrower={borrower}
                isActive={activeBorrower?.id === borrower.id}
                onClick={() => setActiveBorrower(borrower)}
              />
            ))}
          </TabsContent>

          <TabsContent value="approved" className="space-y-3 mt-4">
            {borrowers.approved.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No approved borrowers
              </p>
            ) : (
              borrowers.approved.map((borrower) => (
                <BorrowerCard
                  key={borrower.id}
                  borrower={borrower}
                  isActive={activeBorrower?.id === borrower.id}
                  onClick={() => setActiveBorrower(borrower)}
                />
              ))
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-6 pt-4 border-t">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            F-SANITISED ACTIVE
          </h4>
          <RadioGroup defaultValue="active" className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="active" id="active" />
              <Label htmlFor="active" className="text-sm">
                Active Pipeline
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="archived" id="archived" />
              <Label htmlFor="archived" className="text-sm">
                Archived
              </Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
}
