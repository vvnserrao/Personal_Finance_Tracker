import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddTransaction from './components/AddTransaction';
import TransactionList from './components/TransactionList';
import Summary from './components/Summary';
import ManageTransactions from './components/ManageTransactions';
import ProtectedRoute from './components/ProtectedRoute';
import EditTransaction from './components/EditTransaction'; 

function App() {
  return (
    <Router>
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/add-transaction" element={<ProtectedRoute element={<AddTransaction />} />} />
        <Route path="/transaction-list" element={<ProtectedRoute element={<TransactionList />} />} />
        <Route path="/summary" element={<ProtectedRoute element={<Summary />} />} />
        <Route path="/manage-transactions" element={<ProtectedRoute element={<ManageTransactions />} />} />
        <Route path="/edit-transaction/:id" element={<ProtectedRoute element={<EditTransaction />} />} /> {/* Route for Edit */}
        <Route path="/" element={<Navigate to="/login" />} /> {/* Default redirect */}
      </Routes>
    </Router>
  );
}

export default App;
