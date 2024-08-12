import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const JobConfiguration = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Configuration</h1>
      <Card>
        <CardHeader>
          <CardTitle>Configure Job</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Input placeholder="Job Name" />
            <Input placeholder="Parts" />
            <Input placeholder="Price" type="number" />
            <Input placeholder="Labor Rate" type="number" />
            <div className="flex space-x-2">
              <Button type="submit">Save</Button>
              <Button variant="outline">Update</Button>
              <Button variant="destructive">Delete</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default JobConfiguration
