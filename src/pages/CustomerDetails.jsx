import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const CustomerDetails = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Customer Details</h1>
      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
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
              <Button variant="destructive">Remove</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CustomerDetails
