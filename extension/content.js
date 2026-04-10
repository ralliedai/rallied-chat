// Rallied AI Chrome Extension - Content Script
// Detects PSA ticket pages and sends context to the background worker

(function() {
  function detectTicket() {
    const url = window.location.href;
    const hostname = window.location.hostname;
    const path = window.location.pathname;
    const hash = window.location.hash;

    let ticket = null;

    // ConnectWise Manage
    if (hostname.includes('myconnectwise.net') || hostname.includes('connectwise.com')) {
      let match = path.match(/\/(?:service|cw)\/ticket\/(\d+)/i);
      if (!match && hash) match = hash.match(/ticket\/(\d+)/i);
      if (!match) {
        const recId = new URLSearchParams(window.location.search).get('recid') ||
                      new URLSearchParams(window.location.search).get('RecID');
        if (recId && path.toLowerCase().includes('service')) {
          match = [null, recId];
        }
      }
      if (match) {
        ticket = { psaType: 'connectwise', ticketId: match[1], psaDomain: hostname };
      }
    }

    // HaloPSA
    if (hostname.includes('halopsa.com')) {
      const match = path.match(/\/tickets?\/(\d+)/i);
      if (match) {
        ticket = { psaType: 'halopsa', ticketId: match[1], psaDomain: hostname };
      }
    }

    if (ticket) {
      chrome.runtime.sendMessage({ type: 'TICKET_DETECTED', ticket });
    }
  }

  // Detect on load
  detectTicket();

  // Watch for SPA navigation (ConnectWise and HaloPSA are SPAs)
  let lastUrl = window.location.href;
  const observer = new MutationObserver(() => {
    if (window.location.href !== lastUrl) {
      lastUrl = window.location.href;
      detectTicket();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Also listen for popstate (back/forward)
  window.addEventListener('popstate', detectTicket);
  window.addEventListener('hashchange', detectTicket);
})();
