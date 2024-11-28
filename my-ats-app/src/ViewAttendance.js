import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fetchAttendanceData from './fetchAttendance';
import Chart from 'chart.js/auto'; // Import Chart.js
import './ViewAttendance.css';

const ViewAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCurrentDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchAttendanceData();
        console.log('Data received in component:', data);
        setAttendanceData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (attendanceData.length === 0) return;

    const presentCount = attendanceData.filter(item => item['Previous Attendance Date'] === getCurrentDate()).length;
    const absentCount = attendanceData.length - presentCount;

    // Chart.js configuration for Bar Chart
    const barCtx = document.getElementById('attendanceBarChart');
    const barChart = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: attendanceData.map(item => item['uni_rollnumber']),
        datasets: [{
          label: 'Attendance Percentage',
          backgroundColor: '#36A2EB',
          data: attendanceData.map(item => ((item['Total Present Days'] / item['MaxTotalWorkingDays']) * 100).toFixed(2)),
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Attendance Percentage',
            font: {
              size: 18,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Percentage (%)',
              font: {
                size: 14,
              },
            },
          },
          x: {
            title: {
              display: true,
              text: 'Uni Roll Number',
              font: {
                size: 14,
              },
            },
          },
        },
      },
    });

    // Chart.js configuration for Pie Chart
    const pieCtx = document.getElementById('attendancePieChart');
    const pieChart = new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: ['Present', 'Absent'],
        datasets: [{
          label: 'Attendance Status',
          backgroundColor: ['#4CAF50', '#FF0000'], // Green for present, red for absent
          data: [presentCount, absentCount],
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'right',
          },
          title: {
            display: true,
            text: 'Attendance Status Distribution',
            font: {
              size: 18,
            },
          },
        },
      },
    });

    return () => {
      barChart.destroy();
      pieChart.destroy();
    };
  }, [attendanceData]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className='viewattendance'>
      <h1>View Attendance</h1>
      <Link to="/faculty" className="back-link">Back to Faculty Page</Link>
      {/* Table Section */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Uni Roll Number</th>
              <th>First Name</th>
              <th>Last Name</th>
              {/*<th>Previous Attendance Date</th>*/}
              <th>Attendance Status</th>
              <th>Total Present Days</th>
              <th>Total Working Days</th>
              <th>Percentage</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((item) => (
              <tr key={item['uni_rollnumber']}>
                <td>{item['uni_rollnumber']}</td>
                <td>{item['First Name']}</td>
                <td>{item['Last Name']}</td>
                {/*<td>{item['Previous Attendance Date']}</td>*/}
                <td>{item['Previous Attendance Date'] === getCurrentDate() ? 'Present' : 'Absent'}</td>
                <td>{item['Total Present Days']}</td> 
                <td>{item['MaxTotalWorkingDays']}</td>
                <td>{((item['Total Present Days'] / item['MaxTotalWorkingDays']) * 100).toFixed(2)}%</td>
                <td>{item['Timestamp']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="charts-container">
        {/* Bar Chart Section */}
        <div className="chart">
          <canvas id="attendanceBarChart" />
        </div>

        {/* Pie Chart Section */}
        <div className="chart">
          <canvas id="attendancePieChart" />
        </div>
      </div>
    </div>
  );
};

export default ViewAttendance;
