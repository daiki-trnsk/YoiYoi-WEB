import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Terms from "./pages/Terms"
import Privacy from "./pages/Privacy"
import Contact from "./pages/Contact"
import HomePage from "./pages/HomePage"
import Signup from "./pages/Signup"
import Timeline from "./pages/Timeline"
import Stats from "./pages/Stats"
import LogNew from "./pages/LogNew"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/log/new" element={<LogNew />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

