import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAddEstimate } from "@/integrations/supabase"

const EstimateBuilder = () => {
  const [activeTab, setActiveTab] = useState("customer")
  const [estimateData, setEstimateData] = useState({
    customer_id: "",
    job_code: "",
    advisor: "",
    payment_type: "",
    deductible: "",
    estimate_date: new Date().toISOString(),
    floor_plywood_osb: "",
    subfloor_adhesive: "",
    screws_washers: "",
    floor_sealant: "",
    underbelly_material: "",
    insulation: "",
    floor_covering: "",
    transition_strips: "",
    floor_trim_molding: "",
    fasteners: "",
    waterproof_membrane: "",
    drainage_system: "",
    ventilation_materials: "",
    epoxy_resin: "",
    joist_reinforcement_materials: "",
    paint_coating: "",
    gasket_material: "",
    hardware_floor_retention: "",
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

  const { mutate: addEstimate, isLoading, isError, error } = useAddEstimate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEstimateData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addEstimate(estimateData)
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
                <Input name="job_code" placeholder="Job Code" onChange={handleInputChange} />
                <Input name="floor_plywood_osb" placeholder="Floor Plywood/OSB" onChange={handleInputChange} />
                <Input name="subfloor_adhesive" placeholder="Subfloor Adhesive" onChange={handleInputChange} />
                <Input name="screws_washers" placeholder="Screws and Washers" onChange={handleInputChange} />
                <Input name="floor_sealant" placeholder="Floor Sealant" onChange={handleInputChange} />
                <Input name="underbelly_material" placeholder="Underbelly Material" onChange={handleInputChange} />
                <Input name="insulation" placeholder="Insulation" onChange={handleInputChange} />
                <Input name="floor_covering" placeholder="Floor Covering" onChange={handleInputChange} />
                <Input name="transition_strips" placeholder="Transition Strips" onChange={handleInputChange} />
                <Input name="floor_trim_molding" placeholder="Floor Trim and Molding" onChange={handleInputChange} />
                <Input name="fasteners" placeholder="Fasteners" onChange={handleInputChange} />
                <Input name="waterproof_membrane" placeholder="Waterproof Membrane" onChange={handleInputChange} />
                <Input name="drainage_system" placeholder="Drainage System" onChange={handleInputChange} />
                <Input name="ventilation_materials" placeholder="Ventilation Materials" onChange={handleInputChange} />
                <Input name="epoxy_resin" placeholder="Epoxy Resin" onChange={handleInputChange} />
                <Input name="joist_reinforcement_materials" placeholder="Joist Reinforcement Materials" onChange={handleInputChange} />
                <Input name="paint_coating" placeholder="Paint or Coating" onChange={handleInputChange} />
                <Input name="gasket_material" placeholder="Gasket Material" onChange={handleInputChange} />
                <Input name="hardware_floor_retention" placeholder="Hardware for Floor Retention" onChange={handleInputChange} />
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
