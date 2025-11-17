import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ToolColumn from '../ToolColumn'

describe('ToolColumn', () => {
  const mockPlans = [
    {
      tool: 'cursor',
      planName: 'Business',
      priceUsdMonthly: 40,
      billing: 'monthly',
      bullets: ['Feature 1', 'Feature 2'],
      url: 'https://cursor.sh/pricing',
      tags: null
    },
    {
      tool: 'cursor',
      planName: 'Pro',
      priceUsdMonthly: 20,
      billing: 'monthly',
      bullets: ['Feature 1'],
      url: 'https://cursor.sh/pricing',
      tags: null
    },
    {
      tool: 'cursor',
      planName: 'Free',
      priceUsdMonthly: 0,
      billing: 'monthly',
      bullets: [],
      url: 'https://cursor.sh/pricing',
      tags: null
    }
  ]

  test('renders tool name as header', () => {
    render(<ToolColumn toolName="Cursor" plans={mockPlans} />)
    
    expect(screen.getByText('Cursor')).toBeInTheDocument()
  })

  test('displays multiple PlanCard components', () => {
    render(<ToolColumn toolName="Cursor" plans={mockPlans} />)
    
    const articles = screen.getAllByRole('article')
    expect(articles.length).toBe(3)
    
    const freePlan = screen.getByRole('article', { name: /plan: free/i })
    const proPlan = screen.getByRole('article', { name: /plan: pro/i })
    const businessPlan = screen.getByRole('article', { name: /plan: business/i })
    
    expect(freePlan).toBeInTheDocument()
    expect(proPlan).toBeInTheDocument()
    expect(businessPlan).toBeInTheDocument()
  })

  test('shows empty state when no plans match budget', () => {
    render(<ToolColumn toolName="Cursor" plans={[]} />)
    
    expect(screen.getByText('No plans match your budget')).toBeInTheDocument()
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  test('plans are sorted by price ascending', () => {
    render(<ToolColumn toolName="Cursor" plans={mockPlans} />)
    
    const planCards = screen.getAllByRole('article')
    expect(planCards.length).toBe(3)
    
    const firstCard = planCards[0]
    const secondCard = planCards[1]
    const thirdCard = planCards[2]
    
    expect(firstCard).toHaveTextContent('Free')
    expect(secondCard).toHaveTextContent('Pro')
    expect(thirdCard).toHaveTextContent('Business')
  })

  test('empty state has proper ARIA attributes', () => {
    render(<ToolColumn toolName="Cursor" plans={[]} />)
    
    const emptyState = screen.getByRole('status')
    expect(emptyState).toHaveAttribute('aria-label', expect.stringContaining('No plans available'))
  })

  test('plans list has proper ARIA attributes', () => {
    render(<ToolColumn toolName="Cursor" plans={mockPlans} />)
    
    const container = screen.getByRole('region', { name: 'Cursor plans' })
    expect(container).toBeInTheDocument()
    
    const listItems = container.querySelectorAll('[role="listitem"]')
    expect(listItems.length).toBe(3)
  })

  test('handles single plan correctly', () => {
    const singlePlan = [mockPlans[0]]
    render(<ToolColumn toolName="Cursor" plans={singlePlan} />)
    
    expect(screen.getByText('Business')).toBeInTheDocument()
    expect(screen.queryByText('Pro')).not.toBeInTheDocument()
  })
})

