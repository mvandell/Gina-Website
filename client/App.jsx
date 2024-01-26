import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Contact from "./components/Contact/Contact";

const App = () => {

  return (
    <div className='gradient_background'>
      <div className="App">
        <NavBar />
        
        <Routes>
           <Route path="/" element={<Contact />} />
          {/*<Route path="/about" element={} />
          <Route path="/calendar" element={} />
          <Route path="/cm" element={} />
          <Route path="/contact" element={} />
          <Route path="/policy" element={} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;