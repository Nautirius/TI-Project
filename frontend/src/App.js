import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";

import Layout from "./components/layout_elements/Layout/Layout";
import Homepage from "./pages/Homepage";
import AboutPage from "./pages/About/AboutPage";

import AuthPage from "./pages/Auth/AuthPage";
import {AuthProvider} from "./context/AuthContext";
import {UserPage} from "./pages/User/UserPage";


function App() {
  return (
    <div className="App">
        {/* Provide authorisation functionality */}
        <AuthProvider>
          <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/about-page" element={<AboutPage/>}/>

                <Route path="/auth" element={<AuthPage />}/>

                <Route path="/user-profile" element={<UserPage />}/>

                {/* Wildcard route defaults to the homepage */}
                <Route path="/*" element={<Navigate to="/"/>}/>
            </Route>
          </Routes>
        </AuthProvider>
    </div>
  );
}

export default App;
