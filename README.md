# 🎧 Gemini Auto Listen

[English](#english) | [Português](#português)

---

## English

A Chrome/Edge extension that automatically clicks Gemini's native "Listen" button when new responses appear, enabling hands-free audio playback.

### ✨ Features

- 🤖 **Auto-play**: Automatically triggers Gemini's built-in TTS when responses arrive
- 🔄 **Smart Detection**: Monitors for new messages and handles Gemini's UI behavior
- 🎯 **Double-click Fix**: Handles the quirk where Gemini's Listen button needs two clicks on subsequent messages
- ⚙️ **Configurable**: Enable/disable autoplay via options page
- 🌐 **Works Everywhere**: Compatible with gemini.google.com, aistudio.google.com, and other Gemini URLs

### 🚀 Installation

#### From Source

1. Clone or download this repository
2. Open Chrome/Edge and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked"
5. Select the extension folder

### 🎯 How It Works

The extension uses a MutationObserver to detect when new Gemini responses appear in the chat. When a new message is detected, it:

1. Locates Gemini's native "Listen" button (the speaker icon)
2. Clicks it automatically to start audio playback
3. For messages after the first one, performs a second click after 500ms to handle Gemini's UI behavior

### ⚙️ Configuration

1. Go to `chrome://extensions/`
2. Find "Gemini Auto Listen" and click "Details"
3. Click "Extension options"
4. Toggle autoplay on/off
5. Changes are saved automatically

### 🐛 Known Issues & Solutions

**Issue**: Second and subsequent messages require the Listen button to be clicked twice  
**Solution**: The extension automatically performs a delayed second click (500ms) to handle this

**Issue**: Listen button not found  
**Solution**: Make sure you're on a supported Gemini URL and the page has fully loaded

### 🛠️ Technical Details

- **Manifest Version**: 3
- **Permissions**: Storage only (for saving preferences)
- **Content Script**: Runs on all Gemini domains
- **Detection Method**: MutationObserver watching for new message containers

### 📝 Notes

- Uses Gemini's native TTS (no external APIs required)
- Respects Gemini's voice and language settings
- Lightweight and privacy-friendly (no data collection)
- Works with all Gemini models and conversation types

### 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

### 📄 License

MIT License - feel free to use and modify as needed

---

## Português

Uma extensão para Chrome/Edge que clica automaticamente no botão "Ouvir" nativo do Gemini quando novas respostas aparecem, permitindo reprodução de áudio mãos-livres.

### ✨ Recursos

- 🤖 **Reprodução Automática**: Aciona automaticamente o TTS integrado do Gemini quando as respostas chegam
- 🔄 **Detecção Inteligente**: Monitora novas mensagens e lida com o comportamento da interface do Gemini
- 🎯 **Correção de Clique Duplo**: Resolve o problema onde o botão Ouvir do Gemini precisa de dois cliques nas mensagens subsequentes
- ⚙️ **Configurável**: Ative/desative a reprodução automática pela página de opções
- 🌐 **Funciona em Todos os Lugares**: Compatível com gemini.google.com, aistudio.google.com e outras URLs do Gemini

### 🚀 Instalação

#### Do Código Fonte

1. Clone ou baixe este repositório
2. Abra o Chrome/Edge e navegue até `chrome://extensions/`
3. Ative o "Modo do desenvolvedor" (botão no canto superior direito)
4. Clique em "Carregar sem compactação"
5. Selecione a pasta da extensão

### 🎯 Como Funciona

A extensão usa um MutationObserver para detectar quando novas respostas do Gemini aparecem no chat. Quando uma nova mensagem é detectada, ela:

1. Localiza o botão "Ouvir" nativo do Gemini (o ícone de alto-falante)
2. Clica automaticamente para iniciar a reprodução de áudio
3. Para mensagens após a primeira, executa um segundo clique após 500ms para lidar com o comportamento da interface do Gemini

### ⚙️ Configuração

1. Vá em `chrome://extensions/`
2. Encontre "Gemini Auto Listen" e clique em "Detalhes"
3. Clique em "Opções da extensão"
4. Ative/desative a reprodução automática
5. As alterações são salvas automaticamente

### 🐛 Problemas Conhecidos e Soluções

**Problema**: Segunda mensagem e subsequentes requerem que o botão Ouvir seja clicado duas vezes  
**Solução**: A extensão automaticamente executa um segundo clique atrasado (500ms) para resolver isso

**Problema**: Botão Ouvir não encontrado  
**Solução**: Certifique-se de estar em uma URL suportada do Gemini e que a página carregou completamente

### 🛠️ Detalhes Técnicos

- **Versão do Manifest**: 3
- **Permissões**: Apenas armazenamento (para salvar preferências)
- **Content Script**: Executa em todos os domínios do Gemini
- **Método de Detecção**: MutationObserver observando novos containers de mensagem

### 📝 Observações

- Usa o TTS nativo do Gemini (não requer APIs externas)
- Respeita as configurações de voz e idioma do Gemini
- Leve e amigável à privacidade (sem coleta de dados)
- Funciona com todos os modelos e tipos de conversa do Gemini

### 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir recursos
- Enviar pull requests

### 📄 Licença

Licença MIT - sinta-se livre para usar e modificar conforme necessário
