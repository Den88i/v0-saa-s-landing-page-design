"use client"

import { useState, useCallback } from "react"

interface ErrorInfo {
  message: string
  stack?: string
  componentStack?: string
}

export const useErrorBoundary = () => {
  const [error, setError] = useState<ErrorInfo | null>(null)

  const captureError = useCallback((error: Error, errorInfo?: any) => {
    console.error("Error capturado:", error, errorInfo)

    setError({
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo?.componentStack,
    })

    // En producción, aquí enviarías el error a un servicio como Sentry
    if (process.env.NODE_ENV === "production") {
      // sendToErrorService(error, errorInfo)
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const withErrorBoundary = useCallback(
    <T extends any[], R>(fn: (...args: T) => R) => {
      return (...args: T): R | null => {
        try {
          return fn(...args)
        } catch (error) {
          captureError(error as Error)
          return null
        }
      }
    },
    [captureError],
  )

  return {
    error,
    captureError,
    clearError,
    withErrorBoundary,
  }
}
