import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { membersData } from "../data/membersData"; 

const MemberReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fix: Ensure `id` is converted to a number
  const member = membersData.find((m) => Number(m.id) === Number(id));

  if (!member) {
    return <div className="text-red-500 text-center mt-10">Member not found!</div>;
  }

  const points = member.tasksCompleted * 40 + member.meetingsAttended * 20; 

  return (
    <div className="p-6 bg-white min-h-screen flex flex-col items-center w-full">
      <motion.h1
        className="text-4xl font-bold text-gray-900 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {member.name}'s Profile
      </motion.h1>
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="flex items-center gap-6">
          <img src={member.profileImage} alt="Profile" className="w-32 h-32 rounded-full shadow-md" />
          <div>
            <p className="text-lg font-semibold">Domain: {member.domain}</p>
            <p className="text-lg font-semibold">Year: {member.year}</p>
            <p className="text-lg font-semibold">Reg No: {member.registrationNumber}</p>
            <p className="text-lg font-semibold">Department: {member.department}</p>
            <p className="text-lg font-semibold">Membership ID: {member.membershipId}</p>
            <p className="text-lg font-semibold">Points: {points} pts</p>
            <div className="flex gap-4 mt-2">
              <a href={member.github} target="_blank" rel="noopener noreferrer">
                <FaGithub className="text-2xl text-gray-900 hover:text-gray-700" />
              </a>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-2xl text-blue-700 hover:text-blue-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="flex gap-6 justify-center mt-6">
          <div className="w-24 h-24">
            <CircularProgressbar
              value={(member.tasksCompleted / member.totalTasks) * 100}
              text={`${member.tasksCompleted}/${member.totalTasks}`}
              styles={buildStyles({
                textSize: "16px",
                pathColor: "#4caf50",
                textColor: "#333",
                trailColor: "#ddd",
              })}
            />
            <p className="text-center mt-2 font-medium">Task Progress</p>
          </div>
          <div className="w-24 h-24">
            <CircularProgressbar
              value={(member.meetingsAttended / member.totalMeetings) * 100}
              text={`${member.meetingsAttended}/${member.totalMeetings}`}
              styles={buildStyles({
                textSize: "16px",
                pathColor: "#ff9800",
                textColor: "#333",
                trailColor: "#ddd",
              })}
            />
            <p className="text-center mt-2 font-medium">Meeting Progress</p>
          </div>
        </div>

        {/* Projects */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Projects Done:</h2>
          <ul className="list-disc ml-5">
            {member.projects.map((project, index) => (
              <li key={index}>{project}</li>
            ))}
          </ul>
        </div>

        {/* Attendance Report Link */}
        <div className="mt-6 flex justify-center">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
            onClick={() => navigate(`/member/${member.id}/attendance`)}
          >
            View Attendance Report
          </button> 
        </div>

      </div>
    </div>
  );
};

export default MemberReport;
