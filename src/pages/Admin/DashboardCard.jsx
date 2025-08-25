import { FaQuestionCircle, FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function DashboardCards() {
  const topRankers = [
    { id: 1, name: "Amit Sharma", score: 98 },
    { id: 2, name: "Sneha Kapoor", score: 95 },
    { id: 3, name: "Ravi Joshi", score: 93 },
  ];

  const lowRankers = [
    { id: 1, name: "Rahul Meena", score: 45 },
    { id: 2, name: "Pooja Kumari", score: 50 },
    { id: 3, name: "Arun Dev", score: 52 },
  ];

  const questions = [
    { id: 1, student: "Kiran", question: "What is Newton's second law?" },
    {
      id: 2,
      student: "Meera",
      question: "Difference between mitosis & meiosis?",
    },
    {
      id: 3,
      student: "Nikhil",
      question: "How to solve a quadratic equation?",
    },
  ];

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 🏆 Top Rankers */}
        <div className="bg-white rounded-lg shadow-xl p-4 sm:p-5">
          <h3 className="text-base sm:text-lg font-semibold mb-3 flex items-center gap-2 text-green-700">
            <FaArrowUp /> Top Rankers (This Week)
          </h3>
          <ul className="space-y-3">
            {topRankers.map((student) => (
              <li
                key={student.id}
                className="flex justify-between items-center"
              >
                <div className="font-medium text-gray-800 text-sm sm:text-base">
                  {student.name}
                </div>
                <span className="text-xs sm:text-sm font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {student.score}%
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* 🔻 Low Rankers */}
        <div className="bg-white rounded-lg shadow-xl p-4 sm:p-5">
          <h3 className="text-base sm:text-lg font-semibold mb-3 flex items-center gap-2 text-red-700">
            <FaArrowDown /> Low Rankers (This Week)
          </h3>
          <ul className="space-y-3">
            {lowRankers.map((student) => (
              <li
                key={student.id}
                className="flex justify-between items-center"
              >
                <div className="font-medium text-gray-800 text-sm sm:text-base">
                  {student.name}
                </div>
                <span className="text-xs sm:text-sm font-semibold bg-red-100 text-red-700 px-2 py-1 rounded-full">
                  {student.score}%
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ❓ Questions / Doubts */}
        <div className="bg-white rounded-lg shadow-xl p-4 sm:p-5">
          <h3 className="text-base sm:text-lg font-semibold mb-3 flex items-center gap-2 text-blue-600">
            <FaQuestionCircle /> Questions Asked
          </h3>
          <ul className="space-y-3">
            {questions.map((q) => (
              <li key={q.id}>
                <div className="text-sm sm:text-base text-gray-800 font-medium">
                  {q.student}:
                </div>
                <div className="text-xs sm:text-sm text-gray-500">
                  {q.question}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
