import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LiveMatches from "./pages/LiveMatches";
import Standings from "./pages/Standings";
import Home from "./pages/Home";


export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/live" element={<LiveMatches />} />
        <Route path="/standings" element={<Standings />} />
      </Routes>
    </Layout>
  );
}