import React, {useState, useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function AuthPage() {
    const navigate = useNavigate();
    const [isRegistering, setIsRegistering] = useState(false);

    const { user, login, register } = useContext(AuthContext);

    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });

    const [registerForm, setRegisterForm] = useState({
        firstName: "",
        lastName: "",
        birthDate: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const handleInputChange = (e, formType) => {
        const { name, value } = e.target;
        if (formType === "login") {
            setLoginForm({ ...loginForm, [name]: value });
        } else {
            setRegisterForm({ ...registerForm, [name]: value });
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(loginForm)
            navigate("/");

        } catch (error) {
            console.log(error);
            alert("Błąd logowania: " + error.response?.data?.error || error.message);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(registerForm);
            setIsRegistering(false);
        } catch (error) {
            console.log(error);
            alert("Błąd rejestracji: " + error.response?.data.errors.map(e=>e.msg));
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4 text-center">{isRegistering ? "Rejestracja" : "Logowanie"}</h1>
            {isRegistering ? (
                <form onSubmit={handleRegister} className="space-y-4 max-w-md mx-auto">
                    <div className="mb-6">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                            Imię
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="Imię"
                            value={registerForm.firstName}
                            onChange={(e) => handleInputChange(e, "register")}
                            className="border rounded p-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                            Nazwisko
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Nazwisko"
                            value={registerForm.lastName}
                            onChange={(e) => handleInputChange(e, "register")}
                            className="border rounded p-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                            Data urodzin
                        </label>
                        <input
                            type="date"
                            id="birthDate"
                            name="birthDate"
                            value={registerForm.birthDate}
                            onChange={(e) => handleInputChange(e, "register")}
                            className="border rounded p-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                            E-mail
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="e-mail"
                            value={registerForm.email}
                            onChange={(e) => handleInputChange(e, "register")}
                            className="border rounded p-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                            Hasło
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Hasło"
                            value={registerForm.password}
                            onChange={(e) => handleInputChange(e, "register")}
                            className="border rounded p-2 w-full"
                            required
                        />
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded w-full" type="submit">Zarejestruj</button>
                </form>
            ) : (
                <form onSubmit={handleLogin} className="space-y-4 max-w-md mx-auto p-6">
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                            E-mail
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="e-mail"
                            value={loginForm.email}
                            onChange={(e) => handleInputChange(e, "login")}
                            className="border rounded p-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                            Hasło
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Hasło"
                            value={loginForm.password}
                            onChange={(e) => handleInputChange(e, "login")}
                            className="border rounded p-2 w-full"
                            required
                        />
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded w-full" type="submit">Zaloguj</button>
                </form>
            )}
            <button
                className="mt-4 text-blue-500 underline block mx-auto text-center"
                onClick={() => setIsRegistering(!isRegistering)}
            >
                {isRegistering ? "Masz konto? Zaloguj się" : "Nie masz konta? Zarejestruj się"}
            </button>
        </div>
    );
}
