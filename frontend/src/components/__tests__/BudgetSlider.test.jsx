import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BudgetSlider from '../BudgetSlider'

describe('BudgetSlider', () => {
  const mockOnBudgetChange = vi.fn()

  beforeEach(() => {
    mockOnBudgetChange.mockClear()
  })

  test('renders with initial budget value', () => {
    render(
      <BudgetSlider
        budget={50}
        onBudgetChange={mockOnBudgetChange}
        min={0}
        max={200}
        step={10}
      />
    )
    
    const slider = screen.getByRole('slider')
    expect(slider).toHaveValue('50')
    expect(screen.getByText('$50/mo')).toBeInTheDocument()
  })

  test('displays budget value in accessible format', () => {
    render(
      <BudgetSlider
        budget={100}
        onBudgetChange={mockOnBudgetChange}
      />
    )
    
    expect(screen.getByText('$100/mo')).toBeInTheDocument()
  })

  test('calls onBudgetChange with correct value when slider moves', () => {
    render(
      <BudgetSlider
        budget={50}
        onBudgetChange={mockOnBudgetChange}
        min={0}
        max={200}
        step={10}
      />
    )
    
    const slider = screen.getByRole('slider')
    fireEvent.change(slider, { target: { value: '60' } })
    
    expect(mockOnBudgetChange).toHaveBeenCalledWith(60)
  })

  test('has proper ARIA labels and role attributes', () => {
    render(
      <BudgetSlider
        budget={50}
        onBudgetChange={mockOnBudgetChange}
        min={0}
        max={200}
        step={10}
      />
    )
    
    const slider = screen.getByRole('slider')
    expect(slider).toHaveAttribute('aria-label', 'Monthly budget slider')
    expect(slider).toHaveAttribute('aria-valuemin', '0')
    expect(slider).toHaveAttribute('aria-valuemax', '200')
    expect(slider).toHaveAttribute('aria-valuenow', '50')
    expect(slider).toHaveAttribute('aria-valuetext', '$50/mo')
  })

  test('keyboard navigation works - ArrowRight increments', async () => {
    const user = userEvent.setup()
    render(
      <BudgetSlider
        budget={50}
        onBudgetChange={mockOnBudgetChange}
        min={0}
        max={200}
        step={10}
      />
    )
    
    const slider = screen.getByRole('slider')
    slider.focus()
    await user.keyboard('{ArrowRight}')
    
    expect(mockOnBudgetChange).toHaveBeenCalledWith(60)
  })

  test('keyboard navigation works - ArrowLeft decrements', async () => {
    const user = userEvent.setup()
    render(
      <BudgetSlider
        budget={50}
        onBudgetChange={mockOnBudgetChange}
        min={0}
        max={200}
        step={10}
      />
    )
    
    const slider = screen.getByRole('slider')
    slider.focus()
    await user.keyboard('{ArrowLeft}')
    
    expect(mockOnBudgetChange).toHaveBeenCalledWith(40)
  })

  test('keyboard navigation works - ArrowUp increments', async () => {
    const user = userEvent.setup()
    render(
      <BudgetSlider
        budget={50}
        onBudgetChange={mockOnBudgetChange}
        min={0}
        max={200}
        step={10}
      />
    )
    
    const slider = screen.getByRole('slider')
    slider.focus()
    await user.keyboard('{ArrowUp}')
    
    expect(mockOnBudgetChange).toHaveBeenCalledWith(60)
  })

  test('keyboard navigation works - ArrowDown decrements', async () => {
    const user = userEvent.setup()
    render(
      <BudgetSlider
        budget={50}
        onBudgetChange={mockOnBudgetChange}
        min={0}
        max={200}
        step={10}
      />
    )
    
    const slider = screen.getByRole('slider')
    slider.focus()
    await user.keyboard('{ArrowDown}')
    
    expect(mockOnBudgetChange).toHaveBeenCalledWith(40)
  })

  test('keyboard navigation - Home key sets to minimum', async () => {
    const user = userEvent.setup()
    render(
      <BudgetSlider
        budget={50}
        onBudgetChange={mockOnBudgetChange}
        min={0}
        max={200}
        step={10}
      />
    )
    
    const slider = screen.getByRole('slider')
    slider.focus()
    await user.keyboard('{Home}')
    
    expect(mockOnBudgetChange).toHaveBeenCalledWith(0)
  })

  test('keyboard navigation - End key sets to maximum', async () => {
    const user = userEvent.setup()
    render(
      <BudgetSlider
        budget={50}
        onBudgetChange={mockOnBudgetChange}
        min={0}
        max={200}
        step={10}
      />
    )
    
    const slider = screen.getByRole('slider')
    slider.focus()
    await user.keyboard('{End}')
    
    expect(mockOnBudgetChange).toHaveBeenCalledWith(200)
  })

  test('min/max/step values are enforced', () => {
    render(
      <BudgetSlider
        budget={50}
        onBudgetChange={mockOnBudgetChange}
        min={0}
        max={200}
        step={10}
      />
    )
    
    const slider = screen.getByRole('slider')
    expect(slider).toHaveAttribute('min', '0')
    expect(slider).toHaveAttribute('max', '200')
    expect(slider).toHaveAttribute('step', '10')
  })

  test('does not exceed max value on increment', async () => {
    const user = userEvent.setup()
    render(
      <BudgetSlider
        budget={195}
        onBudgetChange={mockOnBudgetChange}
        min={0}
        max={200}
        step={10}
      />
    )
    
    const slider = screen.getByRole('slider')
    slider.focus()
    await user.keyboard('{ArrowRight}')
    
    expect(mockOnBudgetChange).toHaveBeenCalledWith(200)
  })

  test('does not go below min value on decrement', async () => {
    const user = userEvent.setup()
    render(
      <BudgetSlider
        budget={5}
        onBudgetChange={mockOnBudgetChange}
        min={0}
        max={200}
        step={10}
      />
    )
    
    const slider = screen.getByRole('slider')
    slider.focus()
    await user.keyboard('{ArrowLeft}')
    
    expect(mockOnBudgetChange).toHaveBeenCalledWith(0)
  })

  test('has aria-live region for screen readers', () => {
    render(
      <BudgetSlider
        budget={50}
        onBudgetChange={mockOnBudgetChange}
      />
    )
    
    const liveRegion = screen.getByText('$50/mo')
    expect(liveRegion).toHaveAttribute('aria-live', 'polite')
    expect(liveRegion).toHaveAttribute('aria-atomic', 'true')
  })

  test('has focus-visible styles', () => {
    render(
      <BudgetSlider
        budget={50}
        onBudgetChange={mockOnBudgetChange}
      />
    )
    
    const slider = screen.getByRole('slider')
    expect(slider).toHaveClass('focus:outline-none')
    expect(slider).toHaveClass('focus:ring-2')
  })
})

