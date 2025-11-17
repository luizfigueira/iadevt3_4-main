import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import PlanCard from '../PlanCard'

describe('PlanCard', () => {
  const mockPlan = {
    tool: 'github-copilot',
    planName: 'Individual',
    priceUsdMonthly: 10,
    billing: 'monthly',
    bullets: [
      'Access to all models',
      'Integrated chat in IDE',
      'Real-time code suggestions'
    ],
    url: 'https://github.com/features/copilot/plans',
    tags: null
  }

  test('renders plan name, price, and billing correctly', () => {
    render(<PlanCard plan={mockPlan} />)
    
    expect(screen.getByText('Individual')).toBeInTheDocument()
    expect(screen.getByText('$10/mo')).toBeInTheDocument()
    expect(screen.getByText('monthly')).toBeInTheDocument()
  })

  test('displays all bullet points', () => {
    render(<PlanCard plan={mockPlan} />)
    
    expect(screen.getByText('Access to all models')).toBeInTheDocument()
    expect(screen.getByText('Integrated chat in IDE')).toBeInTheDocument()
    expect(screen.getByText('Real-time code suggestions')).toBeInTheDocument()
  })

  test('external link has correct href and opens in new tab', () => {
    render(<PlanCard plan={mockPlan} />)
    
    const link = screen.getByRole('link', { name: /visit/i })
    expect(link).toHaveAttribute('href', mockPlan.url)
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  test('renders tags when present', () => {
    const planWithTags = {
      ...mockPlan,
      tags: ['best value', 'popular']
    }
    
    render(<PlanCard plan={planWithTags} />)
    
    expect(screen.getByText('best value')).toBeInTheDocument()
    expect(screen.getByText('popular')).toBeInTheDocument()
  })

  test('does not render tags when not present', () => {
    render(<PlanCard plan={mockPlan} />)
    
    const tags = screen.queryByText('best value')
    expect(tags).not.toBeInTheDocument()
  })

  test('displays "Free" for free plans', () => {
    const freePlan = {
      ...mockPlan,
      priceUsdMonthly: 0
    }
    
    render(<PlanCard plan={freePlan} />)
    
    expect(screen.getByText('Free')).toBeInTheDocument()
  })

  test('has proper ARIA label', () => {
    render(<PlanCard plan={mockPlan} />)
    
    const article = screen.getByRole('article')
    expect(article).toHaveAttribute('aria-label', 'Plan: Individual')
  })

  test('link has accessible aria-label', () => {
    render(<PlanCard plan={mockPlan} />)
    
    const link = screen.getByRole('link', { name: /visit/i })
    expect(link).toHaveAttribute('aria-label', expect.stringContaining('Visit'))
  })

  test('has focus-visible styles for accessibility', () => {
    render(<PlanCard plan={mockPlan} />)
    
    const link = screen.getByRole('link', { name: /visit/i })
    expect(link).toHaveClass('focus-visible:outline-none')
    expect(link).toHaveClass('focus-visible:ring-2')
  })
})

