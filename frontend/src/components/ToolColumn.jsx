import PlanCard from "./PlanCard";

/**
 * ToolColumn component displays a column of plans for a specific tool
 * @param {Object} props
 * @param {string} props.toolName - Display name of the tool
 * @param {Array} props.plans - Array of plan objects for this tool
 */
function ToolColumn({ toolName, plans }) {
  const sortedPlans = [...plans].sort(
    (a, b) => a.priceUsdMonthly - b.priceUsdMonthly
  );

  return (
    <div className="grid grid-rows-[auto_1fr] gap-3 h-full">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm pb-3 border-b border-border/50">
        <h2 className="text-base font-semibold text-foreground tracking-tight">
          {toolName}
        </h2>
        <div className="mt-1 flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
            {sortedPlans.length} {sortedPlans.length === 1 ? 'plan' : 'plans'}
          </span>
        </div>
      </div>
      
      {sortedPlans.length === 0 ? (
        <div
          className="text-center py-12 px-4 text-muted-foreground bg-card/50 rounded-md border border-dashed border-border"
          role="status"
          aria-label={`No plans available for ${toolName} within selected budget`}
        >
          <svg 
            className="w-10 h-10 mx-auto mb-3 text-muted-foreground/50" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-xs font-medium">No plans available</p>
          <p className="text-xs mt-1">Try increasing your budget</p>
        </div>
      ) : (
        <div className="grid gap-3 h-full [grid-auto-rows:1fr]" role="region" aria-label={`${toolName} plans`}>
          {sortedPlans.map((plan, index) => (
            <div key={`${plan.tool}-${plan.planName}-${index}`} className="min-h-0 h-full" role="listitem">
              <PlanCard plan={plan} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ToolColumn;

