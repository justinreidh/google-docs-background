function createOverlay(imageUrl, opacity, backgroundMode) {
  let overlay = document.getElementById('docs-background-image-overlay');

  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'docs-background-image-overlay';
    document.body.prepend(overlay);
  }

  overlay.style.backgroundImage = `url('${imageUrl}')`;
  overlay.style.opacity = opacity;

  if (backgroundMode === '100%') {
    overlay.style.backgroundSize = '100% auto';
    overlay.style.backgroundRepeat = 'repeat'
  } else {
    overlay.style.backgroundSize = 'cover';
  }
}

function applyBackground() {
  chrome.storage.sync.get(
    {
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      opacity: 0.18,
      backgroundMode: 'cover'
    },
    (data) => {
      createOverlay(
        data.imageUrl,
        data.opacity,
        data.backgroundMode
      );
    }
  );
}

applyBackground();

chrome.storage.onChanged.addListener(() => {
  applyBackground();
});

const observer = new MutationObserver(() => {
  const overlay = document.getElementById('docs-background-image-overlay');

  if (!overlay) {
    applyBackground();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});