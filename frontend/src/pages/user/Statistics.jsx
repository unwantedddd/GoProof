import React, { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, Award, Target, Zap, Users, Clock, CheckCircle, Activity, PieChart, ArrowUp, ArrowDown, Minus, Filter } from 'lucide-react';

export default function StatisticsPage() {
  const [timePeriod, setTimePeriod] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const overallStats = {
    totalChallenges: 15,
    completedChallenges: 12,
    activeChallenges: 3,
    totalPoints: 2450,
    averageCompletion: 80,
    totalDaysActive: 127,
    currentStreak: 12,
    longestStreak: 18
  };

  const categoryStats = [
    { category: 'Fitness', icon: '💪', completed: 4, active: 1, points: 850, color: 'bg-red-500' },
    { category: 'Coding', icon: '💻', completed: 3, active: 0, points: 600, color: 'bg-blue-500' },
    { category: 'Learning', icon: '📚', completed: 2, active: 1, points: 450, color: 'bg-green-500' },
    { category: 'Mindfulness', icon: '🧘', completed: 2, active: 0, points: 300, color: 'bg-purple-500' },
    { category: 'Lifestyle', icon: '🌅', completed: 1, active: 1, points: 250, color: 'bg-yellow-500' }
  ];

  const monthlyData = [
    { month: 'Jun', completed: 2, points: 400, active: 2 },
    { month: 'Jul', completed: 3, points: 650, active: 3 },
    { month: 'Aug', completed: 2, points: 500, active: 2 },
    { month: 'Sep', completed: 1, points: 300, active: 3 },
    { month: 'Oct', completed: 3, points: 700, active: 4 },
    { month: 'Nov', completed: 1, points: 200, active: 3 }
  ];

  const difficultyBreakdown = [
    { difficulty: 'Easy', completed: 5, total: 6, percentage: 83, color: 'bg-green-500' },
    { difficulty: 'Medium', completed: 5, total: 7, percentage: 71, color: 'bg-yellow-500' },
    { difficulty: 'Hard', completed: 2, total: 2, percentage: 100, color: 'bg-red-500' }
  ];

  const streakHistory = [
    { period: 'Week 1', days: 7 },
    { period: 'Week 2', days: 7 },
    { period: 'Week 3', days: 6 },
    { period: 'Week 4', days: 7 },
    { period: 'Week 5', days: 7 },
    { period: 'Week 6', days: 5 },
    { period: 'Week 7', days: 7 }
  ];

  const topChallenges = [
    { title: '30-Day Fitness Challenge', icon: '💪', points: 500, completion: 100, duration: '30 days' },
    { title: 'Build a Full-Stack App', icon: '🚀', points: 1000, completion: 100, duration: '60 days' },
    { title: 'Learn JavaScript', icon: '💻', points: 300, completion: 100, duration: '14 days' },
    { title: 'Daily Meditation', icon: '🧘', points: 250, completion: 100, duration: '21 days' },
    { title: 'Read 5 Books', icon: '📚', points: 400, completion: 60, duration: '30 days (In Progress)' }
  ];

  const comparisonStats = [
    { metric: 'Completion Rate', you: 80, average: 65, trend: 'up' },
    { metric: 'Avg. Streak', you: 12, average: 8, trend: 'up' },
    { metric: 'Monthly Challenges', you: 3, average: 2, trend: 'up' },
    { metric: 'Points per Challenge', you: 163, average: 180, trend: 'down' }
  ];

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <ArrowUp className="w-4 h-4 text-green-600" />;
    if (trend === 'down') return <ArrowDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-600" />;
  };

  const getTrendColor = (trend) => {
    if (trend === 'up') return 'text-green-600 bg-green-100';
    if (trend === 'down') return 'text-red-600 bg-red-100';
    return 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="flex-1 bg-gray-50 w-full pt-16 min-h-screen">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Statistics</h1>
              <p className="text-gray-600 text-lg">Detailed insights into your performance</p>
            </div>
            <div className="flex gap-2">
              {['week', 'month', 'year', 'all'].map(period => (
                <button
                  key={period}
                  onClick={() => setTimePeriod(period)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all capitalize cursor-pointer ${
                    timePeriod === period
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-sm font-semibold text-gray-600">Total</div>
            </div>
            <div className="text-3xl font-bold text-gray-900">{overallStats.totalChallenges}</div>
            <div className="text-xs text-gray-500 mt-1">Challenges</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-sm font-semibold text-gray-600">Completed</div>
            </div>
            <div className="text-3xl font-bold text-gray-900">{overallStats.completedChallenges}</div>
            <div className="text-xs text-gray-500 mt-1">{overallStats.averageCompletion}% success rate</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Award className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="text-sm font-semibold text-gray-600">Points</div>
            </div>
            <div className="text-3xl font-bold text-gray-900">{overallStats.totalPoints}</div>
            <div className="text-xs text-gray-500 mt-1">Total earned</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Activity className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-sm font-semibold text-gray-600">Streak</div>
            </div>
            <div className="text-3xl font-bold text-gray-900">{overallStats.currentStreak}</div>
            <div className="text-xs text-gray-500 mt-1">Best: {overallStats.longestStreak} days</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Monthly Performance</h2>
                <BarChart3 className="w-6 h-6 text-gray-900" />
              </div>
              <div className="space-y-6">
                {monthlyData.map((month, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">{month.month}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">{month.completed} completed</span>
                        <span className="text-sm font-bold text-gray-900">{month.points} pts</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gray-900 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(month.points / 700) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Performance by Category</h2>
                <PieChart className="w-6 h-6 text-gray-900" />
              </div>
              <div className="space-y-4">
                {categoryStats.map((cat, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{cat.icon}</span>
                        <div>
                          <div className="font-bold text-gray-900">{cat.category}</div>
                          <div className="text-sm text-gray-600">
                            {cat.completed} completed · {cat.active} active
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900">{cat.points}</div>
                        <div className="text-xs text-gray-500">points</div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${cat.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${(cat.points / 850) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Difficulty Breakdown</h2>
              <div className="space-y-6">
                {difficultyBreakdown.map((diff, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${diff.color}`}></div>
                        <span className="font-semibold text-gray-900">{diff.difficulty}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">{diff.completed}/{diff.total}</span>
                        <span className="text-sm font-bold text-gray-900">{diff.percentage}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`${diff.color} h-3 rounded-full transition-all duration-500`}
                        style={{ width: `${diff.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Challenges</h2>
              <div className="space-y-3">
                {topChallenges.map((challenge, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                    <div className="text-3xl">{challenge.icon}</div>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900">{challenge.title}</div>
                      <div className="text-sm text-gray-600">{challenge.duration}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">{challenge.points} pts</div>
                      <div className="text-xs text-gray-500">{challenge.completion}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">vs. Community Average</h2>
              <div className="space-y-4">
                {comparisonStats.map((stat, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-2">{stat.metric}</div>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{stat.you}</div>
                        <div className="text-xs text-gray-500">You</div>
                      </div>
                      <div className={`p-2 rounded-lg ${getTrendColor(stat.trend)}`}>
                        {getTrendIcon(stat.trend)}
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-400">{stat.average}</div>
                        <div className="text-xs text-gray-500">Average</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Streak History</h2>
              <div className="space-y-3">
                {streakHistory.map((week, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-600 w-20">{week.period}</span>
                    <div className="flex-1 flex gap-1">
                      {[...Array(7)].map((_, dayIndex) => (
                        <div
                          key={dayIndex}
                          className={`h-8 flex-1 rounded ${
                            dayIndex < week.days ? 'bg-gray-900' : 'bg-gray-200'
                          }`}
                        ></div>
                      ))}
                    </div>
                    <span className="text-sm font-bold text-gray-900 w-8">{week.days}/7</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Time Investment</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-gray-900" />
                    <span className="text-sm font-semibold text-gray-600">Total Days</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{overallStats.totalDaysActive}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-gray-900" />
                    <span className="text-sm font-semibold text-gray-600">Avg. per Challenge</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">
                    {Math.round(overallStats.totalDaysActive / overallStats.totalChallenges)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">days</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-lg p-6 text-white">
              <TrendingUp className="w-8 h-8 mb-4" />
              <h3 className="text-xl font-bold mb-2">You're improving!</h3>
              <p className="text-sm opacity-90 mb-4">
                Your completion rate is 15% higher than the community average. Keep up the excellent work!
              </p>
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/20">
                <div>
                  <div className="text-2xl font-bold">80%</div>
                  <div className="text-xs opacity-75">Your Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">65%</div>
                  <div className="text-xs opacity-75">Avg. Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}