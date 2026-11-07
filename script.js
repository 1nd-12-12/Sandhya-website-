document.addEventListener('DOMContentLoaded', () => {
  const pages = document.querySelectorAll('.page');
  const dots = document.querySelectorAll('.dot');
  let currentPage = 0;

  // =========================================
  // 1. AMBIENT FLOATING BACKGROUND PARTICLES
  // =========================================
  const ambientBg = document.getElementById('ambient-bg');
  const bgEmojis = ['💗', '✨', '🦋', '🌸', '💕', '🌷', '⭐'];

  function createAmbientParticles() {
    for (let i = 0; i < 24; i++) {
      const span = document.createElement('span');
      span.className = 'ambient-particle';
      span.textContent = bgEmojis[Math.floor(Math.random() * bgEmojis.length)];
      span.style.left = `${Math.random() * 100}%`;
      span.style.fontSize = `${0.9 + Math.random() * 1.1}rem`;
      span.style.animationDuration = `${8 + Math.random() * 10}s`;
      span.style.animationDelay = `${Math.random() * 8}s`;
      ambientBg.appendChild(span);
    }
  }
  createAmbientParticles();

  // =========================================
  // 2. PAGE NAVIGATION
  // =========================================
  function goToPage(index) {
    pages[currentPage].classList.remove('active');
    dots[currentPage].classList.remove('active');

    currentPage = index;
    pages[currentPage].classList.add('active');
    dots[currentPage].classList.add('active');

    if (currentPage === 1) {
      startTypingMessages();
    }
  }

  document.getElementById('enter-btn').addEventListener('click', () => goToPage(1));
  document.getElementById('to-page-3').addEventListener('click', () => goToPage(2));
  document.getElementById('to-page-4').addEventListener('click', () => goToPage(3));
  document.getElementById('to-page-5').addEventListener('click', () => goToPage(4));

  // =========================================
  // 3. PAGE 2: TYPING ANIMATION
  // =========================================
  const specialMessages = [
    'Hey Sandhya, you are truly special! 💗',
    'Your smile makes everything beautiful.',
    'You deserve all the happiness in this world.',
    'Some people are special without even trying, and you are one of them.',
    "You are a beautiful chapter in someone's story.",
    'Never stop smiling, because your smile is magical.'
  ];

  let typingStarted = false;
  const typingContainer = document.getElementById('typing-container');
  const toPage3Btn = document.getElementById('to-page-3');

  function startTypingMessages() {
    if (typingStarted) return;
    typingStarted = true;
    typingContainer.innerHTML = '';
    toPage3Btn.classList.add('hidden');

    let msgIndex = 0;

    function typeNextLine() {
      if (msgIndex >= specialMessages.length) {
        toPage3Btn.classList.remove('hidden');
        return;
      }

      const lineEl = document.createElement('div');
      lineEl.className = 'typed-line';
      typingContainer.appendChild(lineEl);

      const text = specialMessages[msgIndex];
      let charIndex = 0;

      const timer = setInterval(() => {
        lineEl.textContent += text.charAt(charIndex);
        charIndex++;
        if (charIndex >= text.length) {
          clearInterval(timer);
          msgIndex++;
          setTimeout(typeNextLine, 450);
        }
      }, 32);
    }

    typeNextLine();
  }

  // =========================================
  // 4. PAGE 3: INFINITE COMPLIMENTS MARQUEE
  // =========================================
  const compliments = [
    'Beautiful Soul 🌸',
    'Cutie Pie 🥹',
    'Princess Sandhya 👑',
    'Angel Eyes ✨',
    'Sweetest Girl 💕',
    'Queen Of Hearts 💗',
    'Happiness Queen 🦋',
    'Most Precious Soul 🌷',
    'Pure Magic ✨',
    'Sunshine In Human Form ☀️',
    'Prettiest Smile 💖',
    'Heart Of Gold 💛',
    'Dreamy & Graceful 🌸',
    'One In A Million 💎',
    'Forever Adorable 🧸',
    'Brightest Star ⭐',
    'Purest Vibe 🌺',
    'Simply Unforgettable 💫'
  ];

  const marqueeTrack = document.getElementById('marquee-track');
  // Duplicate list twice for seamless infinite CSS loop
  const fullList = [...compliments, ...compliments, ...compliments, ...compliments];
  fullList.forEach((item) => {
    const pill = document.createElement('div');
    pill.className = 'compliment-pill';
    pill.textContent = item;
    marqueeTrack.appendChild(pill);
  });

  // =========================================
  // 5. PAGE 4: ANIMATED ENVELOPE
  // =========================================
  const envelopeWrapper = document.getElementById('envelope-wrapper');
  const envelopeHint = document.getElementById('envelope-hint');
  const toPage5Btn = document.getElementById('to-page-5');

  function openEnvelope() {
    if (envelopeWrapper.classList.contains('open')) return;
    envelopeWrapper.classList.add('open');
    envelopeHint.textContent = '✨ Read your letter ✨';
    setTimeout(() => {
      toPage5Btn.classList.remove('hidden');
    }, 900);
  }

  envelopeWrapper.addEventListener('click', openEnvelope);
  envelopeWrapper.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') openEnvelope();
  });

  // =========================================
  // 6. PAGE 5: GIFT BOX & HEART EXPLOSION
  // =========================================
  const giftBox = document.getElementById('gift-box');
  const giftStage = document.getElementById('gift-stage');
  const finaleStage = document.getElementById('finale-stage');
  const explosionLayer = document.getElementById('explosion-layer');
  let fallInterval = null;

  function triggerSurprise() {
    giftStage.classList.add('hidden');
    finaleStage.classList.remove('hidden');

    // Heart & Sparkle Explosion from center
    const burstEmojis = ['💖', '💗', '💕', '✨', '🦋', '🌸', '🌷'];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < 45; i++) {
      const item = document.createElement('span');
      item.className = 'burst-item';
      item.textContent = burstEmojis[Math.floor(Math.random() * burstEmojis.length)];
      item.style.left = `${centerX}px`;
      item.style.top = `${centerY}px`;

      const angle = Math.random() * Math.PI * 2;
      const distance = 90 + Math.random() * 220;
      item.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
      item.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
      item.style.setProperty('--rot', `${Math.random() * 360}deg`);

      explosionLayer.appendChild(item);
      setTimeout(() => item.remove(), 1800);
    }

    // Continuous falling flowers, sparkles & butterflies
    fallInterval = setInterval(() => {
      const fall = document.createElement('span');
      fall.className = 'falling-item';
      fall.textContent = burstEmojis[Math.floor(Math.random() * burstEmojis.length)];
      fall.style.left = `${Math.random() * 100}%`;
      fall.style.animationDuration = `${3 + Math.random() * 3}s`;
      explosionLayer.appendChild(fall);
      setTimeout(() => fall.remove(), 6000);
    }, 220);
  }

  giftBox.addEventListener('click', triggerSurprise);
  giftBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') triggerSurprise();
  });

  // =========================================
  // 7. REPLAY THE MAGIC
  // =========================================
  document.getElementById('replay-btn').addEventListener('click', () => {
    // Reset Page 2
    typingStarted = false;
    typingContainer.innerHTML = '';
    toPage3Btn.classList.add('hidden');

    // Reset Page 4
    envelopeWrapper.classList.remove('open');
    envelopeHint.textContent = 'Tap the envelope to open';
    toPage5Btn.classList.add('hidden');

    // Reset Page 5
    clearInterval(fallInterval);
    explosionLayer.innerHTML = '';
    finaleStage.classList.add('hidden');
    giftStage.classList.remove('hidden');

    goToPage(0);
  });
});
