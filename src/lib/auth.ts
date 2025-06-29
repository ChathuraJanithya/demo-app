import { User } from "@/types";

// Mock user database
const mockUsers: Record<string, { password: string; user: User }> = {
  admin: {
    password: "admin123",
    user: {
      id: "1",
      username: "admin",
      role: "Admin",
      name: "System Administrator",
    },
  },
  broker: {
    password: "broker123",
    user: {
      id: "2",
      username: "broker",
      role: "Broker",
      name: "Robert Turner",
    },
  },
  "admin.user": {
    password: "password",
    user: {
      id: "3",
      username: "admin.user",
      role: "Admin",
      name: "Admin User",
    },
  },
  "broker.user": {
    password: "password",
    user: {
      id: "4",
      username: "broker.user",
      role: "Broker",
      name: "Broker User",
    },
  },
};

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { username, password } = credentials;
    const userRecord = mockUsers[username.toLowerCase()];

    if (!userRecord || userRecord.password !== password) {
      return {
        success: false,
        error: "Invalid username or password",
      };
    }

    // Store in localStorage for persistence
    localStorage.setItem("auth_user", JSON.stringify(userRecord.user));

    return {
      success: true,
      user: userRecord.user,
    };
  },

  logout: async (): Promise<void> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    localStorage.removeItem("auth_user");
  },

  getCurrentUser: (): User | null => {
    try {
      const stored = localStorage.getItem("auth_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  // Helper function to check if user has required role
  hasRole: (user: User | null, requiredRole: User["role"]): boolean => {
    return user?.role === requiredRole;
  },

  // Helper function to check if user has admin privileges
  isAdmin: (user: User | null): boolean => {
    return user?.role === "Admin";
  },

  // Helper function to check if user has broker privileges
  isBroker: (user: User | null): boolean => {
    return user?.role === "Broker";
  },
};
