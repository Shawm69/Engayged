document.addEventListener('DOMContentLoaded', () => {
    const connectWalletBtn = document.getElementById('connectWalletBtn');
    const connectTwitterBtn = document.getElementById('connectTwitterBtn');
    const mainHeader = document.querySelector('.main-header');
    let isWalletConnected = false;

    // Main header hover effects (no sound)
    mainHeader.addEventListener('mouseover', () => {
        // No screen shake for now, per feedback
    });

    // Button click effects
    connectWalletBtn.addEventListener('click', () => {
        // Simulate wallet connection
        connectWalletBtn.textContent = 'Connecting...';
        connectWalletBtn.disabled = true;
        setTimeout(() => {
            isWalletConnected = true;
            const userNickname = 'EngaygedUser' + Math.floor(Math.random() * 1000); // Generate a dummy nickname
            localStorage.setItem('userNickname', userNickname); // Store nickname
            connectWalletBtn.textContent = 'Wallet Connected!'; // This will be updated by script.js
            connectTwitterBtn.disabled = false;
            connectWalletBtn.style.backgroundColor = '#4CAF50';
            connectWalletBtn.style.cursor = 'default';
            // Dispatch a custom event to notify other parts of the application
            document.dispatchEvent(new CustomEvent('walletConnected', { detail: { nickname: userNickname } }));
        }, 2000);
    });

    let isTwitterConnected = false; // New variable to track Twitter connection
    connectTwitterBtn.addEventListener('click', () => {
        if (isWalletConnected) {
            connectTwitterBtn.textContent = 'Connecting...';
            connectTwitterBtn.disabled = true;
            setTimeout(() => {
                isTwitterConnected = true; // Set Twitter connected flag
                connectTwitterBtn.textContent = 'Twitter Connected!';
                connectTwitterBtn.style.backgroundColor = '#4CAF50';
                connectTwitterBtn.style.cursor = 'default';

                // Check if both are connected and redirect
                if (isWalletConnected && isTwitterConnected) {
                    window.location.href = 'profile.html';
                }
            }, 2000);
            // The redirection logic will be handled by the new if statement above
        } else {
            alert('Please connect your wallet first!');
        }
    });
});