import Dashboard from "./components/Dashboard"
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar/>
      <Dashboard/>
    </div>
  )
}

export default App