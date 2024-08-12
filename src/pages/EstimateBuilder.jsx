import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const EstimateBuilder = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Estimate Builder</h1>
      <Card>
        <CardHeader>
          <CardTitle>Build Estimate</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Job" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="job1">Job 1</SelectItem>
                <SelectItem value="job2">Job 2</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Customer Name" />
            <Input placeholder="Unit Details" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Customer Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Deductible" type="number" />
            <div className="flex space-x-2">
              <Button type="submit">Save Estimate</Button>
              <Button variant="outline">Print Estimate</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default EstimateBuilder
