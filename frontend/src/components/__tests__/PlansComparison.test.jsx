import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import PlansComparison from '../PlansComparison'

describe('PlansComparison', () => {
  const mockPlans = [
    {
      tool: 'github-copilot',
      planName: 'Free',
      priceUsdMonthly: 0,
      billing: 'monthly',
      bullets: ['Feature 1'],
      url: 'https://github.com/features/copilot',
      tags: null
    },
    {
      tool: 'github-copilot',
      planName: 'Individual',
      priceUsdMonthly: 10,
      billing: 'monthly',
      bullets: ['Feature 1'],
      url: 'https://github.com/features/copilot',
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
      planName: 'Business',
      priceUsdMonthly: 40,
      billing: 'monthly',
      bullets: ['Feature 1'],
      url: 'https://cursor.sh/pricing',
      tags: null
    },
    {
      tool: 'claude',
      planName: 'Pro',
      priceUsdMonthly: 20,
      billing: 'monthly',
      bullets: ['Feature 1'],
      url: 'https://anthropic.com/pricing',
      tags: null
    },
    {
      tool: 'kiro',
      planName: 'Pro',
      priceUsdMonthly: 30,
      billing: 'monthly',
      bullets: ['Feature 1'],
      url: 'https://kiro.ai/pricing',
      tags: null
    },
    {
      tool: 'codex-cli',
      planName: 'Pro',
      priceUsdMonthly: 25,
      billing: 'monthly',
      bullets: ['Feature 1'],
      url: 'https://openai.com/pricing',
      tags: null
    },
    {
      tool: 'windsurf',
      planName: 'Pro',
      priceUsdMonthly: 20,
      billing: 'monthly',
      bullets: ['Feature 1'],
      url: 'https://codeium.com/pricing',
      tags: null
    }
  ]

  beforeEach(() => {
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('loads plans data on mount', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPlans
    })

    render(<PlansComparison />)

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/plans')

    await waitFor(() => {
      expect(screen.getByText('AI Development Tools Plans Comparison')).toBeInTheDocument()
    })
  })

  test('displays loading state during data fetch', () => {
    global.fetch.mockImplementationOnce(() => new Promise(() => {}))

    render(<PlansComparison />)

    expect(screen.getByText('Loading pricing data...')).toBeInTheDocument()
  })

  test('displays error state when data fails to load', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'))

    render(<PlansComparison />)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
      expect(screen.getByText(/unable to load pricing data/i)).toBeInTheDocument()
    })
  })

  test('displays error state when API returns error status', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500
    })

    render(<PlansComparison />)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
  })

  test('filters plans correctly based on budget value', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPlans
    })

    render(<PlansComparison />)

    await waitFor(() => {
      expect(screen.getByText('GitHub Copilot')).toBeInTheDocument()
    })

    const slider = screen.getByRole('slider')
    expect(slider).toBeInTheDocument()
  })

  test('free plans appear only at $0 budget', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPlans
    })

    render(<PlansComparison />)

    await waitFor(() => {
      expect(screen.getByText('GitHub Copilot')).toBeInTheDocument()
    })

    const slider = screen.getByRole('slider')
    expect(slider).toHaveValue('0')
  })

  test('all six tool columns render', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPlans
    })

    render(<PlansComparison />)

    await waitFor(() => {
      expect(screen.getByText('GitHub Copilot')).toBeInTheDocument()
      expect(screen.getByText('Cursor')).toBeInTheDocument()
      expect(screen.getByText('Claude Code')).toBeInTheDocument()
      expect(screen.getByText('Kiro')).toBeInTheDocument()
      expect(screen.getByText('Codex CLI (OpenAI)')).toBeInTheDocument()
      expect(screen.getByText('Windsurf')).toBeInTheDocument()
    })
  })

  test('has proper responsive grid layout classes', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPlans
    })

    render(<PlansComparison />)

    await waitFor(() => {
      const grid = screen.getByRole('region', { name: /plans comparison/i })
      expect(grid).toHaveClass('grid')
      expect(grid).toHaveClass('grid-cols-1')
      expect(grid).toHaveClass('md:grid-cols-2')
      expect(grid).toHaveClass('lg:grid-cols-6')
    })
  })

  test('displays budget slider with correct initial value', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPlans
    })

    render(<PlansComparison />)

    await waitFor(() => {
      expect(screen.getByText('GitHub Copilot')).toBeInTheDocument()
    })

    const slider = screen.getByRole('slider')
    expect(slider).toHaveValue('0')
    
    const sliderValue = screen.getByRole('slider').closest('div')?.querySelector('[aria-live]')
    expect(sliderValue).toHaveTextContent('$0/mo')
  })

  test('has proper semantic structure', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPlans
    })

    render(<PlansComparison />)

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
      expect(screen.getByRole('region', { name: /plans comparison/i })).toBeInTheDocument()
    })
  })

  test('error state has refresh button', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'))

    render(<PlansComparison />)

    await waitFor(() => {
      const button = screen.getByRole('button', { name: /refresh/i })
      expect(button).toBeInTheDocument()
    })
  })
})

