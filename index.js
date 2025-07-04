// Matrix canvas setup
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// Resize the canvas on load + window resize
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

//Hacker Launch Function
function startHacking() {
  const elem = document.documentElement;

  //Request fullscreen safely
  if (elem.requestFullscreen) {
    elem.requestFullscreen().catch(err => {
      console.warn("Fullscreen blocked:", err);
    });
  }

  //Hide start screen with fade
  const startScreen = document.getElementById("start-screen");
  startScreen.classList.add("fade-out");
  setTimeout(() => (startScreen.style.display = "none"), 500);

  //Initialising matrix variables
  const letters = '01';
  const fontSize = 14;
  let columns = canvas.width / fontSize;
  let drops = Array.from({ length: columns }, () => 1);

  //Update drops on resize
  window.addEventListener('resize', () => {
    resizeCanvas();
    columns = canvas.width / fontSize;
    drops = Array.from({ length: columns }, () => 1);
  });

  function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height || Math.random() > 0.95) {
        drops[i] = 0;
      }

      drops[i]++;
    }
  }

  setInterval(drawMatrix, 33);

  // Terminal Loader Setup
  const msg_display = document.getElementById('root');
  const hack = [
    "Initializing Scan...",
    "Fetching secure data...",
    "Bypassing firewall...",
    "Detecting logs",
    "Sending to remote servers...",
    "Clearing traces...",
    "Erasing data..."
  ];

  const createLoader = (msg) => {
    const container = document.createElement('div');
    container.classList.add("loader-block");

    const label = document.createElement('p');
    label.textContent = msg;

    const progressBar = document.createElement('div');
    progressBar.classList.add("progress-bar");

    const progress = document.createElement('div');
    progress.classList.add("progress-fill");

    progressBar.appendChild(progress);
    container.appendChild(label);
    container.appendChild(progressBar);
    msg_display.appendChild(container);

    return { container, progress };
  };

  const fillLoader = async (progress) => {
    for (let i = 0; i <= 100; i++) {
      progress.style.width = i + "%";
      await new Promise(resolve => setTimeout(resolve, 15));
    }
  };

  const runHackerTerminal = async () => {
    while (true) {
      const elements = document.querySelectorAll('.loader-block');
      elements.forEach(el => el.remove());

      for (let i = 0; i < hack.length; i++) {
        const { container, progress } = createLoader(hack[i]);
        await fillLoader(progress);
        await new Promise(resolve => setTimeout(resolve, 300));
        container.remove();
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  };

  runHackerTerminal();
}
