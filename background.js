

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'generateTTS') {
    generateEdgeTTS(request.text, request.voice, request.rate, request.volume)
      .then(audioBlob => sendResponse({ success: true, audioBlob }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true;
  }
});


function splitText(text, maxLength = 500) {
  const chunks = [];
  const sentences = text.split(/([.!?;]\s+)/);
  let current = '';
  
  for (const sentence of sentences) {
    if ((current + sentence).length <= maxLength) {
      current += sentence;
    } else {
      if (current) chunks.push(current.trim());
      current = sentence;
    }
  }
  if (current) chunks.push(current.trim());
  return chunks.filter(c => c.length > 0);
}

async function generateEdgeTTS(text, voice = 'pt-BR-FranciscaNeural', rate = '+0%', volume = '+0%') {
  const chunks = splitText(text);
  const audioBlobs = [];

  for (const chunk of chunks) {
    try {
      
      const lang = voice.startsWith('pt-BR') ? 'pt-BR' : 
                   voice.startsWith('pt-PT') ? 'pt-PT' :
                   voice.startsWith('en-US') ? 'en-US' :
                   voice.startsWith('en-GB') ? 'en-GB' : 'pt-BR';
      
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(chunk)}&tl=${lang}&client=tw-ob`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Referer': 'https://translate.google.com/'
        }
      });

      if (!response.ok) {
        console.error('Erro na API TTS:', response.status);
        continue;
      }

      const arrayBuffer = await response.arrayBuffer();
      audioBlobs.push(new Uint8Array(arrayBuffer));
      
    } catch (error) {
      console.error('Erro ao gerar TTS:', error);
      continue;
    }
  }

  if (audioBlobs.length > 0) {
    const totalLength = audioBlobs.reduce((acc, arr) => acc + arr.length, 0);
    const combined = new Uint8Array(totalLength);
    let offset = 0;
    for (const arr of audioBlobs) {
      combined.set(arr, offset);
      offset += arr.length;
    }
    
    let binary = '';
    for (let i = 0; i < combined.length; i++) {
      binary += String.fromCharCode(combined[i]);
    }
    return btoa(binary);
  }

  throw new Error('Falha ao gerar áudio');
}
