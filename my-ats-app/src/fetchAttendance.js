import AWS from './awsConfig';
import moment from 'moment';

const fetchAttendanceData = async () => {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const params = {
    TableName: 'attendancesystem',
  };

  try {
    const data = await docClient.scan(params).promise();
    console.log('Raw data from DynamoDB:', data.Items);

    // Calculating the maximum value of "Total Working Days"
    const totalWorkingDaysValues = data.Items.map(item => item['Total Working Days']);
    const maxTotalWorkingDays = Math.max(...totalWorkingDaysValues);

    const processedData = data.Items.map(item => {
      // Log the raw attendance value for each item
      console.log(`Processing item with Attendance value: ${item['Attendance']}`);

      // Ensuring Attendance is a boolean value
      const attendanceValue = Boolean(item['Attendance']);

      console.log(`Processed Attendance value: ${attendanceValue}`);

      return {
        ...item,
        Attendance: attendanceValue, // Convert to boolean
        MaxTotalWorkingDays: maxTotalWorkingDays,
      };
    });

    console.log('Processed data:', processedData);
    return processedData;
  } catch (error) {
    console.error('Error fetching data from DynamoDB:', error);
    throw new Error('Could not fetch data from DynamoDB');
  }
};

export default fetchAttendanceData;

