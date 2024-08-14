import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useUpdateUser } from "@/integrations/supabase";

const EditUserForm = ({ userId, onClose, initialData }) => {
  const [name, setName] = useState(initialData.name || '');
  const [email, setEmail] = useState(initialData.email || '');
  const [role, setRole] = useState(initialData.role || '');
  const [dealership, setDealership] = useState(initialData.dealership || '');

  const updateUser = useUpdateUser();
  const { toast } = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateUser.mutateAsync({ id: userId, name, email, role, dealership });
      toast({ title: "User updated successfully" });
      onClose();
    } catch (error) {
      toast({ title: "Error updating user", description: error.message, variant: "destructive" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="role">Role</Label>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger>
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="advisor">Advisor</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="dealership">Dealership</Label>
        <Input id="dealership" value={dealership} onChange={(e) => setDealership(e.target.value)} required />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit">Update User</Button>
      </div>
    </form>
  );
};

export default EditUserForm;