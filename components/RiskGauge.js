import React from 'react';

const RiskGauge = ({ risk }) => {
  const percentage = risk * 100;
  return (
    <div className="risk-gauge">
      <div className="gauge-fill" style={{ width: `${percentage}%` }}></div>
      <span>{percentage.toFixed(2)}%</span>
    </div>
  );
};

export default RiskGauge;