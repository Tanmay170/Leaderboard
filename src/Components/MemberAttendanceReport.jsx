import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import membersData from "../data/AttendanceData";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaTrophy } from "react-icons/fa";
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const MemberAttendanceReport = () => {
  const { memberId } = useParams();
  const member = membersData.find((m) => m.id === parseInt(memberId));
  const reportRef = useRef();

  if (!member) {
    return <div className="text-center text-red-500 text-lg font-bold">Member Not Found</div>;
  }
  const totalAttendance = (member.presentDays / member.totalMeetings) * 100;
  let badge = "No Badge";
  if (totalAttendance >= 90) badge = "Perfect Attendee 🏆";
  else if (totalAttendance >= 75) badge = "Consistent Performer 🥇";
  else if (totalAttendance >= 50) badge = "Needs Improvement 🏅";
  const pieData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [member.presentDays, member.totalMeetings - member.presentDays],
        backgroundColor: ["#4CAF50", "#F44336"],
        hoverBackgroundColor: ["#66BB6A", "#EF5350"],
      },
    ],
  };
  const lineData = {
    labels: member.attendanceHistory.map((record) => record.date),
    datasets: [
      {
        label: "Attendance Consistency",
        data: member.attendanceHistory.map((record) => (record.status === "Present" ? 1 : 0)),
        borderColor: "#2196F3",
        borderWidth: 2,
        fill: false,
        pointBackgroundColor: "#1976D2",
        tension: 0.3,
      },
    ],
  };
  const downloadReport = () => {
    const input = reportRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
      pdf.save(`${member.name}_Attendance_Report.pdf`);
    });
  };

  return (
    <div ref={reportRef} className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
      <div className="text-center mb-6">
        <img src={member.image} alt={member.name} className="mx-auto w-24 h-24 rounded-full shadow-md" />
        <h2 className="text-2xl font-bold text-blue-600">{member.name}</h2>
        <p className="text-gray-600">{member.domain} - {member.year} Year</p>
        <p className="text-gray-500 text-sm">{member.department}</p>
        <p className="mt-2 text-lg font-semibold text-yellow-600 flex justify-center items-center gap-2">
          <FaTrophy /> {badge}
        </p>
      </div>
      <h3 className="text-lg font-semibold text-center text-blue-600 mb-4">Attendance Summary</h3>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        <div className="w-60">
          <Pie data={pieData} />
        </div>
        <div className="w-full">
          <Line data={lineData} />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-center text-blue-600 mt-6">Attendance History</h3>
      <div className="mt-4">
        <h4 className="text-md font-semibold text-gray-700">Online Attendance</h4>
        <table className="w-full border-collapse border border-gray-200 mt-2">
          <thead>
            <tr className="bg-blue-100">
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {member.attendanceHistory
              .filter((record, index) => index % 2 === 0)
              .map((record, index) => (
                <tr key={index} className="text-center bg-gray-50">
                  <td className="border border-gray-300 p-2">{record.date}</td>
                  <td className={`border border-gray-300 p-2 font-semibold ${record.status === "Present" ? "text-green-600" : "text-red-600"}`}>
                    {record.status}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <h4 className="text-md font-semibold text-gray-700">Offline Attendance</h4>
        <table className="w-full border-collapse border border-gray-200 mt-2">
          <thead>
            <tr className="bg-blue-100">
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {member.attendanceHistory
              .filter((record, index) => index % 2 !== 0)
              .map((record, index) => (
                <tr key={index} className="text-center bg-gray-50">
                  <td className="border border-gray-300 p-2">{record.date}</td>
                  <td className={`border border-gray-300 p-2 font-semibold ${record.status === "Present" ? "text-green-600" : "text-red-600"}`}>
                    {record.status}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberAttendanceReport;
