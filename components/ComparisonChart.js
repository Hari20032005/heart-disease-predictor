import React from 'react';

const averageValues = {
  age: 50,
  trestbps: 120,
  chol: 200,
  thalach: 150,
  oldpeak: 1
};

const ComparisonChart = ({ userValues }) => {
  return (
    <div className="comparison-chart">
      {Object.keys(averageValues).map(key => (
        <div key={key} className="comparison-item">
          <span>{key}</span>
          <div className="bar-container">
            <div className="bar average" style={{width: '50%'}}></div>
            <div className="bar user" style={{width: `${(userValues[key] / averageValues[key]) * 50}%`}}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComparisonChart;