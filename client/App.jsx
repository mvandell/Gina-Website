import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import NavBar from "./components/NavBar/NavBar";
import About from "./components/About/About";
import Homepage from "./components/Homepage/Homepage";
import TeachingCalendar from "./components/Calendar/TeachingCalendar";
import Login from "./components/Login/Login";
import NewDate from "./components/NewDate/NewDate";
import AccountPage from "./components/AccountPage/AccountPage";
import EditUser from "./components/AccountPage/EditUser";
import EditDate from "./components/EditDate/EditDate";
import EditBio from "./components/EditBio/EditBio";
import EditPolicySection from "./components/EditPolicySection/EditPolicySection";
import Lessons from "./components/Lessons/Lessons";

//Hobbies
//Students Achievements
//TODO: more non-profile pictures
//TODO: play with shades of black and white, without dark mode, at least not on Calendar page

const App = () => {
    const token = useSelector((state) => state.auth.token);
    console.log(token) //delete when website finished
       
    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });

    return (
        <ThemeProvider theme={darkTheme}>
        <div className='radial_background'>
            <div className="App">
                <NavBar />

                <Routes>
                    <Route path="/" element={<Homepage />} />  
                    <Route path="/about" element={<About />} /> 
                    <Route path="/calendar" element={<TeachingCalendar />} />
                    <Route path="/calendar/:id" element={<TeachingCalendar />} />
                    <Route path="/policy" element={<Lessons />} /> 
                    <Route path="/login" element={<Login />} />
                    <Route path="/new_date" element={<NewDate />} />
                    <Route path="/date/edit/:id" element={<EditDate />} />
                    <Route path="/account" element={<AccountPage />} />
                    <Route path="/account/edit" element={<EditUser />} />
                    <Route path="/about/edit/:id" element={<EditBio />} />
                    <Route path="/policy/:id" element={<EditPolicySection />} /> 
                </Routes>
            </div>
        </div>
        </ThemeProvider>
    );
}

export default App;