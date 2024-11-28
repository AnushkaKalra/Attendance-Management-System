import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaPhone, FaHospital, FaBus, FaTrain, FaPlane, FaAmbulance, FaFire, FaMedkit, FaShieldAlt, FaUserMd, FaLifeRing, FaInfoCircle } from 'react-icons/fa';
import './studentresources.css';
import Header from './header';

const StudentResources = () => {
  const [showNationalEmergencyServices, setShowNationalEmergencyServices] = useState(false);
  const [showUPEmergencyServices, setShowUPEmergencyServices] = useState(false);
  const [showMetroStations, setShowMetroStations] = useState(false);
  const [showAirports, setShowAirports] = useState(false);
  const [showRailwayStations, setShowRailwayStations] = useState(false);
  const [showRapidRail, setShowRapidRail] = useState(false);
  const [showBusStations, setShowBusStations] = useState(false);
  const [showHospitals, setShowHospitals] = useState(false);

  const toggleSubSection = (subSection) => {
    switch (subSection) {
      case 'nationalEmergency':
        setShowNationalEmergencyServices(!showNationalEmergencyServices);
        break;
      case 'upEmergency':
        setShowUPEmergencyServices(!showUPEmergencyServices);
        break;
      case 'metroStations':
        setShowMetroStations(!showMetroStations);
        break;
      case 'airports':
        setShowAirports(!showAirports);
        break;
      case 'railwayStations':
        setShowRailwayStations(!showRailwayStations);
        break;
      case 'rapidRail':
        setShowRapidRail(!showRapidRail);
        break;
      case 'busStations':
        setShowBusStations(!showBusStations);
        break;
      case 'hospitals':
        setShowHospitals(!showHospitals);
        break;
      default:
        break;
    }
  };

  return (
    <div className="student-resources">
      <Header />
      <div className="section">
        <h2>Helpline Numbers</h2>
        <div className="subsection">
          <div className="subsection-header" onClick={() => toggleSubSection('nationalEmergency')}>
            <h3>National Emergency Services {showNationalEmergencyServices ? <FaChevronUp /> : <FaChevronDown />}</h3>
          </div>
          {showNationalEmergencyServices && (
            <ul>
              <li><FaPhone /> National Emergency Number(112) </li>
              <li><FaUserMd /> AIDS Helpline(1097)</li>
              <li><FaLifeRing /> Disaster Management(1078)</li>
              <li><FaTrain /> Railway(139)</li>
              <li><FaShieldAlt /> Cyber Crime Helpline(15620)</li>
              <li><FaInfoCircle /> Tourist Helpline(1363)</li>
              <li><FaMedkit /> Medical Helpline (108)</li>
              <li><FaAmbulance /> Road Accident Emergency Service(1073)</li>
              <li><FaTrain /> Railway Accident Emergency Service(1072)</li>
            </ul>
          )}
        </div>
        <div className="subsection">
          <div className="subsection-header" onClick={() => toggleSubSection('upEmergency')}>
            <h3>UP National Emergency Service Numbers {showUPEmergencyServices ? <FaChevronUp /> : <FaChevronDown />}</h3>
          </div>
          {showUPEmergencyServices && (
            <ul>
              <li><FaFire /> Fire and Rescue (101)</li>
              <li><FaShieldAlt /> Police (100)</li>
              <li><FaMedkit /> Covid Helpline (18001805145)</li>
              <li><FaPhone /> C.M. Helpline (0522-2239296)</li>
              <li><FaInfoCircle /> State Helpline (0522-2838128)</li>
              <li><FaShieldAlt /> Women Helpline (1090)</li>
              <li><FaLifeRing /> Disaster Management (9711077372)</li>
            </ul>
          )}
        </div>
      </div>
      <div className="section">
        <h2>Transportation Services</h2>
        <div className="subsection">
          <div className="subsection-header" onClick={() => toggleSubSection('metroStations')}>
            <h3>Metro Station {showMetroStations ? <FaChevronUp /> : <FaChevronDown />}</h3>
          </div>
          {showMetroStations && (
            <ul>
              <li><FaTrain /><a href='https://maps.app.goo.gl/xXhMNHy9eiovzbTx7'>Vaishali Metro Station</a></li>
              <li><FaTrain /><a href='https://maps.app.goo.gl/FJD8B9yhNqzkp9k28'> Kaushambi Metro Station </a></li>
              <li><FaTrain /><a href='https://maps.app.goo.gl/JPpHaDRtff4pcJdd8'> RajBagh Metro Station </a></li>
            </ul>
          )}
        </div>
        <div className="subsection">
          <div className="subsection-header" onClick={() => toggleSubSection('airports')}>
            <h3>Airport {showAirports ? <FaChevronUp /> : <FaChevronDown />}</h3>
          </div>
          {showAirports && (
            <ul>
              <li><FaPlane />< a href="https://maps.app.goo.gl/TqZFuvLwiViix9YD8"> Indira Gandhi International Airport </a> </li>
              <li><FaPlane /><a href="https://maps.app.goo.gl/3EZfuJDVMt71ssN77">Hindon Airport </a></li>
            </ul>
          )}
        </div>
        <div className="subsection">
          <div className="subsection-header" onClick={() => toggleSubSection('railwayStations')}>
            <h3>Railway Station {showRailwayStations ? <FaChevronUp /> : <FaChevronDown />}</h3>
          </div>
          {showRailwayStations && (
            <ul>
              <li><FaTrain /><a href="https://maps.app.goo.gl/wLYEtKPV3VrA1vLc7"> Ghaziabad Junction Railway Station </a></li>
              <li><FaTrain /><a href="https://maps.app.goo.gl/secapQELXQMK31Dm9"> Sahibabad Junction Railway Station </a></li>
              <li><FaTrain /><a href ="https://maps.app.goo.gl/5bsSMpbKgGvhjvut9"> Anand Vihar Terminal Railway Station </a></li>
            </ul>
          )}
        </div>
        <div className="subsection">
          <div className="subsection-header" onClick={() => toggleSubSection('rapidRail')}>
            <h3>Rapid Rail {showRapidRail ? <FaChevronUp /> : <FaChevronDown />}</h3>
          </div>
          {showRapidRail && (
            <ul>
              <li><FaTrain /><a href='https://maps.app.goo.gl/WG5RfHXuYbK2HFjCA'> Delhi Meerut Regional Rapid Rail Transit System </a> </li>
            </ul>
          )}
        </div>
        <div className="subsection">
          <div className="subsection-header" onClick={() => toggleSubSection('busStations')}>
            <h3>Bus Stations {showBusStations ? <FaChevronUp /> : <FaChevronDown />}</h3>
          </div>
          {showBusStations && (
            <ul>
              <li><FaBus /><a href='https://maps.app.goo.gl/FoQ1whrjAebD3QLQ9'> Anand Vihar ISBT </a></li>
              <li><FaBus /><a href='https://maps.app.goo.gl/mnb2DBXs5CKTtb1P9'> Vaishali Bus Stand </a> </li>
              <li><FaBus /><a href='https://maps.app.goo.gl/GgxUvZ9VaUcLuQn66'> Old Bus Stand, Ghaziabad</a></li>
            </ul>
          )}
        </div>
      </div>
      <div className="section">
        <h2>Medical Services</h2>
        <div className="subsection">
          <div className="subsection-header" onClick={() => toggleSubSection('hospitals')}>
            <h3>Nearby Hospitals {showHospitals ? <FaChevronUp /> : <FaChevronDown />}</h3>
          </div>
          {showHospitals && (
            <ul>
              <li><FaHospital /><a href='https://maps.app.goo.gl/usCB9rYXhtb94jp5A'> Max Super Speciality Hospital</a></li>
              <li><FaHospital /><a href='https://maps.app.goo.gl/B9f3oFzt46ciUtG5A'> Yashoda Super Speciality Hospital</a></li>
              <li><FaHospital /><a href= 'https://maps.app.goo.gl/Zj5f4umZDdwceskQ9' >Columbia Asia Hospital</a></li>
              <li><FaHospital /><a href='https://maps.app.goo.gl/d8r1fjF3dzvQXaHZ8'> Santosh Hospital</a></li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentResources;
