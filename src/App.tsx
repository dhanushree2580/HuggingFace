import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import HFHeader from "@/components/HFHeader";
import HFFooter from "@/components/HFFooter";
import HomePage from "./pages/HomePage";
import ModelsPage from "./pages/ModelsPage";
import DatasetsPage from "./pages/DatasetsPage";
import SpacesPage from "./pages/SpacesPage";
import ModelDetailPage from "./pages/ModelDetailPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SearchPage from "./pages/SearchPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <HFHeader />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/models" element={<ModelsPage />} />
                <Route path="/models/:owner/:name" element={<ModelDetailPage />} />
                <Route path="/datasets" element={<DatasetsPage />} />
                <Route path="/spaces" element={<SpacesPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <HFFooter />
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
