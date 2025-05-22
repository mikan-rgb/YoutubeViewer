import { useState } from "react";
import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import Home from "@/pages/home";
import Search from "@/pages/search";
import Watch from "@/pages/watch";
import NotFound from "@/pages/not-found";
import { cn } from "@/lib/utils";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/search" component={Search} />
      <Route path="/watch" component={Watch} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [, setLocation] = useLocation();

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSearch = (query: string) => {
    setLocation(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="youtube-ui-theme">
        <TooltipProvider>
          <div className="min-h-screen bg-background text-foreground">
            <Header onMenuToggle={handleMenuToggle} onSearch={handleSearch} />
            <Sidebar isOpen={sidebarOpen} />
            
            <main 
              className={cn(
                "pt-16 transition-all duration-200",
                sidebarOpen ? "pl-60" : "pl-0"
              )}
            >
              <Router />
            </main>
            
            <Toaster />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
