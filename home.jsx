const { useState, useEffect } = React;

const artists = ["RARI", "EMURACS", "SITAN", "SANDAN", "BELLATTIX", "AKMET"];

function LoadingScreen() {
    const [currentArtistIndex, setCurrentArtistIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentArtistIndex((prevIndex) => (prevIndex + 1) % artists.length);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="loading-screen">
            {artists[currentArtistIndex]}
        </div>
    );
}

function DarkModeToggle() {
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDarkMode);
    }, [isDarkMode]);

    return (
        <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 border border-gray-700 rounded-full text-lg flex items-center"
            aria-label="Toggle dark/light mode"
        >
            <span className="material-symbols-outlined">
                {isDarkMode ? "light_mode" : "dark_mode"}
            </span>
        </button>
    );
}

function App() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-8 text-center">
            <header className="w-full flex justify-between items-center p-4 border-b border-gray-700">
                <div className="text-2xl anton">ELIXIR KOMBINAT</div>
                <div className="flex items-center space-x-4">
                    <DarkModeToggle />
                    <button
                        className="p-2 border border-gray-700 rounded-full text-lg flex items-center"
                        aria-label="Shopping cart"
                    >
                        <span className="material-symbols-outlined">shopping_cart</span>
                    </button>
                </div>
            </header>

            <main className="flex flex-col items-center justify-center flex-grow">
                <div className="text-9xl font-bold flex space-x-2 moving-text protest-revolution">
                    <span>E</span>
                    <span>L</span>
                    <span>I</span>
                    <span>X</span>
                    <span>I</span>
                    <span>R</span>
                </div>
                <div className="mt-8 text-center text-base max-w-md shadows-into-light">    
                    WE'RE A GROUP OF YOUNG PEOPLE STARTING OUR OWN CLOTHING BRAND /STARTING FROM THE BOTTOM/
                </div>
                <div className="mt-8 text-center max-w-md shadows-into-light custom-text">
    COMING SOON
</div>

            </main>

            <footer className="absolute bottom-4 right-4 text-xs">©ELIXIR</footer>
        </div>
    );
}

function Main() {
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(true); // Start with dark mode enabled

    useEffect(() => {
        // Toggle dark mode
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            // Allow scrolling after loading is complete
            document.body.classList.remove('loading');
        }, 5000); // Keep loading for 5 seconds

        // Add class to hide scrollbars while loading
        document.body.classList.add('loading');

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            {loading ? <LoadingScreen /> : <App />}
        </div>
    );
}

ReactDOM.render(<Main />, document.getElementById("root"));
