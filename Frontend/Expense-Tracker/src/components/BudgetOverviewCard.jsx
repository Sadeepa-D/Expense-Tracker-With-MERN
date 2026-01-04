import React from "react";

const BudgetOverviewCard = ({ salaryLimit, totalExpenses }) => {
  const remainingBudget = salaryLimit - totalExpenses;
  const percentageUsed = ((totalExpenses / salaryLimit) * 100).toFixed(1);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-blue-100 text-sm mb-1">Monthly Budget</p>
          <h2 className="text-4xl font-bold mb-2">${salaryLimit.toFixed(2)}</h2>
          <p className="text-blue-100">
            Spent: ${totalExpenses.toFixed(2)} ({percentageUsed}%)
          </p>
        </div>
        <div className="text-right">
          <p className="text-blue-100 text-sm mb-1">Remaining</p>
          <h3 className="text-3xl font-bold">${remainingBudget.toFixed(2)}</h3>
        </div>
      </div>
      <div className="mt-4 bg-white bg-opacity-20 rounded-full h-3 overflow-hidden">
        <div
          className="bg-white h-full rounded-full transition-all duration-500"
          style={{ width: `${Math.min(percentageUsed, 100)}%` }}
        />
      </div>
    </div>
  );
};

export default BudgetOverviewCard;
