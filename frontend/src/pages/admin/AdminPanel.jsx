import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard, Users, Target, BarChart3, Settings,
    Search, Bell, TrendingUp, TrendingDown,
    UserPlus, Award, CheckCircle, Clock, MoreVertical,
    Plus, Edit, Trash, X, Loader2
} from 'lucide-react';
import ChallengeService from '../services/challenge.services.js'; 

const stats = [ 
    { title: 'Total Users', value: '12,456', change: '+12.5%', trend: 'up', icon: Users, color: 'bg-blue-50 text-blue-600' }, 
    { title: 'Active Challenges', value: '156', change: '+8.2%', trend: 'up', icon: Target, color: 'bg-green-50 text-green-600' },
    { title: 'Completions Today', value: '1,234', change: '-3.1%', trend: 'down', icon: CheckCircle, color: 'bg-purple-50 text-purple-600' }, 
    { title: 'Revenue', value: '$45,231', change: '+15.3%', trend: 'up', icon: Award, color: 'bg-orange-50 text-orange-600' } 
];
const recentUsers = [ 
    { id: 1, name: 'Elena Martinez', email: 'elena@example.com', status: 'active', joined: '2 hours ago' }, 
    { id: 2, name: 'John Smith', email: 'john@example.com', status: 'active', joined: '5 hours ago' }, 
    { id: 3, name: 'Maria Garcia', email: 'maria@example.com', status: 'pending', joined: '1 day ago' }, 
    { id: 4, name: 'Alex Johnson', email: 'alex@example.com', status: 'active', joined: '2 days ago' }, 
    { id: 5, name: 'Sarah Williams', email: 'sarah@example.com', status: 'inactive', joined: '3 days ago' } 
];
const dashboardChallenges = [ 
    { id: 1, name: '30-Day Fitness', participants: 1243, status: 'active', completion: 67 }, 
    { id: 2, name: 'Learn JavaScript', participants: 2891, status: 'active', completion: 82 }, 
    { id: 3, name: 'Read 5 Books', participants: 856, status: 'active', completion: 45 }, 
    { id: 4, name: 'Daily Meditation', participants: 1567, status: 'pending', completion: 0 } 
];
const menuItems = [ 
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard }, 
    { id: 'users', name: 'Users', icon: Users }, 
    { id: 'challenges', name: 'Challenges', icon: Target }, 
    { id: 'analytics', name: 'Analytics', icon: BarChart3 }, 
    { id: 'settings', name: 'Settings', icon: Settings } 
];

const formatDateForInput = (isoDate) => {
    if (!isoDate) return '';
    return new Date(isoDate).toISOString().split('T')[0];
};

const initialFormState = {
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    status: 'active'
};

export default function AdminPanel() {
    const [activeTab, setActiveTab] = useState('dashboard');

    const [challengeList, setChallengeList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [isLoading, setIsLoading] = useState(false); 
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const [formError, setFormError] = useState(null); 

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        if (activeTab === 'challenges') {
            fetchChallenges();
        }
    }, [activeTab]);

    const fetchChallenges = async () => {
        setIsLoading(true);
        const data = await ChallengeService.getAllChallenges();
        setChallengeList(data);
        setIsLoading(false);
    };

    const handleInputChange = (e) => {
        setFormError(null); 
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);

        if (!formData.title || !formData.start_date || !formData.end_date) {
            setFormError('Title, start date, and end date are required.');
            return;
        }
        
        setIsSubmitting(true);

        try {
            if (editingId) {
                const updatedChallenge = await ChallengeService.updateChallenge(editingId, formData);
                if (updatedChallenge) {
                    setChallengeList(prevList => 
                        prevList.map(c => c.id === editingId ? updatedChallenge : c)
                    );
                    closeModalAndReset();
                } else {
                    setFormError("Failed to update challenge. Please try again.");
                }
            } else {
                const createdChallenge = await ChallengeService.createChallenge(formData);
                if (createdChallenge) {
                    setChallengeList(prevList => [createdChallenge, ...prevList]);
                    closeModalAndReset();
                } else {
                    setFormError("Failed to create challenge. Please try again.");
                }
            }
        } catch (error) {
            console.error("Form submit error:", error);
            setFormError("An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteChallenge = async (id) => {
        if (!window.confirm("Are you sure you want to delete this challenge?")) {
            return;
        }
        
        const success = await ChallengeService.deleteChallenge(id);
        if (success) {
            setChallengeList(prevList => prevList.filter(challenge => challenge.id !== id));
        } else {
            alert("Failed to delete challenge. Please try again.");
        }
    };
    
    const handleEditClick = (challenge) => {
        setEditingId(challenge.id);
        setFormData({
            title: challenge.title,
            description: challenge.description || '',
            start_date: formatDateForInput(challenge.start_date), 
            end_date: formatDateForInput(challenge.end_date), 
            status: challenge.status
        });
        setIsModalOpen(true);
    };

    const openCreateModal = () => {
        setEditingId(null);
        setFormData(initialFormState);
        setIsModalOpen(true);
    };

    const closeModalAndReset = () => {
        setIsModalOpen(false);
        setFormError(null);
        setEditingId(null);
        setFormData(initialFormState);
    }

    const getStatusColor = (status) => {
        switch(status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'inactive': return 'bg-gray-100 text-gray-800';
            case 'finished': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };


    const renderContent = () => {
        switch(activeTab) {
            case 'dashboard':
                return (
                    <>
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
                            <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                           {stats.map((stat, index) => { 
                                const Icon = stat.icon; 
                                return ( <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1" style={{ 
                                    animation: `slideUp 0.5s ease-out ${index * 0.1}s both` }}> 
                                    <div className="flex items-start justify-between mb-4"> 
                                        <div className={`p-3 rounded-lg ${stat.color}`}> 
                                            <Icon className="w-6 h-6" /> </div> 
                                            <div className={`flex items-center gap-1 text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}> 
                                                {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />} 
                                                {stat.change} </div> </div> <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}
                                            </div> 
                                    <div className="text-sm text-gray-600">{stat.title}</div> </div> ); })}
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                                    <div> <h2 className="text-lg font-bold text-gray-900">Recent Users</h2> <p className="text-sm text-gray-600">Latest registrations</p> </div>
                                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors"> <Plus className="w-5 h-5 text-gray-600" /> </button>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {recentUsers.map(user => ( 
                                        <div key={user.id} className="p-4 hover:bg-gray-50 transition-colors group"> 
                                        <div className="flex items-center gap-3"> 
                                            <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold text-sm"> 
                                                {user.name.split(' ').map(n => n[0]).join('')} </div> 
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-semibold text-gray-900 truncate">{user.name}</div> 
                                                    <div className="text-sm text-gray-500 truncate">{user.email}</div> 
                                                </div> 
                                                <div className="flex items-center gap-2"> 
                                                    <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${getStatusColor(user.status)}`}> {user.status} </span> 
                                                    <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all"> <MoreVertical className="w-4 h-4 text-gray-600" /> </button> 
                                                </div> 
                                            </div> 
                                        <div className="mt-2 ml-13 text-xs text-gray-500 flex items-center gap-1"> <Clock className="w-3 h-3" /> {user.joined} 
                                        </div> 
                                    </div> 
                                ))}
                                </div>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                                    <div> <h2 className="text-lg font-bold text-gray-900">Active Challenges</h2> <p className="text-sm text-gray-600">Current running challenges</p> </div>
                                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors"> <Plus className="w-5 h-5 text-gray-600" /> </button>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {dashboardChallenges.map(challenge => ( 
                                        <div key={challenge.id} className="p-4 hover:bg-gray-50 transition-colors group"> 
                                        <div className="flex items-start justify-between mb-3"> 
                                            <div className="flex-1"> 
                                                <div className="font-semibold text-gray-900 mb-1">{challenge.name}</div> 
                                                <div className="text-sm text-gray-500">{challenge.participants.toLocaleString()} participants</div> 
                                            </div> 
                                            <div className="flex items-center gap-2"> 
                                                <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${getStatusColor(challenge.status)}`}> {challenge.status} </span> 
                                                <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all"> <MoreVertical className="w-4 h-4 text-gray-600" /> </button> 
                                            </div> 
                                        </div> 
                                        {challenge.status === 'active' && ( 
                                            <div> 
                                                <div className="flex items-center justify-between text-sm mb-1"> 
                                                    <span className="text-gray-600">Completion</span> 
                                                    <span className="font-semibold text-gray-900">{challenge.completion}%</span> 
                                                </div> 
                                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden"> 
                                                <div className="h-full bg-gray-900 rounded-full transition-all duration-500" style={{ width: `${challenge.completion}%` }}></div> 
                                            </div> 
                                            </div> 
                                        )} 
                                        </div> 
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                );
            case 'users': return <div>
                <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
                <p>Users Management will be here.</p>
                </div>;

            case 'challenges': 
                return (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-3xl font-bold text-gray-900">Challenges Management</h1>
                            <button
                                onClick={openCreateModal}
                                className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                            >
                                <Plus className="w-5 h-5" />
                                Add Challenge
                            </button>
                        </div>
                        
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            {isLoading ? (
                                <div className="flex justify-center items-center h-64">
                                    <Loader2 className="w-8 h-8 text-gray-500 animate-spin" />
                                    <p className="ml-2 text-gray-600">Loading challenges...</p>
                                </div>
                            ) : (
                                <table className="w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {challengeList.length === 0 && !isLoading && (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                                    No challenges found.
                                                </td>
                                            </tr>
                                        )}
                                        {challengeList.map((challenge) => (
                                            <tr key={challenge.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-semibold text-gray-900">{challenge.title}</div>
                                                    <div className="text-sm text-gray-500 truncate" style={{maxWidth: '300px'}}>{challenge.description}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${getStatusColor(challenge.status)}`}>
                                                        {challenge.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {formatDateForInput(challenge.start_date)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {formatDateForInput(challenge.end_date)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button 
                                                        onClick={() => handleEditClick(challenge)}
                                                        className="p-1 hover:bg-gray-100 rounded text-blue-600 hover:text-blue-800 transition-colors mr-2"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteChallenge(challenge.id)}
                                                        className="p-1 hover:bg-gray-100 rounded text-red-600 hover:text-red-800 transition-colors"
                                                    >
                                                        <Trash className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                );
            case 'analytics': return <div>
                <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
                <p>Analytics will be here.</p></div>;
            case 'settings': return <div>
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p>Settings will be here.</p></div>;
            default: return <div>Dashboard</div>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 fixed h-full pt-16">
                 <div className="h-full flex flex-col">
                    <nav className="p-4 space-y-1 flex-grow">
                        {menuItems.map(item => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                                    activeTab === item.id
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    {item.name}
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </aside>
            <main className="flex-1 lg:ml-64 pt-16 w-full">
                <div className="lg:hidden border-b border-gray-200 bg-white px-4 sticky top-16 z-10">
                    <nav className="-mb-px flex space-x-6 overflow-x-auto">
                        {menuItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`shrink-0 flex items-center gap-2 px-1 py-4 text-sm font-medium transition-colors
                                    ${activeTab === item.id
                                        ? 'border-b-2 border-gray-900 text-gray-900'
                                        : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700'
                                    }`
                                }
                            >
                                <item.icon className="w-4 h-4" />
                                {item.name}
                            </button>
                        ))}
                    </nav>
                </div>
                
                <div className="p-6 md:p-8">
                    <div className="max-w-7xl mx-auto">
                        {renderContent()}
                    </div>
                </div>
            </main>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
                    <div className="bg-white rounded-lg p-6 md:p-8 shadow-xl w-full max-w-lg m-4" style={{animation: 'slideUp 0.3s ease-out both'}}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900">
                                {editingId ? 'Edit Challenge' : 'Add New Challenge'}
                            </h2>
                            <button 
                                onClick={closeModalAndReset}
                                className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <X className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>

                        <form onSubmit={handleFormSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows="3"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                        disabled={isSubmitting}
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-1">
                                            Start Date
                                        </label>
                                        <input
                                            type="date"
                                            id="start_date"
                                            name="start_date"
                                            value={formData.start_date}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 mb-1">
                                            End Date
                                        </label>
                                        <input
                                            type="date"
                                            id="end_date"
                                            name="end_date"
                                            value={formData.end_date} 
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                                        Status
                                    </label>
                                    <select
                                        id="status"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                        disabled={isSubmitting}
                                    >
                                        <option value="active">Active</option>
                                        <option value="pending">Pending</option>
                                        <option value="finished">Finished</option>
                                    </select>
                                </div>
                                
                                {formError && (
                                    <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                                        {formError}
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={closeModalAndReset}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center justify-center gap-2 px-4 py-2 w-40 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors disabled:opacity-50"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        editingId ? 'Save Changes' : 'Create Challenge'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; 
                    transform: translateY(20px); 
                    }
                    to { 
                    opacity: 1; 
                    transform: translateY(0); 
                    }
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}