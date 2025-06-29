import { Borrower, BrokerInfo } from "@/types";

// Mock API responses
const mockBorrowers = {
  new: [
    {
      id: "1",
      name: "Sarah Dunn",
      loan_type: "Home Loan",
      amount: 300000,
      status: "Renew",
      email: "sarah.dunn@example.com",
      phone: "(355)123-4557",
      loan_amount: 300000,
      employment: "At Tech Company",
      income: 120000,
      existing_loan: 240000,
      credit_score: 720,
      source_of_funds: "Declared",
      risk_signal: "Missing Source of Funds declaration",
      ai_flags: [
        "Income Inconsistent with Bank statements",
        "High Debt-to-Income Ratio detected",
      ],
    },
    {
      id: "3",
      name: "Lisa Carter",
      loan_type: "Home Loan",
      amount: 450000,
      status: "New",
      email: "lisa.carter@example.com",
      phone: "(355)987-6543",
      loan_amount: 450000,
      employment: "Senior Manager",
      income: 150000,
      existing_loan: 180000,
      credit_score: 750,
      source_of_funds: "Savings",
      risk_signal: "High loan amount relative to income",
      ai_flags: ["High Debt-to-Income Ratio detected"],
    },
  ],
  in_review: [
    {
      id: "2",
      name: "Alan Matthews",
      loan_type: "Personal Loan",
      amount: 20000,
      status: "In Review",
      email: "alan.matthews@example.com",
      phone: "(355)456-7890",
      loan_amount: 20000,
      employment: "Freelancer",
      income: 60000,
      existing_loan: 15000,
      credit_score: 680,
      source_of_funds: "Business Income",
      risk_signal: "Irregular income pattern",
      ai_flags: ["Income Inconsistent with Bank statements"],
    },
  ],
  approved: [],
};

const mockBrokerInfo: BrokerInfo = {
  name: "Robert Turner",
  deals: 16,
  approval_rate: "75%",
  pending: 7660,
};

const mockWorkflowSteps = [
  "Deal Intake",
  "IDV & Credit Check",
  "Document Upload",
  "AI Validation",
  "Credit Committee",
  "Approval & Docs",
  "Funder Syndication",
];

export const api = {
  getBorrowerPipeline: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockBorrowers;
  },

  getBorrowerDetail: async (id: string): Promise<Borrower | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const allBorrowers = [
      ...mockBorrowers.new,
      ...mockBorrowers.in_review,
      ...mockBorrowers.approved,
    ];
    return allBorrowers.find((b) => b.id === id) || null;
  },

  requestDocuments: async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`Documents requested for borrower ${id}`);
    return { success: true, message: "Documents requested." };
  },

  sendToValuer: async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`Sent to valuer for borrower ${id}`);
    return { success: true, message: "Valuer notified." };
  },

  approveLoan: async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`Loan approved for borrower ${id}`);
    return { success: true, message: "Loan approved." };
  },

  escalateToCommittee: async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`Escalated to credit committee for borrower ${id}`);
    return { success: true, message: "Escalated to Credit Committee." };
  },

  getBrokerInfo: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockBrokerInfo;
  },

  getWorkflowSteps: async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockWorkflowSteps;
  },
};
