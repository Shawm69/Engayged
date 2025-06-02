document.addEventListener('DOMContentLoaded', () => {
    // General Elements
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Vote Tab Elements
    const veGAYBalanceElement = document.getElementById('veGAY-balance');
    const veGAYOriginElement = document.getElementById('veGAY-origin');
    const lockDurationElement = document.getElementById('lock-duration');
    const voteSliders = document.querySelectorAll('.vote-slider');
    const voteInputs = document.querySelectorAll('.vote-input');
    const allocatedVotesSpans = document.querySelectorAll('.allocated-votes');
    const progressBar = document.querySelector('.progress-bar');
    const countdownElement = document.getElementById('countdown');
    const submitVotesButton = document.getElementById('submit-votes');

    // Lock Tab Elements
    const stakedGayLockedAmountElement = document.getElementById('staked-gay-locked-amount');
    const lpLockedAmountElement = document.getElementById('lp-locked-amount');
    // const lockGayButton = document.getElementById('lock-gay-button'); // Removed as button is deleted
    // const lockLpButton = document.getElementById('lock-lp-button'); // Removed as button is deleted

    // Staking Modal Elements (GAY & LP)
    const gayStakingModal = document.getElementById('gay-staking-modal');
    const lpStakingModal = document.getElementById('lp-staking-modal');
    const manageGayStakeButton = document.querySelector('.lock-position-item button[data-lock-type="staked-gay"]');
    const manageLpStakeButton = document.querySelector('.lock-position-item button[data-lock-type="lp"]');
    const modalCloseButtons = document.querySelectorAll('.modal .close-button');
    const modalTabButtons = document.querySelectorAll('.modal-tab-button');

    // GAY Staking Modal Specific Elements
    const userGayBalanceDeposit = document.getElementById('user-gay-balance-deposit');
    const gayDepositAmountInput = document.getElementById('gay-deposit-amount');
    const gayDepositUsdValue = document.getElementById('gay-deposit-usd-value');
    const gayLockTimer = document.getElementById('gay-lock-timer');
    const confirmGayStakeButton = document.getElementById('confirm-gay-stake');

    const userStakedGayBalanceWithdraw = document.getElementById('user-staked-gay-balance-withdraw');
    const gayWithdrawAmountInput = document.getElementById('gay-withdraw-amount');
    const gayWithdrawUsdValue = document.getElementById('gay-withdraw-usd-value');
    const confirmGayWithdrawButton = document.getElementById('confirm-gay-withdraw');

    // LP Staking Modal Specific Elements
    // ZAP Tab
    const lpZapTokenAmountInput = document.getElementById('lp-zap-token-amount');
    const lpZapTokenSelect = document.getElementById('lp-zap-token-select');
    const userZapTokenBalance = document.getElementById('user-zap-token-balance');
    const lpZapConversionEstimate = document.getElementById('lp-zap-conversion-estimate');
    const lpZapUsdValue = document.getElementById('lp-zap-usd-value');
    const lpZapLockTimer = document.getElementById('lp-zap-lock-timer');
    const confirmLpZapButton = document.getElementById('confirm-lp-zap');
    // Deposit Tab
    const userLpBalanceDeposit = document.getElementById('user-lp-balance-deposit');
    const lpDepositAmountInput = document.getElementById('lp-deposit-amount');
    const lpDepositUsdValue = document.getElementById('lp-deposit-usd-value');
    const lpDepositLockTimer = document.getElementById('lp-deposit-lock-timer');
    const confirmLpStakeButton = document.getElementById('confirm-lp-stake');
    // Withdraw Tab
    const userStakedLpBalanceWithdraw = document.getElementById('user-staked-lp-balance-withdraw');
    const lpWithdrawAmountInput = document.getElementById('lp-withdraw-amount');
    const lpWithdrawUsdValue = document.getElementById('lp-withdraw-usd-value');
    const confirmLpWithdrawButton = document.getElementById('confirm-lp-withdraw');

    // Max buttons in modals
    const modalMaxButtons = document.querySelectorAll('.modal .max-button');

    // --- New Bribes Interface Elements ---
    const bribeTargetSearchInput = document.getElementById('bribe-target-search');
    const bribeTargetDropdown = document.getElementById('bribe-target-dropdown');
    const selectedTargetNameDisplay = document.getElementById('selected-target-name-display');
    const bribePaymentTokenSelect = document.getElementById('bribe-payment-token-select');
    const bribePaymentTokenBalanceDisplay = document.getElementById('bribe-payment-token-balance-display');
    const bribeAmountInput = document.getElementById('bribe-amount-input');
    const bribeAmountHalfButton = document.getElementById('bribe-amount-half-btn');
    const bribeAmountMaxButton = document.getElementById('bribe-amount-max-btn');
    const bribeUsdValueDisplay = document.getElementById('bribe-usd-value-display');
    const submitNewBribeButton = document.getElementById('submit-new-bribe-btn');

    // --- Rewards Tab Elements (New Design) ---
    const totalEarnedValueElement = document.getElementById('total-earned-value');
    const claimAllRewardsButton = document.getElementById('claim-all-rewards'); // This ID exists in the new HTML
    const unclaimedBribesListElement = document.getElementById('unclaimed-bribes-list');
    const unclaimedBribesEmptyState = document.getElementById('unclaimed-bribes-empty');
    const claimBribesButton = document.getElementById('claim-bribes-button');
    const lpRewardsListElement = document.getElementById('lp-rewards-list');
    const lpRewardsEmptyState = document.getElementById('lp-rewards-empty');
    const claimLpRewardsButton = document.getElementById('claim-lp-rewards-button');

    // Dummy data for demonstration
    let veGAYBalance = 12345.67;
    let veGAYOrigin = "Locked GAY-ETH LP";
    let lockDuration = 180; // days

    // Initial dummy lock data
    let stakedGayLocked = 5000;
    let lpLocked = 1000;

    // Dummy data for New Rewards Tab
    let totalRewardsEarnedUSD = 0; // Will be calculated
    let unclaimedBribesData = [
        { id: 'bribe1', icon: '💰', text: '50 $GAY from Protocol A', amount: 50, token: '$GAY', source: 'Protocol A', usdValue: 2.5 },
        { id: 'bribe2', icon: '💎', text: '100 USDC from Bribe Pool X', amount: 100, token: 'USDC', source: 'Bribe Pool X', usdValue: 100 },
        { id: 'bribe3', icon: '🎁', text: '0.1 ETH from Secret Santa', amount: 0.1, token: 'ETH', source: 'Secret Santa', usdValue: 300 }
    ];
    let lpRewardsData = [
        { id: 'lp1', icon: '📈', text: '0.5 GAY-LP from Staking Pool 1', amount: 0.5, token: 'GAY-LP', source: 'Staking Pool 1', usdValue: 5 },
        { id: 'lp2', icon: '🌾', text: '1.2 GAY-LP from Yield Farm Z', amount: 1.2, token: 'GAY-LP', source: 'Yield Farm Z', usdValue: 12 }
    ];
    // To simulate empty states:
    // let unclaimedBribesData = [];
    // let lpRewardsData = [];


    // Tab functionality
const showTab = (tabId) => {
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

        document.getElementById(tabId).classList.add('active');
        document.querySelector(`.tab-button[data-tab="${tabId.replace('-tab', '')}"]`).classList.add('active');

        if (tabId === 'rewards-tab') {
            updateRewardsDisplay(); // Update rewards when tab is shown
        }
    };

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.dataset.tab + '-tab';
        showTab(tabId);
    });
});

    // Function to update veGAY balance info (Vote Tab)
    const updateVeGAYInfo = () => {
        if (veGAYBalanceElement) {
            veGAYBalanceElement.textContent = veGAYBalance.toFixed(2);
        } else {
            console.error('[DEBUG] veGAYBalanceElement is null. Check HTML for ID "veGAY-balance".');
        }

        if (veGAYOriginElement) {
            veGAYOriginElement.textContent = veGAYOrigin;
        } else {
            console.error('[DEBUG] veGAYOriginElement is null. Check HTML for ID "veGAY-origin". This is the likely source of the error.');
        }

        if (lockDurationElement) {
            lockDurationElement.textContent = `${lockDuration} days`;
        } else {
            console.error('[DEBUG] lockDurationElement is null. Check HTML for ID "lock-duration".');
        }
    };

    // Function to update total allocated votes and progress bar (Vote Tab)
    const updateVoteAllocation = (changedInput = null) => {
        let totalAllocated = 0;
        let currentValues = {};

        voteInputs.forEach(input => {
            const value = parseInt(input.value) || 0;
            currentValues[input.dataset.token] = value;
            totalAllocated += value;
        });

        if (totalAllocated > 100 && changedInput) {
            const tokenOfChangedInput = changedInput.dataset.token;
            const oldValue = currentValues[tokenOfChangedInput]; // Get the value *before* the latest change
            let excess = totalAllocated - 100;

            // Distribute the excess proportionally among other tokens, or cap the current one
            // Simple capping: if exceeding 100, reduce the current input's value
            changedInput.value = Math.max(0, oldValue - excess); // This prevents going below 0
            if (changedInput.value < 0) changedInput.value = 0; // Ensure it's not negative

            voteSliders.forEach((slider, index) => {
                if (voteInputs[index] === changedInput) {
                    slider.value = changedInput.value;
                    allocatedVotesSpans[index].textContent = `${((parseInt(changedInput.value) / 100) * veGAYBalance).toFixed(2)} veGAY`;
                }
            });

            // Recalculate total after adjustment
            totalAllocated = 0;
            voteInputs.forEach(input => {
                totalAllocated += parseInt(input.value) || 0;
            });
        }


        progressBar.style.width = `${totalAllocated}%`;

        // Enable/disable submit button
        submitVotesButton.disabled = (totalAllocated !== 100);
    };

    // Event listeners for sliders and inputs (Vote Tab)
    voteSliders.forEach((slider, index) => {
        slider.addEventListener('input', (event) => {
            let value = parseInt(event.target.value);
            voteInputs[index].value = value;
            allocatedVotesSpans[index].textContent = `${((value / 100) * veGAYBalance).toFixed(2)} veGAY`;
            updateVoteAllocation(voteInputs[index]); // Pass the changed input
        });
    });

    voteInputs.forEach((input, index) => {
        input.addEventListener('input', (event) => {
            let value = parseInt(event.target.value);
            if (isNaN(value) || value < 0) value = 0;
            // Removed individual 100% cap here as total allocation logic will handle it
            event.target.value = value;
            voteSliders[index].value = value;
            allocatedVotesSpans[index].textContent = `${((value / 100) * veGAYBalance).toFixed(2)} veGAY`;
            updateVoteAllocation(input); // Pass the changed input
        });
    });


    // Countdown Timer (Example: 24 hours from now) (Vote Tab)
    const epochCutoff = new Date();
    epochCutoff.setDate(epochCutoff.getDate() + 1); // Set to tomorrow

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = epochCutoff - now;

        if (distance < 0) {
            countdownElement.textContent = "Voting Closed!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    // Submit Votes button action (Vote Tab)
    submitVotesButton.addEventListener('click', () => {
        if (!submitVotesButton.disabled) {
            const votes = {};
            voteInputs.forEach(input => {
                const token = input.dataset.token;
                votes[token] = parseInt(input.value) || 0;
            });
            alert("Votes submitted successfully! (This is a demo)");
            // In a real application, you would send this data to a backend or blockchain
        }
    });


    // Function to update lock positions (Lock Tab)
    const updateLockPositions = () => {
        if (stakedGayLockedAmountElement) stakedGayLockedAmountElement.textContent = `${stakedGayLocked.toFixed(2)} GAY`;
        if (lpLockedAmountElement) lpLockedAmountElement.textContent = `${lpLocked.toFixed(2)} LP`;
    };

    // Initial calls
    updateVeGAYInfo();
    updateVoteAllocation(); // Initialize progress bar
    updateCountdown();
    updateLockPositions(); // Initialize lock positions
    setInterval(updateCountdown, 1000); // Update countdown every second
    showTab('vote-tab'); // Show the vote tab by default

    // Bribes Tab Elements (Old - to be removed or commented)
    // const submitBribeButton = document.getElementById('submit-bribe-button');
    // const bribeModal = document.getElementById('bribe-modal');
    // const closeModalButton = document.querySelector('.close-button'); // This might be a generic class, be careful
    // const confirmBribeSubmitButton = document.getElementById('confirm-bribe-submit');

    // Bribe Modal Input Fields (Old)
    // const bribeProjectNameInput = document.getElementById('bribe-project-name');
    // const bribeRewardAmountInput = document.getElementById('bribe-reward-amount');
    // const bribeTypeSelect = document.getElementById('bribe-type');
    // const bribeEpochTargetingInput = document.getElementById('bribe-epoch-targeting');

    // Rewards Tab elements (Removed claimable and pending rewards from HTML, so no JS references needed)
    // No specific JS elements for these were directly accessed in the previous version,
    // so no further JS changes are needed beyond this comment for clarity.


    // Old Bribe Modal Logic (to be removed or commented out)
    /*
    if (submitBribeButton) {
        submitBribeButton.addEventListener('click', () => {
            if (bribeModal) bribeModal.style.display = 'block';
        });
    }

    // Ensure this closeModalButton selector is specific enough or re-evaluate if it's needed for other modals.
    // If this was solely for the old bribe modal, it can be removed.
    // const oldBribeModalCloseButton = bribeModal ? bribeModal.querySelector('.close-button') : null;
    // if (oldBribeModalCloseButton) {
    //     oldBribeModalCloseButton.addEventListener('click', () => {
    //         if (bribeModal) bribeModal.style.display = 'none';
    //     });
    // }
    */

    // Adjust the generic window click listener for modals
    window.addEventListener('click', (event) => {
        // if (bribeModal && event.target === bribeModal) { // Old bribe modal
        //     bribeModal.style.display = 'none';
        // }
        if (gayStakingModal && event.target === gayStakingModal) {
            closeModal(gayStakingModal);
        }
        if (lpStakingModal && event.target === lpStakingModal) {
            closeModal(lpStakingModal);
        }
    });

    // --- Staking Modal Logic ---

    const openModal = (modalElement) => {
        if (modalElement) {
            modalElement.style.display = 'block';
            // Reset to the first tab when opening a modal
            const firstTabButton = modalElement.querySelector('.modal-tab-button');
            if (firstTabButton) {
                const firstTabId = firstTabButton.dataset.modalTab;
                showModalTab(modalElement, firstTabId);
            }
            // Initial data population when modal opens
            if (modalElement.id === 'gay-staking-modal') {
                updateGayModalData();
            } else if (modalElement.id === 'lp-staking-modal') {
                updateLpModalData();
            }
        }
    };

    const closeModal = (modalElement) => {
        if (modalElement) {
            modalElement.style.display = 'none';
        }
    };

    if (manageGayStakeButton) {
        manageGayStakeButton.addEventListener('click', () => openModal(gayStakingModal));
    }

    if (manageLpStakeButton) {
        manageLpStakeButton.addEventListener('click', () => openModal(lpStakingModal));
    }

    modalCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.dataset.modalId;
            if (modalId) {
                closeModal(document.getElementById(modalId));
            } else { // Fallback for the older bribe modal close button
                const parentModal = button.closest('.modal');
                if (parentModal) closeModal(parentModal);
            }
        });
    });

    const showModalTab = (modalElement, tabId) => {
        const TABS_SUFFIX = '-tab'; // e.g., gay-deposit-tab, lp-zap-tab
        const currentModalTabContents = modalElement.querySelectorAll('.modal-tab-content');
        const currentModalTabButtons = modalElement.querySelectorAll('.modal-tab-button');

        currentModalTabContents.forEach(content => {
            content.classList.remove('active');
        });
        currentModalTabButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        const activeTabContent = modalElement.querySelector(`#${tabId}${TABS_SUFFIX}`);
        const activeButton = modalElement.querySelector(`.modal-tab-button[data-modal-tab="${tabId}"]`);

        if (activeTabContent) activeTabContent.classList.add('active');
        if (activeButton) activeButton.classList.add('active');
    };

    modalTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalElement = button.closest('.modal');
            const tabId = button.dataset.modalTab;
            if (modalElement && tabId) {
               showModalTab(modalElement, tabId);
            }
        });
    });

    // Dummy data and functions for staking modals
    let userGayBalance = 1000.00;
    let userStakedGay = 500.00;
    let userLpBalance = 50.00;
    let userStakedLp = 25.00;
    const GAY_PRICE_USD = 0.05;
    const LP_PRICE_USD = 10.00;
    const ZAP_TOKEN_PRICES = { 'ETH': 3000, 'GAY': GAY_PRICE_USD, 'USDC': 1.00 }; // Example prices for ZAP
    const USER_ZAP_BALANCES = {'ETH': 2.5, 'GAY': 10000, 'USDC': 500}; // Example user balances for ZAP
    const LOCK_DAYS_REMAINING = 25;

    const updateGayModalData = () => {
        if (userGayBalanceDeposit) userGayBalanceDeposit.textContent = userGayBalance.toFixed(2);
        if (userStakedGayBalanceWithdraw) userStakedGayBalanceWithdraw.textContent = userStakedGay.toFixed(2);
        if (gayLockTimer) gayLockTimer.textContent = `${LOCK_DAYS_REMAINING} days remaining`;

        const depositAmount = parseFloat(gayDepositAmountInput.value) || 0;
        if (gayDepositUsdValue) gayDepositUsdValue.textContent = (depositAmount * GAY_PRICE_USD).toFixed(2);

        const withdrawAmount = parseFloat(gayWithdrawAmountInput.value) || 0;
        if (gayWithdrawUsdValue) gayWithdrawUsdValue.textContent = (withdrawAmount * GAY_PRICE_USD).toFixed(2);
    };

    const updateLpModalData = () => {
        if(userLpBalanceDeposit) userLpBalanceDeposit.textContent = userLpBalance.toFixed(2);
        if(userStakedLpBalanceWithdraw) userStakedLpBalanceWithdraw.textContent = userStakedLp.toFixed(2);
        if(lpDepositLockTimer) lpDepositLockTimer.textContent = `${LOCK_DAYS_REMAINING} days remaining`;
        if(lpZapLockTimer) lpZapLockTimer.textContent = `${LOCK_DAYS_REMAINING} days remaining`;

        // ZAP Tab
        const zapAmount = parseFloat(lpZapTokenAmountInput.value) || 0;
        const selectedZapToken = lpZapTokenSelect.value;
        const zapTokenPrice = ZAP_TOKEN_PRICES[selectedZapToken] || 0;
        const zapUsdValue = zapAmount * zapTokenPrice;
        if (lpZapUsdValue) lpZapUsdValue.textContent = zapUsdValue.toFixed(2);
        if (lpZapConversionEstimate) lpZapConversionEstimate.textContent = (zapUsdValue / LP_PRICE_USD).toFixed(4); // More realistic estimate
        if (userZapTokenBalance) {
            userZapTokenBalance.textContent = `${(USER_ZAP_BALANCES[selectedZapToken] || 0).toFixed(selectedZapToken === 'ETH' ? 4 : 2)} ${selectedZapToken}`;
        }

        // Deposit Tab
        const depositAmount = parseFloat(lpDepositAmountInput.value) || 0;
        if (lpDepositUsdValue) lpDepositUsdValue.textContent = (depositAmount * LP_PRICE_USD).toFixed(2);

        // Withdraw Tab
        const withdrawAmount = parseFloat(lpWithdrawAmountInput.value) || 0;
        if (lpWithdrawUsdValue) lpWithdrawUsdValue.textContent = (withdrawAmount * LP_PRICE_USD).toFixed(2);
    };

    // Event listeners for GAY modal inputs
    if(gayDepositAmountInput) gayDepositAmountInput.addEventListener('input', updateGayModalData);
    if(gayWithdrawAmountInput) gayWithdrawAmountInput.addEventListener('input', updateGayModalData);

    // Event listeners for LP modal inputs
    if(lpZapTokenAmountInput) lpZapTokenAmountInput.addEventListener('input', updateLpModalData);
    if(lpZapTokenSelect) lpZapTokenSelect.addEventListener('change', updateLpModalData);
    if(lpDepositAmountInput) lpDepositAmountInput.addEventListener('input', updateLpModalData);
    if(lpWithdrawAmountInput) lpWithdrawAmountInput.addEventListener('input', updateLpModalData);

    // "Max" button functionality
    modalMaxButtons.forEach(button => {
        button.addEventListener('click', () => {
            const parentFormGroup = button.closest('.form-group');
            const inputField = parentFormGroup.querySelector('input[type="number"]');
            let balanceToSet = 0;

            // Determine which balance to use based on the active tab and modal
            const modal = button.closest('.modal');
            const activeModalTab = modal.querySelector('.modal-tab-content.active');

            if (modal.id === 'gay-staking-modal') {
                if (activeModalTab.id === 'gay-deposit-tab') {
                    balanceToSet = userGayBalance;
                } else if (activeModalTab.id === 'gay-withdraw-tab') {
                    balanceToSet = userStakedGay;
                }
            } else if (modal.id === 'lp-staking-modal') {
                if (activeModalTab.id === 'lp-zap-tab') {
                    const selectedZapToken = lpZapTokenSelect.value;
                    balanceToSet = USER_ZAP_BALANCES[selectedZapToken] || 0;
                } else if (activeModalTab.id === 'lp-deposit-tab') {
                    balanceToSet = userLpBalance;
                } else if (activeModalTab.id === 'lp-withdraw-tab') {
                    balanceToSet = userStakedLp;
                }
            }

            if (inputField) {
                inputField.value = balanceToSet;
                inputField.dispatchEvent(new Event('input'));
            }
        });
    });

    // Action button listeners (console.log for now, with modal closing)
    const handleAction = (modalToClose, action, ...details) => {
        // Simulate API call / transaction
        alert(`${action} initiated with ${details.join(', ')}. (This is a demo)`);
        closeModal(modalToClose);
        // Potentially update underlying page balances here if needed after a "successful" action
    };

    if(confirmGayStakeButton) confirmGayStakeButton.addEventListener('click', () => handleAction(gayStakingModal, 'Confirm GAY Stake:', gayDepositAmountInput.value));
    if(confirmGayWithdrawButton) confirmGayWithdrawButton.addEventListener('click', () => handleAction(gayStakingModal, 'Confirm GAY Withdraw:', gayWithdrawAmountInput.value));
    if(confirmLpZapButton) confirmLpZapButton.addEventListener('click', () => handleAction(lpStakingModal, 'Confirm LP ZAP:', lpZapTokenAmountInput.value, lpZapTokenSelect.value));
    if(confirmLpStakeButton) confirmLpStakeButton.addEventListener('click', () => handleAction(lpStakingModal, 'Confirm LP Stake:', lpDepositAmountInput.value));
    if(confirmLpWithdrawButton) confirmLpWithdrawButton.addEventListener('click', () => handleAction(lpStakingModal, 'Confirm LP Withdraw:', lpWithdrawAmountInput.value));


    // Initial data load for modals - called when modals are opened instead.
    // updateGayModalData();
    // updateLpModalData();

    // --- End Staking Modal Logic ---
// --- End Staking Modal Logic ---

// --- New Bribes Interface Logic ---
const dummyBribeTargets = [
    { id: 'tokenABC', name: 'Token ABC (Project Alpha)', logo: 'public/assets/logo.png', stats: 'TVL: $10M | APR: 15%' },
    { id: 'protocolXYZ', name: 'Protocol XYZ', logo: 'public/assets/dankill.png', stats: 'TVL: $100M | Points Program Active' },
    { id: 'coinDEF', name: 'Coin DEF (Old Chain)', logo: 'public/assets/CoolDoritos.png', stats: 'TVL: $1M | Low Liquidity' },
    { id: 'superToken', name: 'Super Token ($STK)', logo: 'public/assets/illuminati.png', stats: 'TVL: $500k | Meme Potential' },
];

let selectedBribeTarget = null;
let userBribeTokenBalances = { // Dummy balances
    'GAY': 1000.00,
    'USDC': 500.50,
    'ETH': 2.345
};
const bribeTokenPrices = { // Dummy prices for USD estimate
    'GAY': 0.05,
    'USDC': 1.00,
    'ETH': 3000.00
};


function populateBribeTargetDropdown(filter = '') {
    if (!bribeTargetDropdown) return;
    bribeTargetDropdown.innerHTML = '';
    const filteredTargets = dummyBribeTargets.filter(target => target.name.toLowerCase().includes(filter.toLowerCase()));

    filteredTargets.forEach(target => {
        const item = document.createElement('div');
        item.classList.add('dropdown-item-retro');
        item.dataset.tokenId = target.id;
        item.innerHTML = `
            <img src="${target.logo}" alt="${target.name} Logo" class="token-logo-small-retro">
            <span class="token-name-retro">${target.name}</span>
            <span class="token-stats-retro">${target.stats}</span>
        `;
        item.addEventListener('click', () => {
            selectedBribeTarget = target;
            if (selectedTargetNameDisplay) selectedTargetNameDisplay.textContent = target.name;
            if (bribeTargetSearchInput) bribeTargetSearchInput.value = target.name;
            bribeTargetDropdown.style.display = 'none'; // Hide dropdown after selection
        });
        bribeTargetDropdown.appendChild(item);
    });
    bribeTargetDropdown.style.display = filteredTargets.length > 0 ? 'block' : 'none';
}

function updateBribePaymentInfo() {
    if (!bribePaymentTokenSelect || !bribePaymentTokenBalanceDisplay || !bribeAmountInput || !bribeUsdValueDisplay) return;

    const selectedToken = bribePaymentTokenSelect.value;
    const balance = userBribeTokenBalances[selectedToken] || 0;
    bribePaymentTokenBalanceDisplay.textContent = `${balance.toFixed(2)} ${selectedToken}`;

    const amount = parseFloat(bribeAmountInput.value) || 0;
    const price = bribeTokenPrices[selectedToken] || 0;
    bribeUsdValueDisplay.textContent = (amount * price).toFixed(2);
}

if (bribeTargetSearchInput) {
    bribeTargetSearchInput.addEventListener('input', () => {
        populateBribeTargetDropdown(bribeTargetSearchInput.value);
    });
    bribeTargetSearchInput.addEventListener('focus', () => { // Show dropdown on focus if not empty
        if (bribeTargetSearchInput.value) populateBribeTargetDropdown(bribeTargetSearchInput.value);
        else populateBribeTargetDropdown(); // Show all if input is empty on focus
    });
     // Hide dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (bribeTargetDropdown && bribeTargetSearchInput && !bribeTargetSearchInput.contains(event.target) && !bribeTargetDropdown.contains(event.target)) {
            bribeTargetDropdown.style.display = 'none';
        }
    });
}

if (bribePaymentTokenSelect) {
    bribePaymentTokenSelect.addEventListener('change', updateBribePaymentInfo);
}
if (bribeAmountInput) {
    bribeAmountInput.addEventListener('input', updateBribePaymentInfo);
}

if (bribeAmountHalfButton) {
    bribeAmountHalfButton.addEventListener('click', () => {
        const selectedToken = bribePaymentTokenSelect.value;
        const balance = userBribeTokenBalances[selectedToken] || 0;
        if (bribeAmountInput) bribeAmountInput.value = (balance / 2).toFixed(selectedToken === 'ETH' ? 5 : 2) ; // Adjust precision for ETH
        updateBribePaymentInfo();
    });
}

if (bribeAmountMaxButton) {
    bribeAmountMaxButton.addEventListener('click', () => {
        const selectedToken = bribePaymentTokenSelect.value;
        const balance = userBribeTokenBalances[selectedToken] || 0;
        if (bribeAmountInput) bribeAmountInput.value = balance.toFixed(selectedToken === 'ETH' ? 5 : 2); // Adjust precision for ETH
        updateBribePaymentInfo();
    });
}

if (submitNewBribeButton) {
    submitNewBribeButton.addEventListener('click', () => {
        if (!selectedBribeTarget) {
            alert("Please select a protocol/token to bribe.");
            return;
        }
        const bribeAmount = parseFloat(bribeAmountInput.value);
        if (isNaN(bribeAmount) || bribeAmount <= 0) {
            alert("Please enter a valid bribe amount.");
            return;
        }
        const paymentToken = bribePaymentTokenSelect.value;

        const bribeSubmissionDetails = {
            target: selectedBribeTarget,
            paymentToken: paymentToken,
            amount: bribeAmount,
            estimatedUsdValue: parseFloat(bribeUsdValueDisplay.textContent)
        };

        alert(`Bribe for ${selectedBribeTarget.name} with ${bribeAmount} ${paymentToken} submitted! (This is a demo)`);

        // Reset fields (optional)
        if (bribeTargetSearchInput) bribeTargetSearchInput.value = '';
        if (selectedTargetNameDisplay) selectedTargetNameDisplay.textContent = '-';
        selectedBribeTarget = null;
        if (bribeAmountInput) bribeAmountInput.value = '';
        // Don't reset payment token select, user might want to make multiple bribes with same token
        updateBribePaymentInfo(); // Recalculate balance and USD value (which will be 0)
    });
}

// Initial population/update
populateBribeTargetDropdown(); // Initially hide or show all based on preference
if (bribeTargetDropdown) bribeTargetDropdown.style.display = 'none'; // Start with dropdown hidden
updateBribePaymentInfo();


// --- New Rewards Tab Logic ---

const updateTotalEarnedDisplay = () => {
    totalRewardsEarnedUSD = 0;
    unclaimedBribesData.forEach(bribe => totalRewardsEarnedUSD += bribe.usdValue);
    lpRewardsData.forEach(reward => totalRewardsEarnedUSD += reward.usdValue);

    if (totalEarnedValueElement) {
        totalEarnedValueElement.textContent = totalRewardsEarnedUSD.toFixed(2);
    }
};

const populateRewardList = (listElement, emptyStateElement, rewardsData, claimButton) => {
    if (!listElement || !emptyStateElement) return;

    listElement.innerHTML = ''; // Clear previous items

    if (rewardsData.length === 0) {
        listElement.style.display = 'none';
        emptyStateElement.style.display = 'flex'; // Assuming empty state is flex for icon centering
        if (claimButton) claimButton.disabled = true;
    } else {
        listElement.style.display = 'flex'; // Assuming list is flex column
        emptyStateElement.style.display = 'none';
        if (claimButton) claimButton.disabled = false;

        rewardsData.forEach(reward => {
            const item = document.createElement('div');
            item.classList.add('reward-item');
            item.innerHTML = `
                <span class="reward-icon">${reward.icon}</span>
                <span class="reward-details">${reward.text}</span>
            `;
            listElement.appendChild(item);
        });
    }
};

const updateRewardsDisplay = () => {
    updateTotalEarnedDisplay();

    populateRewardList(unclaimedBribesListElement, unclaimedBribesEmptyState, unclaimedBribesData, claimBribesButton);
    populateRewardList(lpRewardsListElement, lpRewardsEmptyState, lpRewardsData, claimLpRewardsButton);

    // Manage "Claim All Rewards" button state
    const hasAnyRewards = unclaimedBribesData.length > 0 || lpRewardsData.length > 0;
    if (claimAllRewardsButton) {
        claimAllRewardsButton.disabled = !hasAnyRewards;
        if (hasAnyRewards) {
            claimAllRewardsButton.classList.add('has-rewards');
        } else {
            claimAllRewardsButton.classList.remove('has-rewards');
        }
    }
};

// Event Listeners for new reward claim buttons
if (claimBribesButton) {
    claimBribesButton.addEventListener('click', () => {
        if (unclaimedBribesData.length > 0) {
            alert(`Claimed ${unclaimedBribesData.length} bribe(s)! (This is a demo)`);
            // Simulate clearing bribes
            totalRewardsEarnedUSD -= unclaimedBribesData.reduce((sum, bribe) => sum + bribe.usdValue, 0);
            unclaimedBribesData = [];
            updateRewardsDisplay();
        }
    });
}

if (claimLpRewardsButton) {
    claimLpRewardsButton.addEventListener('click', () => {
        if (lpRewardsData.length > 0) {
            alert(`Claimed ${lpRewardsData.length} LP reward(s)! (This is a demo)`);
            // Simulate clearing LP rewards
            totalRewardsEarnedUSD -= lpRewardsData.reduce((sum, reward) => sum + reward.usdValue, 0);
            lpRewardsData = [];
            updateRewardsDisplay();
        }
    });
}

if (claimAllRewardsButton) {
    claimAllRewardsButton.addEventListener('click', () => {
        const hadBribes = unclaimedBribesData.length > 0;
        const hadLpRewards = lpRewardsData.length > 0;

        if (hadBribes || hadLpRewards) {
            let message = "Claimed all available rewards! (This is a demo)\n";
            if (hadBribes) {
                message += `- ${unclaimedBribesData.length} bribe(s) claimed.\n`;
                totalRewardsEarnedUSD -= unclaimedBribesData.reduce((sum, bribe) => sum + bribe.usdValue, 0);
                unclaimedBribesData = [];
            }
            if (hadLpRewards) {
                message += `- ${lpRewardsData.length} LP reward(s) claimed.`;
                totalRewardsEarnedUSD -= lpRewardsData.reduce((sum, reward) => sum + reward.usdValue, 0);
                lpRewardsData = [];
            }
            alert(message);
            updateRewardsDisplay();
        }
    });
}

// Initial call for rewards display if rewards tab might be default or for data consistency
updateRewardsDisplay();

// --- End New Rewards Tab Logic ---

// Old Bribe Submission Logic (Commented out as it's replaced)
/*
if (confirmBribeSubmitButton) { // This ID is from the old modal
    confirmBribeSubmitButton.addEventListener('click', () => {
        // ... old logic
    });
}
*/
});