import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
import PianoPolicy from "./components/Policy/PianoPolicy";
import VoicePolicy from "./components/Policy/VoicePolicy";
import Homepage from "./components/Homepage/Homepage";
import TeachingCalendar from "./components/Calendar/TeachingCalendar";

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
          {/*<Route path="/cm" element={} />*/}
          <Route path="/policy/voice" element={<VoicePolicy />} />
          <Route path="/policy/piano" element={<PianoPolicy />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;