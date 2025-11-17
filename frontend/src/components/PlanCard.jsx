import { memo } from "react";
import { cn } from "@/lib/utils";

/**
 * PlanCard component displays individual plan details
 * @param {Object} props
 * @param {Object} props.plan - Plan object with planName, priceUsdMonthly, billing, bullets, url, tags
 */
function PlanCard({ plan }) {
  const formatPrice = (price) => {
    if (price === 0) return "Free";
    return `$${price}/mo`;
  };

  return (
    <article
      className="group bg-card text-card-foreground rounded-md border border-border p-5 transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 focus-within:ring-2 focus-within:ring-ring h-full flex flex-col"
      aria-label={`Plan: ${plan.planName}`}
    >
      <div className="space-y-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-foreground leading-tight">
            {plan.planName}
          </h3>
          {plan.tags && plan.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 justify-end">
              {plan.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-0.5">
          <p className="text-2xl font-bold text-foreground tracking-tight">
            {formatPrice(plan.priceUsdMonthly)}
          </p>
          <p className="text-xs text-muted-foreground capitalize">
            {plan.billing}
          </p>
        </div>

        {plan.bullets && plan.bullets.length > 0 && (
          <ul className="space-y-2 pt-2 flex-1" aria-label="Plan features">
            {plan.bullets.map((bullet, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed"
              >
                <svg 
                  className="w-4 h-4 text-success flex-shrink-0 mt-0.5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}

        <a
          href={plan.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center justify-center rounded-md text-sm font-medium",
            "bg-primary text-primary-foreground",
            "h-9 px-4 py-2 transition-all duration-200",
            "hover:bg-primary/80 active:scale-95",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card",
            "w-full mt-2 shadow-sm"
          )}
          aria-label={`Visit ${plan.planName} plan page (opens in new tab)`}
        >
          Visit Plan
        </a>
      </div>
    </article>
  );
}

export default memo(PlanCard);

