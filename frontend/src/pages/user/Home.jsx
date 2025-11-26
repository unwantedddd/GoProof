import React, { useState } from 'react';
import { Target, Zap, Award, Star, CheckCircle, TrendingUp, Clock, Users, Flame, ArrowRight, Quote, Trophy, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

export default function MainPage() {
  const [filter, setFilter] = useState('all');
  const [userProgress] = useState(67);

  const challenges = [
    {
      id: 1,
      title: "30-Day Fitness Challenge",
      description: "Complete daily workouts and build a healthy habit",
      difficulty: "Medium",
      participants: 1243,
      duration: "30 days",
      reward: 500,
      category: "fitness",
      trending: true,
      icon: "💪"
    },
    {
      id: 2,
      title: "Learn JavaScript",
      description: "Master fundamental programming concepts",
      difficulty: "Easy",
      participants: 2891,
      duration: "14 days",
      reward: 300,
      category: "coding",
      trending: true,
      icon: "💻"
    },
    {
      id: 3,
      title: "Read 5 Books",
      description: "Expand your knowledge by reading 5 books in a month",
      difficulty: "Medium",
      participants: 856,
      duration: "30 days",
      reward: 400,
      category: "learning",
      trending: false,
      icon: "📚"
    },
    {
      id: 4,
      title: "Daily Meditation",
      description: "Meditate for 15 minutes daily for mental clarity",
      difficulty: "Easy",
      participants: 1567,
      duration: "21 days",
      reward: 250,
      category: "mindfulness",
      trending: false,
      icon: "🧘"
    },
    {
      id: 5,
      title: "Build a Full-Stack App",
      description: "Develop a complete web application from scratch",
      difficulty: "Hard",
      participants: 432,
      duration: "60 days",
      reward: 1000,
      category: "coding",
      trending: true,
      icon: "🚀"
    },
    {
      id: 6,
      title: "Master Morning Routine",
      description: "Establish a consistent morning routine for 30 days",
      difficulty: "Easy",
      participants: 2103,
      duration: "30 days",
      reward: 350,
      category: "lifestyle",
      trending: false,
      icon: "🌅"
    }
  ];

  const categories = [
    { id: 'all', name: 'All', icon: Target },
    { id: 'fitness', name: 'Fitness', icon: Zap },
    { id: 'coding', name: 'Programming', icon: Award },
    { id: 'learning', name: 'Learning', icon: Star },
    { id: 'mindfulness', name: 'Meditation', icon: CheckCircle },
    { id: 'lifestyle', name: 'Lifestyle', icon: TrendingUp }
  ];

  const successStories = [
    {
      name: "Elena M.",
      quote: "Thanks to GoProof, I started running daily and lost 10 kg in 3 months!",
      avatar: "EM"
    },
    {
      name: "Andrew K.",
      quote: "Learned React and found my dream job a month after completing the challenge",
      avatar: "AK"
    },
    {
      name: "Maria P.",
      quote: "Meditation changed my life. Became calmer and more productive",
      avatar: "MP"
    }
  ];

  const filteredChallenges = filter === 'all'
    ? challenges
    : challenges.filter(c => c.category === filter);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100 border-green-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'Hard': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  return (
    <div className="flex-1 bg-white w-full pt-16">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4 border border-white/20">
              <Flame className="w-4 h-4" />
              <span>Join thousands of active users</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Take part in challenges<br />
              <span className="text-white">
                and achieve new goals
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Grow every day, track progress and win together with the community
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-6">
              <Link to ="/register">
                <button className="px-8 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg flex items-center gap-2 text-lg cursor-pointer">
                  Join now
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-12 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">12,456</div>
                <div className="text-gray-400 text-sm md:text-base">Active participants</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">156</div>
                <div className="text-gray-400 text-sm md:text-base">Challenges</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">84,321</div>
                <div className="text-gray-400 text-sm md:text-base">Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Progress Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Your progress</h3>
              <p className="text-gray-600">You're on the right track! Keep moving forward 🚀</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{userProgress}%</div>
                <div className="text-sm text-gray-500">Completed</div>
              </div>
              <div className="w-24 h-24">
                <svg className="transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                  <circle
                    cx="50" cy="50" r="40"
                    stroke="#000000"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${userProgress * 2.51} 251`}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">3</div>
              <div className="text-sm text-gray-500">Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">12</div>
              <div className="text-sm text-gray-500">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">2,450</div>
              <div className="text-sm text-gray-500">Points</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Popular challenges
          </h2>
          <p className="text-gray-600 text-lg">
            Choose a category and start your path to success
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 cursor-pointer ${filter === category.id
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map(challenge => (
            <div
              key={challenge.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-200"
            >
              {challenge.trending && (
                <div className="bg-gray-900 text-white text-xs font-bold px-4 py-2 flex items-center gap-1">
                  <Flame className="w-3 h-3" />
                  TRENDING
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl">{challenge.icon}</div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                  {challenge.title}
                </h3>
                <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                  {challenge.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-gray-900" />
                    <span>{challenge.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4 text-gray-900" />
                    <span>{challenge.participants.toLocaleString()} participants</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                    <Award className="w-4 h-4" />
                    <span>{challenge.reward} points reward</span>
                  </div>
                </div>

                <button className="w-full py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2 cursor-pointer">
                  <Zap className="w-4 h-4" />
                  Start challenge
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success Stories Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Success stories
            </h2>
            <p className="text-gray-600 text-lg">
              Real people, real results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
                <Quote className="w-8 h-8 text-gray-300 mb-4" />
                <p className="text-gray-700 mb-6 italic">"{story.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold">
                    {story.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{story.name}</div>
                    <div className="text-sm text-gray-500">GoProof Participant</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
            <Trophy className="w-16 h-16 text-gray-900" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Ready to take the challenge?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of users who are improving every day and achieving their goals
          </p>
          <button className="px-10 py-5 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-all text-lg flex items-center gap-3 mx-auto cursor-pointer">
            Start now
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}