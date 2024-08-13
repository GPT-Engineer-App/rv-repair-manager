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

/* supabase integration types

### customers

| name    | type    | format | required |
|---------|---------|--------|----------|
| id      | integer | number | true     |
| name    | text    | string | true     |
| address | text    | string | true     |
| phone   | text    | string | true     |
| email   | text    | string | false    |

### pre_configured_floor_jobs

| name          | type    | format | required |
|---------------|---------|--------|----------|
| id            | integer | number | true     |
| job_code      | text    | string | true     |
| parts         | jsonb   | object | false    |
| prices        | jsonb   | object | false    |
| labor_hours   | numeric | number | false    |
| sublet_costs  | numeric | number | false    |
| shop_supplies | numeric | number | false    |
| taxes         | numeric | number | false    |
| job_totals    | numeric | number | false    |

### pre_configured_roof_jobs

| name          | type    | format | required |
|---------------|---------|--------|----------|
| id            | integer | number | true     |
| job_code      | text    | string | true     |
| parts         | jsonb   | object | false    |
| prices        | jsonb   | object | false    |
| labor_hours   | numeric | number | false    |
| sublet_costs  | numeric | number | false    |
| shop_supplies | numeric | number | false    |
| taxes         | numeric | number | false    |
| job_totals    | numeric | number | false    |

### estimates

| name               | type                     | format | required |
|--------------------|--------------------------|--------|----------|
| id                 | integer                  | number | true     |
| customer_id        | integer                  | number | false    |
| job_code           | text                     | string | false    |
| advisor            | text                     | string | false    |
| payment_type       | text                     | string | false    |
| deductible         | numeric                  | number | false    |
| estimate_date      | timestamp without time zone | string | false    |
| roof_kit           | jsonb                    | object | false    |
| roof_membrane      | jsonb                    | object | false    |
| floor_materials    | jsonb                    | object | false    |
| roofing_screws     | jsonb                    | object | false    |
| glue               | jsonb                    | object | false    |
| additional_parts   | jsonb                    | object | false    |
| repair_description | text                     | string | false    |
| notes              | text                     | string | false    |
| hours              | numeric                  | number | false    |
| labor_per_hour     | numeric                  | number | false    |
| sublet             | jsonb                    | object | false    |
| extras             | jsonb                    | object | false    |
| labor              | jsonb                    | object | false    |
| shop_supplies      | numeric                  | number | false    |
| tax                | numeric                  | number | false    |

### users

| name       | type                    | format | required |
|------------|-------------------------|--------|----------|
| id         | uuid                    | string | true     |
| email      | text                    | string | true     |
| first_name | text                    | string | false    |
| last_name  | text                    | string | false    |
| role       | text                    | string | false    |
| created_at | timestamp with time zone | string | true     |

### pre_configured_jobs

| name             | type    | format | required |
|------------------|---------|--------|----------|
| id               | integer | number | true     |
| job_code         | text    | string | true     |
| type             | text    | string | true     |
| parts            | jsonb   | object | false    |
| prices           | jsonb   | object | false    |
| labor_hour_rates | numeric | number | false    |
| labor_hours      | numeric | number | false    |
| sublet_costs     | numeric | number | false    |
| shop_supplies    | numeric | number | false    |
| taxes            | numeric | number | false    |
| job_totals       | numeric | number | false    |

*/

// Customers
export const useCustomers = () => useQuery({
    queryKey: ['customers'],
    queryFn: () => fromSupabase(supabase.from('customers').select('*')),
});

export const useCustomer = (id) => useQuery({
    queryKey: ['customers', id],
    queryFn: () => fromSupabase(supabase.from('customers').select('*').eq('id', id).single()),
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

// Pre-configured Floor Jobs
export const usePreConfiguredFloorJobs = () => useQuery({
    queryKey: ['preConfiguredFloorJobs'],
    queryFn: () => fromSupabase(supabase.from('pre_configured_floor_jobs').select('*')),
});

export const usePreConfiguredFloorJob = (id) => useQuery({
    queryKey: ['preConfiguredFloorJobs', id],
    queryFn: () => fromSupabase(supabase.from('pre_configured_floor_jobs').select('*').eq('id', id).single()),
});

export const useAddPreConfiguredFloorJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newJob) => fromSupabase(supabase.from('pre_configured_floor_jobs').insert([newJob])),
        onSuccess: () => {
            queryClient.invalidateQueries('preConfiguredFloorJobs');
        },
    });
};

export const useUpdatePreConfiguredFloorJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('pre_configured_floor_jobs').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('preConfiguredFloorJobs');
        },
    });
};

export const useDeletePreConfiguredFloorJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('pre_configured_floor_jobs').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('preConfiguredFloorJobs');
        },
    });
};

// Pre-configured Roof Jobs
export const usePreConfiguredRoofJobs = () => useQuery({
    queryKey: ['preConfiguredRoofJobs'],
    queryFn: () => fromSupabase(supabase.from('pre_configured_roof_jobs').select('*')),
});

export const usePreConfiguredRoofJob = (id) => useQuery({
    queryKey: ['preConfiguredRoofJobs', id],
    queryFn: () => fromSupabase(supabase.from('pre_configured_roof_jobs').select('*').eq('id', id).single()),
});

export const useAddPreConfiguredRoofJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newJob) => fromSupabase(supabase.from('pre_configured_roof_jobs').insert([newJob])),
        onSuccess: () => {
            queryClient.invalidateQueries('preConfiguredRoofJobs');
        },
    });
};

export const useUpdatePreConfiguredRoofJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('pre_configured_roof_jobs').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('preConfiguredRoofJobs');
        },
    });
};

export const useDeletePreConfiguredRoofJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('pre_configured_roof_jobs').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('preConfiguredRoofJobs');
        },
    });
};

// Estimates
export const useEstimates = () => useQuery({
    queryKey: ['estimates'],
    queryFn: () => fromSupabase(supabase.from('estimates').select('*')),
});

export const useEstimate = (id) => useQuery({
    queryKey: ['estimates', id],
    queryFn: () => fromSupabase(supabase.from('estimates').select('*').eq('id', id).single()),
});

export const useAddEstimate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newEstimate) => fromSupabase(supabase.from('estimates').insert([newEstimate])),
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

// Users
export const useUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: () => fromSupabase(supabase.from('users').select('*')),
});

export const useUser = (id) => useQuery({
    queryKey: ['users', id],
    queryFn: () => fromSupabase(supabase.from('users').select('*').eq('id', id).single()),
});

export const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newUser) => fromSupabase(supabase.from('users').insert([newUser])),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('users').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('users').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

// Pre-configured Jobs
export const usePreConfiguredJobs = () => useQuery({
    queryKey: ['preConfiguredJobs'],
    queryFn: () => fromSupabase(supabase.from('pre_configured_jobs').select('*')),
});

export const usePreConfiguredJob = (id) => useQuery({
    queryKey: ['preConfiguredJobs', id],
    queryFn: () => fromSupabase(supabase.from('pre_configured_jobs').select('*').eq('id', id).single()),
});

export const useAddPreConfiguredJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newJob) => fromSupabase(supabase.from('pre_configured_jobs').insert([newJob])),
        onSuccess: () => {
            queryClient.invalidateQueries('preConfiguredJobs');
        },
    });
};

export const useUpdatePreConfiguredJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('pre_configured_jobs').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('preConfiguredJobs');
        },
    });
};

export const useDeletePreConfiguredJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('pre_configured_jobs').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('preConfiguredJobs');
        },
    });
};

// Realtime subscriptions
export const useRealtimePreConfiguredRoofJobs = () => {
    const [jobs, setJobs] = React.useState([]);

    React.useEffect(() => {
        const subscription = supabase
            .channel('pre_configured_roof_jobs')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'pre_configured_roof_jobs' }, payload => {
                console.log('Change received!', payload);
                setJobs(currentJobs => {
                    // Handle the change based on the event type (INSERT, UPDATE, DELETE)
                    // This is a simple example and might need to be adjusted based on your needs
                    switch (payload.eventType) {
                        case 'INSERT':
                            return [...currentJobs, payload.new];
                        case 'UPDATE':
                            return currentJobs.map(job => job.id === payload.new.id ? payload.new : job);
                        case 'DELETE':
                            return currentJobs.filter(job => job.id !== payload.old.id);
                        default:
                            return currentJobs;
                    }
                });
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    return { data: jobs };
};