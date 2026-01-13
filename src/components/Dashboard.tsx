import ChartData from "./ChartData"
import { Button } from "./ui/button"

const Dashboard = () => {
  return (
    <div className='grow p-4 md:p-8'>
        <div className="md:flex items-center justify-between">
            <h1 className="hidden md:block text-xl md:text-2xl lg:text-4xl font-medium text-gray-900">Dashboard Overview</h1>
            
            <div>
                <Button className="mr-1">Export PDF</Button>
                <Button>Export Excel</Button>
            </div>
        </div>
        <ChartData/>
    </div>
  )
}

export default Dashboard