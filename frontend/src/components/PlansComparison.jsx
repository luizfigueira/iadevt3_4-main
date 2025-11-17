import { useState, useEffect, useMemo } from "react";
import BudgetSlider from "./BudgetSlider";
import ToolColumn from "./ToolColumn";
import { filterPlansByBudget, groupPlansByTool } from "../utils/planFilters";

const TOOLS = {
  "github-copilot": "GitHub Copilot",
  "cursor": "Cursor",
  "claude": "Claude Code",
  "kiro": "Kiro",
  "codex-cli": "Codex CLI (OpenAI)",
  "windsurf": "Windsurf",
};

const TOOL_ORDER = [
  "github-copilot",
  "cursor",
  "claude",
  "kiro",
  "codex-cli",
  "windsurf",
];

/**
 * PlansComparison component orchestrates the entire plans comparison feature
 * Loads data from API, manages budget state, filters plans, and renders columns
 */
function PlansComparison() {
  const [budget, setBudget] = useState(0);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPlans() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch("http://localhost:3000/api/plans");
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        setPlans(data);
      } catch (err) {
        console.error("Failed to load plans:", err);
        setError("Unable to load pricing data. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    }

    loadPlans();
  }, []);

  const filteredPlans = useMemo(() => {
    return filterPlansByBudget(plans, budget);
  }, [plans, budget]);

  const groupedPlans = useMemo(() => {
    return groupPlansByTool(filteredPlans);
  }, [filteredPlans]);

  const handleBudgetChange = (newBudget) => {
    setBudget(newBudget);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative w-12 h-12 mx-auto">
            <div className="absolute inset-0 rounded-full border-2 border-muted"></div>
            <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
          </div>
          <p className="text-muted-foreground text-sm">Loading pricing data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md mx-auto">
          <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
            <svg 
              className="w-12 h-12 text-destructive mx-auto mb-3" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div
              className="text-destructive text-base font-medium"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/80 h-9 px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              AI Development Tools Plans Comparison
            </h1>
            <p className="text-muted-foreground text-base">
              Compare pricing plans and find the perfect AI coding assistant for your budget
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl mx-auto">
          <BudgetSlider
            budget={budget}
            onBudgetChange={handleBudgetChange}
            min={0}
            max={200}
            step={10}
          />
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6"
          role="region"
          aria-label="Plans comparison by tool"
        >
          {TOOL_ORDER.map((toolId) => (
            <ToolColumn
              key={toolId}
              toolName={TOOLS[toolId]}
              plans={groupedPlans[toolId] || []}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlansComparison;

