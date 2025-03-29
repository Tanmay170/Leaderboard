import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Leaderboard from "./Components/Leaderboard";
import MemberReport from "./Components/MemberReport"; 
import MemberAttendanceReport from "./Components/MemberAttendanceReport";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Leaderboard />} />
        <Route path="/member/:id" element={<MemberReport />} />
        <Route path="/member/:id/attendance" element={<MemberAttendanceReport />} /> 
      </Routes>
    </Router>
  );
}

export default App;
