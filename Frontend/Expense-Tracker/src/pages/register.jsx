import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DollarSign, TrendingDown } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function ExpenseTrackerSignup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all the required fields!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!agreeToTerms) {
      toast.error("You must agree to the Terms & Conditions.");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/user/register",
        { name, email, password }
      );
      console.log("response:", response.data);
      toast.success("Account created successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen select-text h-auto">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-12 w-12 h-12 bg-green-400 rounded-full opacity-70"></div>
        <div className="absolute top-24 right-40 w-8 h-8 bg-pink-300 rounded-full opacity-60"></div>
        <div className="absolute bottom-40 left-32 w-16 h-16 bg-yellow-400 rounded-full opacity-50"></div>
        <div className="absolute bottom-32 right-20 w-10 h-10 bg-orange-400 rounded-full opacity-70"></div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full px-12">
          {/* Expense Summary Card */}
          <div className="mb-8 w-full max-w-md">
            <div className="bg-white rounded-3xl shadow-2xl p-8 transform -rotate-2 hover:rotate-0 transition-transform">
              <div className="mb-6">
                <span className="text-gray-500 text-sm font-medium uppercase tracking-wide select-text">
                  SPENT THIS MONTH
                </span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-5xl font-bold text-gray-900 select-text">
                    $2,847
                  </span>
                  <span className="text-gray-400 text-lg select-text">
                    / $5,000
                  </span>
                </div>
              </div>

              {/* Expense Items */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center select-text text-xl">
                      🍕
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 select-text">
                        Restaurant & Dining
                      </p>
                      <p className="text-gray-500 text-sm select-text">
                        $127.50
                      </p>
                    </div>
                  </div>
                  <span className="text-red-500 font-semibold text-sm select-text">
                    -12%
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center select-text text-xl">
                      🏠
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 select-text">
                        Rent & Utilities
                      </p>
                      <p className="text-gray-500 text-sm select-text">
                        $1,650.00
                      </p>
                    </div>
                  </div>
                  <span className="text-blue-500 font-semibold text-sm select-text">
                    -33%
                  </span>
                </div>
              </div>

              {/* On Track Badge */}
              <div className="flex items-center gap-2 bg-green-500 text-white rounded-full px-4 py-2 w-fit">
                <span className="font-semibold select-text">On Track</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            {/* Savings Card */}
            <div className="mt-6 bg-gradient-to-br from-purple-400 via-purple-500 to-pink-500 rounded-3xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform">
              <div className="text-white text-center">
                <div className="w-12 h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-3 select-text text-2xl">
                  💰
                </div>
                <p className="text-sm opacity-90 mb-1 select-text">Savings</p>
                <div className="text-3xl font-bold select-text">$3.2K</div>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="text-center text-white mt-8">
            <h1 className="text-4xl font-bold mb-4 select-text">
              Take Control Of
              <br />
              Your Finances
            </h1>
            <p className="text-blue-100 text-lg max-w-md select-text">
              Track expenses, set budgets, and achieve your financial goals with
              ease
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 px-8 py-12 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center shadow-lg">
              <DollarSign className="w-9 h-9 text-blue-600" strokeWidth={2.5} />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 select-text">
              Hello Again!
            </h2>
            <p className="text-gray-500 select-text">
              Welcome back! Sign in to continue tracking your expenses and
              managing your budget
            </p>
          </div>

          {/* Signup Form */}
          <form className="space-y-5" onSubmit={handleSignup}>
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 select-text">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Sadeepa Dinakara"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition select-text"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 select-text">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sadeepa@test.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition select-text"
                />
                <span className="absolute right-4 top-3.5 text-blue-600 font-medium select-text">
                  @
                </span>
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 select-text">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition select-text"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 select-text">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition select-text"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Terms & Conditions */}
            {/* Terms & Conditions */}
            <div className="flex items-center">
              <div className="flex items-center">
                <input
                  id="terms-checkbox" // Added ID
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                />
                {/* Label is ONLY for the text "I agree to the", not the link */}
                <label
                  htmlFor="terms-checkbox"
                  className="ml-2 text-sm text-gray-600 cursor-pointer select-none"
                >
                  I agree to the{" "}
                </label>
              </div>

              {/* Link is outside the label so it doesn't trigger the checkbox */}
              <button
                type="button"
                onClick={() => toast("Terms modal would open here")}
                className="ml-1 text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                Terms & Conditions
              </button>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              onClick={handleSignup}
              className={`w-full py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl select-text
                ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>

            {/* Google Sign In */}
          </form>

          {/* Login Link */}
          <p className="text-center mt-8 text-gray-600 select-text">
            Do you already Have an account?{" "}
            <Link to="/">
              <button className="text-blue-600 font-semibold hover:underline">
                Sign In
              </button>
            </Link>
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
