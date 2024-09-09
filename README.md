# myVisualData
PostgresSQL database setup
Cube.js requires a database to store and get the analytics data, so we will use PostgreSQL as our database
Downloading Postgres
Let’s start by downloading PostgreSQL, or Postgres, and creating our database:
With Postgres installed, we can log in and create a database, which we will later connect to Cube.js.

There are two ways we can create a Postgres database: we either use the postgres role to create the database or create a database as a new user.
1.1 Install PostgreSQL If PostgreSQL is not installed, you can download it from here. Follow the installation instructions specific to your operating system.

1.2 Creating a Database Once PostgreSQL is installed and running, follow these steps to create a new database:

Open psql (PostgreSQL's interactive terminal) by typing the following command:

bash psql -U postgres Create a new database:

SQL:

CREATE DATABASE my_database; Connect to the database:

SQL:

\c my_database;

Create tables and insert sample data. For example, let's create a table to track product sales Confirm that the data is inserted correctly

Connecting Cube.js to PostgreSQL 2.1 Install Cube.js CLI 2.2 Create a Cube.js Project 2.3 Configure Cube.js with PostgreSQL Connection Navigate to the Cube.js project directory: Open the .env file and update the connection details to match your PostgreSQL database: 2.4 Define a Data Schema for Cube.js In the schema/ folder, create a new file called Product.js: Start the Cube.js development server: Cube.js will now start and connect to your PostgreSQL database. You can access the Cube.js Playground at http://localhost:4000 to test queries.
To save and integrate the chart you’ve built on the Cube.js Playground into your React frontend, follow these steps:

Create a React Component Once you have copied the code from the Playground, create a new React component in your frontend to render the chart.
For example, let’s assume you're making a Bar chart. Create a BarChartComponent.js file in the src/components/ folder: Copy the code from Cube.js Playground (Code tab). Ensure the Cube.js API client (cubejsApi.js) is configured correctly. Import the chart component into your main app and render it. Run your app (npm start). You can access the ChartApp at http://localhost:3000.
