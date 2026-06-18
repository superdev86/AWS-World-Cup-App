import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LiveMatches from "./pages/LiveMatches";
import Schedule from "./pages/Schedule";
import Standings from "./pages/Standings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/live" element={<LiveMatches />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/standings" element={<Standings />} />
      </Routes>
    </BrowserRouter>
  );
}