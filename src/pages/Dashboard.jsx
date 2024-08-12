import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Users, FileText, Settings, DollarSign, Clock, UserPlus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useEstimates, useCustomers } from "@/integrations/supabase"

const Dashboard = () => {
  const navigate = useNavigate()
  const { data: estimates } = useEstimates()
  const { data: customers } = useCustomers()

  const totalEstimates = estimates?.length || 0
  const pendingEstimates = estimates?.filter(e => e.status === 'pending').length || 0
  const totalCustomers = customers?.length || 0
  const totalRevenue = estimates?.reduce((sum, e) => sum + (e.estimate_total || 0), 0) || 0

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Estimates</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEstimates}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Estimates</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingEstimates}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
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
              {estimates?.slice(0, 5).map(estimate => (
                <li key={estimate.id}>Estimate #{estimate.id} - {estimate.customer_name}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button className="flex items-center justify-center" onClick={() => navigate('/estimate-builder')}>
              <FileText className="mr-2 h-4 w-4" /> New Estimate
            </Button>
            <Button className="flex items-center justify-center" onClick={() => navigate('/customer-details')}>
              <UserPlus className="mr-2 h-4 w-4" /> Add Customer
            </Button>
            <Button className="flex items-center justify-center" onClick={() => navigate('/estimates-management')}>
              <BarChart className="mr-2 h-4 w-4" /> View Reports
            </Button>
            <Button className="flex items-center justify-center" onClick={() => navigate('/settings-admin')}>
              <Settings className="mr-2 h-4 w-4" /> Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
