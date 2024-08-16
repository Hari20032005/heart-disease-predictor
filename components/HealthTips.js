import React from 'react';

const HealthTips = ({ risk }) => {
  const tips = [
    { threshold: 0.2, tip: "Maintain a healthy lifestyle with regular exercise and balanced diet." },
    { threshold: 0.4, tip: "Consider discussing your heart health with a doctor." },
    { threshold: 0.6, tip: "Urgent: Schedule a check-up with a cardiologist." },
    { threshold: 1, tip: "Immediate medical attention recommended." }
  ];

  const relevantTip = tips.find(t => risk <= t.threshold);

  return <p className="health-tip">{relevantTip.tip}</p>;
};

export default HealthTips;