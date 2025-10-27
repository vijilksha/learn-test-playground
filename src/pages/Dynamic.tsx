import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Loader2, Clock } from "lucide-react";

const Dynamic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedContent, setLoadedContent] = useState("");
  const [timer, setTimer] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showDelayed, setShowDelayed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowDelayed(true);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  const handleLoadContent = () => {
    setIsLoading(true);
    setLoadedContent("");
    setTimeout(() => {
      setLoadedContent("Content loaded successfully!");
      setIsLoading(false);
    }, 2000);
  };

  const startProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-hero bg-clip-text text-transparent">
            Dynamic Content
          </h1>
          <p className="text-muted-foreground text-lg">
            Practice testing dynamic content loading and state changes
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Loading States */}
          <Card>
            <CardHeader>
              <CardTitle>Loading States</CardTitle>
              <CardDescription>Test loading indicators and async content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                data-testid="load-content-button"
                onClick={handleLoadContent}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Load Content
              </Button>

              {isLoading ? (
                <div className="space-y-2" data-testid="loading-skeleton">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ) : loadedContent ? (
                <p data-testid="loaded-content" className="text-primary font-semibold">
                  {loadedContent}
                </p>
              ) : (
                <p data-testid="no-content" className="text-muted-foreground">
                  No content loaded yet
                </p>
              )}
            </CardContent>
          </Card>

          {/* Timer */}
          <Card>
            <CardHeader>
              <CardTitle>Real-time Updates</CardTitle>
              <CardDescription>Test components that update over time</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold" data-testid="timer-display">
                  {timer}s
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Progress Bar:</p>
                <Progress value={progress} data-testid="progress-bar" />
                <Button
                  data-testid="start-progress-button"
                  onClick={startProgress}
                  variant="secondary"
                  size="sm"
                  className="w-full"
                >
                  Start Progress
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Delayed Content */}
          <Card>
            <CardHeader>
              <CardTitle>Delayed Appearance</CardTitle>
              <CardDescription>Test waiting for elements to appear</CardDescription>
            </CardHeader>
            <CardContent>
              {!showDelayed ? (
                <div data-testid="waiting-message" className="text-muted-foreground">
                  <Loader2 className="h-6 w-6 animate-spin mb-2" />
                  <p>Waiting for content to appear...</p>
                  <p className="text-sm">(appears after 3 seconds)</p>
                </div>
              ) : (
                <div data-testid="delayed-content" className="text-primary font-semibold">
                  ✅ This content appeared after a delay!
                </div>
              )}
            </CardContent>
          </Card>

          {/* Conditional Rendering */}
          <Card>
            <CardHeader>
              <CardTitle>Conditional Rendering</CardTitle>
              <CardDescription>Test elements that appear/disappear</CardDescription>
            </CardHeader>
            <CardContent>
              {[1, 2, 3].map((num) => {
                const [isShown, setIsShown] = useState(false);
                return (
                  <div key={num} className="mb-4">
                    <Button
                      data-testid={`toggle-conditional-${num}`}
                      onClick={() => setIsShown(!isShown)}
                      variant="outline"
                      size="sm"
                    >
                      {isShown ? "Hide" : "Show"} Item {num}
                    </Button>
                    {isShown && (
                      <p
                        data-testid={`conditional-content-${num}`}
                        className="mt-2 text-sm text-muted-foreground"
                      >
                        Conditional content {num} is now visible
                      </p>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dynamic;
