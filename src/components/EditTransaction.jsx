// src/components/EditTransaction.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams, useNavigate } from 'react-router-dom';
import NavigationPanel from './NavigationPanel';
import '../styles/EditTransaction.css'; // Ensure this CSS is imported

const EditTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState({
    amount: '',
    description: '',
    category: '',
    type: 'income', // Default to income
    date: ''
  });

  useEffect(() => {
    const fetchTransaction = async () => {
      const docRef = doc(db, "transactions", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTransaction(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchTransaction();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "transactions", id);
      await updateDoc(docRef, transaction);
      navigate('/manage-transactions');
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <div className='Edit'>
      <NavigationPanel/>
    <form onSubmit={handleSubmit} className="transaction-form">
      <h2>Edit Transaction</h2>

      <label>Select Date <span className="mandatory">*</span></label>
      <input
        type="date"
        value={transaction.date}
        onChange={(e) => setTransaction({ ...transaction, date: e.target.value })}
        required
      />

      <label>Enter Amount</label>
      <input
        type="number"
        value={transaction.amount}
        onChange={(e) => setTransaction({ ...transaction, amount: e.target.value })}
        placeholder="Amount"
        required
      />

      <label>Enter Description</label>
      <input
        type="text"
        value={transaction.description}
        onChange={(e) => setTransaction({ ...transaction, description: e.target.value })}
        placeholder="Description"
        required
      />

      <label>Select Category</label>
      <select
        value={transaction.category}
        onChange={(e) => setTransaction({ ...transaction, category: e.target.value })}
        required
      >
        <option value="">Select Category</option>
        <option value="groceries">Groceries</option>
        <option value="rent">Rent</option>
        <option value="salary">Salary</option>
        <option value="utilities">Utilities</option>
        <option value="others">Others</option>
      </select>

      <label>Select Type</label>
      <select
        value={transaction.type}
        onChange={(e) => setTransaction({ ...transaction, type: e.target.value })}
        required
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <div className="button-group">
        <button type="button" onClick={() => navigate('/manage-transactions')}>Cancel</button>
        <button type="submit">Update Transaction</button>
      </div>
    </form>
    </div>
  );
};

export default EditTransaction;
