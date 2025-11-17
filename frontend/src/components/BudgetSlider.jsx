import { useRef, useEffect } from "react";

/**
 * BudgetSlider component displays a range input for budget selection
 * @param {Object} props
 * @param {number} props.budget - Current budget value (0-200)
 * @param {Function} props.onBudgetChange - Callback function when budget changes
 * @param {number} props.min - Minimum value (default: 0)
 * @param {number} props.max - Maximum value (default: 200)
 * @param {number} props.step - Step increment (default: 10)
 */
function BudgetSlider({ budget, onBudgetChange, min = 0, max = 200, step = 10 }) {
  const sliderRef = useRef(null);
  const announcementRef = useRef(null);

  const formatBudget = (value) => {
    return `$${value}/mo`;
  };

  const handleChange = (event) => {
    const newValue = Number(event.target.value);
    onBudgetChange(newValue);
    
    if (announcementRef.current) {
      announcementRef.current.textContent = formatBudget(newValue);
    }
  };

  const handleKeyDown = (event) => {
    const { key } = event;
    let newValue = budget;

    if (key === "ArrowRight" || key === "ArrowUp") {
      newValue = Math.min(budget + step, max);
      event.preventDefault();
    } else if (key === "ArrowLeft" || key === "ArrowDown") {
      newValue = Math.max(budget - step, min);
      event.preventDefault();
    } else if (key === "Home") {
      newValue = min;
      event.preventDefault();
    } else if (key === "End") {
      newValue = max;
      event.preventDefault();
    }

    if (newValue !== budget) {
      onBudgetChange(newValue);
      if (announcementRef.current) {
        announcementRef.current.textContent = formatBudget(newValue);
      }
    }
  };

  return (
    <div className="w-full space-y-4 bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <label
          htmlFor="budget-slider"
          className="text-base font-semibold text-foreground"
        >
          Monthly Budget
        </label>
        <div className="flex items-center gap-2">
          <span
            className="text-2xl font-bold text-primary tabular-nums"
            aria-live="polite"
            aria-atomic="true"
            ref={announcementRef}
          >
            {formatBudget(budget)}
          </span>
        </div>
      </div>
      
      <div className="space-y-3 pt-2">
        <input
          id="budget-slider"
          ref={sliderRef}
          type="range"
          min={min}
          max={max}
          step={step}
          value={budget}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={`
            w-full h-2 bg-muted rounded-full appearance-none cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary
            [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background
            [&::-webkit-slider-thumb]:hover:bg-primary/80 [&::-webkit-slider-thumb]:active:scale-110
            [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150
            [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary
            [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-background
            [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-lg
            [&::-moz-range-thumb]:hover:bg-primary/80 [&::-moz-range-thumb]:active:scale-110
            [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-150
          `}
          aria-label="Monthly budget slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={budget}
          aria-valuetext={formatBudget(budget)}
          role="slider"
        />

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground tabular-nums">{formatBudget(min)}</span>
          <span className="text-xs text-muted-foreground tabular-nums">{formatBudget(max)}</span>
        </div>
      </div>

      <p className="text-xs text-muted-foreground pt-2 border-t border-border">
        💡 Use the slider or arrow keys to adjust your budget and filter available plans
      </p>
    </div>
  );
}

export default BudgetSlider;

