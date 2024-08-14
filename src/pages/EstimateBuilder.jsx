import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAddEstimate, usePreConfiguredRoofJobs, useCustomers, useUsers } from "@/integrations/supabase"
import { useToast } from "@/components/ui/use-toast"

const EstimateBuilder = () => {
  const [activeTab, setActiveTab] = useState("customer")
  const [estimateData, setEstimateData] = useState({
    customer_id: "",
    job_code: "",
    advisor: "",
    payment_type: "",
    deductible: "",
    estimate_date: new Date().toISOString(),
    roof_kit: "",
    roof_membrane: "",
    slf_leveling_dicor: "",
    non_leveling_dicor: "",
    roof_screws: "",
    glue: "",
    additional_parts: [],
    repair_description: "",
    notes: "",
    hours: "",
    labor_per_hour: "",
    sublet: "",
    extras: "",
    labor: "",
    shop_supplies: "",
    tax: ""
  })

  const { data: preConfiguredJobs, isLoading: jobsLoading } = usePreConfiguredRoofJobs()
  const { data: customers, isLoading: customersLoading } = useCustomers()
  const { data: users, isLoading: usersLoading } = useUsers()
  const { mutate: addEstimate, isLoading, isError, error } = useAddEstimate()
  const { toast } = useToast()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEstimateData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addEstimate(estimateData, {
      onSuccess: () => {
        toast({
          title: "Estimate Created",
          description: "Your estimate has been successfully created.",
        })
        // Reset form or navigate to a different page
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: `Failed to create estimate: ${error.message}`,
          variant: "destructive",
        })
      }
    })
  }

  if (jobsLoading || customersLoading || usersLoading) {
    return <div>Loading...</div>
  }

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
                <Select name="customer_id" onValueChange={(value) => handleInputChange({ target: { name: 'customer_id', value } })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers?.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id.toString()}>{customer.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select name="advisor" onValueChange={(value) => handleInputChange({ target: { name: 'advisor', value } })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Advisor" />
                  </SelectTrigger>
                  <SelectContent>
                    {users?.filter(user => user.role === 'advisor').map((advisor) => (
                      <SelectItem key={advisor.id} value={advisor.id.toString()}>{advisor.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input name="payment_type" placeholder="Payment Type" onChange={handleInputChange} />
                <Input name="deductible" placeholder="Deductible" type="number" onChange={handleInputChange} />
                <Input name="estimate_date" placeholder="Estimate Date" type="datetime-local" onChange={handleInputChange} />
                <Button onClick={() => setActiveTab("job")}>Next</Button>
              </form>
            </TabsContent>
            {/* ... rest of the component remains the same ... */}
          </CardContent>
        </Card>
      </Tabs>
    </div>
  )
}

export default EstimateBuilder