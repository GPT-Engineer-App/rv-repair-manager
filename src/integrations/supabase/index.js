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

/* Supabase Database Schema

### customers
| name    | type | format | required |
|---------|------|--------|----------|
| id      | int8 | number | true     |
| name    | text | string | true     |
| address | text | string | true     |
| phone   | text | string | true     |
| email   | text | string | false    |

### jobs
| name            | type    | format | required |
|-----------------|---------|--------|----------|
| id              | int8    | number | true     |
| job_code        | text    | string | true     |
| name            | text    | string | true     |
| type            | text    | string | true     |
| parts           | jsonb   | json   | false    |
| prices          | jsonb   | json   | false    |
| labor_hour_rate | numeric | number | false    |
| labor_hours     | numeric | number | false    |
| sublet_costs    | numeric | number | false    |
| shop_supplies   | numeric | number | false    |
| taxes           | numeric | number | false    |
| job_total       | numeric | number | false    |

### estimates
| name               | type                     | format   | required |
|--------------------|--------------------------|----------|----------|
| id                 | int8                     | number   | true     |
| customer_id        | int8                     | number   | true     |
| job_id             | int8                     | number   | true     |
| advisor            | text                     | string   | false    |
| payment_type       | text                     | string   | false    |
| deductible         | numeric                  | number   | false    |
| estimate_date      | timestamp with time zone | datetime | true     |
| repair_description | text                     | string   | false    |
| notes              | text                     | string   | false    |
| total_parts        | numeric                  | number   | false    |
| total_labor        | numeric                  | number   | false    |
| total_sublet       | numeric                  | number   | false    |
| total_shop_supplies| numeric                  | number   | false    |
| total_tax          | numeric                  | number   | false    |
| estimate_total     | numeric                  | number   | false    |
*/

// Customers
export const useCustomers = () => useQuery({
    queryKey: ['customers'],
    queryFn: () => fromSupabase(supabase.from('customers').select('*'))
});

export const useCustomer = (id) => useQuery({
    queryKey: ['customers', id],
    queryFn: () => fromSupabase(supabase.from('customers').select('*').eq('id', id).single())
});

export const useAddCustomer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newCustomer) => fromSupabase(supabase.from('customers').insert([newCustomer])),
        onSuccess: () => {
            queryClient.invalidateQueries('customers');
        },
    });
};

export const useUpdateCustomer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('customers').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('customers');
        },
    });
};

export const useDeleteCustomer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('customers').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('customers');
        },
    });
};

// Jobs
export const useJobs = () => useQuery({
    queryKey: ['jobs'],
    queryFn: () => fromSupabase(supabase.from('jobs').select('*'))
});

export const useJob = (id) => useQuery({
    queryKey: ['jobs', id],
    queryFn: () => fromSupabase(supabase.from('jobs').select('*').eq('id', id).single())
});

export const useAddJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newJob) => fromSupabase(supabase.from('jobs').insert([newJob])),
        onSuccess: () => {
            queryClient.invalidateQueries('jobs');
        },
    });
};

export const useUpdateJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('jobs').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('jobs');
        },
    });
};

export const useDeleteJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('jobs').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('jobs');
        },
    });
};

// Estimates
export const useEstimates = () => useQuery({
    queryKey: ['estimates'],
    queryFn: () => fromSupabase(supabase.from('estimates').select('*'))
});

export const useEstimate = (id) => useQuery({
    queryKey: ['estimates', id],
    queryFn: () => fromSupabase(supabase.from('estimates').select('*').eq('id', id).single())
});

export const useAddEstimate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newEstimate) => fromSupabase(supabase.from('floor_estimates').insert([newEstimate])),
        onSuccess: () => {
            queryClient.invalidateQueries('estimates');
        },
    });
};

export const useUpdateEstimate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('estimates').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('estimates');
        },
    });
};

export const useDeleteEstimate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('estimates').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('estimates');
        },
    });
};
