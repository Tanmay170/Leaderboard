import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card.jsx";
import { Progress } from "./ui/progress.jsx";
import { motion } from "framer-motion";
import { Trophy, User } from "lucide-react";

const membersData = [
  { id: 1, name: "Aksh", points: 120, tasks: 5, meetings: 4 },
  { id: 2, name: "Ishaan", points: 105, tasks: 4, meetings: 5 },
  { id: 3, name: "Zahra", points: 98, tasks: 3, meetings: 5 },
  { id: 4, name: "Yasha", points: 90, tasks: 4, meetings: 3 },
  { id: 5, name: "Dhruv", points: 87, tasks: 3, meetings: 2 },
  { id: 6, name: "Aryaman", points: 83, tasks: 4, meetings: 2},
];

const rankColors = ["text-yellow-400", "text-gray-400", "text-orange-500"];
const trophyColors = ["text-yellow-500", "text-gray-400", "text-orange-500"];

const Leaderboard = () => {
  const [members, setMembers] = useState([]);
  const maxPoints = Math.max(...membersData.map((member) => member.points));

  useEffect(() => {
    setMembers([...membersData].sort((a, b) => b.points - a.points));
  }, []);

  return (
    <div className="p-6 bg-gray-900 min-h-screen flex flex-col items-center w-full">
      <motion.h1
        className="text-5xl font-extrabold text-white mb-8 drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Interactive Table Leaderboard
      </motion.h1>
      <Card className="w-full max-w-6xl shadow-lg rounded-xl bg-gray-800 p-6 border border-gray-600">
        <CardContent>
          <div className="overflow-x-auto bg-gray-900">
            <table className="w-full text-left text-white border-collapse">
              <thead>
                <tr className="bg-gray-700 text-gray-300">
                  <th className="p-4">Rank</th>
                  <th className="p-4">Member</th>
                  <th className="p-4">Tasks</th>
                  <th className="p-4">Meetings</th>
                  <th className="p-4">Points</th>
                  <th className="p-4">Progress</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member, index) => (
                  <motion.tr
                    key={member.id}
                    className="border-b border-gray-600 hover:bg-gray-700 transition duration-300"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <td className={`p-4 font-bold text-lg ${rankColors[index] || "text-white"}`}>
                      <div className="flex items-center gap-2">
                        <span>#{index + 1}</span>
                        {index < 3 && <Trophy className={trophyColors[index]} size={20} />}
                      </div>
                    </td>
                    <td className="p-4 flex items-center gap-3">
                      <User className="text-blue-400" size={24} /> <span>{member.name}</span>
                    </td>
                    <td className="p-4">{member.tasks}</td>
                    <td className="p-4">{member.meetings}</td>
                    <td className="p-4 font-bold text-blue-300">{member.points} pts</td>
                    <td className="p-4 w-48">
                      <Progress value={(member.points / maxPoints) * 100} className="h-3 w-full bg-gray-600 rounded-full overflow-hidden" />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;
