import React, { useState } from 'react';
import {
  LayoutDashboard, Users, Target, BarChart3, Settings,
  Search, Bell, TrendingUp, TrendingDown,
  UserPlus, Award, CheckCircle, Clock, MoreVertical,
  Plus
} from 'lucide-react';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');

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
  const challenges = [ 
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

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
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
                   {challenges.map(challenge => ( 
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
      case 'challenges': return <div>
        <h1 className="text-3xl font-bold text-gray-900">Challenges Management</h1>
        <p>Challenges Management will be here.</p></div>;
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
      `}</style>
    </div>
  );
}