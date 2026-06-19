import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RecentMatches from "./pages/RecentMatches";
import Standings from "./pages/Standings";
import Home from "./pages/Home";


export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recent" element={<RecentMatches />} />
        <Route path="/standings" element={<Standings />} />
      </Routes>
    </Layout>
  );
}