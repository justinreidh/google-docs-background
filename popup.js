const imageUrlInput = document.getElementById('imageUrl');
const opacityInput = document.getElementById('opacity');
const backgroundModeInput = document.getElementById('backgroundMode');
const saveBtn = document.getElementById('saveBtn');

chrome.storage.sync.get(
  {
    imageUrl: '',
    opacity: 0.18,
    backgroundMode: 'cover'
  },
  (data) => {
    imageUrlInput.value = data.imageUrl;
    opacityInput.value = data.opacity;
    backgroundModeInput.value = data.backgroundMode;
  }
);

saveBtn.addEventListener('click', () => {
  chrome.storage.sync.set({
    imageUrl: imageUrlInput.value,
    opacity: opacityInput.value,
    backgroundMode: backgroundModeInput.value
  });

  saveBtn.textContent = 'Saved!';

  setTimeout(() => {
    saveBtn.textContent = 'Save';
  }, 1000);
});