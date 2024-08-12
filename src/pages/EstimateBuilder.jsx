import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const EstimateBuilder = () => {
  const [activeTab, setActiveTab] = useState("customer")

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Estimate Builder</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="customer">Customer</TabsTrigger>
          <TabsTrigger value="job">Job Details</TabsTrigger>
          <TabsTrigger value="parts">Parts & Labor</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>
        <Card className="mt-6">
          <CardContent className="pt-6">
            <TabsContent value="customer">
              <h2 className="text-2xl font-semibold mb-4">Customer Information</h2>
              <form className="space-y-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer1">John Doe</SelectItem>
                    <SelectItem value="customer2">Jane Smith</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Name" />
                <Input placeholder="Address" />
                <Input placeholder="Phone" />
                <Input placeholder="Email" type="email" />
                <Button onClick={() => setActiveTab("job")}>Next</Button>
              </form>
            </TabsContent>
            <TabsContent value="job">
              <h2 className="text-2xl font-semibold mb-4">Job Details</h2>
              <form className="space-y-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="roof">Roof</SelectItem>
                    <SelectItem value="floor">Floor</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Job Description" />
                <Input placeholder="Estimated Completion Date" type="date" />
                <Button onClick={() => setActiveTab("parts")}>Next</Button>
              </form>
            </TabsContent>
            <TabsContent value="parts">
              <h2 className="text-2xl font-semibold mb-4">Parts & Labor</h2>
              <form className="space-y-4">
                <Input placeholder="Part Name" />
                <Input placeholder="Quantity" type="number" />
                <Input placeholder="Price per Unit" type="number" />
                <Input placeholder="Labor Hours" type="number" />
                <Input placeholder="Labor Rate" type="number" />
                <Button onClick={() => setActiveTab("summary")}>Next</Button>
              </form>
            </TabsContent>
            <TabsContent value="summary">
              <h2 className="text-2xl font-semibold mb-4">Estimate Summary</h2>
              <div className="space-y-4">
                <p><strong>Customer:</strong> John Doe</p>
                <p><strong>Job Type:</strong> Roof</p>
                <p><strong>Total Parts:</strong> $1,000</p>
                <p><strong>Total Labor:</strong> $500</p>
                <p><strong>Total Estimate:</strong> $1,500</p>
                <div className="flex space-x-2">
                  <Button>Save Estimate</Button>
                  <Button variant="outline">Print Estimate</Button>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  )
}

export default EstimateBuilder
