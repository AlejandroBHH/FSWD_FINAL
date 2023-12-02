# **FSWD_FINAL - Fanfiction Web Page**

Welcome to the repository for "FSWD_FINAL." This repository contains the code and documentation for my fanfiction web application project. Here you will find information about the purpose of the project, the technologies used, and instructions for getting started.

## Project Description

"FSWD_FINAL" is a fanfiction web application built with React and Node.js. It provides a platform for fanfiction enthusiasts to read and publish fanfiction stories.

## Getting Started

To get started with "FSWD_FINAL," follow these steps:

1. Clone the repository to your local machine.
  `git clone https://github.com/AlejandroBHH/FSWD_FINAL.git`
3. Navigate to the project directory: `cd FSWD_FINAL`.
4. Install the required dependencies for both the frontend and backend.
   - For the frontend (React), use `npm install`.
   - For the backend (Node.js with Express and MongoDB), use `npm install` in the relevant directories.
5. Configure your database connection and other settings in the backend within the .env file (include PORT, DATABASE_URL, and TOKEN_SECRET).
6. To start the backend server, use `npm run dev`. For the frontend, use `npm start` within their respective directories.

## Importing Database Collections

To import the database collections, follow these steps:
1. Ensure that you have MongoDB installed on your system.
2. Open a terminal and navigate to the project directory.
3. Run the following command to import each JSON file into the new database:

`find ./FSWD_FINAL/database -type f -name "*.json" -exec bash -c 'mongoimport --db=nombre_nueva_basedatos --collection=$(basename {} .json) --file={} --jsonArray' \;`

Make sure to replace `new_database_name` with the actual name you want to give to your new MongoDB database.


## Setting Up Email.js

### **Step 1**: Sign Up on Email.js
1. Go to the Email.js website and sign up for an account.
2. Log in to your Email.js account.


### **Step 2**: Create a New Service
1. In the Email.js dashboard, click on "Email Services."
2. Click on "Create New Service."
3. Provide a name for the service and click "Create."

### **Step 3**: Configure Email Templates
1. In the Email.js dashboard, click on "Email Templates."
2. Click on "Create New Template."
3. Select the service you created earlier.
4. Design your email template, including variables if necessary.
5. Save the template.

After following these steps, go to ForgotPassword.js and replace the .send method with your own data.


### Technologies Used

- React
- Node.js
- Express
- MongoDB


### Contributing
If you would like to contribute to "FSWD_FINAL," please fork the repository and submit a pull request with your changes.

### Contact

If you have any questions or feedback, please feel free to reach out to me at [email address].

Thank you for visiting the "FSWD_FINAL" repository!
