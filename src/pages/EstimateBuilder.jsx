import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react"
import { useAddEstimate, useRealtimePreConfiguredRoofJobs, useCustomers } from "@/integrations/supabase"
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

  const { data: preConfiguredJobs, isLoading: jobsLoading } = useRealtimePreConfiguredRoofJobs()
  const { data: customers, isLoading: customersLoading } = useCustomers()
  const { mutate: addEstimate, isLoading, isError, error } = useAddEstimate()
  const { toast } = useToast()

  useEffect(() => {
    if (preConfiguredJobs && preConfiguredJobs.length > 0) {
      console.log("Pre-configured jobs updated:", preConfiguredJobs);
    }
  }, [preConfiguredJobs]);

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

  if (jobsLoading || customersLoading) {
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
                    <SelectItem value="1">John Doe</SelectItem>
                    <SelectItem value="2">Jane Smith</SelectItem>
                  </SelectContent>
                </Select>
                <Input name="advisor" placeholder="Advisor" onChange={handleInputChange} />
                <Input name="payment_type" placeholder="Payment Type" onChange={handleInputChange} />
                <Input name="deductible" placeholder="Deductible" type="number" onChange={handleInputChange} />
                <Input name="estimate_date" placeholder="Estimate Date" type="datetime-local" onChange={handleInputChange} />
                <Button onClick={() => setActiveTab("job")}>Next</Button>
              </form>
            </TabsContent>
            <TabsContent value="job">
              <h2 className="text-2xl font-semibold mb-4">Job Details</h2>
              <form className="space-y-4">
                <Select name="job_code" onValueChange={(value) => handleInputChange({ target: { name: 'job_code', value } })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Pre-configured Job" />
                  </SelectTrigger>
                  <SelectContent>
                    {preConfiguredJobs?.map((job) => (
                      <SelectItem key={job.job_code} value={job.job_code}>{job.job_name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input name="roof_kit" placeholder="Roof Kit" onChange={handleInputChange} />
                <Input name="roof_membrane" placeholder="Roof Membrane" onChange={handleInputChange} />
                <Input name="slf_leveling_dicor" placeholder="SLF Leveling Dicor" onChange={handleInputChange} />
                <Input name="non_leveling_dicor" placeholder="Non Leveling Dicor" onChange={handleInputChange} />
                <Input name="roof_screws" placeholder="Roof Screws" onChange={handleInputChange} />
                <Input name="glue" placeholder="Glue" onChange={handleInputChange} />
                <Input name="repair_description" placeholder="Repair Description" onChange={handleInputChange} />
                <Input name="notes" placeholder="Additional Notes" onChange={handleInputChange} />
                <Button onClick={() => setActiveTab("parts")}>Next</Button>
              </form>
            </TabsContent>
            <TabsContent value="parts">
              <h2 className="text-2xl font-semibold mb-4">Parts & Labor</h2>
              <form className="space-y-4">
                <Input name="hours" placeholder="Labor Hours" type="number" onChange={handleInputChange} />
                <Input name="labor_per_hour" placeholder="Labor Rate per Hour" type="number" onChange={handleInputChange} />
                <Input name="sublet" placeholder="Sublet Costs" type="number" onChange={handleInputChange} />
                <Input name="extras" placeholder="Extras" type="number" onChange={handleInputChange} />
                <Input name="labor" placeholder="Total Labor" type="number" onChange={handleInputChange} />
                <Input name="shop_supplies" placeholder="Shop Supplies" type="number" onChange={handleInputChange} />
                <Input name="tax" placeholder="Tax" type="number" onChange={handleInputChange} />
                <Button onClick={() => setActiveTab("summary")}>Next</Button>
              </form>
            </TabsContent>
            <TabsContent value="summary">
              <h2 className="text-2xl font-semibold mb-4">Estimate Summary</h2>
              <div className="space-y-4">
                <p><strong>Customer ID:</strong> {estimateData.customer_id}</p>
                <p><strong>Job Code:</strong> {estimateData.job_code}</p>
                <p><strong>Advisor:</strong> {estimateData.advisor}</p>
                <p><strong>Total Labor:</strong> ${estimateData.labor}</p>
                <p><strong>Total Parts:</strong> ${parseFloat(estimateData.sublet) + parseFloat(estimateData.extras)}</p>
                <p><strong>Shop Supplies:</strong> ${estimateData.shop_supplies}</p>
                <p><strong>Tax:</strong> ${estimateData.tax}</p>
                <p><strong>Total Estimate:</strong> ${
                  parseFloat(estimateData.labor) +
                  parseFloat(estimateData.sublet) +
                  parseFloat(estimateData.extras) +
                  parseFloat(estimateData.shop_supplies) +
                  parseFloat(estimateData.tax)
                }</p>
                <div className="flex space-x-2">
                  <Button onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Estimate'}
                  </Button>
                  <Button variant="outline">Print Estimate</Button>
                </div>
                {isError && <p className="text-red-500">Error: {error.message}</p>}
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  )
}

export default EstimateBuilder
