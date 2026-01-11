import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import DashboardHeader from "../components/DashBoardHeaderComponent";
import BudgetOverviewCard from "../components/BudgetOverviewCard";
import ExpenseList from "../components/ExpensesListComponent";
// import PieChartCard from "../components/PieChartCard";
// import BarChartCard from "../components/BarcharCard";
import SalaryLimitDialog from "../components/BudgetLimitCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [salaryLimit, setSalaryLimit] = useState(0);
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

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const handleAddExpense = async (expense) => {
    await fetchExpenses();
    toast.success("Expense added successfully!");
  };

  const handleDeleteExpense = async (id) => {
    if (!window.confirm("Are You Sure to delete This Expense")) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5000/api/expenses/deleteexpense/${id}`,
        {
          method: "delete",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        toast.error("Failed to delete expense");
      }
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense._id !== id)
      );
      toast.success("Expense deleted successfully!");
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense. Please check your connection.");
    }
  };

  const handleEditExpense = (expense) => {
    console.log("Edit expense:", expense);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const getbudget = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/salarylimit",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSalaryLimit(response.data.salaryLimit || 0);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load budget");
    }
  };

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser({
        name: response.data.name,
        email: response.data.email,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to load user data");
    }
  };
  const handleSaveSalaryLimit = async (newLimit) => {
    setSalaryLimit(newLimit);
    // Optionally refetch to ensure data is synced
    await getbudget();
  };

  // Load all data on mount
  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    fetchUserData();
    getbudget();
    fetchExpenses();
  }, [token]);

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
