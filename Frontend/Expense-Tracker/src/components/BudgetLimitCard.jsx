import React, { useState } from "react";
import { DollarSign, X } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

const BudgetLimitDialog = ({ isOpen, onClose, currentLimit, onSave }) => {
  const [limit, setLimit] = useState(currentLimit);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    const parsedlimit = parseFloat(limit);
    if (!limit || limit.toString().trim() === "") {
      return toast.error("Salary limit is required");
    }
    if (isNaN(parsedlimit)) {
      return toast.error("Please enter a valid number");
    }
    if (parsedlimit < 0) {
      return toast.error("Salary limit cannot be negative");
    }
    try {
      setLoading(true);
      const response = await axios.put(
        "http://localhost:5000/api/user/updatesalary",
        { newsalarylimit: parsedlimit },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Salary Limit Updated!");
      if (onSave) {
        await onSave(parsedlimit);
        onClose();
      }
    } catch (error) {
      toast.error("Failed to update salary limit");
      setError(error.message || "Failed to update salary limit");
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Toaster />
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Set Monthly Budget Limit
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Budget
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              step="0.01"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              placeholder="5000.00"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default BudgetLimitDialog;
