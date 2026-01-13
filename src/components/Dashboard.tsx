import { useState } from "react"
import ChartData from "./ChartData"
import ExportForm from "./ExportForm"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"

const Dashboard = () => {
  const [isExportOpen, setIsExportOpen] = useState(false)
  return (
    <div className="grow p-4 md:p-8 space-y-6">
      <div className="md:flex items-center justify-between">
        <h1 className="hidden md:block text-xl md:text-2xl lg:text-4xl font-medium text-gray-900">
          Dashboard Overview
        </h1>
        <Button onClick={() => setIsExportOpen(true)}>Export Excel</Button>
      </div>

      <Dialog open={isExportOpen} onOpenChange={setIsExportOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Export Data</DialogTitle>
            <DialogDescription>
              Select data type and apply filters to export your data as Excel.
            </DialogDescription>
          </DialogHeader>
          <ExportForm onClose={() => setIsExportOpen(false)} />
        </DialogContent>
      </Dialog>

      <ChartData />
    </div>
  )
}

export default Dashboard