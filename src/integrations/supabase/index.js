import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

// ... (keep existing code)

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newUser) => {
      console.log('Adding user:', newUser);
      const { data, error } = await supabase.from('users').insert([newUser]);
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      toast.success('User added successfully');
    },
    onError: (error) => {
      toast.error(`Error adding user: ${error.message}`);
    }
  });
};

// ... (keep other existing code)