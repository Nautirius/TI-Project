import {useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const UserPage = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!user) navigate("/");
    }, [navigate, user]);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                {user ? (
                    <>
                        {/* Header */}
                        <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">
                            Profil użytkownika
                        </h1>

                        <div className="space-y-8">
                            {/* User Data */}
                            <section>
                                <h2 className="text-2xl font-semibold text-blue-500 mb-4 text-center">
                                    Dane użytkownika
                                </h2>
                                <ul className="space-y-3 text-gray-700 leading-relaxed text-center">
                                    <li>
                                        <strong>Imię:</strong> {user.firstName}
                                    </li>
                                    <li>
                                        <strong>Nazwisko:</strong> {user.lastName}
                                    </li>
                                    <li>
                                        <strong>Data urodzin:</strong>{" "}
                                        {user.birthDate.split("T")[0]}
                                    </li>
                                    <li>
                                        <strong>Email:</strong> {user.email}
                                    </li>
                                </ul>
                            </section>

                            {/* Saved Settings */}
                            <section>
                                <h2 className="text-2xl font-semibold text-blue-500 mb-4 text-center">
                                    Zapisane parametry symulacji
                                </h2>
                                <ul className="space-y-3 text-gray-700 leading-relaxed text-center">
                                    <li>
                                        <strong>Rzędy:</strong> {user.settings.num_rows}
                                    </li>
                                    <li>
                                        <strong>Kolumny:</strong> {user.settings.num_cols}
                                    </li>
                                    <li>
                                        <strong>Odstęp:</strong> {user.settings.delay} ms
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </>
                ) : (
                    <p className="text-center text-gray-500">
                        Nie znaleziono danych użytkownika.
                    </p>
                )}
            </div>
        </div>
    );
};
