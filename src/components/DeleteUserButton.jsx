import React from 'react';
import { useDeleteUser } from '@/integrations/supabase';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const DeleteUserButton = ({ userId }) => {
  const deleteUser = useDeleteUser();
  const { toast } = useToast();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser.mutateAsync(userId);
        toast({ title: "User deleted successfully" });
      } catch (error) {
        toast({ title: "Error deleting user", description: error.message, variant: "destructive" });
      }
    }
  };

  return (
    <Button variant="destructive" size="sm" onClick={handleDelete}>Delete</Button>
  );
};

export default DeleteUserButton;