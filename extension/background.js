// Rallied AI Chrome Extension - Background Service Worker
// Opens the side panel when the extension icon is clicked

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

// Listen for tab updates to detect PSA navigation
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    const ticket = parseTicketFromUrl(changeInfo.url);
    if (ticket) {
      // Store the current ticket context for the side panel
      chrome.storage.session.set({ currentTicket: ticket });
    } else {
      chrome.storage.session.remove('currentTicket');
    }
  }
});

// Listen for tab activation (switching between tabs)
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  if (tab.url) {
    const ticket = parseTicketFromUrl(tab.url);
    if (ticket) {
      chrome.storage.session.set({ currentTicket: ticket });
    } else {
      chrome.storage.session.remove('currentTicket');
    }
  }
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'TICKET_DETECTED') {
    chrome.storage.session.set({ currentTicket: message.ticket });
    sendResponse({ ok: true });
  }
  return true;
});

// URL parsing for PSA ticket detection
function parseTicketFromUrl(url) {
  try {
    const u = new URL(url);
    const hostname = u.hostname;
    const path = u.pathname;

    // ConnectWise Manage
    // Patterns: /service/ticket/{id}, /cw/ticket/{id}, /v4_6_release/services/system.io/...
    // The most reliable: hash-based routing with #/ticket/{id}
    if (hostname.includes('myconnectwise.net') || hostname.includes('connectwise.com')) {
      // Try path-based patterns
      let match = path.match(/\/(?:service|cw)\/ticket\/(\d+)/i);
      if (match) return { psaType: 'connectwise', ticketId: match[1], psaDomain: hostname };

      // ConnectWise often uses hash routing
      const hash = u.hash;
      if (hash) {
        match = hash.match(/ticket\/(\d+)/i);
        if (match) return { psaType: 'connectwise', ticketId: match[1], psaDomain: hostname };
      }

      // Try query param patterns (some CW versions)
      const recId = u.searchParams.get('recid') || u.searchParams.get('RecID');
      if (recId && path.toLowerCase().includes('service')) {
        return { psaType: 'connectwise', ticketId: recId, psaDomain: hostname };
      }

      return null;
    }

    // HaloPSA
    // Patterns: /tickets/{id}, /ticket/{id}
    if (hostname.includes('halopsa.com')) {
      const match = path.match(/\/tickets?\/(\d+)/i);
      if (match) return { psaType: 'halopsa', ticketId: match[1], psaDomain: hostname };
      return null;
    }

    return null;
  } catch {
    return null;
  }
}
