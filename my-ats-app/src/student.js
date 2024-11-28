import React, { useState, useEffect } from 'react';
import {
  Typography, Container, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Grid, Card, CardContent
} from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { signOut } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import './ViewAttendance.css';

const StudentPage = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState([]);
  const [error, setError] = useState('');
  const [maxTotalWorkingDays, setMaxTotalWorkingDays] = useState(0);
  const [futurePresentDays, setFuturePresentDays] = useState(0);
  const [futureTotalDays, setFutureTotalDays] = useState(0);
  const [predictedAttendance, setPredictedAttendance] = useState(null);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const rollNumber = currentUser.rollNumber;

        const response = await fetch(`https://gjhv06ok23.execute-api.ap-south-1.amazonaws.com/GetDataAll`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        const filteredData = data.data.filter(item => item.uni_rollnumber === parseInt(rollNumber, 10));
        setStudentData(filteredData);

        const maxWorkingDays = Math.max(...data.data.map(item => item['Total Working Days']));
        setMaxTotalWorkingDays(maxWorkingDays);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch student attendance data');
      }
    };

    fetchData();
  }, []);

  const currentDateString = new Date().toISOString().split('T')[0];

  const chartData = studentData.map(item => {
    const totalAbsentDays = maxTotalWorkingDays - item['Total Present Days'];
    return {
      date: item['Previous Attendance Date'],
      presentDays: item['Total Present Days'],
      absentDays: maxTotalWorkingDays
    };
  });

  const totalPresentDaysSum = studentData.reduce((sum, item) => sum + item['Total Present Days'], 0);
  const attendancePercentage = studentData.length > 0 ?
    ((totalPresentDaysSum / (maxTotalWorkingDays * studentData.length)) * 100).toFixed(2)
    : 0;
  const absentPercentage = (100 - attendancePercentage).toFixed(2);

  const pieData = [
    { name: 'Attendance', value: parseFloat(attendancePercentage) },
    { name: 'Absence', value: parseFloat(absentPercentage) }
  ];

  const COLORS = ['#15D415', '#C62A09'];

  const handlePredict = () => {
    if (parseInt(futurePresentDays, 10) > parseInt(futureTotalDays, 10)) {
      setValidationError('Total Future Days must be greater than or equal to Future Present Days');
      setPredictedAttendance(null);
      return;
    }

    setValidationError('');
    const newTotalPresentDays = totalPresentDaysSum + parseInt(futurePresentDays, 10);
    const newMaxTotalWorkingDays = maxTotalWorkingDays + parseInt(futureTotalDays, 10);
    const predictedPercentage = ((newTotalPresentDays / newMaxTotalWorkingDays) * 100).toFixed(2);
    setPredictedAttendance(predictedPercentage);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  };


  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Student Attendance Details
        </Typography>
        {error ? (
          <Typography color="error">{error}</Typography>
        ) : studentData.length === 0 ? (
          <Typography>No attendance data found.</Typography>
        ) : (
          <>
            <Card variant="outlined" sx={{ mb: 4 }}>
              <CardContent>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell >University Roll Number</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Attendance Status</TableCell>
                        <TableCell>Total Present Days</TableCell>
                        {/* <TableCell>Total Working Days</TableCell> */}
                        
                        <TableCell> Total Working Days</TableCell>
                        <TableCell>Attendance Percentage</TableCell>
                        
                        <TableCell>Timestamp</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {studentData.map((item, index) => {
                        const attendanceStatus = item['Previous Attendance Date'] === currentDateString ? 'Present' : 'Absent';
                        const attendancePercentage = ((item['Total Present Days'] / maxTotalWorkingDays) * 100).toFixed(2);

                        return (
                          <TableRow key={index}>
                            <TableCell>{item['uni_rollnumber']}</TableCell>
                            <TableCell >{`${item['First Name']} ${item['Last Name']}`}</TableCell>
                            <TableCell>{item['Email']}</TableCell>
                            <TableCell>{attendanceStatus}</TableCell>
                            <TableCell>{item['Total Present Days']}</TableCell>
                            {/* <TableCell>{item['Total Working Days']}</TableCell> */}
                            <TableCell>{maxTotalWorkingDays}</TableCell>
                            <TableCell>{attendancePercentage}%</TableCell>                            
                            <TableCell>{item['Timestamp']}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h5" gutterBottom align="center">
                      Attendance Visualization
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="presentDays" name="Total Present Days" fill="#8884d8" />
                        <Bar dataKey="absentDays" name="Total Working Days" fill="#0AA3C2" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h5" gutterBottom align="center">
                      Attendance Percentage
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Card variant="outlined" sx={{ mt: 4 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom align="center">
                  Predict Future Attendance
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      label="Future Present Days"
                      type="number"
                      value={futurePresentDays}
                      onChange={(e) => setFuturePresentDays(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      label="Total Future Days"
                      type="number"
                      value={futureTotalDays}
                      onChange={(e) => setFutureTotalDays(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button variant="contained" color="primary" onClick={handlePredict} fullWidth>
                      Predict
                    </Button>
                  </Grid>
                </Grid>
                {validationError && (
                  <Typography color="error" sx={{ mt: 2 }} align="center">
                    {validationError}
                  </Typography>
                )}
                {predictedAttendance !== null && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" align="center">
                      Predicted Attendance Percentage: {predictedAttendance}%
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </Box>
      <button onClick={handleSignOut}>Sign out</button>
    </Container>
  );
};

export default StudentPage;

