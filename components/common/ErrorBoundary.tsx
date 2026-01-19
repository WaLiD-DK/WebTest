"use client";

import React, { Component, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({
      error,
      errorInfo,
    });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });

    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[400px] items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-destructive/10 p-2">
                  <AlertTriangle className="h-6 w-6 text-destructive" aria-hidden="true" />
                </div>
                <div>
                  <CardTitle className="text-destructive">Something went wrong</CardTitle>
                  <CardDescription>
                    An unexpected error occurred in this component
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {process.env.NODE_ENV === "development" && this.state.error && (
                <div className="space-y-2">
                  <div className="rounded-md bg-muted p-3">
                    <p className="text-sm font-medium text-foreground">Error:</p>
                    <p className="mt-1 text-xs text-muted-foreground font-mono break-all">
                      {this.state.error.toString()}
                    </p>
                  </div>
                  {this.state.errorInfo && (
                    <details className="rounded-md bg-muted p-3">
                      <summary className="cursor-pointer text-sm font-medium text-foreground">
                        Component Stack
                      </summary>
                      <pre className="mt-2 overflow-auto text-xs text-muted-foreground whitespace-pre-wrap">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </div>
              )}
              {process.env.NODE_ENV === "production" && (
                <p className="text-sm text-muted-foreground">
                  We apologize for the inconvenience. Our team has been notified and is working to
                  resolve the issue.
                </p>
              )}
            </CardContent>
            <CardFooter className="flex gap-3">
              <Button onClick={this.handleReset} className="flex-1">
                Try Again
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="flex-1"
              >
                Reload Page
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Functional wrapper for easier use in Server Components
export function ErrorBoundaryWrapper({
  children,
  fallback,
  onError,
  onReset,
}: ErrorBoundaryProps) {
  return (
    <ErrorBoundary fallback={fallback} onError={onError} onReset={onReset}>
      {children}
    </ErrorBoundary>
  );
}
