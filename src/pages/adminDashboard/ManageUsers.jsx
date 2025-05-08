import React, { useState, useMemo } from "react";
import { studentsData } from "../../constants/students";
import { ArrowLeft, ArrowRight, BookAudio } from "lucide-react";

const ManageUsers = () => {
  const [students, setStudents] = useState(studentsData);
  const [sortBy, setSortBy] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10; // Number of students to display per page

  // Sorting logic
  const sortedStudents = useMemo(() => {
    switch (sortBy) {
      case "name":
        return [...students].sort((a, b) => a.name.localeCompare(b.name));
      case "progress":
        return [...students].sort((a, b) => {
          const progressA = parseInt(a.progress.replace('%', ''));
          const progressB = parseInt(b.progress.replace('%', ''));
          return progressB - progressA; // Descending order
        });
      case "date":
        return [...students].sort((a, b) => new Date(b.enrolledDate) - new Date(a.enrolledDate));
      default:
        return students;
    }
  }, [students, sortBy]);

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = sortedStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(sortedStudents.length / studentsPerPage);

  // Handle CSV download
  const handleDownload = () => {
    const headers = ["Name", "Email", "Date Enrolled", "Progress", "Score", "Status"];
    const rows = sortedStudents.map(student => [
      student.name,
      student.email,
      student.enrolledDate,
      student.progress,
      student.score,
      student.status,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "students_data.csv";
    link.click();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl text-black font-bold">Manage Students</h1>
        <div className="flex gap-4">
          {/* Sorting */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border p-2 rounded text-black cursor-pointer"
          >
            <option className="text-black flex" value="name">
              <BookAudio className="mr-2" size={18} /> Name (A-z)
            </option>
            <option className="text-black flex" value="progress">
              <BookAudio className="mr-2" size={18} /> Progress
            </option>
            <option className="text-black flex" value="date">
              <BookAudio className="mr-2 text-black" size={18} /> Date Enrolled
            </option>
          </select>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-600 transition duration-300"
          >
            Download CSV
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-2xl">
        {students.length === 0 ? (
          <div className="p-4 text-center text-gray-600">
            <p>No students yet</p>
          </div>
        ) : (
          <>
            {/* Table with horizontal scrolling */}
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse table-fixed">
                <thead>
                  <tr className="border-b border-gray-400">
                    <th className="p-4 text-gray-600 text-left">Name</th>
                    <th className="p-4 text-gray-600 text-left">Email</th>
                    <th className="p-4 text-gray-600 text-left">Date Enrolled</th>
                    <th className="p-4 text-gray-600 text-left">Progress</th>
                    <th className="p-4 text-gray-600 text-left">Score</th>
                    <th className="p-4 text-gray-600 text-left">Status</th>
                    <th className="p-4 text-gray-600 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentStudents.map((student) => (
                    <tr key={student.id}>
                      <td className="p-4 text-gray-600">{student.name}</td>
                      <td className="p-4 text-gray-600">{student.email}</td>
                      <td className="p-4 text-gray-600">{student.enrolledDate}</td>
                      <td className="p-4 text-gray-600">{student.progress}</td>
                      <td className="p-4 text-gray-600">{student.score}</td>
                      <td className="p-4 text-gray-600">{student.status}</td>
                      <td className="p-4 text-gray-600">
                        <button
                          className="text-white bg-blue-400 hover:bg-blue-600 px-3 py-1 cursor-pointer rounded-full transition duration-300"
                          onClick={() => alert(`View details for ${student.name}`)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white p-2 rounded-full flex cursor-pointer hover:bg-blue-600 disabled:opacity-50"
        >
          <ArrowLeft className="mr-2" size={18} />
        </button>
        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white p-2 rounded-full flex cursor-pointer hover:bg-blue-600 disabled:opacity-50"
        >
          <ArrowRight className="mr-2" size={18} />
        </button>
      </div>
    </div>
  );
};

export default ManageUsers;
