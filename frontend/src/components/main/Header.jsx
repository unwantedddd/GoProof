import React, { useState, useEffect, useMemo } from 'react';
import { Trophy, Menu, X, Search, User, Home, Target, TrendingUp, BarChart3, LogIn, UserRoundPen, UserStar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import { useUser } from '../../hooks/useUser';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAdmin = user?.role === 'admin';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-white shadow-md'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 group">
            <div className="bg-gray-900 p-2 rounded-lg group-hover:bg-gray-800 transition-colors">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              GoProof
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link to="/" href="#" className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors rounded-lg hover:bg-gray-100 flex items-center gap-2">
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link to="/challenges" className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors rounded-lg hover:bg-gray-100 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Challenges
            </Link>
            <Link to="/myprogress" className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors rounded-lg hover:bg-gray-100 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              My Progress
            </Link>
            <Link to="/statistics" className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors rounded-lg hover:bg-gray-100 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Statistics
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>
            {/* User section */}
            {!user && (
              <Link to="/register"
                className="px-6 py-2.5 bg-transparent border border-gray-600 text-gray-600 font-semibold rounded-lg
                        hover:bg-gray-800 hover:text-white
                          transition-colors duration-300 flex items-center gap-2 cursor-pointer"
              >
                <UserRoundPen className="w-4 h-4" />
                Register
              </Link>
            )}
            {!user && (
              <Link to="/login"
                className="px-6 py-2.5 bg-transparent border border-gray-600 text-gray-600 font-semibold rounded-lg
                        hover:bg-gray-800 hover:text-white
                          transition-colors duration-300 flex items-center gap-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
            )}
            {isAdmin && (
              <>
                <Link to="/admin"
                  className="px-6 py-2.5 bg-transparent border border-gray-600 text-gray-600 font-semibold rounded-lg
                        hover:bg-gray-800 hover:text-white
                          transition-colors duration-300 flex items-center gap-2 cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  Admin Panel
                </Link>
                <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors rounded-lg hover:bg-gray-100">
                  <UserStar className="w-5 h-5" />
                  {user.name}
                </Link>
              </>
            )}
            {user && !isAdmin && (
              <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors rounded-lg hover:bg-gray-100">
                <User className="w-5 h-5" />
                {user.name}
              </Link>
            )}

          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700 p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="py-4 border-t border-gray-100">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search challenges..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white border-t border-gray-200 shadow-xl">
            <nav className="flex flex-col p-4 space-y-2">
              <Link to="/" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium">
                <Home className="w-5 h-5" />
                Home
              </Link>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium">
                <Target className="w-5 h-5" />
                Challenges
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium">
                <TrendingUp className="w-5 h-5" />
                My Progress
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium">
                <BarChart3 className="w-5 h-5" />
                Statistics
              </a>
              {!user && (
                <Link to="/register"
                  className="px-6 py-2.5 bg-transparent border border-gray-600 text-gray-600 font-semibold rounded-lg
                        hover:bg-gray-800 hover:text-white
                          transition-colors duration-300 flex items-center gap-2 cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  Register
                </Link>
              )}
              {!user && (
                <Link to="/login"
                  className="px-6 py-2.5 bg-transparent border border-gray-600 text-gray-600 font-semibold rounded-lg
                        hover:bg-gray-800 hover:text-white
                          transition-colors duration-300 flex items-center gap-2 cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
              )}
              <hr />
              {user && !isAdmin && (
                <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors rounded-lg hover:bg-gray-100">
                  <User className="w-5 h-5" />
                  {user.name}
                </Link>
              )}
              {isAdmin && (
                <>
                  <Link to="/admin"
                    className="px-6 py-2.5 bg-transparent border border-gray-600 text-gray-600 font-semibold rounded-lg
                            hover:bg-gray-800 hover:text-white
                              transition-colors duration-300 flex items-center gap-2 cursor-pointer"
                  >
                    <LogIn className="w-4 h-4" />
                    Admin Panel
                  </Link>
                  <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors rounded-lg hover:bg-gray-100">
                    <UserStar className="w-5 h-5" />
                    {user.name}
                  </Link>
                </>
              )}
              {user && !isAdmin && (
                <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors rounded-lg hover:bg-gray-100">
                  <User className="w-5 h-5" />
                  {user.name}
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}