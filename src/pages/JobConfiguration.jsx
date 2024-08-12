import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const JobConfiguration = () => {
  const [jobs, setJobs] = useState([
    { id: 1, name: "Roof Repair", type: "Roof", laborRate: 50 },
    { id: 2, name: "Floor Installation", type: "Floor", laborRate: 40 },
  ])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Job Configuration</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Add/Edit Job</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <Input placeholder="Job Name" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="roof">Roof</SelectItem>
                  <SelectItem value="floor">Floor</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Labor Rate" type="number" />
              <Input placeholder="Parts (comma-separated)" />
              <div className="flex space-x-2">
                <Button type="submit">Save Job</Button>
                <Button variant="outline">Update</Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Job List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Labor Rate</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>{job.name}</TableCell>
                    <TableCell>{job.type}</TableCell>
                    <TableCell>${job.laborRate}/hr</TableCell>
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

export default JobConfiguration
