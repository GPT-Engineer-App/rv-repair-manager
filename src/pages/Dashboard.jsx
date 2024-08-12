import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Users, FileText, Settings } from "lucide-react"

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Estimates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pending Estimates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">156</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Revenue This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$12,450</div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Estimates</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>Estimate #1234 - John Doe</li>
              <li>Estimate #1235 - Jane Smith</li>
              <li>Estimate #1236 - Bob Johnson</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button className="flex items-center justify-center">
              <FileText className="mr-2 h-4 w-4" /> New Estimate
            </Button>
            <Button className="flex items-center justify-center">
              <Users className="mr-2 h-4 w-4" /> Add Customer
            </Button>
            <Button className="flex items-center justify-center">
              <BarChart className="mr-2 h-4 w-4" /> View Reports
            </Button>
            <Button className="flex items-center justify-center">
              <Settings className="mr-2 h-4 w-4" /> Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
