import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import UserManagement from "@/components/UserManagement"

const SettingsAdmin = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Settings & Admin</h1>
      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <UserManagement />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>App Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input id="theme" type="checkbox" className="w-4 h-4" />
                <label htmlFor="theme">Dark Theme</label>
              </div>
              <Input placeholder="API Key" />
              <Button>Save Settings</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SettingsAdmin