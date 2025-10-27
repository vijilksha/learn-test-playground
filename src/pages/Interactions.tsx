import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Info, ChevronDown, MousePointer } from "lucide-react";

const Interactions = () => {
  const [clickCount, setClickCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-hero bg-clip-text text-transparent">
            Interactive Elements
          </h1>
          <p className="text-muted-foreground text-lg">
            Practice testing user interactions and UI components
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Button Clicks */}
          <Card>
            <CardHeader>
              <CardTitle>Button Clicks</CardTitle>
              <CardDescription>Test various button interactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                data-testid="single-click-button"
                onClick={() => toast.success("Button clicked!")}
                className="w-full"
              >
                Single Click
              </Button>
              
              <Button
                data-testid="double-click-button"
                onDoubleClick={() => toast.info("Button double-clicked!")}
                variant="secondary"
                className="w-full"
              >
                Double Click
              </Button>

              <Button
                data-testid="counter-button"
                onClick={() => setClickCount(clickCount + 1)}
                variant="outline"
                className="w-full"
              >
                Clicked {clickCount} times
              </Button>

              <Button
                data-testid="disabled-button"
                disabled
                className="w-full"
              >
                Disabled Button
              </Button>
            </CardContent>
          </Card>

          {/* Modals */}
          <Card>
            <CardHeader>
              <CardTitle>Modal Dialogs</CardTitle>
              <CardDescription>Test modal interactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button data-testid="open-dialog" className="w-full">
                    Open Dialog
                  </Button>
                </DialogTrigger>
                <DialogContent data-testid="dialog-content">
                  <DialogHeader>
                    <DialogTitle>Dialog Title</DialogTitle>
                    <DialogDescription>
                      This is a dialog for testing purposes. You can interact with it.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p>Dialog content goes here...</p>
                  </div>
                </DialogContent>
              </Dialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button data-testid="open-alert" variant="destructive" className="w-full">
                    Open Alert
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent data-testid="alert-content">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This is a test alert dialog.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel data-testid="alert-cancel">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      data-testid="alert-confirm"
                      onClick={() => toast.success("Action confirmed!")}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>

          {/* Tooltips & Dropdowns */}
          <Card>
            <CardHeader>
              <CardTitle>Tooltips & Dropdowns</CardTitle>
              <CardDescription>Test hover and click interactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button data-testid="tooltip-trigger" variant="outline" className="w-full">
                      <Info className="mr-2 h-4 w-4" />
                      Hover for Tooltip
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent data-testid="tooltip-content">
                    <p>This is a tooltip message</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button data-testid="dropdown-trigger" className="w-full">
                    Open Dropdown
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent data-testid="dropdown-content">
                  <DropdownMenuItem data-testid="dropdown-item-1">Option 1</DropdownMenuItem>
                  <DropdownMenuItem data-testid="dropdown-item-2">Option 2</DropdownMenuItem>
                  <DropdownMenuItem data-testid="dropdown-item-3">Option 3</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>

          {/* Hover Effects */}
          <Card>
            <CardHeader>
              <CardTitle>Hover Detection</CardTitle>
              <CardDescription>Test hover state changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                data-testid="hover-area"
                className="p-8 border-2 border-dashed rounded-lg text-center transition-all cursor-pointer"
                style={{
                  borderColor: isHovered ? "hsl(var(--primary))" : "hsl(var(--border))",
                  backgroundColor: isHovered ? "hsl(var(--primary) / 0.1)" : "transparent",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <MousePointer className="h-12 w-12 mx-auto mb-2" />
                <p className="font-semibold">
                  {isHovered ? "Hovering! 🎯" : "Hover over me"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Visibility Toggle */}
          <Card>
            <CardHeader>
              <CardTitle>Visibility Toggle</CardTitle>
              <CardDescription>Test element visibility</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((num) => {
                const [isVisible, setIsVisible] = useState(true);
                return (
                  <div key={num}>
                    <Button
                      data-testid={`toggle-button-${num}`}
                      onClick={() => setIsVisible(!isVisible)}
                      variant="outline"
                      size="sm"
                      className="mb-2"
                    >
                      Toggle Element {num}
                    </Button>
                    {isVisible && (
                      <p
                        data-testid={`visible-element-${num}`}
                        className="text-sm text-muted-foreground"
                      >
                        This is visible element {num}
                      </p>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Toast Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Test toast notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                data-testid="toast-success"
                onClick={() => toast.success("Success!", { description: "Operation completed successfully" })}
                className="w-full"
                size="sm"
              >
                Success Toast
              </Button>
              <Button
                data-testid="toast-error"
                onClick={() => toast.error("Error!", { description: "Something went wrong" })}
                variant="destructive"
                className="w-full"
                size="sm"
              >
                Error Toast
              </Button>
              <Button
                data-testid="toast-info"
                onClick={() => toast.info("Info", { description: "Here's some information" })}
                variant="secondary"
                className="w-full"
                size="sm"
              >
                Info Toast
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Interactions;
