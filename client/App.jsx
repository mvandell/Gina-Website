import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
import PianoPolicy from "./components/Policy/PianoPolicy";
import VoicePolicy from "./components/Policy/VoicePolicy";
import Homepage from "./components/Homepage/Homepage";
import TeachingCalendar from "./components/Calendar/TeachingCalendar";
import Login from "./components/Login/Login";
import NewDate from "./components/Calendar/NewDate";

const App = () => {

  return (
    <div className='gradient_background'>
      <div className="App">
        <NavBar />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/calendar" element={<TeachingCalendar />} />
          <Route path="/calendar/:id" element={<TeachingCalendar />} />
          <Route path="/policy/voice" element={<VoicePolicy />} />
          <Route path="/policy/piano" element={<PianoPolicy />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/new_date" element={<NewDate />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;