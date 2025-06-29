"use client";

import { Layout } from "@/components/layout";
import { AdminPanel } from "@/components/admin-panel";
import { AuthWrapper } from "@/components/auth-wrapper";
import { BrokerOverview } from "@/components/broker-overview";
import { BorrowerDetail } from "@/components/borrower-detail";
import { BorrowerPipeline } from "@/components/borrower-pipeline";

export default function Dashboard() {
  return (
    <AuthWrapper>
      <Layout>
        <div className="lg:col-span-1">
          <BorrowerPipeline />
        </div>
        <div className="lg:col-span-1">
          <BorrowerDetail />
          <AdminPanel />
        </div>
        <div className="lg:col-span-1">
          <BrokerOverview />
        </div>
      </Layout>
    </AuthWrapper>
  );
}
