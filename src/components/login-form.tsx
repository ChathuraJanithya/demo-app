"use client";

import type React from "react";

import { useState } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";

import { useAppStore } from "@/lib/store";
import { authService, type LoginCredentials } from "@/lib/auth";

export function LoginForm() {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setUser } = useAppStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await authService.login(credentials);

      if (response.success && response.user) {
        setUser(response.user);
      } else {
        setError(response.error || "Login failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange =
    (field: keyof LoginCredentials) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCredentials((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
      if (error) setError(null);
    };

  const fillDemoCredentials = (role: "Admin" | "Broker") => {
    const demoCredentials =
      role === "Admin"
        ? { username: "admin", password: "admin123" }
        : { username: "broker", password: "broker123" };

    setCredentials(demoCredentials);
    setError(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">DemoApp</CardTitle>
          <CardDescription>
            Sign in to access the loan management dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={credentials.username}
                onChange={handleInputChange("username")}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={handleInputChange("password")}
                  required
                  disabled={loading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t">
            <p className="text-sm text-gray-600 mb-3 text-center">
              Demo Accounts:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fillDemoCredentials("Admin")}
                disabled={loading}
              >
                Admin Demo
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fillDemoCredentials("Broker")}
                disabled={loading}
              >
                Broker Demo
              </Button>
            </div>
            <div className="mt-2 text-xs text-gray-500 space-y-1">
              <p>
                <strong>Admin:</strong> admin / admin123
              </p>
              <p>
                <strong>Broker:</strong> broker / broker123
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
