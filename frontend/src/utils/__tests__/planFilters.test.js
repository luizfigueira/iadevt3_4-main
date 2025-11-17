import { filterPlansByBudget, groupPlansByTool } from '../planFilters';

describe('planFilters', () => {
  const mockPlans = [
    { tool: 'github-copilot', planName: 'Free', priceUsdMonthly: 0, billing: 'monthly', bullets: [], url: '', tags: null },
    { tool: 'github-copilot', planName: 'Individual', priceUsdMonthly: 10, billing: 'monthly', bullets: [], url: '', tags: null },
    { tool: 'cursor', planName: 'Free', priceUsdMonthly: 0, billing: 'monthly', bullets: [], url: '', tags: null },
    { tool: 'cursor', planName: 'Pro', priceUsdMonthly: 20, billing: 'monthly', bullets: [], url: '', tags: null },
    { tool: 'cursor', planName: 'Business', priceUsdMonthly: 40, billing: 'monthly', bullets: [], url: '', tags: null },
  ];

  describe('filterPlansByBudget', () => {
    test('returns only free plans when budget is 0', () => {
      const result = filterPlansByBudget(mockPlans, 0);
      expect(result.length).toBe(2);
      expect(result.every(plan => plan.priceUsdMonthly === 0)).toBe(true);
    });

    test('returns plans with price > 0 and <= budget when budget > 0', () => {
      const result = filterPlansByBudget(mockPlans, 20);
      expect(result.length).toBe(2);
      expect(result.every(plan => plan.priceUsdMonthly > 0 && plan.priceUsdMonthly <= 20)).toBe(true);
      expect(result.some(plan => plan.priceUsdMonthly === 10)).toBe(true);
      expect(result.some(plan => plan.priceUsdMonthly === 20)).toBe(true);
    });

    test('excludes plans above budget', () => {
      const result = filterPlansByBudget(mockPlans, 15);
      expect(result.length).toBe(1);
      expect(result[0].priceUsdMonthly).toBe(10);
    });

    test('returns empty array when no plans match budget', () => {
      const result = filterPlansByBudget(mockPlans, 5);
      expect(result.length).toBe(0);
    });
  });

  describe('groupPlansByTool', () => {
    test('groups plans by tool identifier', () => {
      const result = groupPlansByTool(mockPlans);
      expect(Object.keys(result)).toContain('github-copilot');
      expect(Object.keys(result)).toContain('cursor');
      expect(result['github-copilot'].length).toBe(2);
      expect(result['cursor'].length).toBe(3);
    });

    test('sorts plans by price within each tool group', () => {
      const result = groupPlansByTool(mockPlans);
      const cursorPlans = result['cursor'];
      expect(cursorPlans[0].priceUsdMonthly).toBe(0);
      expect(cursorPlans[1].priceUsdMonthly).toBe(20);
      expect(cursorPlans[2].priceUsdMonthly).toBe(40);
    });

    test('handles empty array', () => {
      const result = groupPlansByTool([]);
      expect(Object.keys(result).length).toBe(0);
    });
  });
});

