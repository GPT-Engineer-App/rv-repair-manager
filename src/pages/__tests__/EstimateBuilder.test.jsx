import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import EstimateBuilder from '../EstimateBuilder'
import { useRealtimePreConfiguredRoofJobs, useCustomers, useAddEstimate } from '@/integrations/supabase'

// Mock the hooks
jest.mock('@/integrations/supabase', () => ({
  useRealtimePreConfiguredRoofJobs: jest.fn(),
  useCustomers: jest.fn(),
  useAddEstimate: jest.fn(),
}))

const queryClient = new QueryClient()

const renderWithProviders = (ui) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  )
}

describe('EstimateBuilder', () => {
  beforeEach(() => {
    useRealtimePreConfiguredRoofJobs.mockReturnValue({ data: [], isLoading: false })
    useCustomers.mockReturnValue({ data: [], isLoading: false })
    useAddEstimate.mockReturnValue({ mutate: jest.fn(), isLoading: false, isError: false, error: null })
  })

  it('renders without crashing', () => {
    renderWithProviders(<EstimateBuilder />)
    expect(screen.getByText('Estimate Builder')).toBeInTheDocument()
  })

  it('allows user to input estimate data', async () => {
    renderWithProviders(<EstimateBuilder />)
    
    fireEvent.change(screen.getByPlaceholderText('Advisor'), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByPlaceholderText('Payment Type'), { target: { value: 'Credit Card' } })
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Advisor')).toHaveValue('John Doe')
      expect(screen.getByPlaceholderText('Payment Type')).toHaveValue('Credit Card')
    })
  })

  it('submits the form with correct data', async () => {
    const mockAddEstimate = jest.fn()
    useAddEstimate.mockReturnValue({ mutate: mockAddEstimate, isLoading: false, isError: false, error: null })

    renderWithProviders(<EstimateBuilder />)
    
    fireEvent.change(screen.getByPlaceholderText('Advisor'), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByPlaceholderText('Payment Type'), { target: { value: 'Credit Card' } })
    
    fireEvent.click(screen.getByText('Save Estimate'))

    await waitFor(() => {
      expect(mockAddEstimate).toHaveBeenCalledWith(
        expect.objectContaining({
          advisor: 'John Doe',
          payment_type: 'Credit Card',
        }),
        expect.any(Object)
      )
    })
  })
})
