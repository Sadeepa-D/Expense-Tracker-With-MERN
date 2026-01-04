import React, { useState } from 'react';
import { PlusCircle, LogOut, Edit, Trash2, DollarSign, X } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Add Expense Card Component
const AddExpenseCard = ({ onAddExpense }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = () => {
    if (formData.category && formData.amount) {
      onAddExpense({
        ...formData,
        id: Date.now(),
        amount: parseFloat(formData.amount)
      });
      setFormData({ category: '', amount: '', description: '', date: new Date().toISOString().split('T')[0] });
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <div 
        onClick={() => setIsOpen(true)}
        className="bg-white rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-shadow border-2 border-dashed border-gray-300 flex items-center justify-center min-h-[150px]"
      >
        <div className="text-center">
          <PlusCircle className="w-12 h-12 mx-auto text-blue-500 mb-2" />
          <p className="text-gray-600 font-medium">Add New Expense</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">New Expense</h3>
        <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
          <input
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="What was this for?"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

// Expense Card Component
const ExpenseCard = ({ expense, onEdit, onDelete }) => {
  const categoryColors = {
    Food: 'bg-orange-100 text-orange-600',
    Transport: 'bg-blue-100 text-blue-600',
    Bills: 'bg-red-100 text-red-600',
    Entertainment: 'bg-purple-100 text-purple-600',
    Shopping: 'bg-pink-100 text-pink-600',
    Other: 'bg-gray-100 text-gray-600'
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[expense.category] || categoryColors.Other}`}>
          {expense.category}
        </span>
        <div className="flex gap-2">
          <button onClick={() => onEdit(expense)} className="text-blue-500 hover:text-blue-700">
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={() => onDelete(expense.id)} className="text-red-500 hover:text-red-700">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-800 mb-1">${expense.amount.toFixed(2)}</p>
      <p className="text-sm text-gray-600 mb-1">{expense.description}</p>
      <p className="text-xs text-gray-400">{new Date(expense.date).toLocaleDateString()}</p>
    </div>
  );
};

// Salary Limit Dialog Component
const SalaryLimitDialog = ({ isOpen, onClose, currentLimit, onSave }) => {
  const [limit, setLimit] = useState(currentLimit);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(parseFloat(limit));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Set Monthly Salary Limit</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Salary</label>
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

// Main Dashboard Component
const ExpenseTrackerDashboard = () => {
  const [user] = useState({ name: 'John Doe', email: 'gihankaveesha@gmail.com' });
  const [salaryLimit, setSalaryLimit] = useState(5000);
  const [showSalaryDialog, setShowSalaryDialog] = useState(false);
  const [expenses, setExpenses] = useState([
    { id: 1, category: 'Food', amount: 45.50, description: 'Grocery shopping', date: '2026-01-03' },
    { id: 2, category: 'Transport', amount: 25.00, description: 'Uber ride', date: '2026-01-02' },
    { id: 3, category: 'Bills', amount: 120.00, description: 'Electricity bill', date: '2026-01-01' },
    { id: 4, category: 'Entertainment', amount: 60.00, description: 'Movie tickets', date: '2026-01-03' }
  ]);

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remainingBudget = salaryLimit - totalExpenses;
  const percentageUsed = ((totalExpenses / salaryLimit) * 100).toFixed(1);

  const handleAddExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const handleEditExpense = (expense) => {
    console.log('Edit expense:', expense);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  // Pie chart data
  const pieData = expenses.reduce((acc, exp) => {
    const existing = acc.find(item => item.name === exp.category);
    if (existing) {
      existing.value += exp.amount;
    } else {
      acc.push({ name: exp.category, value: exp.amount });
    }
    return acc;
  }, []);

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  // Bar chart data - last 6 months
  const barData = [
    { month: 'Aug', amount: 3200 },
    { month: 'Sep', amount: 2800 },
    { month: 'Oct', amount: 3500 },
    { month: 'Nov', amount: 2900 },
    { month: 'Dec', amount: 4100 },
    { month: 'Jan', amount: totalExpenses }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Hi, {user.name}! 👋</h1>
            <p className="text-gray-600 mt-1">Track your expenses and manage your budget</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowSalaryDialog(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium shadow-md"
            >
              <DollarSign className="w-5 h-5" />
              Set Salary Limit
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium shadow-md"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Budget Overview Card */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white mb-8 shadow-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 text-sm mb-1">Monthly Budget</p>
              <h2 className="text-4xl font-bold mb-2">${salaryLimit.toFixed(2)}</h2>
              <p className="text-blue-100">Spent: ${totalExpenses.toFixed(2)} ({percentageUsed}%)</p>
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

        {/* Expenses Horizontal Scroll */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Expenses</h3>
          <div className="relative">
            {/* Left Arrow - Show when scrolled */}
            <button
              onClick={() => {
                const container = document.getElementById('expense-scroll');
                container.scrollBy({ left: -300, behavior: 'smooth' });
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Scrollable Container */}
            <div
              id="expense-scroll"
              className="flex gap-4 overflow-x-auto pb-4 px-12 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style>{`
                #expense-scroll::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              
              <div className="flex-shrink-0 w-80">
                <AddExpenseCard onAddExpense={handleAddExpense} />
              </div>
              
              {expenses.map(expense => (
                <div key={expense.id} className="flex-shrink-0 w-80">
                  <ExpenseCard
                    expense={expense}
                    onEdit={handleEditExpense}
                    onDelete={handleDeleteExpense}
                  />
                </div>
              ))}
            </div>

            {/* Right Arrow - Show when more cards available */}
            <button
              onClick={() => {
                const container = document.getElementById('expense-scroll');
                container.scrollBy({ left: 300, behavior: 'smooth' });
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Daily Allocations</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Expenses</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#3B82F6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
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

export default ExpenseTrackerDashboard;