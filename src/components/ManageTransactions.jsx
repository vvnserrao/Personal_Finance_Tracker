import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { FaEdit, FaTrash } from 'react-icons/fa'; 
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';
import NavigationPanel from './NavigationPanel';
import '../styles/ManageTransaction.css';

const ManageTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      const querySnapshot = await getDocs(collection(db, "transactions"));
      setTransactions(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchTransactions();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await deleteDoc(doc(db, "transactions", id));
        setTransactions(transactions.filter(transaction => transaction.id !== id));
      } catch (error) {
        console.error("Error deleting document:", error);
      }
    }
  };

  // Helper function to format the date to dd-mm-yyyy
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = dateObject.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className='Navigation'>
      <NavigationPanel/>
      <div className="manage-transaction">
        <h2 className='name-center'>Manage Transaction</h2>
        <table>
          <thead>
            <tr>
              <th>Sl.No</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Category</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction.id}>
                <td>{index + 1}</td>
                <td>{formatDate(transaction.date)}</td> {/* Format the date here */}
                <td>{transaction.amount}</td>
                <td>{transaction.type}</td>
                <td>{transaction.category}</td>
                <td>{transaction.description}</td>
                <td>
                  <button
                    className="action-button"
                    onClick={() => navigate(`/edit-transaction/${transaction.id}`)}
                    title="Edit Transaction"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    className="action-button"
                    onClick={() => handleDelete(transaction.id)}
                    title="Delete Transaction"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTransactions;
