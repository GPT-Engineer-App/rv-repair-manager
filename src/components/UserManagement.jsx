import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useUsers, useAddUser, useUpdateUser, useDeleteUser } from "@/integrations/supabase";

const UserManagement = () => {
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '', dealership: '' });
  const [editingUser, setEditingUser] = useState(null);
  const { data: users, isLoading, isError } = useUsers();
  const addUser = useAddUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();
  const { toast } = useToast();

  useEffect(() => {
    // Handle some side effect here, e.g., make an API call
    console.log('Component mounted!');
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await addUser.mutateAsync(newUser);
      setNewUser({ name: '', email: '', role: '', dealership: '' });
      toast({ title: "User added successfully" });
    } catch (error) {
      toast({ title: "Error adding user", description: error.message, variant: "destructive" });
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser(user);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await updateUser.mutateAsync(newUser);
      setEditingUser(null);
      setNewUser({ name: '', email: '', role: '', dealership: '' });
      toast({ title: "User updated successfully" });
    } catch (error) {
      toast({ title: "Error updating user", description: error.message, variant: "destructive" });
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser.mutateAsync(userId);
        toast({ title: "User deleted successfully" });
      } catch (error) {
        toast({ title: "Error deleting user", description: error.message, variant: "destructive" });
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading users</div>;

  return (
    <div className="space-y-6">
      <form onSubmit={editingUser ? handleUpdateUser : handleAddUser} className="space-y-4">
        <Input
          name="name"
          placeholder="Name"
          value={newUser.name}
          onChange={handleInputChange}
          required
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleInputChange}
          required
        />
        <Select name="role" onValueChange={(value) => handleSelectChange("role", value)} value={newUser.role}>
          <SelectTrigger>
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="advisor">Advisor</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>
        <Input
          name="dealership"
          placeholder="Dealership"
          value={newUser.dealership}
          onChange={handleInputChange}
          required
        />
        <Button type="submit">{editingUser ? 'Update User' : 'Add User'}</Button>
        {editingUser && (
          <Button type="button" variant="outline" onClick={() => setEditingUser(null)}>Cancel Edit</Button>
        )}
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Dealership</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.dealership}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditUser(user)}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserManagement;