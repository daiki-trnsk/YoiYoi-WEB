import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import LogNew from "./pages/LogNew"
import Stats from "./pages/Stats"
import Timeline from "./pages/Timeline"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lognew" element={<LogNew />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/timeline" element={<Timeline />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

