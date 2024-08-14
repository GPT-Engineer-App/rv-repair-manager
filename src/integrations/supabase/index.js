import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

// Customers
export const useCustomers = () => useQuery(['customers'], () => fromSupabase(supabase.from('customers').select('*')));

// Pre-configured Jobs
export const usePreConfiguredRoofJobs = () => useQuery(['preConfiguredJobs'], () => fromSupabase(supabase.from('pre_configured_jobs').select('*')));

// Estimates
export const useEstimates = () => useQuery(['estimates'], () => fromSupabase(supabase.from('estimates').select('*')));

export const useAddEstimate = () => {
    const queryClient = useQueryClient();
    return useMutation(
        (newEstimate) => fromSupabase(supabase.from('estimates').insert(newEstimate)),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['estimates']);
            },
        }
    );
};

// Add other necessary hooks and functions here