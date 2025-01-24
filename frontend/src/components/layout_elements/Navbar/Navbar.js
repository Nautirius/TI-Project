import {Link} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext"
import "./Navbar.css";


export default function Navbar() {
    const { user, logout } = useContext(AuthContext);

    return (
        <>
            <nav className="top">
                <div className="bar black card" id="myNavbar">
                    <Link to="/" className="bar-item bar-button">
                        Strona główna
                    </Link>


                    <a href="/#opis" className="bar-item bar-button">
                        Opis gry
                    </a>

                    <a href="/#gra" className="bar-item bar-button">
                        Symulator
                    </a>

                    <Link to="/about-page" className="bar-item bar-button">
                        O projekcie
                    </Link>


                    {/*Right-sided Navbar links */}
                    <div style={{float: "right", display: "flex", flexDirection: "row"}}>
                        <a href="/"></a>
                        {user ? (
                            <div>
                            <Link to="/user-profile" className="bar-item bar-button">
                                Witaj, {user.firstName}
                            </Link>
                            <button onClick={logout} className="bar-item bar-button">Wyloguj</button>
                            </div>
                            ) : (
                            <Link to="/auth" className="bar-item bar-button">Zaloguj</Link>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}
