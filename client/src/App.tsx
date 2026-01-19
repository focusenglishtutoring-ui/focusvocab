import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Unit from "@/pages/Unit";
import Module from "@/pages/Module";
import ModuleQuiz from "@/pages/ModuleQuiz";
import MidUnitTest from "@/pages/MidUnitTest";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/unit" component={Unit} />
      <Route path="/unit/:unitId/module/:moduleId" component={Module} />
      <Route path="/unit/:unitId/module/:moduleId/quiz" component={ModuleQuiz} />
      <Route path="/mid-unit-test-1" component={MidUnitTest} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
