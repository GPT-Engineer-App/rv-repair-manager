import React from 'react';
import { Button } from "@/components/ui/button";
import { useDeleteUser } from "@/integrations/supabase";

const DeleteUserButton = ({ userId, onDelete }) => {
  const deleteUser = useDeleteUser();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser.mutate(userId, {
        onSuccess: () => {
          onDelete();
        }
      });
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