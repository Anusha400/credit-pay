// src/components/RepaymentScheduleModal.js
import React from 'react';
import './RepaymentScheduleModal.css';

function RepaymentScheduleModal({ schedule, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>6-Month Repayment Schedule</h3>
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((payment, index) => (
              <tr key={index}>
                <td>{payment.month}</td>
                <td>₹{payment.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default RepaymentScheduleModal;
