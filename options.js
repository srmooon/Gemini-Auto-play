
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['autoplay'], (result) => {
    document.getElementById('autoplay').checked = result.autoplay || false;
  });
});


document.getElementById('save').addEventListener('click', () => {
  const autoplay = document.getElementById('autoplay').checked;

  chrome.storage.sync.set({ autoplay: autoplay }, () => {
    const status = document.getElementById('status');
    status.classList.add('success');
    
    setTimeout(() => {
      status.classList.remove('success');
    }, 3000);
  });
});
