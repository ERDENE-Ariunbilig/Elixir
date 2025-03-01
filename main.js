const artists = ["RARI", "EMURACS", "SITAN", "SANDAN", "BELLATTIX", "AKMET"];
const musicContent = [
    {
        title: "Emira - CHI",
        thumbnail: `https://img.youtube.com/vi/fk3m10VDf8A/hqdefault.jpg`,
        youtubeLink: "https://youtu.be/fk3m10VDf8A",
    },
    {
        title: "Emira - Setgel",
        thumbnail: `https://img.youtube.com/vi/hgVXBWVm824/hqdefault.jpg`,
        youtubeLink: "https://youtu.be/hgVXBWVm824",
    },
    {
        title: "Emira - 7AM",
        thumbnail: `https://img.youtube.com/vi/2giSYHljK3Q/hqdefault.jpg`,
        youtubeLink: "https://youtu.be/2giSYHljK3Q",
    }
];

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
        this.button.className = 'p-2 border border-gray-700 rounded-full text-lg flex items-center dark-mode-toggle';
        this.button.setAttribute('aria-label', 'Toggle dark/light mode');
        
        // Use requestAnimationFrame for smoother transitions
        this.button.addEventListener('click', () => {
            requestAnimationFrame(() => this.toggle());
        });
        
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
        this.element.className = 'scroll-container';
        this.render();
        this.setupScrollToTop();
        this.setupMobileScrolling();
    }

    setupScrollToTop() {
        // Add click event listener after the element is rendered
        setTimeout(() => {
            const logo = this.element.querySelector('.logo-text');
            if (logo) {
                logo.style.cursor = 'pointer';
                logo.addEventListener('click', () => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
            }
        }, 0);
    }

    setupMobileScrolling() {
        if (window.innerWidth <= 480) {
            // Enable smooth scrolling for mobile
            document.documentElement.style.scrollBehavior = 'smooth';
            
            // Remove snap scrolling on mobile
            this.element.style.scrollSnapType = 'none';
            
            // Enable touch scrolling
            this.element.style.touchAction = 'auto';
        }
    }

    render() {
        this.element.innerHTML = `
            <header class="w-full">
                <div class="header-content">
                    <div class="text-2xl anton logo-text">ELIXIR KOMBINAT</div>
                    <div class="flex items-center space-x-4" id="header-buttons">
                        <button class="p-2 border border-gray-700 rounded-full text-lg flex items-center" aria-label="Shopping cart">
                            <span class="material-symbols-outlined">shopping_cart</span>
                        </button>
                    </div>
                </div>
                <div class="header-line"></div>
            </header>

            <!-- First Page -->
            <section class="full-page-section first-section">
                <div class="content-wrapper">
                    <div class="text-9xl font-bold flex space-x-2 moving-text protest-revolution">
                        <span>E</span><span>L</span><span>I</span><span>X</span><span>I</span><span>R</span>
                    </div>
                    <div class="mt-8 text-center text-base max-w-md shadows-into-light">    
                        WE'RE A GROUP OF YOUNG PEOPLE STARTING OUR OWN CLOTHING BRAND /STARTING FROM THE BOTTOM/
                    </div>
                    <div class="mt-8 text-center max-w-md shadows-into-light custom-text">
                        COMING SOON
                    </div>
                </div>
            </section>

            <!-- Second Page -->
            <section class="full-page-section second-section">
                <div class="content-wrapper">
                    <div class="music-section-wrapper">
                        <div class="music-content">
                            ${musicContent.map((song, index) => `
                                <div class="music-row ${index % 2 === 0 ? 'left' : 'right'}">
                                    ${index % 2 === 0 ? `
                                        <div class="music-item">
                                            <a href="${song.youtubeLink}" target="_blank" class="thumbnail-container">
                                                <img src="${song.thumbnail}" alt="${song.title}" class="music-thumbnail">
                                            </a>
                                        </div>
                                        <div class="music-info shadows-into-light">
                                            <h3 class="song-title whitespace-nowrap">${song.title || ''}</h3>
                                        </div>
                                    ` : `
                                        <div class="music-info shadows-into-light">
                                            <h3 class="song-title whitespace-nowrap">${song.title || ''}</h3>
                                        </div>
                                        <div class="music-item">
                                            <a href="${song.youtubeLink}" target="_blank" class="thumbnail-container">
                                                <img src="${song.thumbnail}" alt="${song.title}" class="music-thumbnail">
                                            </a>
                                        </div>
                                    `}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </section>

            <!-- Third Page -->
            <section class="full-page-section third-section">
                <div class="content-wrapper">
                    <!-- Add your third page content here -->
                </div>
            </section>

            <footer class="py-12 px-8">
                <div class="header-line"></div>
                <div class="max-w-6xl mx-auto flex flex-col items-center justify-center">
                    <div class="flex space-x-6 mb-4">
                        <a href="https://www.instagram.com/elixir_recordsofficial" target="_blank" class="hover:opacity-70 cursor-pointer">
                            <img src="img/icons/insta-light.png" alt="Instagram" width="24" height="24" class="block dark:hidden" />
                            <img src="img/icons/insta-dark.png" alt="Instagram" width="24" height="24" class="hidden dark:block" />
                        </a>
                        <a href="tel:+976########" class="hover:opacity-70 cursor-pointer">
                            <img src="img/icons/phone-light.png" alt="Phone" width="24" height="24" class="block dark:hidden" />
                            <img src="img/icons/phone-dark.png" alt="Phone" width="24" height="24" class="hidden dark:block" />
                        </a>
                    </div>
                    <div class="text-center text-sm">
                        © ${new Date().getFullYear()} ELIXIR Records
                    </div>
                </div>
            </footer>
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

document.addEventListener('DOMContentLoaded', () => {
    const main = new Main();
    main.render();
}); 