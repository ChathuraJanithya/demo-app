import { create } from "zustand";

import { Borrower, BrokerInfo, User } from "@/types";

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
  user: User | null;
  isAuthenticated: boolean;
  setActiveBorrower: (borrower: Borrower) => void;
  setActiveTab: (tab: "new" | "in_review" | "approved") => void;
  setBorrowers: (borrowers: {
    new: Borrower[];
    in_review: Borrower[];
    approved: Borrower[];
  }) => void;
  setBrokerInfo: (info: BrokerInfo) => void;
  setWorkflowSteps: (steps: string[]) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
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
  user: null,
  isAuthenticated: false,
  setActiveBorrower: (borrower) => set({ activeBorrower: borrower }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setBorrowers: (borrowers) => set({ borrowers }),
  setBrokerInfo: (info) => set({ brokerInfo: info }),
  setWorkflowSteps: (steps) => set({ workflowSteps: steps }),
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
