import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DashboardHeader from "../components/DashBoardHeaderComponent";
import BudgetOverviewCard from "../components/BudgetOverviewCard";
import ExpenseList from "../components/ExpensesListComponent";
import PieChartCard from "../components/PieChartCard";
import BarChartCard from "../components/BarcharCard";
import SalaryLimitDialog from "../components/BudgetLimitCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user] = useState({
    name: "John Doe",
    email: "gihankaveesha@gmail.com",
  });
  const [salaryLimit, setSalaryLimit] = useState(5000);
  const [showSalaryDialog, setShowSalaryDialog] = useState(false);
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      category: "Food",
      amount: 45.5,
      description: "Grocery shopping",
      date: "2026-01-03",
    },
    {
      id: 2,
      category: "Transport",
      amount: 25.0,
      description: "Uber ride",
      date: "2026-01-02",
    },
    {
      id: 3,
      category: "Bills",
      amount: 120.0,
      description: "Electricity bill",
      date: "2026-01-01",
    },
    {
      id: 4,
      category: "Entertainment",
      amount: 60.0,
      description: "Movie tickets",
      date: "2026-01-03",
    },
  ]);

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const handleAddExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const handleEditExpense = (expense) => {
    console.log("Edit expense:", expense);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <DashboardHeader
          userName={user.name}
          onSetSalaryLimit={() => setShowSalaryDialog(true)}
          onLogout={handleLogout}
        />

        {/* Budget Overview Card */}
        <div className="mb-8">
          <BudgetOverviewCard
            salaryLimit={salaryLimit}
            totalExpenses={totalExpenses}
          />
        </div>

        {/* Expenses Horizontal Scroll */}
        <ExpenseList
          expenses={expenses}
          onAddExpense={handleAddExpense}
          onEditExpense={handleEditExpense}
          onDeleteExpense={handleDeleteExpense}
        />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PieChartCard expenses={expenses} />
          <BarChartCard totalExpenses={totalExpenses} />
        </div>
      </div>

      {/* Salary Limit Dialog */}
      <SalaryLimitDialog
        isOpen={showSalaryDialog}
        onClose={() => setShowSalaryDialog(false)}
        currentLimit={salaryLimit}
        onSave={setSalaryLimit}
      />
    </div>
  );
};

export default Dashboard;
