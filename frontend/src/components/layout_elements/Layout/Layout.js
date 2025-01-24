import {Outlet} from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./Layout.css"

export default function Layout() {
    return (
        <div id="wrapper">
            <Navbar/>
            <div id="outlet">
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
}