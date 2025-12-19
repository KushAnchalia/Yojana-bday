const screens = document.querySelectorAll(".screen");
const replayBtn = document.getElementById("replay");
const music = document.getElementById("bg-music");

let index = 0;

// We'll wait for the user to click "Let's go" to start everything (music + sequence)
const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const unmuteBtn = document.getElementById('unmute-btn');

async function handleStart() {
  if (startScreen) startScreen.style.display = 'none';
  // start sequence
  startSequence();
  // try to play music (user initiated click — should succeed)
  if (music) {
    try {
      music.muted = false;
      await music.play();
      if (unmuteBtn) unmuteBtn.hidden = true;
    } catch (e) {
      try {
        // if play fails, try muted autoplay and show unmute button
        music.muted = true;
        await music.play();
        if (unmuteBtn) {
          unmuteBtn.hidden = false;
          unmuteBtn.addEventListener('click', () => {
            music.muted = false;
            unmuteBtn.hidden = true;
          });
        }
      } catch (e2) {
        // nothing else to do; user can press Unmute later
      }
    }
  }
}

if (startBtn) startBtn.addEventListener('click', handleStart);

function showScreen(i) {
  screens.forEach(s => s.classList.remove("show"));
  screens[i].classList.add("show");
}

function startSequence() {
  index = 0;
  showScreen(index);

  const interval = setInterval(() => {
    index++;

    // STOP at last screen forever
    if (index >= screens.length - 1) {
      showScreen(screens.length - 1);
      clearInterval(interval);
      return;
    }

    showScreen(index);
  }, 3500); // ⏳ timing (longer & smoother)
}

// Replay
replayBtn.addEventListener("click", startSequence);

// Do not auto-start; wait for the user to press the start button
