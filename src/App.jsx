import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Plans from "./pages/Plans";
import Join from "./pages/Join";
import MemberList from "./pages/MemberList";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/join" element={<Join />} />
        <Route path="/members" element={<MemberList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;