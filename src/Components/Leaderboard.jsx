import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Trophy, User } from "lucide-react";
import { membersData } from "../data/membersData";

const rankColors = ["text-yellow-500", "text-gray-500", "text-orange-500"];
const trophyColors = ["text-yellow-500", "text-gray-500", "text-orange-500"];

const Leaderboard = () => {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setMembers([...membersData].sort((a, b) => b.points - a.points));
  }, []);

  return (
    <div className="p-6 bg-white min-h-screen flex flex-col items-center w-full">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 drop-shadow-lg">
        Club Leaderboard
      </h1>

      <div className="w-full max-w-6xl bg-gray-100 p-6 rounded-lg shadow-lg border">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-900 border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-lg">
                <th className="p-4">Rank</th>
                <th className="p-4">Member</th>
                <th className="p-4">Tasks</th>
                <th className="p-4">Meetings</th>
                <th className="p-4">Points</th>
                <th className="p-4">Task Progress</th>
                <th className="p-4">Meeting Progress</th>
                <th className="p-4">Report</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, index) => (
                <tr
                  key={member.id}
                  className="border-b border-gray-300 hover:bg-gray-200 transition duration-300 cursor-pointer"
                >
                  <td className={`p-4 font-bold text-lg ${rankColors[index] || "text-gray-900"}`}>
                    <div className="flex items-center gap-2">
                      <span>#{index + 1}</span>
                      {index < 3 && <Trophy className={trophyColors[index]} size={20} />}
                    </div>
                  </td>
                  <td className="p-4 flex items-center mt-6 gap-3">
                    <User className="text-blue-500" size={24} />{" "}
                    <span>{member.name}</span>
                  </td>
                  <td className="p-4">{member.tasksCompleted}</td>
                  <td className="p-4">{member.meetingsAttended}</td>
                  <td className="p-4 font-bold text-blue-500">{member.points} pts</td>
                  <td className="p-4 w-24">
                    <CircularProgressbar
                      value={(member.tasksCompleted / member.totalTasks) * 100}
                      text={`${member.tasksCompleted}/${member.totalTasks}`}
                      styles={buildStyles({
                        textSize: "14px",
                        textColor: "#3b82f6",
                        pathColor: "#3b82f6",
                        trailColor: "#d1d5db",
                      })}
                    />
                  </td>
                  <td className="p-4 w-24">
                    <CircularProgressbar
                      value={(member.meetingsAttended / member.totalMeetings) * 100}
                      text={`${member.meetingsAttended}/${member.totalMeetings}`}
                      styles={buildStyles({
                        textSize: "14px",
                        textColor: "#f97316",
                        pathColor: "#f97316",
                        trailColor: "#d1d5db",
                      })}
                    />
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => navigate(`/member/${member.id}`)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
