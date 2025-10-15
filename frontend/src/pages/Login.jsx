import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, LoaderCircle, AlertCircle } from 'lucide-react';

// 1. Импортируем ваш сервис аутентификации
import AuthService from '../pages/services/auth.services.js';
// 2. Импортируем хук useUser для обновления состояния после входа
import { useUser } from '../hooks/useUser';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [focusedInput, setFocusedInput] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { refetch } = useUser(); // 3. Получаем функцию refetch из контекста

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) {
      setError(null);
    }
  };

  // 4. Логика отправки формы переписана для использования AuthService
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Вызываем метод login из сервиса
      await AuthService.login(formData);

      // После успешного входа обновляем данные пользователя во всём приложении
      await refetch();

      // Перенаправляем на главную страницу
      navigate('/');
    } catch (err) {
      // AuthService сам "пробрасывает" ошибку с нужным сообщением
      setError(err.message);
      console.error('Login failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 pt-20">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">

        {/* Левая часть (без изменений) */}
        <div className="hidden md:flex flex-col justify-center space-y-8 p-12">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Welcome back!<br />
              Continue your journey
            </h2>
            <p className="text-gray-600 text-lg">
              Log in to track your progress, join new challenges, and connect with the community.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { icon: '🎯', title: 'Track Progress', delay: '0s' },
              { icon: '📈', title: 'Join Challenges', delay: '0.2s' },
              { icon: '🏆', title: 'Earn Rewards', delay: '0.4s' }
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 transform transition-all duration-500 hover:translate-x-2 hover:bg-gray-100"
                style={{ animation: `slideInLeft 0.6s ease-out ${item.delay} both` }}
              >
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <div className="font-bold text-gray-900">{item.title}</div>
                  <div className="text-sm text-gray-600">Step {index + 1}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Правая часть - Форма входа (без изменений в JSX) */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Login to your account
              </h3>
              <p className="text-gray-600">
                Enter your credentials to continue
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <div className={`relative transition-all duration-300 ${focusedInput === 'email' ? 'transform scale-[1.02]' : ''}`}>
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput('')}
                    placeholder="your@email.com"
                    required
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:border-gray-900 transition-all duration-300 ${error ? 'border-red-500' : 'border-gray-200'}`}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <div className={`relative transition-all duration-300 ${focusedInput === 'password' ? 'transform scale-[1.02]' : ''}`}>
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput('')}
                    placeholder="••••••••"
                    required
                    className={`w-full pl-12 pr-12 py-3 border-2 rounded-lg focus:outline-none focus:border-gray-900 transition-all duration-300 ${error ? 'border-red-500' : 'border-gray-200'}`}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 border-2 border-gray-300 rounded cursor-pointer" />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900">Remember me</span>
                </label>
              </div>
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              <button type="submit" disabled={isLoading} className="w-full py-4 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed">
                {isLoading ? (
                  <>
                    <LoaderCircle className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Login</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-gray-900 font-bold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
      <style>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}