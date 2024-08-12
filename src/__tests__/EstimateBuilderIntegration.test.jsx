import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SupabaseProvider } from '@/integrations/supabase'
import EstimateBuilder from '../pages/EstimateBuilder'

const queryClient = new QueryClient()

const renderWithProviders = (ui) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <SupabaseProvider>
        {ui}
      </SupabaseProvider>
    </QueryClientProvider>
  )
}

describe('EstimateBuilder Integration', () => {
  it('fetches pre-configured jobs and customers from Supabase', async () => {
    renderWithProviders(<EstimateBuilder />)
    
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })

    // Check if the job and customer selects are populated
    expect(screen.getByText('Select Pre-configured Job')).toBeInTheDocument()
    expect(screen.getByText('Select Customer')).toBeInTheDocument()
  })

  it('submits a new estimate to Supabase', async () => {
    renderWithProviders(<EstimateBuilder />)
    
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })

    fireEvent.change(screen.getByPlaceholderText('Advisor'), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByPlaceholderText('Payment Type'), { target: { value: 'Credit Card' } })
    
    fireEvent.click(screen.getByText('Save Estimate'))

    await waitFor(() => {
      expect(screen.getByText('Estimate Created')).toBeInTheDocument()
    })
  })
})
