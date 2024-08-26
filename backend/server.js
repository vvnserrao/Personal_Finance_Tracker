const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Path to your service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
app.post('/api/transactions', async (req, res) => {
    try {
      const transaction = req.body;
      await db.collection('transactions').add(transaction);
      res.status(201).send('Transaction added');
    } catch (error) {
      res.status(500).send('Error adding transaction: ' + error.message);
    }
  });

  app.get('/api/transactions', async (req, res) => {
    try {
      const snapshot = await db.collection('transactions').get();
      const transactions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).send('Error fetching transactions: ' + error.message);
    }
  });

  app.put('/api/transactions/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const transaction = req.body;
      await db.collection('transactions').doc(id).update(transaction);
      res.status(200).send('Transaction updated');
    } catch (error) {
      res.status(500).send('Error updating transaction: ' + error.message);
    }
  });

  app.delete('/api/transactions/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await db.collection('transactions').doc(id).delete();
      res.status(200).send('Transaction deleted');
    } catch (error) {
      res.status(500).send('Error deleting transaction: ' + error.message);
    }
  });
  
  
  

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
