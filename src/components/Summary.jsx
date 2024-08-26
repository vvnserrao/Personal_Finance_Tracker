import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from "firebase/firestore"; 
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import NavigationPanel from './NavigationPanel';
import '../styles/DashBoard.css'; 

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      const querySnapshot = await getDocs(collection(db, "transactions"));
      const fetchedTransactions = querySnapshot.docs.map(doc => doc.data());

      setTransactions(fetchedTransactions);

      let income = 0;
      let expense = 0;
      let transactionCount = fetchedTransactions.length;

      fetchedTransactions.forEach(transaction => {
        if (transaction.type === 'income') {
          income += transaction.amount;
        } else if (transaction.type === 'expense') {
          expense += transaction.amount;
        }
      });

      setTotalIncome(income);
      setTotalExpense(expense);
      setTotalTransactions(transactionCount);
    };

    fetchTransactions();
  }, []);

  const data = [
    { name: 'Income', value: totalIncome },
    { name: 'Expense', value: totalExpense }
  ];

  const categoriesData = transactions.reduce((acc, transaction) => {
    const category = transaction.category || 'Uncategorized';
    acc[category] = acc[category] ? acc[category] + transaction.amount : transaction.amount;
    return acc;
  }, {});

  const categoriesChartData = Object.keys(categoriesData).map(category => ({
    name: category,
    value: categoriesData[category],
  }));

  const COLORS = ['#0088FE', '#FF8042', '#00C49F', '#FFBB28', '#FF7F50', '#B22222'];

  return (
    <div className="summary-container">
      <NavigationPanel />
      <h2 className="summary-title">Dashboard Summary</h2>
      <div className="summary-cards">
        <div className="summary-card income-card">
          <h3>Total Income</h3>
          <p>{totalIncome}</p>
        </div>
        <div className="summary-card expense-card">
          <h3>Total Expense</h3>
          <p>{totalExpense}</p>
        </div>
        <div className="summary-card balance-card">
          <h3>Net Balance</h3>
          <p>{totalIncome - totalExpense}</p>
        </div>
        <div className="summary-card transactions-card">
          <h3>Total Transactions</h3>
          <p>{totalTransactions}</p>
        </div>
      </div>
      <div className="charts-container">
        <div className="chart">
          <h3>Income vs Expense</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%" 
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="chart">
          <h3>Expenses by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoriesChartData}
                cx="50%" 
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoriesChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
