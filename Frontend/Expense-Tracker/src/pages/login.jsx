import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("Johnnybr");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log("Login attempt with:", { email, password, rememberMe });
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Blue Section */}
      <div className="w-1/2 bg-gradient-to-br from-blue-600 to-blue-700 p-12 flex flex-col justify-between relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-8 h-8 bg-green-400 rounded-full"></div>
        <div className="absolute top-32 left-32 w-6 h-6 bg-emerald-400 rounded-full"></div>
        <div className="absolute top-24 right-20 w-6 h-6 bg-red-300 rounded-full"></div>
        <div className="absolute bottom-32 left-20 w-12 h-12 bg-yellow-400 rounded-full"></div>
        <div className="absolute top-1/3 right-10 w-8 h-8 bg-purple-300 rounded-full"></div>
        <div className="absolute bottom-1/4 right-32 w-6 h-6 bg-orange-400 rounded-full"></div>

        {/* Content Card */}
        <div className="relative z-10 mt-20">
          <div className="bg-white rounded-3xl p-6 max-w-md shadow-2xl">
            {/* Budget Overview */}
            <div className="mb-4">
              <p className="text-gray-500 text-xs mb-1">SPENT THIS MONTH</p>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-gray-800">$2,847</span>
                <span className="text-gray-400 text-sm ml-2">/ $5,000</span>
              </div>
            </div>

            {/* Recent Expenses */}
            <div className="space-y-3">
              <div className="flex items-center bg-gray-50 rounded-xl p-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-2xl mr-3">
                  🍕
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm">
                    Restaurant & Dining
                  </p>
                  <p className="text-gray-500 text-xs">$127.50</p>
                </div>
                <div className="text-red-500 font-semibold text-sm">-12%</div>
              </div>

              <div className="flex items-center bg-gray-50 rounded-xl p-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl mr-3">
                  🏠
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm">
                    Rent & Utilities
                  </p>
                  <p className="text-gray-500 text-xs">$1,650.00</p>
                </div>
                <div className="text-blue-500 font-semibold text-sm">-33%</div>
              </div>
            </div>

            {/* Budget Status Badge */}
            <div className="mt-4 inline-flex items-center bg-gradient-to-r from-green-400 to-emerald-500 rounded-full px-4 py-2">
              <span className="text-white text-xs font-semibold mr-2">
                On Track
              </span>
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-lg">
                ✓
              </div>
            </div>
          </div>

          {/* Overlay Card */}
          <div className="absolute -right-8 top-24 bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl p-4 w-32 h-40 shadow-lg transform rotate-6">
            <div className="text-white text-center">
              <div className="mb-2 text-2xl">💰</div>
              <div className="text-xs font-semibold">Savings</div>
              <div className="text-lg font-bold mt-1">$3.2K</div>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="relative z-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-3">
            Take Control Of
            <br />
            Your Finances
          </h2>
          <p className="text-blue-200 text-sm">
            Track expenses, set budgets, and achieve
            <br />
            your financial goals with ease
          </p>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-6">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-1/2 bg-gray-50 flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" />
              </svg>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
            Hello Again!
          </h1>
          <p className="text-gray-400 text-sm text-center mb-8">
            Welcome back! Sign in to continue tracking
            <br />
            your expenses and managing your budget
          </p>

          {/* Login Form */}
          <div>
            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-gray-600 text-sm mb-2">Email</label>
              <div className="relative">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 bg-white"
                  placeholder="Email"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500">
                  @
                </span>
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label className="block text-gray-600 text-sm mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 bg-white"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Recovery */}
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-gray-600 text-sm">Remember Me</span>
              </label>
              <button className="text-blue-600 text-sm hover:underline">
                Recovery Password
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors mb-4"
            >
              Login
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600 text-sm mt-8">
            Don't have an account yet?{" "}
            <Link to="/register">
              <button className="text-blue-600 font-semibold hover:underline">
                Sign Up
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
