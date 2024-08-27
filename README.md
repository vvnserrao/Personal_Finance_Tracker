# Personal Finance Tracker

Personal Finance Tracker is a web application designed to help users manage their finances by tracking income, expenses, and transactions. The app is built with a React frontend and a Node.js backend, using Firebase Firestore as the database.

## Features

- **User Authentication:** Secure login and signup with Firebase Authentication.
- **Transaction Management:** Add, edit, and delete transactions for both income and expenses.
- **Categorization:** Categorize transactions to track spending habits.
- **Reporting:** View summaries of income, expenses, and transaction counts, including pie charts for visual representation.
- **Responsive Design:** The app is designed to work seamlessly on both mobile and desktop devices.

## Running the Project

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (version 14 or above)
- **npm** (version 6 or above)
- **Firebase Account:** With Firestore enabled
- **Render Account:** For deployment

### Setup Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/vvnserrao/Personal_Finance_Tracker.git
   cd Personal_Finance_Tracker
   ```

2. **Install Dependencies:**

   Run the following command in the root directory to install the required npm packages:

   ```bash
   npm install
   ```

3. **Set Up Firebase Firestore:**

   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new project and enable Firestore.
   - Create a web app within the Firebase project to obtain the Firebase configuration.

4. **Create a `.env` File:**

   In the root directory, create a `.env` file and add the following environment variables:

   ```bash
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
   ```

   Replace the placeholders with the actual values from your Firebase project.

5. **Running the Application Locally:**

   - Start the React frontend:

     ```bash
     npm start
     ```

     The application will be available at `http://localhost:3000`.

   - Start the Node.js backend:

     ```bash
     cd server
     npm install
     npm start
     ```

     The backend server will be running on `http://localhost:5000`.

### Deployment

To deploy the application on Render:

1. Commit your changes to the repository.

   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin master
   ```

2. Link your GitHub repository to Render and set up a new web service.

3. Add the environment variables from your `.env` file in the Render Environment section.

4. Deploy the app by selecting the `master` branch.

## Application Features

1. **User Authentication:**
   - Secure login and signup forms.
   - Firebase Authentication for managing user sessions.

2. **Transaction Management:**
   - Add new transactions for income and expenses.
   - Edit existing transactions to update details.
   - Delete transactions with confirmation prompts.
   - Filter and sort transactions by date, type, and category.

3. **Dashboard:**
   - View total income, expenses, and net balance.
   - Visualize data with pie charts for income vs. expenses and category distribution.

4. **Responsive Design:**
   - The application is optimized for both desktop and mobile devices, ensuring a seamless user experience across platforms.

## Assumptions & Limitations

### Assumptions

- **User Data:** It is assumed that users will manually input transaction data.
- **Categories:** Predefined categories are assumed to cover most common use cases, though users can add custom categories.

### Limitations

- **No Offline Mode:** The app requires an internet connection to function, as it relies on Firebase for data storage.
- **Memory Usage:** The application may encounter memory limitations in a low-resource environment, particularly during deployment, as seen in Out of Memory (OOM) errors.

## Troubleshooting

- **Deployment Issues:** Ensure that all environment variables are correctly set in the Render dashboard, and large files like `node_modules` are excluded using `.gitignore`.

