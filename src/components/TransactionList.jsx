import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from "firebase/firestore"; 
import NavigationPanel from './NavigationPanel';
import '../styles/TransactionList.css'; 


const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    const fetchTransactions = async () => {
      const querySnapshot = await getDocs(collection(db, "transactions"));
      const transactionsData = querySnapshot.docs.map(doc => doc.data());
      setTransactions(transactionsData);
      setFilteredTransactions(transactionsData);
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = transactions;

      if (filterType !== 'all') {
        filtered = filtered.filter(transaction => transaction.type.toLowerCase() === filterType.toLowerCase());
      }

      if (filterCategory !== 'all') {
        filtered = filtered.filter(transaction => transaction.category.toLowerCase() === filterCategory.toLowerCase());
      }

      setFilteredTransactions(filtered);
    };

    applyFilters();
  }, [filterType, filterCategory, transactions]);

  const handleSort = (order) => {
    const sortedTransactions = [...filteredTransactions].sort((a, b) => {
      const dateA = new Date(a.date.split('-').reverse().join('-')); // Convert to mm-dd-yyyy for correct sorting
      const dateB = new Date(b.date.split('-').reverse().join('-')); // Convert to mm-dd-yyyy for correct sorting

      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });

    setFilteredTransactions(sortedTransactions);
    setSortOrder(order);
  };

  // Helper function to format date strings back to dd-mm-yyyy
  const formatDate = (inputDate) => {
    const dateObject = new Date(inputDate);
    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = dateObject.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className='Navigation'>
      <NavigationPanel/>
      <div className="transaction-list">
        <h2 className='name-center'>Transaction List</h2>
        <div className="sort-filter-dropdowns">
          <select className="dropdown" value={sortOrder} onChange={(e) => handleSort(e.target.value)}>
            <option value="asc">Sort by Date (asc)</option>
            <option value="desc">Sort by Date (desc)</option>
          </select>
          <select className="dropdown" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">Filter by Type (All)</option>
            <option value="Income">Only Income</option>
            <option value="Expense">Only Expense</option>
          </select>
          <select className="dropdown" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="all">Filter by Category (All)</option>
            <option value="groceries">Groceries</option>
            <option value="rent">Rent</option>
            <option value="salary">Salary</option>
            <option value="utilities">Utilities</option>
            <option value="others">Others</option>
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>Sl.No</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Category</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{formatDate(transaction.date)}</td> {/* Format the date */}
                <td>{transaction.amount}</td>
                <td>{transaction.type}</td>
                <td>{transaction.category}</td>
                <td>{transaction.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;
