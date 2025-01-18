const artists = ["RARI", "EMURACS", "SITAN", "SANDAN", "BELLATTIX", "AKMET"];

class LoadingScreen {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'loading-screen';
        this.currentIndex = 0;
        this.interval = null;
    }

    start() {
        this.interval = setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % artists.length;
            this.element.textContent = artists[this.currentIndex];
        }, 500);
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    render() {
        this.element.textContent = artists[this.currentIndex];
        return this.element;
    }
}

class DarkModeToggle {
    constructor() {
        this.isDarkMode = true;
        this.button = document.createElement('button');
        this.button.className = 'p-2 border border-gray-700 rounded-full text-lg flex items-center';
        this.button.setAttribute('aria-label', 'Toggle dark/light mode');
        
        this.button.addEventListener('click', () => this.toggle());
        this.updateButton();
    }

    toggle() {
        this.isDarkMode = !this.isDarkMode;
        document.documentElement.classList.toggle('dark', this.isDarkMode);
        this.updateButton();
    }

    updateButton() {
        this.button.innerHTML = `
            <span class="material-symbols-outlined">
                ${this.isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
        `;
    }

    render() {
        return this.button;
    }
}

class App {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'min-h-screen flex flex-col items-center justify-center space-y-8 text-center';
        this.render();
    }

    render() {
        this.element.innerHTML = `
            <header class="w-full flex justify-between items-center p-4 border-b border-gray-700">
                <div class="text-2xl anton">ELIXIR KOMBINAT</div>
                <div class="flex items-center space-x-4" id="header-buttons">
                    <button class="p-2 border border-gray-700 rounded-full text-lg flex items-center" aria-label="Shopping cart">
                        <span class="material-symbols-outlined">shopping_cart</span>
                    </button>
                </div>
            </header>

            <main class="flex flex-col items-center justify-center flex-grow">
                <div class="text-9xl font-bold flex space-x-2 moving-text protest-revolution">
                    <span>E</span>
                    <span>L</span>
                    <span>I</span>
                    <span>X</span>
                    <span>I</span>
                    <span>R</span>
                </div>
                <div class="mt-8 text-center text-base max-w-md shadows-into-light">    
                    WE'RE A GROUP OF YOUNG PEOPLE STARTING OUR OWN CLOTHING BRAND /STARTING FROM THE BOTTOM/
                </div>
                <div class="mt-8 text-center max-w-md shadows-into-light custom-text">
                    COMING SOON
                </div>
            </main>

            <footer class="absolute bottom-4 right-4 text-xs">©ELIXIR</footer>
        `;

        // Add dark mode toggle
        const headerButtons = this.element.querySelector('#header-buttons');
        const darkModeToggle = new DarkModeToggle();
        headerButtons.insertBefore(darkModeToggle.render(), headerButtons.firstChild);

        return this.element;
    }
}

class Main {
    constructor() {
        this.loading = true;
        this.loadingScreen = new LoadingScreen();
        this.app = new App();
        
        // Initial dark mode
        document.documentElement.classList.add('dark');
        
        // Handle loading state
        document.body.classList.add('loading');
        setTimeout(() => {
            this.loading = false;
            document.body.classList.remove('loading');
            this.render();
        }, 3000);
    }

    render() {
        const root = document.getElementById('root');
        root.innerHTML = '';
        
        if (this.loading) {
            this.loadingScreen.start();
            root.appendChild(this.loadingScreen.render());
        } else {
            this.loadingScreen.stop();
            root.appendChild(this.app.render());
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const main = new Main();
    main.render();
}); 