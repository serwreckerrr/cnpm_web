import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, User, Lock, Sparkles } from 'lucide-react';
import logo from '../imports/hcmut.png';
type User = {
  name: string;
  studentId: string;
  role: string;
  email: string;
  faculty: string;
  isGuest: boolean;
};

interface LoginScreenProps {
  onLogin: (user: User) => void;
  onGuestLogin: () => void;
}

export function LoginScreen({ onLogin, onGuestLogin }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 800));

    setIsLoading(false);

    // hardcode account
    if (
      username === 'Phạm Đình Phong' &&
      password === '2312628'
    ) {
      onLogin({
        name: 'Phạm Đình Phong',
        studentId: '2312628',
        role: 'Student',
        email: 'phong.phamdinh@hcmut.edu.vn',
        faculty: 'Khoa Khoa học & Kỹ thuật Máy tính',
        isGuest: false,
      });

      return;
    }

    alert('Sai tài khoản hoặc mật khẩu');
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    setIsLoading(false);
    onGuestLogin();
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">
      
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 -left-4 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <motion.div
          className="absolute bottom-0 -right-4 w-96 h-96 bg-sky-300/30 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-8"
          >
            <div className="flex justify-center mb-4">
              <img
                src={logo}
                alt="HCMUT"
                className="w-24 h-24 object-contain"
              />
            </div>

            <h1 className="text-4xl font-semibold text-blue-900 mb-2">
              Welcome Back
            </h1>

            <p className="text-blue-700">
              Sign in to continue
            </p>
          </motion.div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-blue-100"
          >
            <form onSubmit={handleLogin} className="space-y-6">

              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm text-blue-900 mb-2"
                >
                  Username
                </label>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-slate-500 group-focus-within:text-blue-600 transition-colors" />
                  </div>

                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-blue-50 text-slate-800 pl-12 pr-4 py-3.5 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-400"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm text-blue-900 mb-2"
                >
                  Password
                </label>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-slate-500 group-focus-within:text-blue-600 transition-colors" />
                  </div>

                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-blue-50 text-slate-800 pl-12 pr-12 py-3.5 rounded-xl border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-400"
                    placeholder="Enter your password"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-medium hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />

                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>

                    Signing in...
                  </span>
                ) : (
                  'Login'
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-blue-200"></div>
              </div>

              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500">
                  or
                </span>
              </div>
            </div>

            {/* Guest Login */}
            <motion.button
              type="button"
              onClick={handleGuestLogin}
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-50 text-blue-900 py-3.5 rounded-xl font-medium border border-blue-200 hover:bg-blue-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Loading...' : 'Login as Guest'}
            </motion.button>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-center text-sm text-slate-500"
          >
            <p>
              By continuing, you agree to our Terms of Service
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
