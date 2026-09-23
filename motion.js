(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function addIntro() {
    if (document.body.dataset.page !== 'home') return;
    const loader = document.createElement('div');
    loader.className = 'intro-loader';
    loader.innerHTML = '<div class="intro-mark"><img src="assets/avatar.svg" alt=""><span>NOVA</span></div><div class="intro-track"><i></i></div><p>INITIALIZING COMMUNITY SYSTEMS</p>';
    document.body.prepend(loader);
    requestAnimationFrame(() => loader.classList.add('ready'));
    window.setTimeout(() => loader.classList.add('gone'), reduced ? 300 : 1400);
  }

  function addScrollProgress() {
    const progress = document.createElement('span');
    progress.className = 'scroll-progress';
    document.body.append(progress);
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      progress.style.setProperty('--progress', `${max > 0 ? (scrollY / max) * 100 : 0}%`);
    };
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    update();
  }

  function bindMotion() {
    document.querySelectorAll('a, button, .feature-card, .command-card, .stat, .contact-card').forEach((element) => {
      element.addEventListener('pointermove', (event) => {
        if (reduced) return;
        const box = element.getBoundingClientRect();
        element.style.setProperty('--pointer-x', `${event.clientX - box.left}px`);
        element.style.setProperty('--pointer-y', `${event.clientY - box.top}px`);
      });
      element.addEventListener('pointerleave', () => {
        element.style.removeProperty('--pointer-x');
        element.style.removeProperty('--pointer-y');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    addIntro();
    addScrollProgress();
    bindMotion();
  });
})();
