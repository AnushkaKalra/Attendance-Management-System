// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import {signOut} from 'aws-amplify/auth'; // import Auth from 'aws-amplify/auth' instead of { signOut }
// // assuming 'aws-amplify/auth' has named export as 'Auth'
// import { useState, useRef, useEffect } from 'react';


// function FacultyPage() {
//   const navigate = useNavigate(); // Corrected hook usage
//   const videoRef = useRef(null);
//   const [hasCamera, setHasCamera] = useState(false);
//   const [capturedImage, setCapturedImage] = useState(null);

//   useEffect(() => {
//     navigator.mediaDevices.enumerateDevices()
//       .then(devices => {
//         setHasCamera(devices.some(device => device.kind === 'videoinput'));
//       });
//   }, []);

//   const handleCameraAccess = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       videoRef.current.srcObject = stream;
//     } catch (error) {
//       console.log('Error accessing camera:', error);
//     }
//   };
  
//   const handleCaptureImage = async () => {
//     const video = videoRef.current;
//     if (video && video.readyState === video.HAVE_ENOUGH_DATA) {
//       const canvas = document.createElement('canvas');
//       const context = canvas.getContext('2d');
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       context.drawImage(video, 0, 0);
//       const dataURL = canvas.toDataURL('image/jpeg'); // Adjust format as needed
//       setCapturedImage(dataURL); // Store captured image as base64 data URL
//     }
//   };

//   const handleSignOut = async () => {
//     try {
//       await signOut(); // Corrected signOut function call
//       navigate('/'); // Corrected navigation function call
//     } catch (error) {
//       console.log('Error signing out: ', error);
//     }
//   };

// return (
//   <div>
//     <h1>Faculty Page</h1>
//      {hasCamera ? (
//        <div>
//         <video ref={videoRef} autoPlay muted width={640} height={480} />
//         <button onClick={handleCameraAccess}>Open Camera</button>
//         <button onClick={handleCaptureImage}>Capture Image</button>
//        </div>
//     ) : (
//        <p>No camera detected.</p>
//      )}
//      {capturedImage && ( // Conditionally render captured image
//        <img src={capturedImage} alt="Captured Image" />
//      )}
//      <button onClick={handleSignOut}>Sign out</button>
//    </div>
//  );
// }
// export default FacultyPage;