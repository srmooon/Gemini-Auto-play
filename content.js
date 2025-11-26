
let autoplayEnabled = false;
let lastProcessedMessage = null;


chrome.storage.sync.get(['autoplay'], (result) => {
  autoplayEnabled = result.autoplay || false;
});


chrome.storage.onChanged.addListener((changes) => {
  if (changes.autoplay) autoplayEnabled = changes.autoplay.newValue;
});


function autoClickListen() {
  if (!autoplayEnabled) return;
  
  console.log('🔍 Procurando mensagens novas...');
  
  
  const messages = document.querySelectorAll('message-content');
  console.log(`📝 Encontradas ${messages.length} mensagens`);
  
  
  if (messages.length === 0) return;
  
  const messageContent = messages[messages.length - 1];
  const text = messageContent.innerText || messageContent.textContent;
  
  if (!text || text.trim().length < 10) {
    console.log('❌ Mensagem muito curta');
    return;
  }
  
  const messageId = text.substring(0, 100);
  
  
  if (messageId === lastProcessedMessage) {
    console.log('⏭️ Mensagem já processada');
    return;
  }
  
  console.log('✅ Nova mensagem detectada!');
  
  
  const responseContainer = messageContent.closest('response-container');
  if (!responseContainer) {
    console.log('❌ response-container não encontrado');
    return;
  }
  
  
  const listenButton = responseContainer.querySelector('button[aria-label="Listen"], tts-control button');
  if (!listenButton) {
    console.log('❌ Botão Listen não encontrado');
    return;
  }
  
  console.log('🎯 Botão Listen encontrado!');
  
  
  let lastLength = text.length;
  let stableCount = 0;
  
  const checkInterval = setInterval(() => {
    const currentText = messageContent.innerText || messageContent.textContent;
    
    if (currentText.length === lastLength) {
      stableCount++;
      console.log(`⏳ Mensagem estável (${stableCount}/2)`);
      
      
      if (stableCount >= 2) {
        clearInterval(checkInterval);
        lastProcessedMessage = messageId;
        
        console.log('🔊 Clicando no Listen (1x)...');
        listenButton.click();
        
        
        setTimeout(() => {
          console.log('� Cleicando no Listen (2x)...');
          listenButton.click();
        }, 500);
      }
    } else {
      stableCount = 0;
      console.log('📝 Mensagem ainda crescendo...');
    }
    
    lastLength = currentText.length;
  }, 500);
  
  
  setTimeout(() => {
    clearInterval(checkInterval);
    console.log('⏱️ Timeout atingido');
  }, 15000);
}


function addAutoplayToggle() {
  const dropdowns = document.querySelectorAll('.mat-mdc-menu-content');
  
  dropdowns.forEach((dropdown) => {
    if (dropdown.querySelector('.tts-autoplay-toggle')) return;
    
    const listenButton = dropdown.querySelector('button[aria-label*="Text to speech"], button[aria-label*="Listen"]');
    if (!listenButton) return;
    
    
    const divider = document.createElement('mat-divider');
    divider.className = 'mat-divider mat-divider-horizontal';
    divider.setAttribute('role', 'separator');
    
    
    const toggle = document.createElement('button');
    toggle.className = 'mat-mdc-menu-item mat-focus-indicator tts-autoplay-toggle';
    toggle.setAttribute('role', 'menuitem');
    toggle.setAttribute('tabindex', '0');
    toggle.innerHTML = `
      <mat-icon role="img" class="mat-icon notranslate google-symbols mat-ligature-font mat-icon-no-color">
        ${autoplayEnabled ? 'volume_up' : 'volume_off'}
      </mat-icon>
      <span class="mat-mdc-menu-item-text">
        Autoplay: ${autoplayEnabled ? 'ON' : 'OFF'}
      </span>
    `;
    
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      autoplayEnabled = !autoplayEnabled;
      chrome.storage.sync.set({ autoplay: autoplayEnabled });
      
      toggle.innerHTML = `
        <mat-icon role="img" class="mat-icon notranslate google-symbols mat-ligature-font mat-icon-no-color">
          ${autoplayEnabled ? 'volume_up' : 'volume_off'}
        </mat-icon>
        <span class="mat-mdc-menu-item-text">
          Autoplay: ${autoplayEnabled ? 'ON' : 'OFF'}
        </span>
      `;
    });
    
    listenButton.parentNode.insertBefore(divider, listenButton.nextSibling);
    listenButton.parentNode.insertBefore(toggle, divider.nextSibling);
  });
}


let observerTimeout;
const observer = new MutationObserver(() => {
  if (observerTimeout) return;
  observerTimeout = setTimeout(() => {
    autoClickListen();
    addAutoplayToggle();
    observerTimeout = null;
  }, 300);
});


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function init() {
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  setTimeout(autoClickListen, 1000);
  setTimeout(autoClickListen, 3000);
}
