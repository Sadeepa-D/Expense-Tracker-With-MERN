import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChartCard = ({ totalExpenses }) => {
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
  );
};

export default BarChartCard;
