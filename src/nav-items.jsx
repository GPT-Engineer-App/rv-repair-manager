import { Home, Settings, FileText, Users, BarChart, Wrench } from "lucide-react";
import Dashboard from "./pages/Dashboard.jsx";
import JobConfiguration from "./pages/JobConfiguration.jsx";
import EstimateBuilder from "./pages/EstimateBuilder.jsx";
import CustomerDetails from "./pages/CustomerDetails.jsx";
import EstimatesManagement from "./pages/EstimatesManagement.jsx";
import SettingsAdmin from "./pages/SettingsAdmin.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Dashboard",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Dashboard />,
  },
  {
    title: "Job Configuration",
    to: "/job-configuration",
    icon: <Wrench className="h-4 w-4" />,
    page: <JobConfiguration />,
  },
  {
    title: "Estimate Builder",
    to: "/estimate-builder",
    icon: <FileText className="h-4 w-4" />,
    page: <EstimateBuilder />,
  },
  {
    title: "Customer Details",
    to: "/customer-details",
    icon: <Users className="h-4 w-4" />,
    page: <CustomerDetails />,
  },
  {
    title: "Estimates Management",
    to: "/estimates-management",
    icon: <BarChart className="h-4 w-4" />,
    page: <EstimatesManagement />,
  },
  {
    title: "Settings & Admin",
    to: "/settings-admin",
    icon: <Settings className="h-4 w-4" />,
    page: <SettingsAdmin />,
  },
];