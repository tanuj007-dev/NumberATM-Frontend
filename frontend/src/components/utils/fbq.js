// utils/fbq.js
export const fbqTrack = (event, options = {}) => {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', event, options);
    } else {
      console.warn(`fbq not available for event: ${event}`);
    }
  };