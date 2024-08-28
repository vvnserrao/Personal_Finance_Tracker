# Personal Finance Tracker

A web application designed to help users manage their personal finances by tracking income and expenses. This application supports user authentication, transaction management, and provides useful features like sorting, filtering, and data visualization to enhance the user experience.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Backend Setup](#backend-setup)
- [Assumptions & Limitations](#assumptions--limitations)

## Demo

Check out the live demo of the Personal Finance Tracker [here](https://personal-finance-tracker-9cd3e.web.app/).

## Features

1. **Dashboard Overview**:
    - **Total Transactions**: Displays the total number of transactions recorded.
    - **Total Expenses and Income**: Shows the cumulative totals of all expenses and income.
    - **Net Balance**: Calculates and displays the net balance, which is the difference between total income and total expenses.
    - **Data Visualization**: Provides graphical representations of income and expenses over time and by category.

2. **Transaction Management**:
    - **Add Transactions**: Users can add transactions by specifying the amount, type (income/expense), date, category, and an optional description.
    - **Edit & Delete**: Users can edit or delete existing transactions as needed.
    - **Categorization**: Transactions can be categorized into different types like groceries, rent, salary, etc.

3. **Transaction List**:
    - **Comprehensive List View**: A detailed list of all transactions is displayed, showing the amount, type, date, category, and description.
    - **Summary Section**: A summary that shows total income, total expenses, and the current balance.
    - **Highlighting**: Transactions that exceed a certain amount are highlighted for easy identification.

4. **Sorting and Filtering**:
    - **Sort by Date/Amount/Category**: Users can sort transactions based on various criteria like date, amount, or category.
    - **Filter by Type**: Users can filter transactions to view only income or expenses.
    - **Filter by Category**: Users can view transactions from specific categories, making it easier to analyze spending patterns.

5. **User Authentication**:
    - **Secure Login/Registration**: Users can register and log in using Firebase Authentication.
    - **User-Specific Data**: Each user's data is securely stored and isolated, ensuring privacy and security.
    - **Session Management**: Users can log out and manage their sessions securely.

6. **Responsive Design**:
    - **Mobile and Desktop Friendly**: The app is fully responsive, offering a seamless experience across devices of all sizes.
    - **Smooth User Experience**: The interface is designed to be intuitive and easy to navigate, ensuring smooth operation.

## Technologies Used

- **Frontend**: React.js, HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js (optional)
- **Database**: Firebase Firestore
- **Authentication**: Firebase Authentication for secure user account management
- **Hosting**: Firebase Hosting for deploying the application

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/vvnserrao/Personal_Finance_Tracker.git
    ```
2. **Navigate to the project directory**:
    ```bash
    cd Personal_Finance_Tracker
    ```
3. **Install the dependencies**:
    ```bash
    npm install
    ```

## Usage

1. **Start the development server**:
    ```bash
    npm start
    ```
   The app will run in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

2. **Run the tests**:
    ```bash
    npm test
    ```
   This launches the test runner in the interactive watch mode.

3. **Build for production**:
    ```bash
    npm run build
    ```
   This command will bundle the React application for production in the `build` folder.

## Backend Setup

1. **Navigate to the backend directory**:
    ```bash
    cd backend
    ```
2. **Install backend dependencies**:
    ```bash
    npm install
    ```
3. **Run the backend server**:
    ```bash
    npm start
    ```

## Assumptions & Limitations

- **Assumptions**:
  - The application assumes basic knowledge of personal finance management.
  - Firebase Authentication is used for managing user sessions.
  - Users will manually input their financial transactions.

- **Limitations**:
  - The application does not support multi-currency management.
  - Some advanced security features for sensitive financial data may need to be added in future updates.
