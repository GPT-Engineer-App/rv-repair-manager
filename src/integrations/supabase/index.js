import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

// ... (keep existing code)

// Users
export const useUsers = () => useQuery({
  queryKey: ['users'],
  queryFn: async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw new Error(error.message);
    return data;
  }
});

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newUser) => {
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

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updateData }) => {
      const { data, error } = await supabase.from('users').update(updateData).eq('id', id);
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      toast.success('User updated successfully');
    },
    onError: (error) => {
      toast.error(`Error updating user: ${error.message}`);
    }
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data, error } = await supabase.from('users').delete().eq('id', id);
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      toast.success('User deleted successfully');
    },
    onError: (error) => {
      toast.error(`Error deleting user: ${error.message}`);
    }
  });
};

// ... (keep other existing code)