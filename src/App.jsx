import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Leaderboard from "./Components/Leaderboard";
import MemberReport from "./Components/MemberReport"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Leaderboard />} />
        <Route path="/member-report/:id" element={<MemberReport />} /> 
      </Routes>
    </Router>
  );
}

export default App;
