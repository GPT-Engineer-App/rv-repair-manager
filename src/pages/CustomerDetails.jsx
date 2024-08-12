import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const CustomerDetails = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: "John Doe", address: "123 Main St", phone: "555-1234", email: "john@example.com" },
    { id: 2, name: "Jane Smith", address: "456 Elm St", phone: "555-5678", email: "jane@example.com" },
  ])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Customer Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Add/Edit Customer</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <Input placeholder="Customer Name" />
              <Input placeholder="Address" />
              <Input placeholder="Phone Number" />
              <Input placeholder="Email" type="email" />
              <div className="flex space-x-2">
                <Button type="submit">Add Customer</Button>
                <Button variant="outline">Update</Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Customer List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                      <Button variant="destructive" size="sm">Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CustomerDetails
