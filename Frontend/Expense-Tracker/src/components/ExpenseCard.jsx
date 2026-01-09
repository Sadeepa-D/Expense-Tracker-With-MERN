import React from "react";
import { Edit, Trash2 } from "lucide-react";

const ExpenseCard = ({ expense, onEdit, onDelete }) => {
  const categoryColors = {
    Food: "bg-orange-100 text-orange-600",
    Transport: "bg-blue-100 text-blue-600",
    Bills: "bg-red-100 text-red-600",
    Entertainment: "bg-purple-100 text-purple-600",
    Shopping: "bg-pink-100 text-pink-600",
    Other: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            categoryColors[expense.category] || categoryColors.Other
          }`}
        >
          {expense.category}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(expense)}
            className="text-blue-500 hover:text-blue-700"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(expense._id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-800 mb-1">
        ${(expense.amount || 0).toFixed(2)}{" "}
      </p>
      <p className="text-sm text-gray-600 mb-1">{expense.description}</p>
      <p className="text-xs text-gray-400">
        {new Date(expense.date).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ExpenseCard;
