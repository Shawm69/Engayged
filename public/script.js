document.addEventListener('DOMContentLoaded', async () => {
    // Load navbar
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    // DEBUG LOG: Check if placeholder is found on the current page

    if (navbarPlaceholder) {
        try {
            const response = await fetch('navbar.html');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.text();
            navbarPlaceholder.innerHTML = data;

            // Re-select navbar elements AFTER it's loaded into the DOM
            navbarToggle = document.getElementById('mobile-menu');
            navMenu = document.querySelector('.nav-menu');
            connectWalletBtnNavbar = document.getElementById('connectWalletBtnNavbar');

            // Add event listener for navbar toggle after it's in the DOM
            if (navbarToggle && navMenu) {
                navbarToggle.addEventListener('click', () => {
                    navMenu.classList.toggle('active');
                    navbarToggle.classList.toggle('active');
                });
            } else {
            }
            updateConnectWalletButton(); // Call this after navbar is loaded
            // Listen for the custom event dispatched by connect.js
            document.addEventListener('walletConnected', updateConnectWalletButton);
        } catch (error) {
            console.error('Error loading navbar:', error);
        }
   } else {
   }

    const ctaButton = document.getElementById('cta-button');
    const airhornSound = document.getElementById('airhorn-sound');
    const hitmarkerSound = document.getElementById('hitmarker-sound');
    let dankGifs = document.querySelectorAll('.dank-gif'); // Make mutable as they might be re-queried
    let gifContainer = document.querySelector('.gif-container'); // Make mutable


    // Navbar elements (will be available after navbar is loaded)
    let navbarToggle; // Declared without initial assignment
    let navMenu;      // Declared without initial assignment
    let connectWalletBtnNavbar;

    // Leaderboard elements (only if on profile.html)
    const leaderboardButton = document.querySelector('.leaderboard-btn');
    const leaderboardModal = document.getElementById('leaderboardModal');
    const closeButton = document.querySelector('.close-button'); // For leaderboard modal
    const leaderboardTableBody = document.getElementById('leaderboardTableBody');

    // Edit Profile elements (only if on profile.html)
    const editProfileButton = document.querySelector('.edit-profile-btn');
    const editProfileModal = document.getElementById('editProfileModal');
    const closeButtonEdit = document.querySelector('.close-button-edit'); // For edit profile modal
    const nicknameInput = document.getElementById('nicknameInput');
    const profilePicInput = document.getElementById('profilePicInput');
    const profilePicPreview = document.getElementById('profilePicPreview');
    const saveProfileChangesButton = document.getElementById('saveProfileChanges');
    const profilePicDisplay = document.querySelector('.profile-pic'); // The main profile picture display
    const userNameDisplay = document.querySelector('.user-name'); // The main user name display


    let hoverHitmarkerSoundCount = 0; // Counter for hitmarker sound plays specifically on button hover
    const MAX_HOVER_HITMARKER_SOUND = 3; // Max plays for hitmarker sound on button hover

    let randomHitmarkerInterval; // Variable to store the interval for random hitmarkers

    // Determine if the current page should have GIF animations
    const isGifPage = document.body.classList.contains('index-page') || window.location.pathname.includes('vote.html');

    let debounceTimer; // Debounce timer for mouseenter event
    const DEBOUNCE_TIME = 200; // milliseconds

    // Initialize GIF animations only on GIF pages
    if (isGifPage) {
        // Remove any existing positioning from original gifs (if any were initially defined in HTML)
        dankGifs.forEach(gif => {
            gif.style.left = '';
            gif.style.top = '';
            gif.style.animationDelay = '';
        });

        // Create a comprehensive grid of images across the screen
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const gifWidthApprox = 100; // Approximate width for positioning
        const gifHeightApprox = 100; // Approximate height for positioning

        const gridPositions = [];
        // Initial grid, some starting slightly off-screen
        for (let x = -gifWidthApprox / 2; x <= screenWidth - gifWidthApprox / 2; x += 150) {
            for (let y = -gifHeightApprox / 2; y <= screenHeight - gifHeightApprox / 2; y += 150) {
                gridPositions.push({x, y});
            }
        }

        // Add more random positions, allowing them to start slightly off-screen
        for (let i = 0; i < 60; i++) {
            gridPositions.push({
                x: Math.random() * (screenWidth + gifWidthApprox) - gifWidthApprox, // Allows starting from -100 up to screenWidth
                y: Math.random() * (screenHeight + gifHeightApprox) - gifHeightApprox // Allows starting from -100 up to screenHeight
            });
        }
        
        if (dankGifs.length > 0) {
            dankGifs.forEach(gif => {
                gif.style.display = 'none';
            });
            
            gridPositions.forEach(pos => {
                const randomIndex = Math.floor(Math.random() * dankGifs.length);
                const originalGif = dankGifs[randomIndex];
                const newGif = originalGif.cloneNode(true);
                
                newGif.style.display = 'block';
                newGif.style.left = `${pos.x}px`;
                newGif.style.top = `${pos.y}px`;
                newGif.style.animationDelay = `${Math.random() * 10}s`;
                
                if (Math.random() < 0.6) {
                    newGif.classList.add('dank-gif-spin');
                }

                // Reduce the range of random translation for animations
                const randomTranslationRange = 15; // e.g., -15vw/vh to +15vw/vh
                newGif.style.setProperty('--rand-x-0', `${(Math.random() * randomTranslationRange * 2 - randomTranslationRange)}vw`);
                newGif.style.setProperty('--rand-y-0', `${(Math.random() * randomTranslationRange * 2 - randomTranslationRange)}vh`);
                newGif.style.setProperty('--rand-x-1', `${(Math.random() * randomTranslationRange * 2 - randomTranslationRange)}vw`);
                newGif.style.setProperty('--rand-y-1', `${(Math.random() * randomTranslationRange * 2 - randomTranslationRange)}vh`);
                newGif.style.setProperty('--rand-x-2', `${(Math.random() * randomTranslationRange * 2 - randomTranslationRange)}vw`);
                newGif.style.setProperty('--rand-y-2', `${(Math.random() * randomTranslationRange * 2 - randomTranslationRange)}vh`);
                newGif.style.setProperty('--rand-x-3', `${(Math.random() * randomTranslationRange * 2 - randomTranslationRange)}vw`);
                newGif.style.setProperty('--rand-y-3', `${(Math.random() * randomTranslationRange * 2 - randomTranslationRange)}vh`);
                newGif.style.setProperty('--rand-x-4', `${(Math.random() * randomTranslationRange * 2 - randomTranslationRange)}vw`);
                newGif.style.setProperty('--rand-y-4', `${(Math.random() * randomTranslationRange * 2 - randomTranslationRange)}vh`);

                if (gifContainer) { // Ensure gifContainer exists before appending
                    gifContainer.appendChild(newGif);
                }
            });
        }
        randomHitmarkerInterval = setInterval(createHitmarker, 500);

        if (ctaButton) {
            ctaButton.addEventListener('mouseenter', () => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    document.body.classList.add('shake-screen');
                    setTimeout(() => {
                        document.body.classList.remove('shake-screen');
                    }, 500);

                    const sounds = [airhornSound, hitmarkerSound];
                    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
                    
                    if (randomSound === hitmarkerSound) {
                        if (hoverHitmarkerSoundCount < MAX_HOVER_HITMARKER_SOUND) {
                            randomSound.currentTime = 0;
                            randomSound.play();
                            createHitmarker(ctaButton.getBoundingClientRect());
                            hoverHitmarkerSoundCount++;
                        }
                    } else if (randomSound === airhornSound) {
                        randomSound.currentTime = 0;
                        randomSound.play();
                    }

                    for (let i = 0; i < 20; i++) {
                        createSparkle();
                    }
                }, DEBOUNCE_TIME);
            });

            ctaButton.addEventListener('mouseleave', () => {
                clearTimeout(debounceTimer);
                hoverHitmarkerSoundCount = 0;
                hitmarkerSound.pause();
                hitmarkerSound.currentTime = 0;
            });
        }

        function createSparkle() {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            document.body.appendChild(sparkle);

            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            sparkle.style.left = `${x}px`;
            sparkle.style.top = `${y}px`;

            sparkle.addEventListener('animationend', () => {
                sparkle.remove();
            });
        }

        function createHitmarker(originRect = null) {
            const hitmarker = document.createElement('img');
            hitmarker.src = 'public/assets/HitmarkerFinal.png';
            hitmarker.classList.add('hitmarker');
            if (document.body) { // Ensure body exists before appending
                document.body.appendChild(hitmarker);
            }


            let x, y;
            if (originRect) {
                x = originRect.left + originRect.width / 2 + (Math.random() * 60 - 30);
                y = originRect.top + originRect.height / 2 + (Math.random() * 60 - 30);
            } else {
                x = Math.random() * window.innerWidth;
                y = Math.random() * window.innerHeight;
            }
            
            hitmarker.style.left = `${x}px`;
            hitmarker.style.top = `${y}px`;

            hitmarker.addEventListener('animationend', () => {
                hitmarker.remove();
            });
        }

        const styleSheet = document.styleSheets[0]; // This might be undefined if no stylesheets are present initially.
        if (styleSheet) {
            styleSheet.insertRule(`
                .shake-screen {
                    animation: screenShake 0.1s infinite alternate;
                }
            `, styleSheet.cssRules.length);

            styleSheet.insertRule(`
                @keyframes screenShake {
                    0% { transform: translate(1px, 1px) rotate(0deg); }
                    25% { transform: translate(-1px, -2px) rotate(-1deg); }
                    50% { transform: translate(-3px, 0px) rotate(1deg); }
                    75% { transform: translate(1px, 2px) rotate(-1deg); }
                    100% { transform: translate(1px, -1px) rotate(0deg); }
                }
            `, styleSheet.cssRules.length);
        }
    } else {
        // If not a GIF page, clear the random hitmarker interval if it was set
        if (randomHitmarkerInterval) {
            clearInterval(randomHitmarkerInterval);
        }
        // Also hide existing dank-gifs if they were loaded in HTML but shouldn't be active
        dankGifs.forEach(gif => {
            gif.style.display = 'none';
        });
    }

    // Function to update the connect wallet button in the navbar
    function updateConnectWalletButton() {
        if (connectWalletBtnNavbar) {
            const nickname = localStorage.getItem('userNickname');
            if (nickname) {
                connectWalletBtnNavbar.textContent = nickname;
                connectWalletBtnNavbar.classList.add('wallet-connected'); // Optional: Add a class for styling
            } else {
                connectWalletBtnNavbar.textContent = 'Connect Wallet';
                connectWalletBtnNavbar.classList.remove('wallet-connected');
            }
        }
    }

    // Event listeners for leaderboard functionality, only add if elements exist AND it's the profile page
    const isProfilePage = window.location.pathname.includes('profile.html');
    if (isProfilePage && leaderboardButton && leaderboardModal && closeButton) {
        leaderboardButton.addEventListener('click', openLeaderboardModal);
        closeButton.addEventListener('click', closeLeaderboardModal);

        // Close modal if user clicks outside of it
        window.addEventListener('click', (event) => {
            if (event.target === leaderboardModal) {
                closeLeaderboardModal();
            }
        });
    }

    // Event listeners for edit profile functionality, only add if elements exist AND it's the profile page
    if (isProfilePage && editProfileButton && editProfileModal && closeButtonEdit && profilePicInput && saveProfileChangesButton) {
        editProfileButton.addEventListener('click', openEditProfileModal);
        closeButtonEdit.addEventListener('click', closeEditProfileModal);
        profilePicInput.addEventListener('change', handleProfilePicChange);
        saveProfileChangesButton.addEventListener('click', saveProfileChanges);

        // Close modal if user clicks outside of it
        window.addEventListener('click', (event) => {
            if (event.target === editProfileModal) {
                closeEditProfileModal();
            }
        });
    }
});

// Function to open the edit profile modal
function openEditProfileModal() {
    const editProfileModal = document.getElementById('editProfileModal');
    const nicknameInput = document.getElementById('nicknameInput');
    const userNameDisplay = document.querySelector('.user-name');
    const profilePicPreview = document.getElementById('profilePicPreview');
    const profilePicDisplay = document.querySelector('.profile-pic');

    if (editProfileModal) {
        // Set current nickname and profile picture in the modal
        nicknameInput.value = userNameDisplay ? userNameDisplay.textContent : 'Engayged Gamer';
        profilePicPreview.src = profilePicDisplay ? profilePicDisplay.src : 'public/assets/snoop.png';
        
        editProfileModal.style.display = 'flex';
    }
}

// Function to close the edit profile modal
function closeEditProfileModal() {
    const editProfileModal = document.getElementById('editProfileModal');
    if (editProfileModal) {
        editProfileModal.style.display = 'none';
    }
}

// Function to handle profile picture preview
function handleProfilePicChange(event) {
    const profilePicPreview = document.getElementById('profilePicPreview');
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            profilePicPreview.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Function to save profile changes
function saveProfileChanges() {
    const nicknameInput = document.getElementById('nicknameInput');
    const profilePicPreview = document.getElementById('profilePicPreview');
    const profilePicDisplay = document.querySelector('.profile-pic');
    const userNameDisplay = document.querySelector('.user-name');

    // Update nickname
    if (userNameDisplay) {
        userNameDisplay.textContent = nicknameInput.value;
    }

    // Update profile picture
    if (profilePicDisplay) {
        profilePicDisplay.src = profilePicPreview.src;
    }

    closeEditProfileModal();
    alert('Profile changes saved!'); // Simple alert for confirmation
}

// Function to open the leaderboard modal
function openLeaderboardModal() {
    const leaderboardModal = document.getElementById('leaderboardModal');
    if (leaderboardModal) {
        leaderboardModal.style.display = 'flex'; // Use flex to center content
        populateLeaderboard(); // Populate data when opened
    }
}

// Function to close the leaderboard modal
function closeLeaderboardModal() {
    const leaderboardModal = document.getElementById('leaderboardModal');
    if (leaderboardModal) {
        leaderboardModal.style.display = 'none';
    }
}

// Populate leaderboard with dummy data
function populateLeaderboard() {
    const leaderboardTableBody = document.getElementById('leaderboardTableBody');
    if (!leaderboardTableBody) {
        return;
    }

    // Clear existing data
    leaderboardTableBody.innerHTML = '';

    const dummyData = [
        { rank: 1, player: 'EngaygedGod', points: '1,500,000', isGoldenEngayged: true },
        { rank: 2, player: 'MemeLord69', points: '1,200,000', isGoldenEngayged: false },
        { rank: 3, player: 'GAY_Millionaire', points: '1,100,000', isGoldenEngayged: true },
        { rank: 4, player: 'DiamondHands', points: '950,000', isGoldenEngayged: false },
        { rank: 5, player: 'WenMoon', points: '800,000', isGoldenEngayged: false },
        { rank: 6, player: 'BasedChad', points: '750,000', isGoldenEngayged: true },
        { rank: 7, player: 'CryptoDegenerate', points: '600,000', isGoldenEngayged: false },
        { rank: 8, player: 'AlphaSeeker', points: '550,000', isGoldenEngayged: false },
        { rank: 9, player: 'DegenApe', points: '400,000', isGoldenEngayged: true },
        { rank: 10, player: 'NFT_Whale', points: '350,000', isGoldenEngayged: false }
    ];

    dummyData.forEach(data => {
        const row = leaderboardTableBody.insertRow();
        const rankCell = row.insertCell();
        const playerCell = row.insertCell();
        const pointsCell = row.insertCell();

        rankCell.textContent = data.rank;
        playerCell.textContent = data.player;
        pointsCell.textContent = data.points;

        if (data.isGoldenEngayged) {
            row.classList.add('golden-user');
        }
    });
}