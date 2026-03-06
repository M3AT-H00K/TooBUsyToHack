// JavaScript for handling the modal functionality

// Get modal elements
const taskModal = document.getElementById('taskModal');
const openModalBtn = document.querySelector('.btn-tasks');
const closeModalBtn = document.getElementById('closeModal');
const timeLeftDisplay = document.getElementById('timeLeft');
const settingsForm = document.getElementById('settingsForm');
const userid = document.body.dataset.userid;

// Open modal
openModalBtn.addEventListener('click', () => {
    taskModal.style.display = 'flex';
    startCountdown(300); // Start a 5-minute countdown
});

// Close modal
closeModalBtn.addEventListener('click', () => {
    taskModal.style.display = 'none';
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === taskModal) {
        taskModal.style.display = 'none';
    }
});

// Countdown timer function
function startCountdown(seconds) {
    let remainingTime = seconds;

    const timer = setInterval(() => {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        timeLeftDisplay.textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (remainingTime <= 0) {
            clearInterval(timer);
            timeLeftDisplay.textContent = 'Time Left: 00:00';
        }

        remainingTime--;
    }, 1000);
}

// JavaScript for handling the Rival modal functionality

// Get Rival modal elements
const rivalModal = document.getElementById('rivalModal');
const openRivalModalBtn = document.querySelector('.btn-rivals');
const closeRivalModalBtn = document.getElementById('closeRivalModal');

// Open Rival modal
openRivalModalBtn.addEventListener('click', () => {
    rivalModal.style.display = 'flex';
});

// Close Rival modal
closeRivalModalBtn.addEventListener('click', () => {
    rivalModal.style.display = 'none';
});

// Close Rival modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === rivalModal) {
        rivalModal.style.display = 'none';
    }
});

// JavaScript for handling the Settings modal functionality

// Get Settings modal elements
const settingsModal = document.getElementById('settingsModal');
const openSettingsButton = document.getElementById('settingsButton');
const closeSettingsButton = document.getElementById('closeSettingsModal');

// Open Settings modal
openSettingsButton.addEventListener('click', () => {
    settingsModal.style.display = 'flex';
});

// Close Settings modal
closeSettingsButton.addEventListener('click', () => {
    settingsModal.style.display = 'none';
});

// Close Settings modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === settingsModal) {
        settingsModal.style.display = 'none';
    }
});

settingsForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const department = document.getElementById('department').value;
  const year = document.getElementById('year').value;

  const response = await fetch(`/user/${userid}/settings`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ department, year })
  });

  if (response.ok) {
    const profileInfo = document.querySelector('.profile-info');
    profileInfo.innerHTML = `
      <p>Department: ${department || "Not set"}</p>
      <p>Year of Study: ${year || "Not set"}</p>
    `;
    settingsModal.style.display = 'none';
  }
});
