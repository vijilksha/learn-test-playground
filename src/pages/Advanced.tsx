import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Upload, Download, Keyboard } from "lucide-react";

const Advanced = () => {
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [keyPressed, setKeyPressed] = useState<string>("");

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setUploadedFile(files[0]);
      toast.success(`File uploaded: ${files[0].name}`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUploadedFile(files[0]);
      toast.success(`File selected: ${files[0].name}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    setKeyPressed(`${e.key} (${e.code})`);
    toast.info(`Key pressed: ${e.key}`);
  };

  const handleDownload = () => {
    const blob = new Blob(["This is a test file for download testing."], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "test-file.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("File downloaded!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-hero bg-clip-text text-transparent">
            Advanced Testing Scenarios
          </h1>
          <p className="text-muted-foreground text-lg">
            Practice advanced testing patterns and complex interactions
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle>File Upload</CardTitle>
              <CardDescription>Test file upload with drag & drop</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                data-testid="drop-zone"
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                  dragOver ? "border-primary bg-primary/10" : "border-border"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop a file here, or click to select
                </p>
                <Input
                  type="file"
                  data-testid="file-input"
                  onChange={handleFileChange}
                  className="max-w-xs mx-auto"
                />
              </div>

              {uploadedFile && (
                <div data-testid="uploaded-file-info" className="text-sm">
                  <p className="font-semibold">Uploaded File:</p>
                  <p className="text-muted-foreground">{uploadedFile.name}</p>
                  <p className="text-muted-foreground">
                    Size: {(uploadedFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* File Download */}
          <Card>
            <CardHeader>
              <CardTitle>File Download</CardTitle>
              <CardDescription>Test file download functionality</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <Download className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-4">
                  Click the button below to download a test file
                </p>
                <Button
                  data-testid="download-button"
                  onClick={handleDownload}
                  className="w-full"
                >
                  Download Test File
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Keyboard Events */}
          <Card>
            <CardHeader>
              <CardTitle>Keyboard Events</CardTitle>
              <CardDescription>Test keyboard input and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-4">
                <Keyboard className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-4">
                  Click in the input and press any key
                </p>
                <Input
                  data-testid="keyboard-input"
                  placeholder="Press a key..."
                  onKeyDown={handleKeyDown}
                  className="text-center"
                />
                {keyPressed && (
                  <p data-testid="key-display" className="mt-4 text-primary font-semibold">
                    Last key pressed: {keyPressed}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Local Storage */}
          <Card>
            <CardHeader>
              <CardTitle>Browser Storage</CardTitle>
              <CardDescription>Test localStorage interactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  data-testid="storage-input"
                  placeholder="Enter a value to store"
                  id="storage-value"
                />
                <div className="flex gap-2">
                  <Button
                    data-testid="save-storage-button"
                    onClick={() => {
                      const input = document.getElementById("storage-value") as HTMLInputElement;
                      localStorage.setItem("testValue", input.value);
                      toast.success("Value saved to localStorage");
                    }}
                    className="flex-1"
                  >
                    Save to Storage
                  </Button>
                  <Button
                    data-testid="load-storage-button"
                    onClick={() => {
                      const value = localStorage.getItem("testValue");
                      const input = document.getElementById("storage-value") as HTMLInputElement;
                      if (value) {
                        input.value = value;
                        toast.success("Value loaded from localStorage");
                      } else {
                        toast.error("No value found in localStorage");
                      }
                    }}
                    variant="secondary"
                    className="flex-1"
                  >
                    Load from Storage
                  </Button>
                </div>
                <Button
                  data-testid="clear-storage-button"
                  onClick={() => {
                    localStorage.removeItem("testValue");
                    const input = document.getElementById("storage-value") as HTMLInputElement;
                    input.value = "";
                    toast.success("Storage cleared");
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Clear Storage
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Advanced;
