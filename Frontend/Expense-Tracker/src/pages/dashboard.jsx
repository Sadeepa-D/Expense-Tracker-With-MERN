import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import DashboardHeader from "../components/DashBoardHeaderComponent";
import BudgetOverviewCard from "../components/BudgetOverviewCard";
import ExpenseList from "../components/ExpensesListComponent";
// import PieChartCard from "../components/PieChartCard";
// import BarChartCard from "../components/BarcharCard";
import SalaryLimitDialog from "../components/BudgetLimitCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user] = useState({
    name: "",
    email: "",
  });
  const [salaryLimit, setSalaryLimit] = useState(5000);
  const [showSalaryDialog, setShowSalaryDialog] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:5000/api/expenses/viewexpense",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        toast.error("Failed to Load Expenses!");
        return;
      }
      const data = await response.json();
      setExpenses(data.expenses || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [token]);

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const handleAddExpense = async (expense) => {
    await fetchExpenses();
    toast.success("Expense added successfully!");
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
      <Toaster />
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
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PieChartCard expenses={expenses} />
          <BarChartCard totalExpenses={totalExpenses} />
        </div> */}
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
