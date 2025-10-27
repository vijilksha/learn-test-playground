import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Forms from "./pages/Forms";
import Interactions from "./pages/Interactions";
import Dynamic from "./pages/Dynamic";
import Tables from "./pages/Tables";
import Api from "./pages/Api";
import Advanced from "./pages/Advanced";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/interactions" element={<Interactions />} />
          <Route path="/dynamic" element={<Dynamic />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/api" element={<Api />} />
          <Route path="/advanced" element={<Advanced />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
