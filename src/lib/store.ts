import { create } from "zustand";

export interface Borrower {
  id: string;
  name: string;
  loan_type: string;
  amount: number;
  status: string;
  email?: string;
  phone?: string;
  loan_amount?: number;
  employment?: string;
  income?: number;
  existing_loan?: number;
  credit_score?: number;
  source_of_funds?: string;
  risk_signal?: string;
  ai_flags?: string[];
}

export interface BrokerInfo {
  name: string;
  deals: number;
  approval_rate: string;
  pending: number;
}

interface AppState {
  activeBorrower: Borrower | null;
  activeTab: "new" | "in_review" | "approved";
  borrowers: {
    new: Borrower[];
    in_review: Borrower[];
    approved: Borrower[];
  };
  brokerInfo: BrokerInfo | null;
  workflowSteps: string[];
  setActiveBorrower: (borrower: Borrower) => void;
  setActiveTab: (tab: "new" | "in_review" | "approved") => void;
  setBorrowers: (borrowers: any) => void;
  setBrokerInfo: (info: BrokerInfo) => void;
  setWorkflowSteps: (steps: string[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeBorrower: null,
  activeTab: "new",
  borrowers: {
    new: [],
    in_review: [],
    approved: [],
  },
  brokerInfo: null,
  workflowSteps: [],
  setActiveBorrower: (borrower) => set({ activeBorrower: borrower }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setBorrowers: (borrowers) => set({ borrowers }),
  setBrokerInfo: (info) => set({ brokerInfo: info }),
  setWorkflowSteps: (steps) => set({ workflowSteps: steps }),
}));
