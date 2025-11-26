import React, { useState, useEffect } from 'react';
import { 
    Target, Zap, Award, Star, CheckCircle, TrendingUp, Clock, Users, Flame, Search, 
    Filter, ChevronDown, Calendar, Trophy, Medal, Brain, Heart, Code, Dumbbell, Book, 
    Coffee, Loader2
} from 'lucide-react';
import ChallengeService from '../services/challenge.services.js';

const categories = [
    { id: 'all', name: 'All', icon: Target },
    { id: 'fitness', name: 'Fitness', icon: Dumbbell },
    { id: 'coding', name: 'Programming', icon: Code },
    { id: 'learning', name: 'Learning', icon: Book },
    { id: 'mindfulness', name: 'Meditation', icon: Heart },
    { id: 'lifestyle', name: 'Lifestyle', icon: Coffee }
];

const difficulties = ['all', 'Easy', 'Medium', 'Hard'];

const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
        case 'Easy': return 'text-green-600 bg-green-100 border-green-200';
        case 'Medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
        case 'Hard': return 'text-red-600 bg-red-100 border-red-200';
        default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
};

const getDuration = (start, end) => {
    if (!start || !end) return "Unknown duration";
    try {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return `${diffDays} days`;
    } catch (e) {
        console.error("Invalid date format", start, end);
        return "Invalid date";
    }
};

export default function ChallengesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [sortBy, setSortBy] = useState('trending');
    const [showFilters, setShowFilters] = useState(false);

    const [allChallenges, setAllChallenges] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadChallenges();
    }, []);

    const loadChallenges = async () => {
        setIsLoading(true);
        try {
            const dbChallenges = await ChallengeService.getAllChallenges();

            const hydratedChallenges = dbChallenges.map(dbChallenge => {
                
                const mockDifficulty = "Medium";
                const mockCategory = "learning";
                
                const emojiIcons = ["📚", "💪", "💻", "🧘", "🚀", "🌅", "🐍", "💧", "🏃", "📝"];
                
                return {
                    id: dbChallenge.id,
                    title: dbChallenge.title,
                    description: dbChallenge.description,
                    startDate: dbChallenge.start_date,
                    duration: getDuration(dbChallenge.start_date, dbChallenge.end_date),

                    difficulty: mockDifficulty,
                    category: mockCategory,
                    participants: Math.floor(Math.random() * 1500) + 200,
                    reward: Math.floor(Math.random() * 800) + 200,
                    trending: Math.random() > 0.5,
                    icon: emojiIcons[dbChallenge.id % emojiIcons.length],
                    progress: 0,
                    enrolled: false,
                    completionRate: Math.floor(Math.random() * 30) + 60
                };
            });

            setAllChallenges(hydratedChallenges);

        } catch (error) {
            console.error("Failed to load challenges:", error);
        } finally {
            setIsLoading(false);
        }
    };

    let filteredChallenges = allChallenges.filter(challenge => {
        const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || challenge.category === selectedCategory;
        const matchesDifficulty = selectedDifficulty === 'all' || challenge.difficulty === selectedDifficulty;
        
        return matchesSearch && matchesCategory && matchesDifficulty;
    });

    filteredChallenges = filteredChallenges.sort((a, b) => {
        switch (sortBy) {
            case 'trending':
                return b.trending - a.trending || b.participants - a.participants;
            case 'popular':
                return b.participants - a.participants;
            case 'reward':
                return b.reward - a.reward;
            case 'easy':
                const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
                return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
            default:
                return 0;
        }
    });

    const enrolledChallenges = filteredChallenges.filter(c => c.enrolled);
    const availableChallenges = filteredChallenges.filter(c => !c.enrolled);

    if (isLoading) {
        return (
            <div className="flex-1 bg-gray-50 w-full pt-16 min-h-screen flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-gray-900 animate-spin" />
                <p className="ml-4 text-xl text-gray-700">Loading challenges...</p>
            </div>
        );
    }

    return (
        <div className="flex-1 bg-gray-50 w-full pt-16 min-h-screen">
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">All Challenges</h1>
                        <p className="text-gray-600 text-lg">Discover and join challenges that match your goals</p>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <div className="text-center px-6 py-3 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-gray-900">{enrolledChallenges.length}</div>
                            <div className="text-sm text-gray-500">Active</div>
                        </div>
                        <div className="text-center px-6 py-3 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-gray-900">{allChallenges.length}</div>
                            <div className="text-sm text-gray-500">Total</div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search challenges..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="px-6 py-3 bg-white border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center gap-2 justify-center cursor-pointer"
                    >
                        <Filter className="w-5 h-5" />
                        Filters
                        <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                {showFilters && (
                    <div className="mt-6 p-6 bg-gray-50 rounded-lg space-y-6">
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-3 block">Category</label>
                            <div className="flex flex-wrap gap-2">
                                {categories.map(category => {
                                const Icon = category.icon;
                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 cursor-pointer ${
                                        selectedCategory === category.id
                                            ? 'bg-gray-900 text-white'
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

                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-3 block">Difficulty</label>
                            <div className="flex flex-wrap gap-2">
                                {difficulties.map(difficulty => (
                                <button
                                    key={difficulty}
                                    onClick={() => setSelectedDifficulty(difficulty)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                                    selectedDifficulty === difficulty
                                        ? 'bg-gray-900 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                                    }`}
                                >
                                    {difficulty === 'all' ? 'All' : difficulty}
                                </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-3 block">Sort by</label>
                            <div className="flex flex-wrap gap-2">
                                {[
                                { id: 'trending', name: 'Trending' },
                                { id: 'popular', name: 'Most Popular' },
                                { id: 'reward', name: 'Highest Reward' },
                                { id: 'easy', name: 'Easiest First' }
                                ].map(sort => (
                                <button
                                    key={sort.id}
                                    onClick={() => setSortBy(sort.id)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                                    sortBy === sort.id
                                        ? 'bg-gray-900 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                                    }`}
                                >
                                    {sort.name}
                                </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                </div>
            </div>

            {enrolledChallenges.length > 0 && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  { /*Add my active challenges*/} 
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center gap-3 mb-6">
                    <Star className="w-6 h-6 text-gray-900" />
                    <h2 className="text-2xl font-bold text-gray-900">Available Challenges</h2>
                    <span className="px-3 py-1 bg-gray-100 text-gray-900 text-sm font-bold rounded-full">
                        {availableChallenges.length}
                    </span>
                </div>

                {availableChallenges.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No challenges found</h3>
                        <p className="text-gray-600">Try adjusting your filters or search query</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {availableChallenges.map(challenge => (
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
                                        {challenge.title} {/* ◄--- РЕАЛЬНЫЕ ДАННЫЕ */}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                                        {challenge.description} {/* ◄--- РЕАЛЬНЫЕ ДАННЫЕ */}
                                    </p>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Clock className="w-4 h-4 text-gray-900" />
                                            <span>{challenge.duration}</span> {/* ◄--- ВЫЧИСЛЕНО ИЗ БД */}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Users className="w-4 h-4 text-gray-900" />
                                            <span>{challenge.participants.toLocaleString()} participants</span> {/* ◄--- ЗАГЛУШКА */}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <CheckCircle className="w-4 h-4 text-gray-900" />
                                            <span>{challenge.completionRate}% completion rate</span> {/* ◄--- ЗАГЛУШКА */}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                                            <Award className="w-4 h-4" />
                                            <span>{challenge.reward} points reward</span> {/* ◄--- ЗАГЛУШКА */}
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
                )}
            </div>
        </div>
    );
}