import "./Footer.css";

export default function Footer() {

    return (
        <>
            <footer className="bg-gray-800 text-white text-center p-4">
                <p>&copy; {new Date().getFullYear()} The game of life - Marcin Knapczyk</p>
            </footer>
        </>
    );
}
