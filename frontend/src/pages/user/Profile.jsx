import React, { useState, useEffect } from 'react';
import {
  User, Mail, Lock, Shield,
  Trophy, Target, Clock, Award, TrendingUp,
  Edit2, Save, X, Check, LoaderCircle, LogOut
} from 'lucide-react';
import { useUser } from '../../hooks/useUser';
import { useNavigate } from 'react-router';
import ProfileService from '../../pages/services/profile.services.js';
import AuthService from '../../pages/services/auth.services.js';

export default function ProfilePage() {
  const { user, refetch } = useUser();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({ name: '', email: '' });
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [profileError, setProfileError] = useState(null);
  const [profileSuccess, setProfileSuccess] = useState(null);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(null);

  useEffect(() => { if (user) { setProfileData({ name: user.name || '', email: user.email || '' }); } }, [user]);
  const handleProfileInputChange = (e) => {
    setProfileSuccess(null);
    setProfileError(null);
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };
  const handlePasswordInputChange = (e) => {
    setPasswordSuccess(null);
    setPasswordError(null);
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    setProfileError(null);
    setProfileSuccess(null);
    const success = await ProfileService.updateUser(profileData);
    if (success) {
      setProfileSuccess('Profile updated successfully!');
      refetch(); setIsEditing(false);
    } else {
      setProfileError('Failed to update profile. Please try again.');
    }
    setIsUpdatingProfile(false);
  };
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    setIsUpdatingPassword(true);
    setPasswordError(null);
    setPasswordSuccess(null);
    const success = await ProfileService.changePassword(passwordData);
    if (success) {
      setPasswordSuccess('Password changed successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } else { setPasswordError('Failed to change password. Check your current password.'); }
    setIsUpdatingPassword(false);
  };
  const handleCancelEdit = () => {
    setIsEditing(false);
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || ''
      });
    }
  };
  const handleLogout = async () => {
    const success = await AuthService.logout();
    if (success) {
      await refetch();
      navigate('/');
    } else {
      alert("Logout failed. Please try again.");
    }
  };

  const sections = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'activity', name: 'Activity', icon: TrendingUp },
    { id: 'achievements', name: 'Achievements', icon: Trophy },
    { id: 'logout', name: 'Logout', icon: LogOut, isLogout: true },
  ];
  const achievements = [
    { id: 1, name: 'First Challenge', description: 'Complete your first challenge', earned: true, date: '2025-01-15', icon: '🎯' },
    { id: 2, name: '7-Day Streak', description: 'Maintain a 7-day activity streak', earned: true, date: '2025-02-01', icon: '🔥' },
    { id: 3, name: 'Early Bird', description: 'Complete 10 morning activities', earned: true, date: '2025-02-10', icon: '🌅' },
    { id: 4, name: '30-Day Warrior', description: 'Complete a 30-day challenge', earned: false, date: null, icon: '⚔️' },
    { id: 5, name: 'Team Player', description: 'Join 5 group challenges', earned: false, date: null, icon: '👥' },
    { id: 6, name: 'Perfect Week', description: 'Complete all daily tasks for a week', earned: false, date: null, icon: '✨' }
  ];
  const activities = [
    { id: 1, challenge: '30-Day Fitness Challenge', action: 'Completed Day 15', time: '2 hours ago', status: 'completed' },
    { id: 2, challenge: 'Learn JavaScript', action: 'Started new module', time: '5 hours ago', status: 'in-progress' },
    { id: 3, challenge: 'Daily Meditation', action: 'Completed Day 7', time: '1 day ago', status: 'completed' },
    { id: 4, challenge: 'Read 5 Books', action: 'Finished Book 2', time: '2 days ago', status: 'completed' },
    { id: 5, challenge: 'Morning Routine', action: 'Missed daily task', time: '3 days ago', status: 'missed' }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Information</h2>
                <p className="text-gray-600">Update your personal information</p>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Edit2 className="w-4 h-4" /> Edit
                </button>
              )}
            </div>
            <form onSubmit={handleProfileUpdate} className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" name="name" value={profileData.name} onChange={handleProfileInputChange} disabled={!isEditing} required className={`w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 transition-all ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="email" name="email" value={profileData.email} onChange={handleProfileInputChange} disabled={!isEditing} required className={`w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 transition-all ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`} />
                  </div>
                </div>
                {profileError && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{profileError}</div>}
                {profileSuccess && <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">{profileSuccess}</div>}
              </div>
              {isEditing && (
                <div className="mt-6 border-t border-gray-200 pt-6 flex justify-end gap-2">
                  <button type="button" onClick={handleCancelEdit} className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                    <X className="w-4 h-4" /> Cancel
                  </button>
                  <button type="submit" disabled={isUpdatingProfile} className="flex items-center justify-center gap-2 px-4 py-2 w-32 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50">
                    {isUpdatingProfile ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {isUpdatingProfile ? 'Saving...' : 'Save'}
                  </button>
                </div>
              )}
            </form>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Security Settings</h2>
              <p className="text-gray-600">Manage your password and security</p>
            </div>
            <form onSubmit={handlePasswordUpdate} className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordInputChange} required className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordInputChange} required className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordInputChange} required className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 transition-all" />
                  </div>
                </div>
                {passwordError && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{passwordError}</div>}
                {passwordSuccess && <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">{passwordSuccess}</div>}
                <button type="submit" disabled={isUpdatingPassword} className="w-full md:w-auto px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                  {isUpdatingPassword && <LoaderCircle className="w-5 h-5 animate-spin" />}
                  {isUpdatingPassword ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        );
      case 'activity': return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Recent Activity</h2>
            <p className="text-gray-600">Your latest actions and progress</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> {[
            { label: 'Active Challenges', value: '3', icon: Target, color: 'bg-blue-50 text-blue-600' },
            { label: 'Completed', value: '12', icon: Check, color: 'bg-green-50 text-green-600' },
            { label: 'Total Points', value: '2,450', icon: Award, color: 'bg-purple-50 text-purple-600' }].map((stat, index) => {
              const Icon = stat.icon; return (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-lg p-6">
                  <div className={`inline-flex p-3 rounded-lg ${stat.color} mb-3`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div> </div>);
            })} </div>
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Activity Timeline</h3>
            <div className="space-y-4"> {activities.map(activity => (
              <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.status === 'completed' ? 'bg-green-100' :
                  activity.status === 'in-progress' ? 'bg-blue-100' : 'bg-red-100'}`}>
                  {activity.status === 'completed' ? <Check className="w-5 h-5 text-green-600" /> :
                    activity.status === 'in-progress' ? <Clock className="w-5 h-5 text-blue-600" /> :
                      <X className="w-5 h-5 text-red-600" />} </div> <div className="flex-1">
                  <div className="font-semibold text-gray-900">{activity.challenge}</div>
                  <div className="text-sm text-gray-600">{activity.action}</div>
                  <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {activity.time}
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      );
      case 'achievements':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Achievements</h2>
              <p className="text-gray-600">Your earned badges and milestones</p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-4xl font-bold text-gray-900 mb-1">
                    {achievements.filter(a => a.earned).length}/{achievements.length}
                  </div>
                  <div className="text-gray-600">Achievements Unlocked</div>
                </div>
                <div className="text-6xl">🏆</div>
              </div>
              <div className="mt-4">
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gray-900 rounded-full transition-all duration-500"
                    style={{ width: `${(achievements.filter(a => a.earned).length / achievements.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map(achievement => (
                <div
                  key={achievement.id}
                  className={`border-2 rounded-lg p-6 transition-all ${achievement.earned
                    ? 'bg-white border-gray-900 hover:shadow-lg'
                    : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`text-5xl ${!achievement.earned ? 'grayscale' : ''}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {achievement.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {achievement.description}
                      </p>
                      {achievement.earned && (
                        <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                          <Check className="w-4 h-4" />
                          Earned on {achievement.date}
                        </div>
                      )}
                      {!achievement.earned && (
                        <div className="text-sm text-gray-500 font-semibold">
                          🔒 Locked
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200 fixed h-full pt-16 flex-col">
        <nav className="p-4 space-y-1 flex-grow">
          {sections.map(section => {
            const Icon = section.icon;
            const handleClick = section.isLogout ? handleLogout : () => setActiveSection(section.id);
            return (
              <button
                key={section.id}
                onClick={handleClick}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${section.isLogout
                  ? 'text-red-600 hover:bg-red-50 hover:text-red-700'
                  : activeSection === section.id
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
              >
                <Icon className="w-5 h-5" />
                {section.name}
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 lg:ml-64 pt-16 w-full">
        <div className="lg:hidden border-b border-gray-200 bg-white px-4">
          <nav className="-mb-px flex space-x-6 overflow-x-auto">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={section.isLogout ? handleLogout : () => setActiveSection(section.id)}
                className={`shrink-0 flex items-center gap-2 px-1 py-4 text-sm font-medium transition-colors
                  ${section.isLogout
                    ? 'text-red-600 hover:text-red-700'
                    : activeSection === section.id
                      ? 'border-b-2 border-gray-900 text-gray-900'
                      : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700'
                  }`
                }
              >
                <section.icon className="w-4 h-4" />
                {section.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-8">
          <div className="max-w-4xl">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}