// Spotify-like Music App - Core JavaScript
class MusicApp {
    constructor() {
        this.currentSong = null;
        this.isPlaying = false;
        this.queue = [];
        this.currentIndex = 0;
        this.playbackTime = 0;
        this.playbackDuration = 30; // 30-second preview
        this.playbackInterval = null;
        this.searchResults = [];
        this.recommendations = [];
        this.playHistory = JSON.parse(localStorage.getItem('playHistory') || '[]');
        
        this.initializeApp();
    }

    // Music Library Data
    musicLibrary = [
        {
            id: 1,
            title: "Espresso",
            artist: "Sabrina Carpenter",
            album: "Short n' Sweet",
            duration: "3:18",
            artwork: "https://kimi-web-img.moonshot.cn/img/i.etsystatic.com/c9bf1fbe9aaf95baa9874a858fc2021d13761dee.jpg",
            genre: "Pop"
        },
        {
            id: 2,
            title: "Please Please Please",
            artist: "Sabrina Carpenter",
            album: "Short n' Sweet",
            duration: "3:06",
            artwork: "https://kimi-web-img.moonshot.cn/img/i.etsystatic.com/ef5beb9dacfb2171c9283b7012426c6e16232228.jpg",
            genre: "Pop"
        },
        {
            id: 3,
            title: "Birds of a Feather",
            artist: "Billie Eilish",
            album: "HIT ME HARD AND SOFT",
            duration: "3:30",
            artwork: "https://kimi-web-img.moonshot.cn/img/www.rollingstone.com/426c72c402f4158fcdf36a74cbd8a3d8fd889ea4.jpg",
            genre: "Alternative"
        },
        {
            id: 4,
            title: "Lunch",
            artist: "Billie Eilish",
            album: "HIT ME HARD AND SOFT",
            duration: "2:58",
            artwork: "https://kimi-web-img.moonshot.cn/img/m.media-amazon.com/7c69ed1871f1adeaa4a3a470927bac284c0fdca3.jpg",
            genre: "Alternative"
        },
        {
            id: 5,
            title: "Blinding Lights",
            artist: "The Weeknd",
            album: "After Hours",
            duration: "3:20",
            artwork: "https://kimi-web-img.moonshot.cn/img/cdn.5280.com/619b7c28cb5e7db43e95deeae3bdd5848521cbc0.jpg",
            genre: "R&B"
        },
        {
            id: 6,
            title: "Dancing in the Flames",
            artist: "The Weeknd",
            album: "Hurry Up Tomorrow",
            duration: "3:45",
            artwork: "https://kimi-web-img.moonshot.cn/img/www.freestyle-vinyl.com/6d875a2728db38459a8930b191e97680b2f33cf5.jpg",
            genre: "R&B"
        },
        {
            id: 7,
            title: "Good Luck, Babe!",
            artist: "Chappell Roan",
            album: "The Rise and Fall of a Midwest Princess",
            duration: "3:38",
            artwork: "https://kimi-web-img.moonshot.cn/img/static.independent.co.uk/317e75cd145cabec19635d99579d74d218bfc7a6.jpg",
            genre: "Pop"
        },
        {
            id: 8,
            title: "HOT TO GO!",
            artist: "Chappell Roan",
            album: "The Rise and Fall of a Midwest Princess",
            duration: "3:04",
            artwork: "https://kimi-web-img.moonshot.cn/img/static-cse.canva.com/6ab4171c79f41f7a465ef2d870f49b29a03ff231.jpg",
            genre: "Pop"
        },
        {
            id: 9,
            title: "Stick Season",
            artist: "Noah Kahan",
            album: "Stick Season",
            duration: "4:07",
            artwork: "https://kimi-web-img.moonshot.cn/img/www.udiscovermusic.com/20e7e2475b8fcd8c6131ef006d7bb683bf2a89f8.jpg",
            genre: "Folk"
        },
        {
            id: 10,
            title: "Dial Drunk",
            artist: "Noah Kahan",
            album: "Stick Season",
            duration: "3:38",
            artwork: "https://kimi-web-img.moonshot.cn/img/png.pngtree.com/de298c6492358c1ac3e0e8abb32abdab128e61da.png",
            genre: "Folk"
        },
        {
            id: 11,
            title: "Not Like Us",
            artist: "Kendrick Lamar",
            album: "GNX",
            duration: "4:03",
            artwork: "https://kimi-web-img.moonshot.cn/img/static-cse.canva.com/6690b994fe179f84e4ac4e3eb84808e5c085ce6e.png",
            genre: "Hip-Hop"
        },
        {
            id: 12,
            title: "Like That",
            artist: "Kendrick Lamar",
            album: "GNX",
            duration: "3:50",
            artwork: "https://kimi-web-img.moonshot.cn/img/indieground.net/a973a5e20693ccb2ddb6876587c42473a498e1fa.jpg",
            genre: "Hip-Hop"
        },
        {
            id: 13,
            title: "Fortnight",
            artist: "Taylor Swift",
            album: "THE TORTURED POETS DEPARTMENT",
            duration: "3:48",
            artwork: "https://kimi-web-img.moonshot.cn/img/mir-s3-cdn-cf.behance.net/42db3a521de475dab14794f2ed4ae4950de985e1.jpg",
            genre: "Pop"
        },
        {
            id: 14,
            title: "I Can Do It With a Broken Heart",
            artist: "Taylor Swift",
            album: "THE TORTURED POETS DEPARTMENT",
            duration: "3:56",
            artwork: "https://kimi-web-img.moonshot.cn/img/i.fbcd.co/c82022aa0b0500f662e310569fe77300c37f1538.jpg",
            genre: "Pop"
        },
        {
            id: 15,
            title: "Pink Skies",
            artist: "Zach Bryan",
            album: "The Great American Bar Scene",
            duration: "3:20",
            artwork: "https://kimi-web-img.moonshot.cn/img/img.freepik.com/ffa3ccee00cb662e46eb405cb6705a8e19785287.jpg",
            genre: "Country"
        }
    ];

    artists = [
        {
            id: 1,
            name: "Sabrina Carpenter",
            image: "https://kimi-web-img.moonshot.cn/img/www.leathercelebrities.com/b59dac3b85d06630221b8d99a95d078c16e4afbd.jpg",
            followers: "42.5M",
            genre: "Pop"
        },
        {
            id: 2,
            name: "Billie Eilish",
            image: "https://kimi-web-img.moonshot.cn/img/img.artpal.com/a89d913d2d343c02658a532d41149970e8a8dfb2.jpg",
            followers: "68.2M",
            genre: "Alternative"
        },
        {
            id: 3,
            name: "The Weeknd",
            image: "https://kimi-web-img.moonshot.cn/img/www.billboard.com/da2a1f402c2d5ea83f7ad34c85dfe31c908ec3ea.jpg",
            followers: "98.7M",
            genre: "R&B"
        },
        {
            id: 4,
            name: "Taylor Swift",
            image: "https://kimi-web-img.moonshot.cn/img/i.scdn.co/030335011fdd6eb896a451266b8b005eeedbe93d",
            followers: "120.5M",
            genre: "Pop"
        }
    ];

    initializeApp() {
        this.setupEventListeners();
        this.loadHomeContent();
        this.initializePlayer();
        this.setupNavigation();
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }

        // Player controls
        const playPauseBtn = document.getElementById('playPauseBtn');
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        }

        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextTrack());
        }

        const prevBtn = document.getElementById('prevBtn');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousTrack());
        }

        // Player bar click to expand
        const playerBar = document.getElementById('playerBar');
        if (playerBar) {
            playerBar.addEventListener('click', () => this.expandPlayer());
        }
    }

    loadHomeContent() {
        this.loadRecentlyPlayed();
        this.loadPopularNow();
        this.loadRecommendations();
        this.loadNewReleases();
    }

    loadRecentlyPlayed() {
        const container = document.getElementById('recentlyPlayed');
        if (!container) return;

        const recentSongs = this.playHistory.slice(-6) || this.musicLibrary.slice(0, 6);
        this.renderSongRow(container, recentSongs, 'Recently Played');
    }

    loadPopularNow() {
        const container = document.getElementById('popularNow');
        if (!container) return;

        const popular = this.musicLibrary.slice(0, 8);
        this.renderSongRow(container, popular, 'Popular Now');
    }

    loadRecommendations() {
        const container = document.getElementById('recommendations');
        if (!container) return;

        // Generate recommendations based on play history
        let recommendations = [];
        if (this.playHistory.length > 0) {
            const lastPlayed = this.playHistory[this.playHistory.length - 1];
            recommendations = this.musicLibrary.filter(song => 
                song.genre === lastPlayed.genre && song.id !== lastPlayed.id
            ).slice(0, 6);
        } else {
            recommendations = this.musicLibrary.slice(8, 14);
        }

        const title = this.playHistory.length > 0 ? 
            `Because you played ${this.playHistory[this.playHistory.length - 1]?.title}` :
            'Recommended for you';

        this.renderSongRow(container, recommendations, title);
    }

    loadNewReleases() {
        const container = document.getElementById('newReleases');
        if (!container) return;

        const newReleases = this.musicLibrary.slice(-6);
        this.renderSongRow(container, newReleases, 'New Releases');
    }

    renderSongRow(container, songs, title) {
        const sectionHtml = `
            <div class="song-section mb-6">
                <h2 class="text-xl font-bold text-white mb-4 px-4">${title}</h2>
                <div class="flex overflow-x-auto space-x-4 px-4 pb-2" style="scrollbar-width: none; -ms-overflow-style: none;">
                    ${songs.map(song => this.renderSongCard(song)).join('')}
                </div>
            </div>
        `;
        container.innerHTML += sectionHtml;

        // Add click listeners to song cards
        container.querySelectorAll('.song-card').forEach(card => {
            card.addEventListener('click', () => {
                const songId = parseInt(card.dataset.songId);
                this.playSong(songId);
            });
        });
    }

    renderSongCard(song) {
        return `
            <div class="song-card flex-shrink-0 w-36 cursor-pointer" data-song-id="${song.id}">
                <div class="relative mb-2">
                    <img src="${song.artwork}" alt="${song.title}" 
                         class="w-full h-36 object-cover rounded-lg shadow-lg">
                    <div class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                        <div class="play-button opacity-0 hover:opacity-100 transition-opacity duration-300">
                            <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <h3 class="text-white font-medium text-sm truncate">${song.title}</h3>
                <p class="text-gray-400 text-xs truncate">${song.artist}</p>
            </div>
        `;
    }

    playSong(songId) {
        const song = this.musicLibrary.find(s => s.id === songId);
        if (!song) return;

        this.currentSong = song;
        this.playbackTime = 0;
        this.isPlaying = true;

        // Add to play history
        this.addToPlayHistory(song);
        
        // Add to queue if not already there
        if (!this.queue.find(s => s.id === songId)) {
            this.queue.push(song);
        }

        this.updatePlayerDisplay();
        this.startPlayback();
        this.updatePlayerBar();
    }

    addToPlayHistory(song) {
        this.playHistory.push(song);
        if (this.playHistory.length > 50) {
            this.playHistory.shift();
        }
        localStorage.setItem('playHistory', JSON.stringify(this.playHistory));
    }

    startPlayback() {
        if (this.playbackInterval) {
            clearInterval(this.playbackInterval);
        }

        this.playbackInterval = setInterval(() => {
            if (this.isPlaying) {
                this.playbackTime++;
                this.updateProgressBar();
                
                if (this.playbackTime >= this.playbackDuration) {
                    this.nextTrack();
                }
            }
        }, 1000);
    }

    togglePlayPause() {
        this.isPlaying = !this.isPlaying;
        this.updatePlayPauseButton();
        
        if (this.isPlaying) {
            this.startPlayback();
        } else {
            clearInterval(this.playbackInterval);
        }
    }

    nextTrack() {
        this.currentIndex = (this.currentIndex + 1) % this.queue.length;
        if (this.queue.length > 0) {
            this.currentSong = this.queue[this.currentIndex];
            this.playbackTime = 0;
            this.updatePlayerDisplay();
            this.updateProgressBar();
        }
    }

    previousTrack() {
        this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.queue.length - 1;
        if (this.queue.length > 0) {
            this.currentSong = this.queue[this.currentIndex];
            this.playbackTime = 0;
            this.updatePlayerDisplay();
            this.updateProgressBar();
        }
    }

    updatePlayerDisplay() {
        if (!this.currentSong) return;

        const playerArtwork = document.getElementById('playerArtwork');
        const playerTitle = document.getElementById('playerTitle');
        const playerArtist = document.getElementById('playerArtist');

        if (playerArtwork) playerArtwork.src = this.currentSong.artwork;
        if (playerTitle) playerTitle.textContent = this.currentSong.title;
        if (playerArtist) playerArtist.textContent = this.currentSong.artist;

        this.updatePlayPauseButton();
    }

    updatePlayPauseButton() {
        const playPauseBtn = document.getElementById('playPauseBtn');
        if (playPauseBtn) {
            const icon = playPauseBtn.querySelector('svg');
            if (this.isPlaying) {
                icon.innerHTML = '<path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>';
            } else {
                icon.innerHTML = '<path d="M8 5v14l11-7z"/>';
            }
        }
    }

    updateProgressBar() {
        const progressBar = document.getElementById('progressBar');
        const currentTime = document.getElementById('currentTime');
        const totalTime = document.getElementById('totalTime');

        if (progressBar) {
            const progress = (this.playbackTime / this.playbackDuration) * 100;
            progressBar.style.width = `${progress}%`;
        }

        if (currentTime) {
            currentTime.textContent = this.formatTime(this.playbackTime);
        }

        if (totalTime) {
            totalTime.textContent = this.formatTime(this.playbackDuration);
        }
    }

    updatePlayerBar() {
        const playerBar = document.getElementById('playerBar');
        if (playerBar && this.currentSong) {
            playerBar.classList.remove('hidden');
        }
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    handleSearch(query) {
        if (!query.trim()) {
            this.clearSearchResults();
            return;
        }

        const results = this.musicLibrary.filter(song => 
            song.title.toLowerCase().includes(query.toLowerCase()) ||
            song.artist.toLowerCase().includes(query.toLowerCase()) ||
            song.album.toLowerCase().includes(query.toLowerCase())
        );

        this.displaySearchResults(results);
    }

    displaySearchResults(results) {
        const container = document.getElementById('searchResults');
        if (!container) return;

        container.innerHTML = `
            <div class="search-results">
                <h2 class="text-xl font-bold text-white mb-4 px-4">Search Results</h2>
                <div class="space-y-2">
                    ${results.map(song => this.renderSearchResult(song)).join('')}
                </div>
            </div>
        `;

        // Add click listeners to search results
        container.querySelectorAll('.search-result').forEach(result => {
            result.addEventListener('click', () => {
                const songId = parseInt(result.dataset.songId);
                this.playSong(songId);
            });
        });
    }

    renderSearchResult(song) {
        return `
            <div class="search-result flex items-center p-3 hover:bg-gray-800 cursor-pointer" data-song-id="${song.id}">
                <img src="${song.artwork}" alt="${song.title}" class="w-12 h-12 rounded object-cover mr-3">
                <div class="flex-1">
                    <h3 class="text-white font-medium">${song.title}</h3>
                    <p class="text-gray-400 text-sm">${song.artist} • ${song.album}</p>
                </div>
                <span class="text-gray-400 text-sm">${song.duration}</span>
            </div>
        `;
    }

    clearSearchResults() {
        const container = document.getElementById('searchResults');
        if (container) {
            container.innerHTML = '';
        }
    }

    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const href = item.getAttribute('href');
                if (href && href !== '#') {
                    window.location.href = href;
                }
            });
        });
    }

    initializePlayer() {
        // Initialize player bar as hidden
        const playerBar = document.getElementById('playerBar');
        if (playerBar) {
            playerBar.classList.add('hidden');
        }
    }

    expandPlayer() {
        // This would expand to full-screen player
        console.log('Expand player to full screen');
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.musicApp = new MusicApp();
});

// Add some CSS animations
const style = document.createElement('style');
style.textContent = `
    .song-card:hover .play-button {
        opacity: 1;
    }
    
    .song-card:hover img {
        transform: scale(1.05);
        transition: transform 0.3s ease;
    }
    
    .search-result:hover {
        background-color: #282828;
        transition: background-color 0.2s ease;
    }
    
    .nav-item.active {
        color: #1DB954;
    }
    
    .progress-bar {
        transition: width 0.1s linear;
    }
`;
document.head.appendChild(style);
