// Import React, ReactDOM, and Cube.js client
import React from 'react';
import ReactDOM from 'react-dom';
import cubejs from '@cubejs-client/core';
import cube from '@cubejs-client/core';
import { CubeProvider,useCubeQuery } from '@cubejs-client/react';
import { CartesianGrid, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, LineChart, Line } from 'recharts';

// Define colors for charts
const colors = ['#FF6492', '#141446', '#7A77FF'];

// Reusable CartesianChart for BarChart and LineChart
const CartesianChart = ({ resultSet, children, ChartComponent }) => (
  <ResponsiveContainer width="100%" height={350}>
    <ChartComponent data={resultSet.chartPivot()}>
      <XAxis dataKey="x" />
      <YAxis />
      <CartesianGrid />
      {children}
      <Legend />
      <Tooltip />
    </ChartComponent>
  </ResponsiveContainer>
);

// For the Bar Chart
const renderBarChart = (resultSet) => (
  <CartesianChart resultSet={resultSet} ChartComponent={BarChart}>
    {resultSet.seriesNames().map((series, i) => (
      <Bar key={series.key} dataKey={series.key} name={series.title} fill={colors[i]} />
    ))}
  </CartesianChart>
);

// For the Line Chart
const renderLineChart = (resultSet) => (
  <CartesianChart resultSet={resultSet} ChartComponent={LineChart}>
    {resultSet.seriesNames().map((series, i) => (
      <Line key={series.key} dataKey={series.key} name={series.title} stroke={colors[i]} />
    ))}
  </CartesianChart>
);

// For the Pie Chart
const renderPieChart = (resultSet) => {
  const pieData = resultSet.chartPivot().map(row => ({
    name: row.name, // Adjusted to use 'name' dimension
    value: row.count // Using the 'count' measure
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={120}>
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

// The Cube.js API instance
const cubejsApi = cubejs(
    '37f1cd14c8eb86aae913a84a11581d16c45537bb84811e701de160d41017026ae456501585f7ee0f37702d72c4a0f5e83a1fa03b5b2db6764969cd3f8a61fdd6' , // Replace with your actual Cube.js API token
  { apiUrl: 'http://localhost:4000/cubejs-api/v1' }
);

// const cubeApi = cube(
//   async () => await Auth.getJwtToken(),
//   { apiUrl: 'http://localhost:4000/cubejs-api/v1' }
// );
// Custom hook for data querying
const useCubeQueryData = (query) => {
  const { resultSet, error } = useCubeQuery(query);
  return { resultSet, error };
};

// Render all three charts using custom hooks
const ChartRenderer = () => {
  // Define queries according to the schema
  const barQuery = { measures: ['product.count'], timeDimensions: [], dimensions: ['product.value'] };
  const lineQuery = { measures: ['product.count'], timeDimensions: [{ dimension: 'product.timestamp', dateRange: ['2024-01-01', '2024-12-31'] }], dimensions: [] };
  const pieQuery = { measures: ['product.count'], timeDimensions: [], dimensions: ['product.name'] };

  const { resultSet: barResultSet, error: barError } = useCubeQueryData(barQuery);
  const { resultSet: lineResultSet, error: lineError } = useCubeQueryData(lineQuery);
  const { resultSet: pieResultSet, error: pieError } = useCubeQueryData(pieQuery);

  return (
    <div style={{ padding: '20px' }}>
      <h3>Bar Chart</h3>
      {barError ? <div>{barError.toString()}</div> : !barResultSet ? <div>Loading...</div> : renderBarChart(barResultSet)}

      <h3>Line Chart</h3>
      {lineError ? <div>{lineError.toString()}</div> : !lineResultSet ? <div>Loading...</div> : renderLineChart(lineResultSet)}

      <h3>Pie Chart</h3>
      {pieError ? <div>{pieError.toString()}</div> : !pieResultSet ? <div>Loading...</div> : renderPieChart(pieResultSet)}
    </div>
  );
};
const App = () => (
    <CubeProvider cubejsApi={cubejsApi}>
      <ChartRenderer />
    </CubeProvider>
  );
  
  const rootElement = document.getElementById('root');
  ReactDOM.render(<App />, rootElement);

