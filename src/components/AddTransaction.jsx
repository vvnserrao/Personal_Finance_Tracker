import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';
import '../styles/Components.css';
import NavigationPanel from './NavigationPanel';

const AddTransaction = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('income'); // Default type
  const [date, setDate] = useState('');
  const [error, setError] = useState(''); 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!amount || parseFloat(amount) <= 0) {
      setError("Amount should be greater than 0.");
      return;
    }
    if (!category || !date) {
      setError("Please fill out all required fields.");
      return;
    }

    setError(''); // Clear any previous error message

    try {
      await addDoc(collection(db, "transactions"), {
        amount: parseFloat(amount),
        description,
        category,
        type, // Added type
        date // Store date in default format (yyyy-mm-dd)
      });
      
      // Clear form fields after submission
      setAmount('');
      setDescription('');
      setCategory('');
      setType('income');
      setDate('');
      alert("Added Succesfully")
      navigate('/dashboard');
    } catch (error) {
      console.error("Error adding document: ", error);
      setError("Error adding transaction. Please try again.");
    }
  };

  const handleBack = () => {
    navigate('/dashboard'); // Navigate back to the dashboard or previous page
  };

  return (
    <div className='Navigation'>
      <NavigationPanel/>
      <form onSubmit={handleSubmit} className="add-transaction-form">
        <h2 className='name-center'>Add Transaction</h2>

        {error && <p className="error-message">{error}</p>}

        <label>Select Date <span className="mandatory">*</span></label>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          required 
          className="date-input"
        />

        <label>Enter Amount <span className="mandatory">*</span></label>
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          placeholder="Amount" 
          required 
        />

        <label>Select Category <span className="mandatory">*</span></label>
        <select className='transaction-select' value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          <option value="groceries">Groceries</option>
          <option value="rent">Rent</option>
          <option value="salary">Salary</option>
          <option value="utilities">Utilities</option>
          <option value="others">Others</option>
        </select>

        <label>Select Type <span className="mandatory">*</span></label>
        <select className='transaction-select' value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <label>Enter Description</label>
        <input 
          type="text"
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Description" 
        />
        
        <div className="button-group">
          <button type="button" onClick={handleBack}>Go Back</button>
          <button type="submit">Add Transaction</button>
        </div>
      </form>
    </div>
  );
};

export default AddTransaction;
