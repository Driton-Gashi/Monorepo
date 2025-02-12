import Header from "../components/dashboard/Header"
import Sidebar from "../components/dashboard/Sidebar"
export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div className="relative bg-red-50 overflow-hidden max-h-screen">
{/* Header Here */}
<Header/>
  {/* Sidebar here */}
<Sidebar/>
  {children}
  </div>
    )
  }