import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "./components/NavBar/NavBar";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
import Policy from "./components/Policy/Policy";
import Homepage from "./components/Homepage/Homepage";
import TeachingCalendar from "./components/Calendar/TeachingCalendar";
import Login from "./components/Login/Login";
import NewDate from "./components/NewDate/NewDate";
import AccountPage from "./components/AccountPage/AccountPage";
import EditUser from "./components/AccountPage/EditUser";
import EditDate from "./components/EditDate/EditDate";
import EditBio from "./components/EditBio/EditBio";
import EditPolicySection from "./components/EditPolicySection/EditPolicySection";

const App = () => {
    const token = useSelector((state) => state.auth.token);
    console.log(token)
    return (
        <div className='radial_background'>
            <div className="App">
                <NavBar />

                <Routes>
                    <Route path="/" element={<Homepage />} /> 
                    <Route path="/contact" element={<Contact />} /> 
                    <Route path="/about" element={<About />} /> 
                    <Route path="/calendar" element={<TeachingCalendar />} />
                    <Route path="/calendar/:id" element={<TeachingCalendar />} />
                    <Route path="/policy" element={<Policy />} /> 
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
    );
}

export default App;