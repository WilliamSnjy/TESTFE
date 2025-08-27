import { BrowserRouter, Routes, Route } from "react-router-dom"
import Meeting from "./pages/meeting"
import PesanRuangan from "./pages/PesanRuangan"
import Dashboard from "./pages/Dashboard"

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Meeting />}/>
          <Route path="/pesanruang" element={<PesanRuangan />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
