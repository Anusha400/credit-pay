import React from 'react';
import LoanActions from './LoanActions';

const LoanApplicationsTable = ({ applications, onUpdateStatus }) => {
  const handleApprove = (id) => {
    onUpdateStatus(id, 'Approved');
  };

  const handleReject = (id) => {
    onUpdateStatus(id, 'Rejected');
  };

  const renderTable = (apps, title) => (
    <div>
      <h3>{title}</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Application ID</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Eligibility Amount</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Documents Verified</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Background Check</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Status</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {apps.map(app => (
            <tr key={app.id}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{app.id}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{app.eligibility || 'N/A'}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{app.documentsVerified ? 'Yes' : 'No'}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{app.backgroundCheck ? 'Yes' : 'No'}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{app.status}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                {app.status === 'Pending' ? (
                  <LoanActions onApprove={() => handleApprove(app.id)} onReject={() => handleReject(app.id)} />
                ) : (
                  'No actions available'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const activeApplications = applications.filter(app => app.status === 'Pending');
  const historyApplications = applications.filter(app => app.status !== 'Pending');

  return (
    <div>
      {renderTable(activeApplications, 'Active Applications')}
      {renderTable(historyApplications, 'History Applications')}
    </div>
  );
};

export default LoanApplicationsTable;
