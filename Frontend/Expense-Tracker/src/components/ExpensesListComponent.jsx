import React from "react";
import AddExpenseCard from "./AddExpenseCard";
import ExpenseCard from "./ExpenseCard";

const ExpenseList = ({
  expenses,
  onAddExpense,
  onEditExpense,
  onDeleteExpense,
}) => {
  
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Your Expenses
      </h3>
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => {
            const container = document.getElementById("expense-scroll");
            container.scrollBy({ left: -300, behavior: "smooth" });
          }}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Scrollable Container */}
        <div
          id="expense-scroll"
          className="flex gap-4 overflow-x-auto pb-4 px-12 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style>{`
            #expense-scroll::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          <div key="add-expense-card" className="flex-shrink-0 w-80">
            <AddExpenseCard onAddExpense={onAddExpense} />
          </div>

          {expenses.map((expense) => (
            <div key={expense._id} className="flex-shrink-0 w-80">
              <ExpenseCard
                expense={expense}
                onEdit={onEditExpense}
                onDelete={onDeleteExpense}
              />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => {
            const container = document.getElementById("expense-scroll");
            container.scrollBy({ left: 300, behavior: "smooth" });
          }}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ExpenseList;
