import React, { useState } from 'react';
import { Trophy, Flame, Target, TrendingUp, Calendar, Award, Clock, CheckCircle, Star, Medal, Zap, ChevronRight, ArrowUp, ArrowDown, BarChart3, Activity, Crown } from 'lucide-react';

export default function MyProgressPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const userStats = {
    totalPoints: 2450,
    currentStreak: 12,
    longestStreak: 18,
    activeChallenges: 3,
    completedChallenges: 12,
    totalChallenges: 15,
    completionRate: 80,
    rank: 'Gold',
    rankProgress: 65,
    nextRank: 'Platinum',
    pointsToNextRank: 550
  };

  const activeChallenges = [
    {
      id: 1,
      title: "30-Day Fitness Challenge",
      icon: "💪",
      progress: 45,
      daysLeft: 16,
      category: "fitness",
      currentStreak: 8,
      totalDays: 30,
      pointsEarned: 225,
      totalPoints: 500
    },
    {
      id: 2,
      title: "Read 5 Books",
      icon: "📚",
      progress: 60,
      daysLeft: 12,
      category: "learning",
      currentStreak: 12,
      totalDays: 30,
      pointsEarned: 240,
      totalPoints: 400
    },
    {
      id: 3,
      title: "Master Morning Routine",
      icon: "🌅",
      progress: 23,
      daysLeft: 22,
      category: "lifestyle",
      currentStreak: 6,
      totalDays: 30,
      pointsEarned: 80,
      totalPoints: 350
    }
  ];

  const recentAchievements = [
    {
      id: 1,
      title: "First Week Warrior",
      description: "Complete 7 days in a row",
      icon: "🎯",
      date: "2025-11-05",
      points: 100,
      rarity: "common"
    },
    {
      id: 2,
      title: "Fitness Enthusiast",
      description: "Complete 10 workouts",
      icon: "💪",
      date: "2025-11-08",
      points: 150,
      rarity: "rare"
    },
    {
      id: 3,
      title: "Bookworm",
      description: "Read 3 books in a month",
      icon: "📖",
      date: "2025-11-10",
      points: 200,
      rarity: "epic"
    }
  ];

  const weeklyActivity = [
    { day: 'Mon', completed: 3, total: 3 },
    { day: 'Tue', completed: 3, total: 3 },
    { day: 'Wed', completed: 2, total: 3 },
    { day: 'Thu', completed: 3, total: 3 },
    { day: 'Fri', completed: 3, total: 3 },
    { day: 'Sat', completed: 2, total: 3 },
    { day: 'Sun', completed: 1, total: 3 }
  ];

  const monthlyProgress = [
    { month: 'Jun', points: 1200, challenges: 8 },
    { month: 'Jul', points: 1800, challenges: 10 },
    { month: 'Aug', points: 2100, challenges: 11 },
    { month: 'Sep', points: 1900, challenges: 9 },
    { month: 'Oct', points: 2400, challenges: 13 },
    { month: 'Nov', points: 2450, challenges: 12 }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'rare': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'epic': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'legendary': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 'Bronze': return '🥉';
      case 'Silver': return '🥈';
      case 'Gold': return '🥇';
      case 'Platinum': return '💎';
      case 'Diamond': return '💠';
      default: return '🏆';
    }
  };

  return (
    <div className="flex-1 bg-gray-50 w-full pt-16 min-h-screen">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Progress</h1>
          <p className="text-gray-600 text-lg">Track your achievements and see how you're improving</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gray-100 rounded-lg">
                <Award className="w-6 h-6 text-gray-900" />
              </div>
              <div className="flex items-center gap-1 text-green-600 text-sm font-bold">
                <ArrowUp className="w-4 h-4" />
                +12%
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{userStats.totalPoints.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Points</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Flame className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-xs text-gray-500 font-medium">Best: {userStats.longestStreak}</div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{userStats.currentStreak}</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{userStats.activeChallenges}</div>
            <div className="text-sm text-gray-600">Active Challenges</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{userStats.completionRate}%</div>
            <div className="text-sm text-gray-600">Completion Rate</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-lg p-8 text-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-sm font-medium text-gray-300 mb-2">Current Rank</div>
                  <div className="flex items-center gap-3">
                    <span className="text-5xl">{getRankIcon(userStats.rank)}</span>
                    <div>
                      <div className="text-3xl font-bold">{userStats.rank}</div>
                      <div className="text-sm text-gray-400">Level 12</div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-300 mb-2">Next Rank</div>
                  <div className="text-2xl font-bold">{userStats.nextRank}</div>
                  <div className="text-sm text-gray-400">{userStats.pointsToNextRank} points to go</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Progress to {userStats.nextRank}</span>
                  <span className="font-bold">{userStats.rankProgress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-white h-3 rounded-full transition-all duration-500"
                    style={{ width: `${userStats.rankProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Active Challenges</h2>
                <button className="text-gray-900 font-semibold flex items-center gap-1 hover:gap-2 transition-all cursor-pointer">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-6">
                {activeChallenges.map(challenge => (
                  <div key={challenge.id} className="border border-gray-200 rounded-lg p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">{challenge.icon}</div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{challenge.title}</h3>
                          <div className="flex items-center gap-4 mt-1">
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Clock className="w-4 h-4" />
                              {challenge.daysLeft} days left
                            </div>
                            <div className="flex items-center gap-1 text-sm text-orange-600 font-medium">
                              <Flame className="w-4 h-4" />
                              {challenge.currentStreak} day streak
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{challenge.progress}%</div>
                        <div className="text-xs text-gray-500">{challenge.pointsEarned}/{challenge.totalPoints} pts</div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gray-900 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${challenge.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Weekly Activity</h2>
              <div className="flex items-end justify-between gap-4 h-48">
                {weeklyActivity.map((day, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-3">
                    <div className="flex-1 w-full flex flex-col justify-end">
                      <div
                        className="w-full bg-gray-900 rounded-t-lg transition-all duration-300 hover:bg-gray-700"
                        style={{ height: `${(day.completed / day.total) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-gray-900">{day.completed}/{day.total}</div>
                      <div className="text-xs text-gray-500">{day.day}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Achievements</h2>
                <Trophy className="w-5 h-5 text-gray-900" />
              </div>
              <div className="space-y-4">
                {recentAchievements.map(achievement => (
                  <div key={achievement.id} className={`border rounded-lg p-4 ${getRarityColor(achievement.rarity)}`}>
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-sm mb-1">{achievement.title}</h3>
                        <p className="text-xs opacity-75 mb-2">{achievement.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold">+{achievement.points} pts</span>
                          <span className="text-xs opacity-75">{new Date(achievement.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all cursor-pointer">
                View All Achievements
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">This Month</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Completed</div>
                      <div className="text-2xl font-bold text-gray-900">{userStats.completedChallenges}</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg">
                      <Target className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Active</div>
                      <div className="text-2xl font-bold text-gray-900">{userStats.activeChallenges}</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg">
                      <Award className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Points Earned</div>
                      <div className="text-2xl font-bold text-gray-900">545</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-white">
              <Star className="w-8 h-8 mb-4" />
              <h3 className="text-xl font-bold mb-2">Keep it up!</h3>
              <p className="text-sm opacity-90 mb-4">
                You're doing great! Just 2 more days to reach your longest streak record.
              </p>
              <button className="px-4 py-2 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-all cursor-pointer">
                Continue Today's Tasks
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}