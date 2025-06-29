"use client"

import type React from "react"

import { useEffect } from "react"
import { useAppStore } from "@/lib/store"
import { authService } from "@/lib/auth"
import { LoginForm } from "./login-form"

interface AuthWrapperProps {
  children: React.ReactNode
}

export function AuthWrapper({ children }: AuthWrapperProps) {
  const { user, isAuthenticated, setUser } = useAppStore()

  useEffect(() => {
    // Check for existing session on mount
    const currentUser = authService.getCurrentUser()
    if (currentUser && !user) {
      setUser(currentUser)
    }
  }, [user, setUser])

  if (!isAuthenticated) {
    return <LoginForm />
  }

  return <>{children}</>
}
