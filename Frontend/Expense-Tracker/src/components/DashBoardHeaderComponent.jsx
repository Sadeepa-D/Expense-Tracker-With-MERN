import React from "react";
import { DollarSign, LogOut } from "lucide-react";

const DashboardHeader = ({ userName, onSetSalaryLimit, onLogout }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Hi, {userName}! 👋</h1>
        <p className="text-gray-600 mt-1">
          Track your expenses and manage your budget
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onSetSalaryLimit}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium shadow-md"
        >
          <DollarSign className="w-5 h-5" />
          Set Budget Limit
        </button>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium shadow-md"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
