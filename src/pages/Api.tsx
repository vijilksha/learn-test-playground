import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, XCircle, AlertCircle, Loader2 } from "lucide-react";

type ApiResponse = {
  success: boolean;
  data?: any;
  error?: string;
};

const Api = () => {
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const mockApiCall = (shouldSucceed: boolean, delay: number = 1000) => {
    setIsLoading(true);
    setResponse(null);
    
    setTimeout(() => {
      if (shouldSucceed) {
        setResponse({
          success: true,
          data: {
            id: Math.floor(Math.random() * 1000),
            message: "API call successful!",
            timestamp: new Date().toISOString(),
          },
        });
      } else {
        setResponse({
          success: false,
          error: "API call failed. Please try again.",
        });
      }
      setIsLoading(false);
    }, delay);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-hero bg-clip-text text-transparent">
            API Testing Scenarios
          </h1>
          <p className="text-muted-foreground text-lg">
            Practice testing API calls, loading states, and error handling
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Success API Call */}
          <Card>
            <CardHeader>
              <CardTitle>Successful API Call</CardTitle>
              <CardDescription>Test successful API responses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                data-testid="api-success-button"
                onClick={() => mockApiCall(true)}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Fetch Data (Success)
              </Button>

              {isLoading && (
                <div className="space-y-2" data-testid="loading-state">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              )}

              {response?.success && (
                <Alert data-testid="success-response" className="border-primary">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <AlertDescription>
                    <p className="font-semibold">Success!</p>
                    <pre className="mt-2 text-xs overflow-auto">
                      {JSON.stringify(response.data, null, 2)}
                    </pre>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Error API Call */}
          <Card>
            <CardHeader>
              <CardTitle>Failed API Call</CardTitle>
              <CardDescription>Test error handling and error messages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                data-testid="api-error-button"
                onClick={() => mockApiCall(false)}
                disabled={isLoading}
                variant="destructive"
                className="w-full"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Fetch Data (Error)
              </Button>

              {isLoading && (
                <div className="space-y-2" data-testid="loading-state-error">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              )}

              {response && !response.success && (
                <Alert data-testid="error-response" variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>
                    <p className="font-semibold">Error!</p>
                    <p className="mt-1 text-sm">{response.error}</p>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Slow API Call */}
          <Card>
            <CardHeader>
              <CardTitle>Slow API Call</CardTitle>
              <CardDescription>Test handling of slow responses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                data-testid="api-slow-button"
                onClick={() => mockApiCall(true, 3000)}
                disabled={isLoading}
                variant="secondary"
                className="w-full"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Slow Request (3s)
              </Button>

              {isLoading && (
                <Alert data-testid="loading-indicator">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <p>Loading... This might take a while.</p>
                  </AlertDescription>
                </Alert>
              )}

              {response?.success && (
                <Alert data-testid="slow-response" className="border-primary">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <AlertDescription>
                    <p>Request completed after delay!</p>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Network Status */}
          <Card>
            <CardHeader>
              <CardTitle>Network Status</CardTitle>
              <CardDescription>Test network state monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div data-testid="network-status" className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm">Network: Online</span>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">API Endpoints:</p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div data-testid="endpoint-1">✅ /api/users - Active</div>
                    <div data-testid="endpoint-2">✅ /api/posts - Active</div>
                    <div data-testid="endpoint-3">✅ /api/comments - Active</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Api;
