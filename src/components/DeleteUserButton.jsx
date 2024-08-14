import React from 'react';
import { Button } from "@/components/ui/button";
import { useDeleteUser } from "@/integrations/supabase";
import { useToast } from "@/components/ui/use-toast";

const DeleteUserButton = ({ userId, onDelete }) => {
  const deleteUser = useDeleteUser();
  const { toast } = useToast();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser.mutateAsync(userId);
        toast({ title: "User deleted successfully" });
        onDelete();
      } catch (error) {
        toast({ 
          title: "Error deleting user", 
          description: error.message, 
          variant: "destructive" 
        });
      }
    }
  };

  return (
    <Button 
      variant="destructive" 
      size="sm" 
      onClick={handleDelete}
      disabled={deleteUser.isLoading}
    >
      {deleteUser.isLoading ? 'Deleting...' : 'Delete User'}
    </Button>
  );
};

export default DeleteUserButton;