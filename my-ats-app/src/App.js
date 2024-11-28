import React from 'react';
import HomePage from './homepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Amplify} from 'aws-amplify';
import awsmobile from './aws-exports.js';
import New from './new';
//import Stuauth from './stuauth';
import Faculty from './faculty.js';
import Student from './student.js';
import AboutUs from './AboutUs.js';
import ContactUs from './ContactUs.js';
import ViewAttendance from './ViewAttendance.js';
import StudentResources from './studentresources.js';
import AuthPage from './AuthPage.js';

Amplify.configure(awsmobile);



function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={<New />} />
        {/*<Route path="/stuauth" element={<Stuauth />} />*/}
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/student" element={<Student />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/ViewAttendance" element={<ViewAttendance />} />
        <Route path="/StudentResources" element={<StudentResources />} />
        <Route path="/AuthPage" element={<AuthPage />} />
      </Routes>
    </div>
  );
}

export default App;


