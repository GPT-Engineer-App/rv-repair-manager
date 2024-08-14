import React, { useState } from 'react';
import { useAddUser } from '@/integrations/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const AddUserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [dealership, setDealership] = useState('');

  const addUser = useAddUser();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addUser.mutateAsync({ name, email, role, dealership });
      setName('');
      setEmail('');
      setRole('');
      setDealership('');
      toast({ title: "User added successfully" });
    } catch (error) {
      toast({ title: "Error adding user", description: error.message, variant: "destructive" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        name="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Select name="role" onValueChange={(value) => setRole(value)} value={role}>
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
        value={dealership}
        onChange={(e) => setDealership(e.target.value)}
        required
      />
      <Button type="submit">Add User</Button>
    </form>
  );
};

export default AddUserForm;