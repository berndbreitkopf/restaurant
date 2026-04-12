import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import HomePage from "@/pages/home";
import SpeisekartePage from "@/pages/speisekarte";
import GetraenkekartePage from "@/pages/getraenkekarte";
import TageskartePage from "@/pages/tageskarte";
import GaleriePage from "@/pages/galerie";
import AnfahrtPage from "@/pages/anfahrt";
import AdminPage from "@/pages/admin";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/admin">
        <AdminPage />
      </Route>
      <Route>
        <Layout>
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/speisekarte" component={SpeisekartePage} />
            <Route path="/getraenkekarte" component={GetraenkekartePage} />
            <Route path="/tageskarte" component={TageskartePage} />
            <Route path="/galerie" component={GaleriePage} />
            <Route path="/anfahrt" component={AnfahrtPage} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
