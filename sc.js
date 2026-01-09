fetch('nav.html')
  .then(r => r.text())
  .then(html => {
    document.getElementById('nav-container').innerHTML = html;
  });

document.addEventListener('click', function(e) {
  const link = e.target.closest('a');
  if (!link) return;

  e.preventDefault();
  const page = link.getAttribute('href');

  if (page === 'index.html') {
    document.getElementById('content').innerHTML = '';
    document.getElementById('nav-container').style.display = 'block';
  } else if (link.classList.contains('redirect')) {
    window.open(page, '_blank');
  } else {
    loadPage(page);
    document.getElementById('nav-container').style.display = 'none';
  }
});


function loadPage(page) {
  fetch(page)
    .then(r => r.text())
    .then(html => {
      const main = document.getElementById('content');
      main.innerHTML = html;

      main.querySelectorAll('a').forEach(link => {
        link.onclick = function(e) {
          e.preventDefault();
          const target = this.getAttribute('href');

          if (target === 'index.html') {
            document.getElementById('content').innerHTML = '';
            document.getElementById('nav-container').style.display = 'block';
          } else {
            loadPage(target);
          }
        };
      });
    });
}


document.body.addEventListener('click', () => {
  const audio = document.getElementById('bg-music');
  if (audio.paused) audio.play();
}, { once: true });

document.addEventListener("mouseover", (ev) => {
  const el = ev.target.closest(".btn");
  if (!el) return;

  const from = ev.relatedTarget;
  if (from && el.contains(from)) return;

  for (const cls of el.classList) {
    const audio = document.getElementById(cls);
    if (audio) {
      const clone = audio.cloneNode(true);
      clone.play().catch(() => {});
      clone.addEventListener("ended", () => clone.remove());
      break;
    }
  }
});

const clickAudioTemplate = new Audio("img/snare.mp3");
clickAudioTemplate.preload = "auto";

document.addEventListener("click", (ev) => {
  const el = ev.target.closest(".btn");
  if (!el) return;

  const clickAudio = clickAudioTemplate.cloneNode(true);
  clickAudio.play().catch(() => {});
});

document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('bg-video');
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      console.log('autoplay blocked');
    });
  }
});
