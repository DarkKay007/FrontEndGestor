import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Modal } from 'flowbite-react';

const ReportPage = () => {
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [chartKey, setChartKey] = useState(0); // Key for re-rendering the chart

  useEffect(() => {
    axios.get('/report')
      .then(response => setReportData(response.data))
      .catch(error => {
        setError('Error fetching report data');
        setModalTitle('Error');
        setModalContent('An error occurred while fetching the report data. Please try again later.');
        setIsModalOpen(true);
      });
  }, []);

  // Function to handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle re-rendering the chart
  const reRenderChart = () => {
    setChartKey(prevKey => prevKey + 1); // Increment key to force re-render
  };

  if (!reportData && !error) return <div className="text-center mt-20">Loading...</div>;

  const { users, sessions, pageViews, bounceRate, trafficSources } = reportData || {};

  const trafficSourceData = {
    labels: Object.keys(trafficSources || {}),
    datasets: [{
      label: 'Traffic Sources',
      data: Object.values(trafficSources || {}),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
    }]
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Website Report</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-4">Summary</h2>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <p><strong>Total Users:</strong> {users}</p>
            <p><strong>Total Sessions:</strong> {sessions}</p>
            <p><strong>Total Page Views:</strong> {pageViews}</p>
            <p><strong>Bounce Rate:</strong> {bounceRate}%</p>
          </>
        )}
      </div>
      {!error && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Traffic Sources</h2>
          <Bar key={chartKey} data={trafficSourceData} />
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        title={modalTitle}
      >
        <p>{modalContent}</p>
      </Modal>
    </div>
  );
};

export default ReportPage;
