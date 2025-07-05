import { FaAward, FaMedal, FaTrophy, FaUserGroup } from "react-icons/fa6";

export default function Leaderboard() {
  // Leaderboard data
  const topUsers = [
    { id: 2, name: "Alex Chen", avatar: "AC", score: 8750, position: 2 },
    { id: 1, name: "Taylor Swift", avatar: "TS", score: 9200, position: 1 },
    { id: 3, name: "Jamie Lee", avatar: "JL", score: 8100, position: 3 },
  ];

  const currentUser = {
    id: 14,
    name: "John Smith",
    avatar: "JS",
    score: 5400,
    position: 14,
    pointsToNextRank: 150,
    progressPercentage: 75
  };

  // Color mapping for podium positions
  const badgeColors = {
    1: "bg-yellow-500", // Gold for 1st
    2: "bg-gray-400",   // Silver for 2nd
    3: "bg-amber-600"   // Bronze for 3rd
  };

  // Icon mapping for podium positions
  const renderPositionIcon = (position) => {
    switch (position) {
      case 1:
        return <FaTrophy className="h-5 w-5" />;
      case 2:
        return <FaMedal className="h-5 w-5" />;
      case 3:
        return <FaAward className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Podium section */}
       <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                      <FaUserGroup size={20} />
                    </div>
                    <h3 className="ml-3 text-lg font-medium text-gray-900">Leaderboard</h3>
                  </div>
                </div>
      
      <div className="flex justify-center items-end mb-8">
        {/* Render users in the specific order: 3rd, 1st, 2nd */}
        {[3, 1, 2].map((position) => {
          const user = topUsers.find(user => user.position === position);
          const podiumHeight = position === 1 ? "h-32" : position === 2 ? "h-24" : "h-20";
          
          return (
            <div key={user.id} className="flex flex-col items-center mx-2">
              {/* User avatar and info */}
              <div className="mb-2 text-center">
                <div className={`h-12 w-12 rounded-full ${badgeColors[position]} flex items-center justify-center text-white font-bold shadow-md mx-auto`}>
                  <div className="flex text-white items-center">
                    {user.avatar}
                  </div>
                </div>
                <p className="text-sm text-black font-medium mt-1">{user.name}</p>
                <p className="text-xs text-black font-semibold">{user.score} pts</p>
              </div>
              
              {/* Podium block */}
              <div className={`${podiumHeight} w-24 rounded-t-lg ${badgeColors[position]} flex items-start justify-center pt-2`}>
                <div className="bg-white text-black rounded-full p-1 flex items-center justify-center">
                  {renderPositionIcon(position)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Current user section */}
      <div className="mt-4">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
            JS
          </div>
          <div className="ml-3 w-full">
            <p className="text-sm font-medium text-gray-900">
              Your Rank: #{currentUser.position}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${currentUser.progressPercentage}%` }}
              ></div>
            </div>
            <p className="mt-1 text-xs  text-gray-500">
              {currentUser.pointsToNextRank} points to next rank
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}