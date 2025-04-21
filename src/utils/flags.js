// Utility function to convert flag emojis to image tags
export function convertFlagEmojis(text) {
  if (!text) return text;
  
  // Match country flag emoji patterns like 🇮🇩 or 🇮🇪
  return text.replace(/\ud83c[\udde6-\uddff]\ud83c[\udde6-\uddff]/g, (match) => {
    // Convert emoji to ISO code (e.g., 🇮🇩 -> ID)
    const iso = Array.from(match)
      .map(char => String.fromCodePoint(char.codePointAt(0) - 127397))
      .join('');
    
    return `<img 
      src="https://flagcdn.com/16x12/${iso.toLowerCase()}.png"
      srcset="https://flagcdn.com/32x24/${iso.toLowerCase()}.png 2x"
      width="16" 
      height="12"
      alt="${iso}"
      class="flag-icon">`;
  });
} 