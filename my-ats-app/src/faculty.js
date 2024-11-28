import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'aws-amplify/auth';
import AWS from 'aws-sdk';
import './faculty.css';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function FacultyPage() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previousTimestamp, setPreviousTimestamp] = useState(null);
  const [currentTimestamp, setCurrentTimestamp] = useState(null);

  const S3_CONFIG = {
    accessKeyId: 'XXXXXXXXXX', //Details hidden for security reasons
    secretAccessKey: 'XXXXXXXXXXX',  //Details hidden for security reasons
    region: 'ap-south-1',
  };
  const s3 = new AWS.S3(S3_CONFIG);
  const BUCKET_NAME = 'attendance-mark2';

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      setHasCamera(devices.some(device => device.kind === 'videoinput'));
    });
  }, []);

  const handleCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.log('Error accessing camera:', error);
    }
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: mimeString });
  };

  function generateUniqueFilename() {
    const timestamp = Date.now().toString(36);
    const randomString = Math.random().toString(36).substring(2, 7);
    setCurrentTimestamp(timestamp);
    return `${timestamp}-${randomString}`;
  }

  const handleCaptureImage = async () => {
    const video = videoRef.current;
    if (video && video.readyState === video.HAVE_ENOUGH_DATA) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg');
      const blob = dataURItoBlob(imageData);
      setCapturedImage(imageData);
      const uploadParams = {
        Bucket: BUCKET_NAME,
        Key: `public/${generateUniqueFilename()}.jpg`,
        Body: blob,
      };
      try {
        await s3.upload(uploadParams).promise();
        console.log('Image uploaded successfully:', uploadParams.Location);
        setUploadSuccessMessage('Image uploaded successfully! Waiting for API data...');
        setTimeout(fetchDataFromApi, 3000);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const fetchDataFromApi = async () => {
    try {
      const response = await fetch('https://dvmbc4mrd8.execute-api.ap-south-1.amazonaws.com/GetData-latest');
      const data = await response.json();
      const { "First Name": firstName, "Last Name": lastName, uni_rollnumber, Timestamp } = data.data;

      if (Timestamp === previousTimestamp) {
        setUploadSuccessMessage('Unknown Student Image');
        setApiData(null);
        setIsModalOpen(true);
      } else {
        setApiData(data);
        setPreviousTimestamp(Timestamp);
        const imageName = `${firstName}_${lastName}_${uni_rollnumber}.png`;
        console.log('Constructed image name:', imageName); // Debugging log
        fetchImageUrl(imageName);
      }
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  const fetchImageUrl = (imageName) => {
    const params = {
      Bucket: 'attendance-registration2',
      Key: `${imageName}`,
    };
    s3.getSignedUrl('getObject', params, (err, url) => {
      if (err) {
        console.error('Error fetching image URL:', err);
      } else {
        console.log('Generated signed URL:', url); // Debugging log
        setImageUrl(url);
        setIsModalOpen(true); 
      }
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      console.error('Invalid file type. Please select an image.');
    }
  };

  const handleUploadImage = async () => {
    if (selectedFile) {
      const uploadParams = {
        Bucket: BUCKET_NAME,
        Key: `public/${selectedFile.name}`,
        Body: selectedFile,
      };
      try {
        const uploadResult = await s3.upload(uploadParams).promise();
        console.log('Image uploaded successfully:', uploadResult.Location);
        setUploadSuccessMessage('Image uploaded successfully! Waiting for API data...');
        setCurrentTimestamp(uploadResult.Timestamp);
        setTimeout(fetchDataFromApi, 3000);
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setSelectedFile(null);
      }
    } else {
      console.error('Please select an image to upload.');
    }
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
    <div className='faculty-page'>
      <h1>Faculty Page</h1>
      {hasCamera ? (
        <div className='video-container'>
          <video ref={videoRef} autoPlay muted width={640} height={480} />
          <button onClick={handleCameraAccess}>Open Camera</button>
          <button onClick={handleCaptureImage}>Capture Image</button>
        </div>
      ) : (
        <p>No camera detected.</p>
      )}
      {capturedImage && (
        <img className="captured-image" src={capturedImage} alt="Captured Image" />
      )}
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUploadImage}>Upload Image</button>
      {uploadSuccessMessage && (
        <p className='success-message'>{uploadSuccessMessage}</p>
      )}
      <button onClick={handleSignOut}>Sign out</button>
      <div className="link-container">
        <Link to="/ViewAttendance" className="view-attendance-button">View Attendance</Link>
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modal">
        {uploadSuccessMessage === 'Unknown Student Image' ? (
          <h2>Unknown Student Image</h2>
        ) : (
          <>
            <h2> <FontAwesomeIcon icon={faCheckCircle} /> MARKED PRESENT</h2>
            {apiData && (
              <div className='api-data'>
                <p>Name: {apiData.data["First Name"]} {apiData.data["Last Name"]}</p>
                <p>Total Present Days: {apiData.data["Total Present Days"]}</p>
                <p>Total Working Days: {apiData.data["Total Working Days"]}</p>
                <p>Timestamp: {apiData.data.Timestamp}</p>
                {imageUrl && <img src={imageUrl} alt="Matched S3 Image" />}
              </div>
            )}
          </>
        )}
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </Modal>
    </div>
  );
}

export default FacultyPage;

