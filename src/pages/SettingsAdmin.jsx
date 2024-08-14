import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import UserManagement from "@/components/UserManagement"
import { useState } from "react"

const SettingsAdmin = () => {
  const [darkMode, setDarkMode] = useState(false)

  const handleThemeChange = () => {
    setDarkMode(!darkMode)
    // Here you would typically implement the logic to actually change the theme
    // This might involve updating a context, local storage, or calling a theme switching function
  }

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
            <div className="flex items-center space-x-2">
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={handleThemeChange}
              />
              <Label htmlFor="dark-mode">Dark Theme</Label>
            </div>
            <Button className="mt-4">Save Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SettingsAdmin