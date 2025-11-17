/**
 * Filters plans based on budget value
 * @param {Array} allPlans - Array of all plan objects
 * @param {number} budget - Budget value (0-200)
 * @returns {Array} Filtered array of plans
 */
function filterPlansByBudget(allPlans, budget) {
  if (budget === 0) {
    return allPlans.filter(plan => plan.priceUsdMonthly === 0);
  }
  return allPlans.filter(plan => 
    plan.priceUsdMonthly > 0 && plan.priceUsdMonthly <= budget
  );
}

/**
 * Groups plans by tool identifier and sorts by price within each group
 * @param {Array} plans - Array of plan objects
 * @returns {Object} Object with tool identifiers as keys and sorted plan arrays as values
 */
function groupPlansByTool(plans) {
  const grouped = plans.reduce((acc, plan) => {
    if (!acc[plan.tool]) {
      acc[plan.tool] = [];
    }
    acc[plan.tool].push(plan);
    return acc;
  }, {});
  
  Object.keys(grouped).forEach(tool => {
    grouped[tool].sort((a, b) => a.priceUsdMonthly - b.priceUsdMonthly);
  });
  
  return grouped;
}

export { filterPlansByBudget, groupPlansByTool };

