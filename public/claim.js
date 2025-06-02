document.addEventListener('DOMContentLoaded', () => {
    const claimButton = document.getElementById('claimButton');
    const celebrationMessage = document.getElementById('celebration');
    const jsConfetti = new JSConfetti();

    claimButton.addEventListener('click', () => {
        // Show the celebration message
        celebrationMessage.classList.remove('hidden');

        // Trigger confetti
        jsConfetti.addConfetti({
            emojis: ['💰', '💎', '🎉', '🌟', '🌈'],
            confettiRadius: 6,
            confettiNumber: 500,
        });

        // Hide the celebration message after a few seconds
        setTimeout(() => {
            celebrationMessage.classList.add('hidden');
        }, 3000); // Hide after 3 seconds
    });
});