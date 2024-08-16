import React, { useState } from 'react';
import axios from 'axios';
import { jsPDF } from "jspdf";
import RiskGauge from './RiskGauge';
import HealthTips from './HealthTips';
import ComparisonChart from './ComparisonChart';

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: '',
  });
  const [userData, setUserData] = useState({
    name: '',
    mobileNo: ''
  });
  const [risk, setRisk] = useState(null);
  const [errors, setErrors] = useState({});

  const validateInput = (name, value) => {
    if (value === '') return false;  // Disallow empty values
    
    const ranges = {
      age: [0, 100],
      trestbps: [0, 200],
      chol: [0, 600],
      thalach: [0, 220],
      oldpeak: [0, 10]
    };

    if (ranges[name]) {
      const [min, max] = ranges[name];
      return value >= min && value <= max;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (validateInput(name, value)) {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: '' });
    } else {
      setErrors({ ...errors, [name]: `Please enter a valid value for ${name}` });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isFormValid = Object.keys(formData).every(key => 
      formData[key] !== '' && !errors[key]
    );

    if (isFormValid) {
      try {
        const response = await axios.post('http://localhost:5000/predict', formData);
        setRisk(response.data.risk);
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      alert('Please fill all fields with valid values before submitting.');
    }
  };

  const generateReport = () => {
    if (!risk) {
      alert("Please predict the risk before generating a report.");
      return;
    }

    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text("Heart Disease Risk Report", 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Name: ${userData.name}`, 20, 40);
    doc.text(`Mobile: ${userData.mobileNo}`, 20, 50);
    doc.text(`Risk: ${(risk * 100).toFixed(2)}%`, 20, 60);
    
    doc.text("Input Data:", 20, 80);
    let y = 90;
    Object.entries(formData).forEach(([key, value]) => {
      doc.text(`${key}: ${value}`, 30, y);
      y += 10;
    });
    
    doc.save(`${userData.name}_heart_risk_report.pdf`);
  };

  return (
    <div className="form-container">
      <ComparisonChart userValues={formData} />
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={(e) => setUserData({...userData, name: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNo">Mobile Number</label>
          <input
            type="tel"
            id="mobileNo"
            name="mobileNo"
            value={userData.mobileNo}
            onChange={(e) => setUserData({...userData, mobileNo: e.target.value})}
            required
          />
        </div>
        
        {Object.keys(formData).map((key) => (
          <div key={key} className="form-group">
            <label htmlFor={key}>{key}</label>
            <input
              type="number"
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
            />
            {errors[key] && <span className="error">{errors[key]}</span>}
          </div>
        ))}
        <button type="submit">Predict</button>
      </form>

      <button 
        type="button" 
        onClick={generateReport} 
        disabled={risk === null}
        className="report-button"
      >
        Download Report
      </button>

      {risk !== null && (
        <div className="risk-display">
          <h2>Heart Disease Risk:</h2>
          <RiskGauge risk={risk} />
          <HealthTips risk={risk} />
        </div>
      )}
    </div>
  );
};

export default PredictionForm;