# Technical Specification - AI Plans Comparison

## Resumo Executivo

This technical specification outlines the implementation approach for an AI development tools pricing comparison feature. The solution integrates React frontend with the existing Express.js backend (port 3000) to display six AI tools (GitHub Copilot, Cursor, Claude Code, Kiro, Codex CLI, Windsurf) filtered by a budget slider ($0-$200 USD). The architecture prioritizes simplicity, accessibility, and responsive design while maintaining consistency with existing codebase patterns. Key technical decisions include: backend API endpoint for serving static JSON data, JSX-based component architecture, native HTML5 range input with custom Tailwind styling, and a modular component structure for maintainability.

## Arquitetura do Sistema

### Visão Geral dos Componentes

The solution consists of four main React components organized in a hierarchical structure:

- **PlansComparison** (Main Container): Orchestrates state management, data loading, and filtering logic. Renders the budget slider and six tool columns. Responsible for coordinating the budget value and filtered plans.

- **BudgetSlider**: Controlled component displaying the budget range input ($0-$200 with $10 steps). Handles accessibility features (ARIA labels, keyboard navigation, screen reader announcements) and displays the current budget value prominently.

- **ToolColumn**: Represents a single tool's pricing column. Receives filtered plans for one tool and renders multiple PlanCard components. Displays tool name as column header and handles empty states when no plans match the budget.

- **PlanCard**: Displays individual plan details including name, price, billing cycle, feature bullets, and external link. Implements proper focus states and keyboard navigation for accessibility.

**Data Flow**:
1. PlansComparison loads `plans.json` on mount using `fetch()`
2. User adjusts slider → budget state updates in PlansComparison
3. PlansComparison filters plans based on budget (≤ selected value; free plans only at $0)
4. Filtered plans are passed to ToolColumn components
5. Each ToolColumn renders appropriate PlanCard instances

**Key Relationships**:
- PlansComparison → BudgetSlider (budget value, onChange handler)
- PlansComparison → ToolColumn (filtered plans array per tool)
- ToolColumn → PlanCard (individual plan data)

## Design de Implementação

### Interfaces Principais

**Data Structures** (TypeScript notation for clarity, implemented in JSX):

```javascript
// Plan data structure (from plans.json)
const PlanSchema = {
  tool: "string",              // Tool identifier (github-copilot, cursor, etc.)
  planName: "string",          // Display name (e.g., "Pro", "Enterprise")
  priceUsdMonthly: "number",   // Monthly price in USD
  billing: "monthly",          // Always "monthly" (normalized)
  bullets: ["string"],         // 2-5 feature highlights
  url: "string",               // External link to provider
  tags: ["string"] || null     // Optional tags (e.g., ["best value"])
}

// Tool identifiers mapping
const TOOLS = {
  "github-copilot": "GitHub Copilot",
  "cursor": "Cursor",
  "claude": "Claude Code",
  "kiro": "Kiro",
  "codex-cli": "Codex CLI (OpenAI)",
  "windsurf": "Windsurf"
}
```

**Component Props**:

```javascript
// PlansComparison (no props, top-level component)

// BudgetSlider props
{
  budget: number,           // Current budget value (0-200)
  onBudgetChange: (value: number) => void,
  min: number,              // 0
  max: number,              // 200
  step: number              // 10
}

// ToolColumn props
{
  toolName: string,         // Display name (e.g., "GitHub Copilot")
  plans: Array<Plan>        // Filtered plans for this tool, sorted by price
}

// PlanCard props
{
  plan: Plan                // Single plan object
}
```

### Modelos de Dados

**Source Data File**: `backend/src/data/plans.json`

The JSON file contains a flat array of plan objects served by the backend API. Each plan includes:
- `tool`: String identifier linking plan to tool column
- `planName`: Human-readable plan tier name
- `priceUsdMonthly`: Numeric value for filtering (0 for free plans)
- `billing`: Always "monthly" (field exists for potential future expansion)
- `bullets`: Array of 2-5 strings highlighting key features/limits
- `url`: Full external URL (opens in new tab)
- `tags`: Optional array for UI enhancements (e.g., badges)

**Data Transformation**:
The reference data from `plans-data-reference.json` requires transformation:
- Map `id` → `tool`
- Map `name` (tool name) → prepend to each plan's context
- Map `price` → `priceUsdMonthly`
- Combine `models`, `volume`, `highlights` → `bullets` (format as clear feature statements)
- Add official `url` for each tool/plan
- Set `billing` = "monthly" for all plans
- Map plan-level `name` → `planName`

**Filtering Logic**:
```javascript
function filterPlansByBudget(allPlans, budget) {
  // Special case: budget = $0 shows ONLY free plans
  if (budget === 0) {
    return allPlans.filter(plan => plan.priceUsdMonthly === 0)
  }
  
  // budget > 0: show all plans with price <= budget
  return allPlans.filter(plan => 
    plan.priceUsdMonthly > 0 && plan.priceUsdMonthly <= budget
  )
}

function groupPlansByTool(plans) {
  // Group filtered plans by tool identifier
  // Sort plans within each tool by priceUsdMonthly ascending
  return plans.reduce((acc, plan) => {
    if (!acc[plan.tool]) acc[plan.tool] = []
    acc[plan.tool].push(plan)
    return acc
  }, {})
}
```

### Endpoints de API

**Backend API Endpoint**

The backend (Express.js on port 3000) serves the plans data via REST API:

**GET `/api/plans`**
- **Description**: Returns all AI tool plans as JSON array
- **Method**: GET
- **Response**: 200 OK with JSON array of plan objects
- **Error Handling**: 500 Internal Server Error if data file cannot be read
- **CORS**: Already configured in backend for frontend access
- **Example Response**:
```json
[
  {
    "tool": "github-copilot",
    "planName": "Individual",
    "priceUsdMonthly": 10,
    "billing": "monthly",
    "bullets": [
      "Access to all models",
      "Integrated chat in IDE",
      "Real-time code suggestions"
    ],
    "url": "https://github.com/features/copilot/plans",
    "tags": null
  }
]
```

**Data Loading in `PlansComparison`**:
```javascript
useEffect(() => {
  async function loadPlans() {
    try {
      const response = await fetch('http://localhost:3000/api/plans')
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      const data = await response.json()
      setPlans(data)
    } catch (error) {
      console.error('Failed to load plans:', error)
      setError('Unable to load pricing data')
    }
  }
  loadPlans()
}, [])
```

## Pontos de Integração

**Backend API Integration**

The frontend integrates with the existing Express.js backend (port 3000):

- **Endpoint**: `GET http://localhost:3000/api/plans`
- **Protocol**: HTTP REST API
- **Data Format**: JSON array of plan objects
- **CORS**: Backend already has CORS configured, allowing frontend access
- **Error Handling**: Frontend displays user-friendly error message on API failure
- **No Authentication**: Endpoint is public, no auth required per PRD

**Backend Implementation**:
- Create `/api/plans` endpoint in Express router
- Read and serve `backend/src/data/plans.json` file
- Handle file read errors gracefully (500 status)
- Return JSON with proper `Content-Type` header

**External Integrations**:
- External links in PlanCard components use standard anchor tags with `target="_blank"` and `rel="noopener noreferrer"` for security

**Internal Integration Points**:
- `backend/src/data/plans.json`: Static data source served by API
- `backend/src/index.ts`: Add `/api/plans` endpoint
- `frontend/src/App.jsx`: Update to render PlansComparison component
- Tailwind CSS: Uses existing theme configuration and utility classes
- Existing UI components: Optionally reuse Button component for external links

## Abordagem de Testes

### Testes Unitários

**BudgetSlider Component Tests** (`BudgetSlider.test.jsx`):
- Renders with initial budget value
- Displays budget value in accessible format ("$50/mo")
- Calls onBudgetChange with correct value when slider moves
- Has proper ARIA labels and role attributes
- Keyboard navigation works (Arrow keys increment/decrement)
- Min/max/step values are enforced

**PlanCard Component Tests** (`PlanCard.test.jsx`):
- Renders plan name, price, and billing correctly
- Displays all bullet points
- External link has correct href and opens in new tab
- Tags render when present (optional)
- Focus states are visible and functional
- Price formatting is correct ("$20/mo")

**ToolColumn Component Tests** (`ToolColumn.test.jsx`):
- Renders tool name as header
- Displays multiple PlanCard components
- Shows empty state when no plans match budget
- Plans are sorted by price (ascending)

**PlansComparison Component Tests** (`PlansComparison.test.jsx`):
- Loads plans data on mount
- Filters plans correctly based on budget value
- Free plans appear only at $0 budget
- All six tool columns render
- Budget changes trigger re-filtering
- Error state displays when data fails to load
- Loading state displays during data fetch

**Utility Function Tests** (`utils/planFilters.test.js`):
- `filterPlansByBudget()` returns correct plans for various budgets
- Budget $0 returns only free plans
- Plans above budget are excluded
- Edge cases (empty array, invalid budget values)
- `groupPlansByTool()` correctly organizes plans by tool
- Plans within tool groups are sorted by price

**Mock Strategy**:
- Mock `fetch()` globally for PlansComparison tests
- Use `jest.fn()` for onChange callbacks
- No external service mocks required (static data only)

### Testes de Integração

**Backend API Tests** (`backend/src/__tests__/api.test.ts`):
- `GET /api/plans` returns 200 and valid JSON array
- Response contains all expected plan fields
- Handles missing plans.json file gracefully (500 error)
- Handles malformed JSON gracefully (500 error)
- CORS headers are present in response

**Full Page Integration Tests** (`PlansComparison.integration.test.jsx`):
- User can adjust slider and see filtered results
- All six columns update simultaneously on budget change
- Clicking external links navigates correctly (test with `window.open` mock)
- Keyboard navigation works across slider and plan cards
- Component maintains state across multiple slider adjustments
- Responsive behavior switches correctly at breakpoints (use `window.matchMedia` mock)
- Frontend successfully fetches data from backend API

**Test Data**:
Create `__tests__/fixtures/mockPlans.json` with representative sample of all six tools and various price points for consistent testing.

## Sequenciamento de Desenvolvimento

### Ordem de Construção

1. **Data Preparation** (Foundation)
   - Transform `plans-data-reference.json` into production-ready `plans.json`
   - Validate all required fields are present
   - Add official URLs for each tool/plan
   - Save to `backend/src/data/plans.json`
   - **Why first**: All components depend on correct data structure

2. **Backend API Endpoint** (`backend/src/index.ts`)
   - Create `GET /api/plans` endpoint
   - Implement file reading logic for `backend/src/data/plans.json`
   - Add error handling (404 if file not found, 500 on read errors)
   - Test endpoint manually with curl or Postman
   - **Why second**: Frontend components depend on this endpoint

3. **Utility Functions & Filters** (`utils/planFilters.js`)
   - Implement `filterPlansByBudget()`
   - Implement `groupPlansByTool()`
   - Write unit tests for filtering logic
   - **Why third**: Core logic needed before UI components

4. **PlanCard Component** (`components/PlanCard.jsx`)
   - Implement card layout with Tailwind
   - Add accessibility features (focus states, ARIA)
   - Write unit tests
   - **Why fourth**: Smallest reusable unit, no dependencies on other custom components

5. **BudgetSlider Component** (`components/BudgetSlider.jsx`)
   - Implement native range input with custom styling
   - Add budget value display
   - Implement accessibility features (ARIA, keyboard, screen reader)
   - Write unit tests
   - **Why fifth**: Independent component, needed by PlansComparison

6. **ToolColumn Component** (`components/ToolColumn.jsx`)
   - Implement column container
   - Integrate PlanCard rendering
   - Add empty state handling
   - Write unit tests
   - **Why sixth**: Depends on PlanCard, needed by PlansComparison

7. **PlansComparison Component** (`components/PlansComparison.jsx`)
   - Implement main container and layout
   - Add data loading logic (fetch from backend API)
   - Integrate BudgetSlider and ToolColumn
   - Implement state management and filtering
   - Add responsive grid/stack layout
   - Write unit tests
   - **Why seventh**: Top-level orchestrator, depends on all other components

8. **App Integration** (Update `App.jsx`)
   - Replace placeholder content with PlansComparison
   - Test routing and navigation if applicable
   - **Why eighth**: Final integration point

9. **Integration Testing & Refinement**
   - Run full integration tests (frontend + backend)
   - Test backend endpoint independently
   - Manual accessibility testing with keyboard and screen reader
   - Responsive design testing across breakpoints
   - Performance testing with real API calls

### Dependências Técnicas

**Infrastructure**:
- Backend server running on port 3000 (Express.js, already configured)
- Vite dev server on port 5173 (already configured)
- Existing Tailwind setup (already configured)
- No additional build dependencies required

**External Dependencies**:
- No new npm packages needed
- Optional: Consider adding `@testing-library/react` and `@testing-library/jest-dom` if not present for testing

**Blocking Dependencies**:
- Backend API endpoint `/api/plans` must be implemented before frontend integration
- `plans.json` must be completed and placed in `backend/src/data/` before API endpoint can work
- Backend server must be running (port 3000) during frontend development and testing
- Official tool URLs must be verified for production data

## Monitoramento e Observabilidade

**Backend Monitoring**

Basic backend monitoring for the `/api/plans` endpoint:

**Backend Logging**:
```javascript
// In backend/src/index.ts
app.get('/api/plans', (req: Request, res: Response) => {
  try {
    console.log('[API] GET /api/plans requested')
    const plansData = fs.readFileSync(
      path.join(__dirname, 'data', 'plans.json'),
      'utf-8'
    )
    const plans = JSON.parse(plansData)
    console.log(`[API] Returning ${plans.length} plans`)
    res.json(plans)
  } catch (error) {
    console.error('[API] Error loading plans:', error)
    res.status(500).json({ 
      error: 'Failed to load plans data',
      message: error.message 
    })
  }
})
```

**Client-Side Error Tracking**:
```javascript
// In PlansComparison component
useEffect(() => {
  async function loadPlans() {
    try {
      const response = await fetch('http://localhost:3000/api/plans')
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      const data = await response.json()
      setPlans(data)
    } catch (error) {
      console.error('Failed to load plans:', error)
      // In production, this could send to error tracking service
      setError('Unable to load pricing data. Please refresh the page.')
    }
  }
  loadPlans()
}, [])
```

**Browser Console Logging** (Development Only):
- Log filter operations during development to verify logic
- Remove or gate behind `process.env.NODE_ENV === 'development'` for production

**Performance Considerations**:
- Monitor component render times if performance issues arise (use React DevTools Profiler)
- Measure time-to-interactive with Lighthouse audits

**Future Enhancements** (Out of Current Scope):
- Add analytics events for slider interactions
- Track external link clicks
- Monitor most popular budget ranges

## Considerações Técnicas

### Decisões Principais

**1. Backend API for Data Serving**
- **Decision**: Serve static JSON data through Express.js backend API endpoint
- **Justification**: Backend infrastructure already exists (port 3000), CORS configured, better separation of concerns, easier to update pricing data without frontend rebuild
- **Trade-off**: Requires backend server running during development; acceptable as backend is already part of the project
- **Rejected Alternative**: Frontend-only with public JSON - loses separation of concerns and makes data updates require frontend redeployment

**2. JSX Over TypeScript**
- **Decision**: Use `.jsx` extensions and JavaScript instead of TypeScript
- **Justification**: Maintains consistency with existing codebase (`App.jsx`, `Button.jsx`)
- **Trade-off**: Loses compile-time type checking; mitigated with comprehensive testing and JSDoc comments
- **Rejected Alternative**: TypeScript migration - would require refactoring existing code, outside current scope

**3. Native HTML5 Range Input**
- **Decision**: Use `<input type="range">` with custom Tailwind styling
- **Justification**: No external dependencies, excellent browser support, built-in accessibility features
- **Trade-off**: More effort for custom styling vs. pre-built component; offset by full control over appearance
- **Rejected Alternative**: Radix UI slider - adds dependency, overkill for simple requirements

**4. Component Decomposition Strategy**
- **Decision**: Four-component architecture (PlansComparison, BudgetSlider, ToolColumn, PlanCard)
- **Justification**: Balances modularity with simplicity; each component has clear single responsibility under 300 lines
- **Trade-off**: More files to maintain vs. one large component; improved testability and reusability justify split
- **Rejected Alternative**: Single component - would exceed 300-line limit, harder to test and maintain

**5. Mobile Responsive Strategy**
- **Decision**: Vertical stacking on small screens (one column full width)
- **Justification**: Best readability on mobile, avoids horizontal scroll which is poor UX on touch devices
- **Trade-off**: Requires more scrolling to compare all tools; acceptable for mobile-first progressive enhancement
- **Rejected Alternative**: Horizontal scroll - harder to discover and navigate on mobile devices

**6. Free Plan Filtering Logic**
- **Decision**: Show free plans ONLY when slider is exactly at $0
- **Justification**: Matches PRD requirement 4, clear distinction between free and paid tiers
- **Trade-off**: Free plans disappear when budget is $1+; acceptable as it follows explicit PRD requirement
- **Rejected Alternative**: Always show free plans - conflicts with PRD filtering rules

### Riscos Conhecidos

**1. Data Accuracy Risk**
- **Challenge**: Reference data includes disclaimers about verification needs, especially for Codex CLI pricing
- **Mitigation**: Document data sources in JSON metadata, provide clear update process for stakeholders
- **Recommendation**: Verify all prices and URLs against official sources before production deployment

**2. External URL Stability**
- **Challenge**: Tool provider websites may change URLs, breaking external links
- **Mitigation**: Use official marketing/pricing page URLs (most stable); consider adding link checker in CI/CD
- **Recommendation**: Quarterly review of all external URLs

**3. Browser Compatibility**
- **Challenge**: Native range input styling varies across browsers
- **Mitigation**: Extensive cross-browser testing (Chrome, Firefox, Safari, Edge); use CSS vendor prefixes where needed
- **Recommendation**: Test on minimum supported browser versions per PRD (modern browsers)

**4. Accessibility Compliance**
- **Challenge**: Custom slider styling may interfere with assistive technology
- **Mitigation**: Preserve native HTML5 semantics, add comprehensive ARIA labels, manual screen reader testing
- **Recommendation**: Include accessibility testing in acceptance criteria

**5. Mobile Performance**
- **Challenge**: Rendering 6 columns with multiple cards may impact performance on low-end mobile devices
- **Mitigation**: Use React.memo for PlanCard components, lazy load images if added in future
- **Recommendation**: Performance budget monitoring with Lighthouse

**6. Data Loading Failure**
- **Challenge**: If `plans.json` fails to load, entire feature breaks
- **Mitigation**: Implement error boundary, show user-friendly error message with retry option
- **Recommendation**: Consider service worker caching for offline resilience (future enhancement)

### Requisitos Especiais

**Accessibility Requirements**:
- WCAG 2.1 AA compliance target
- Keyboard navigation: Tab through slider and all plan cards, Enter/Space to activate links
- Screen reader: Announce budget changes, expose plan details, link purposes
- Focus indicators: Visible focus ring on all interactive elements (leverage Tailwind's `focus-visible:ring-2`)
- Color contrast: Maintain 4.5:1 minimum ratio for text (Tailwind theme already compliant)
- Semantic HTML: Use proper heading hierarchy (`h1` → `h2` → `h3`), `<article>` for plan cards

**Performance Targets** (Non-Critical, Guidance Only):
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- No Cumulative Layout Shift (CLS) during data load
- Slider interaction response: < 100ms (React state update + re-render)

**Responsive Breakpoints**:
- Mobile (< 640px): Single column stack, full width cards
- Tablet (640px - 1024px): Two columns side-by-side with scroll
- Desktop (> 1024px): Six columns in responsive grid
- Wide Desktop (> 1400px): Six columns with comfortable spacing

**Browser Support**:
- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- No IE11 support required (per "modern browsers" PRD requirement)

### Conformidade com Padrões

**Project Coding Standards** (from `tmp/code-standards.md`):
- ✅ All code in English: Component names, variables, comments
- ✅ camelCase for functions/variables: `filterPlansByBudget`, `budgetValue`
- ✅ PascalCase for components: `PlansComparison`, `PlanCard`
- ✅ kebab-case for files: `plans-comparison.jsx`, `budget-slider.jsx`
- ✅ No abbreviations: Use `budget` not `bdgt`, `plans` not `pls`
- ✅ Functions start with verbs: `filterPlans`, `loadData`, `handleBudgetChange`
- ✅ Max 3 parameters: Use props objects for components
- ✅ Avoid side effects: Filtering functions are pure
- ✅ Early returns: Implement in filtering logic
- ✅ Max 50 lines per function: Break down complex logic
- ✅ Max 300 lines per component: Decompose into smaller components
- ✅ Avoid inline comments: Write self-documenting code
- ✅ Variables close to usage: Declare within scope

**React Standards** (from `tmp/react.md`):
- ✅ Functional components only: No class components
- ✅ JSX extension: Use `.jsx` (not `.tsx` per clarification)
- ✅ State close to usage: Budget in PlansComparison, not global
- ✅ Explicit props: No spread operators on components
- ✅ Tailwind styling: No styled-components or CSS modules
- ✅ useMemo for expensive calculations: Apply to filtering operations
- ✅ Hooks named with "use": Custom hooks if needed (e.g., `usePlansData`)
- ✅ Component tests: Required for all components

**Testing Standards** (from `tmp/tests.md`):
- ✅ Jest framework: Use for all tests
- ✅ Independent tests: No cross-test dependencies
- ✅ AAA pattern: Arrange, Act, Assert structure
- ✅ Mock dates if needed: Not applicable to this feature
- ✅ One behavior per test: Focus each test case
- ✅ Full coverage: Aim for >80% code coverage
- ✅ Consistent expectations: Verify all assertions

**Deviations with Justification**:
- **TypeScript not used**: Clarified with stakeholder to use JSX for consistency with existing codebase
- **Backend integration added**: While PRD mentions "frontend-only", using existing backend (port 3000) for API endpoint provides better architecture and data management

### Arquivos Relevantes

**Backend Files to Create**:
- `/backend/src/data/plans.json` - Static pricing data (transformed from reference)
- `/backend/src/__tests__/api.test.ts` - Backend API endpoint tests (optional)

**Backend Files to Modify**:
- `/backend/src/index.ts` - Add `GET /api/plans` endpoint

**Frontend Files to Create**:
- `/frontend/src/components/PlansComparison.jsx` - Main container component
- `/frontend/src/components/BudgetSlider.jsx` - Budget range input component
- `/frontend/src/components/ToolColumn.jsx` - Tool column container component
- `/frontend/src/components/PlanCard.jsx` - Individual plan card component
- `/frontend/src/utils/planFilters.js` - Filtering and grouping logic
- `/frontend/src/components/__tests__/PlansComparison.test.jsx` - Main component tests
- `/frontend/src/components/__tests__/BudgetSlider.test.jsx` - Slider tests
- `/frontend/src/components/__tests__/ToolColumn.test.jsx` - Column tests
- `/frontend/src/components/__tests__/PlanCard.test.jsx` - Card tests
- `/frontend/src/utils/__tests__/planFilters.test.js` - Filter logic tests

**Frontend Files to Modify**:
- `/frontend/src/App.jsx` - Replace placeholder content with PlansComparison component
- `/frontend/package.json` - Add testing libraries if not present (check first)

**Files to Reference** (Existing):
- `/backend/src/index.ts` - Express server configuration, CORS setup
- `/frontend/src/components/ui/button.jsx` - Reusable button component (optional for external links)
- `/frontend/src/lib/utils.js` - Utility functions including `cn()` for className merging
- `/frontend/tailwind.config.js` - Theme configuration for consistent styling
- `/frontend/src/index.css` - Global CSS variables and Tailwind layers

**Data Reference**:
- `/tasks/prd-comparacao-planos-ai/plans-data-reference.json` - Source data requiring transformation

## Questões em Aberto

1. **Official Tool URLs**: Need verification of current official URLs for:
   - GitHub Copilot pricing page
   - Cursor pricing page
   - Claude/Anthropic pricing page
   - Kiro official website (availability unclear)
   - OpenAI API pricing page (for Codex CLI replacement)
   - Windsurf/Codeium pricing page

2. **Kiro Tool Data**: Confirm current pricing, features, and availability of Kiro as an AI development tool (limited public information available)

3. **Production Data Update Process**: Define workflow for stakeholders to update pricing data post-launch (JSON file update requires redeployment)

4. **Analytics Requirements**: Confirm if basic event tracking should be added for slider interactions and external link clicks (currently out of scope per PRD, but low effort to add)

5. **Testing Library Setup**: Verify if `@testing-library/react` and `jest-dom` are already configured or need to be added to the project

6. **Deployment Strategy**: Confirm frontend deployment process (Vite build output to static hosting)

---

**Technical Specification Prepared By**: AI Assistant  
**Date**: October 31, 2025  
**Based On**: PRD v1.0 - AI Plans Comparison Feature  
**Status**: Ready for Stakeholder Review and Implementation

